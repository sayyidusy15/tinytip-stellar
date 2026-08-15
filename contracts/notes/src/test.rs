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
    assert_eq!(
        res,
        String::from_str(&env, "Creator registered successfully")
    );

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

#[test]
fn test_multiple_creators_registration() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(TinyTipContract, ());
    let client = TinyTipContractClient::new(&env, &contract_id);

    let c1_wallet = Address::generate(&env);
    let c1_user = String::from_str(&env, "creator1");
    client.register_creator(
        &c1_user,
        &String::from_str(&env, "Creator One"),
        &String::from_str(&env, "Bio One"),
        &c1_wallet,
    );

    let c2_wallet = Address::generate(&env);
    let c2_user = String::from_str(&env, "creator2");
    client.register_creator(
        &c2_user,
        &String::from_str(&env, "Creator Two"),
        &String::from_str(&env, "Bio Two"),
        &c2_wallet,
    );

    let all = client.get_all_creators();
    assert_eq!(all.len(), 2);
}

#[test]
fn test_multiple_tips_accumulation() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(TinyTipContract, ());
    let client = TinyTipContractClient::new(&env, &contract_id);

    let creator_wallet = Address::generate(&env);
    let username = String::from_str(&env, "popular_creator");

    client.register_creator(
        &username,
        &String::from_str(&env, "Popular Creator"),
        &String::from_str(&env, "Bio"),
        &creator_wallet,
    );

    let donor1 = Address::generate(&env);
    let donor2 = Address::generate(&env);

    client.send_tip(
        &donor1,
        &username,
        &100_0000000_u128,
        &String::from_str(&env, "Tip 1"),
    );
    client.send_tip(
        &donor2,
        &username,
        &200_0000000_u128,
        &String::from_str(&env, "Tip 2"),
    );
    client.send_tip(
        &donor1,
        &username,
        &50_0000000_u128,
        &String::from_str(&env, "Tip 3"),
    );

    let creators = client.get_creator(&username);
    let creator = creators.get(0).unwrap();

    assert_eq!(creator.total_received, 350_0000000_u128);
    assert_eq!(creator.tip_count, 3);
    assert_eq!(creator.supporter_count, 2); // 2 unique donors

    let recent = client.get_recent_tips();
    assert_eq!(recent.len(), 3);
}
