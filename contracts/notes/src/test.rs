#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_register_and_get_creator() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(TinyTipContract, ());
    let client = TinyTipContractClient::new(&env, &contract_id);

    let creator_wallet = Address::generate(&env);
    let username = String::from_str(&env, "ahan");
    let name = String::from_str(&env, "Ahan");
    let bio = String::from_str(&env, "Building tools for developers");

    let res = client.register_creator(&username, &name, &bio, &creator_wallet);
    assert_eq!(res, String::from_str(&env, "Creator registered successfully"));

    let creators = client.get_creator(&username);
    assert_eq!(creators.len(), 1);
    let creator = creators.get(0).unwrap();
    assert_eq!(creator.username, username);
    assert_eq!(creator.name, name);
    assert_eq!(creator.bio, bio);
    assert_eq!(creator.wallet, creator_wallet);
    assert_eq!(creator.total_received, 0);
    assert_eq!(creator.supporter_count, 0);
    assert_eq!(creator.tip_count, 0);

    let all_creators = client.get_all_creators();
    assert_eq!(all_creators.len(), 1);
}

#[test]
fn test_send_tip() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(TinyTipContract, ());
    let client = TinyTipContractClient::new(&env, &contract_id);

    let creator_wallet = Address::generate(&env);
    let username = String::from_str(&env, "ahan");
    let name = String::from_str(&env, "Ahan");
    let bio = String::from_str(&env, "Building open source software");

    client.register_creator(&username, &name, &bio, &creator_wallet);

    let donor = Address::generate(&env);
    let tip_res = client.send_tip(
        &donor,
        &username,
        &500_0000000_u128, // 0.5 XLM in stroops (1 XLM = 10_000_000 stroops)
        &String::from_str(&env, "Great work! Keep it up!"),
    );

    assert_eq!(tip_res, String::from_str(&env, "Tip sent successfully"));

    let creators = client.get_creator(&username);
    let creator = creators.get(0).unwrap();
    assert_eq!(creator.total_received, 500_0000000_u128);
    assert_eq!(creator.supporter_count, 1);
    assert_eq!(creator.tip_count, 1);

    let tips = client.get_recent_tips();
    assert_eq!(tips.len(), 1);
    let tip = tips.get(0).unwrap();
    assert_eq!(tip.donor, donor);
    assert_eq!(tip.creator_username, username);
    assert_eq!(tip.amount, 500_0000000_u128);
}
