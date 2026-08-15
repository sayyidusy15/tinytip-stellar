#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vec,
};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct CreatorProfile {
    pub username: String,
    pub name: String,
    pub bio: String,
    pub wallet: Address,
    pub total_received: u128,
    pub supporter_count: u64,
    pub tip_count: u64,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct TipRecord {
    pub id: u64,
    pub donor: Address,
    pub creator_username: String,
    pub amount: u128,
    pub message: String,
    pub timestamp: u64,
}

// Storage keys
const CREATORS: Symbol = symbol_short!("CREATORS");
const TIPS: Symbol = symbol_short!("TIPS");

#[contract]
pub struct TinyTipContract;

#[contractimpl]
impl TinyTipContract {
    /// Register a new creator profile on-chain
    pub fn register_creator(
        env: Env,
        username: String,
        name: String,
        bio: String,
        wallet: Address,
    ) -> String {
        wallet.require_auth();

        let mut creators: Vec<CreatorProfile> = env
            .storage()
            .instance()
            .get(&CREATORS)
            .unwrap_or(Vec::new(&env));

        // Check if username already registered
        for i in 0..creators.len() {
            let existing = creators.get(i).unwrap();
            if existing.username == username {
                return String::from_str(&env, "Username already registered");
            }
        }

        let new_creator = CreatorProfile {
            username,
            name,
            bio,
            wallet,
            total_received: 0,
            supporter_count: 0,
            tip_count: 0,
        };

        creators.push_back(new_creator);
        env.storage().instance().set(&CREATORS, &creators);

        String::from_str(&env, "Creator registered successfully")
    }

    /// Send a micro-tip to a registered creator
    pub fn send_tip(
        env: Env,
        donor: Address,
        creator_username: String,
        amount: u128,
        message: String,
    ) -> String {
        donor.require_auth();

        let mut creators: Vec<CreatorProfile> = env
            .storage()
            .instance()
            .get(&CREATORS)
            .unwrap_or(Vec::new(&env));

        let mut found = false;
        let mut target_index: u32 = 0;

        for i in 0..creators.len() {
            let c = creators.get(i).unwrap();
            if c.username == creator_username {
                found = true;
                target_index = i;
                break;
            }
        }

        if !found {
            return String::from_str(&env, "Creator not found");
        }

        let mut creator = creators.get(target_index).unwrap();

        // Check if donor is a new supporter for this creator
        let mut tips: Vec<TipRecord> = env
            .storage()
            .instance()
            .get(&TIPS)
            .unwrap_or(Vec::new(&env));

        let mut is_new_supporter = true;
        for i in 0..tips.len() {
            let tip = tips.get(i).unwrap();
            if tip.creator_username == creator_username && tip.donor == donor {
                is_new_supporter = false;
                break;
            }
        }

        // Update creator stats
        creator.total_received = creator.total_received.saturating_add(amount);
        creator.tip_count = creator.tip_count.saturating_add(1);
        if is_new_supporter {
            creator.supporter_count = creator.supporter_count.saturating_add(1);
        }

        creators.set(target_index, creator);
        env.storage().instance().set(&CREATORS, &creators);

        // Record the tip
        let timestamp = env.ledger().timestamp();
        let tip_record = TipRecord {
            id: env.prng().gen::<u64>(),
            donor: donor.clone(),
            creator_username: creator_username.clone(),
            amount,
            message,
            timestamp,
        };

        tips.push_back(tip_record);
        env.storage().instance().set(&TIPS, &tips);

        // Emit Contract Event
        env.events().publish(
            (symbol_short!("TIP"), creator_username),
            (donor, amount, timestamp),
        );

        String::from_str(&env, "Tip sent successfully")
    }

    /// Retrieve a creator profile by username
    pub fn get_creator(env: Env, username: String) -> Vec<CreatorProfile> {
        let creators: Vec<CreatorProfile> = env
            .storage()
            .instance()
            .get(&CREATORS)
            .unwrap_or(Vec::new(&env));

        let mut result = Vec::new(&env);
        for i in 0..creators.len() {
            let c = creators.get(i).unwrap();
            if c.username == username {
                result.push_back(c);
                break;
            }
        }
        result
    }

    /// Retrieve all registered creators
    pub fn get_all_creators(env: Env) -> Vec<CreatorProfile> {
        env.storage()
            .instance()
            .get(&CREATORS)
            .unwrap_or(Vec::new(&env))
    }

    /// Retrieve recent tip records
    pub fn get_recent_tips(env: Env) -> Vec<TipRecord> {
        env.storage()
            .instance()
            .get(&TIPS)
            .unwrap_or(Vec::new(&env))
    }
}

mod test;
