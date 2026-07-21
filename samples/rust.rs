// Rust sample — comprehensive feature coverage for theme inspection.
// Highlights: functions (green), macros (aqua), structs/enums/traits (yellow),
// lifetimes (purple), constants (purple), Self (aqua), type params (purple),
// attributes (purple), operators (orange), control flow (red).

use std::collections::HashMap;
use std::sync::Arc;

const MAX_RETRIES: u32 = 3;

#[derive(Debug, Clone)]
pub struct User {
    id: u64,
    name: String,
    roles: Vec<Role>,
}

impl User {
    pub fn new(id: u64, name: &str) -> Self {
        Self {
            id,
            name: name.to_string(),
            roles: Vec::new(),
        }
    }

    pub fn add_role(&mut self, role: Role) {
        self.roles.push(role);
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Role {
    Admin,
    User,
    Guest,
}

pub trait Repository<T> {
    fn find(&self, id: u64) -> Option<&T>;
    fn save(&mut self, item: T) -> Result<(), String>;
}

pub struct UserRepo<'a> {
    cache: &'a mut HashMap<u64, User>,
}

impl<'a> Repository<User> for UserRepo<'a> {
    fn find(&self, id: u64) -> Option<&User> {
        self.cache.get(&id)
    }

    fn save(&mut self, item: User) -> Result<(), String> {
        self.cache.insert(item.id, item);
        Ok(())
    }
}

fn process_users<T: Repository<User>>(repo: &T) -> u32 {
    let mut count = 0;
    for i in 0..MAX_RETRIES {
        if repo.find(u64::from(i)).is_some() {
            count += 1;
        }
    }
    count
}

macro_rules! assert_role {
    ($user:expr, $role:path) => {
        assert!($user.roles.contains(&$role));
    };
}

fn main() {
    let mut cache: HashMap<u64, User> = HashMap::new();
    let mut repo = UserRepo { cache: &mut cache };
    let alice = User::new(1, "Alice");
    repo.save(alice.clone()).unwrap();
    println!("Saved user: {:?}", alice);
    assert_role!(alice, Role::Admin);
    let arc_user = Arc::new(alice);
    let _ = process_users(&repo);
}