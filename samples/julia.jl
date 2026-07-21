# Julia sample — comprehensive feature coverage.
# Highlights: import/export (red), storage modifiers (orange), constants (aqua), macros (purple).

module Ravenwood

import Base: show
using DataStructures: OrderedDict

export User, UserRepo, find_user, save_user

const MAX_RETRIES = 3

mutable struct User
    id::Int
    name::String
    roles::Vector{Symbol}
end

User(id::Int, name::String) = User(id, name, Symbol[])

struct UserRepo
    cache::OrderedDict{Int, User}
    UserRepo() = new(OrderedDict{Int, User}())
end

function find_user(repo::UserRepo, id::Int)::Union{User, Nothing}
    return get(repo.cache, id, nothing)
end

function save_user(repo::UserRepo, user::User)
    repo.cache[user.id] = user
end

@inline function process(users::Vector{User})
    count = 0
    for u in users
        save_user(repo, u)
        count += 1
    end
    count
end

end

using .Ravenwood
const repo = UserRepo()
save_user(repo, User(1, "Alice"))
user = find_user(repo, 1)
println("Found: ", user === nothing ? "none" : user.name)