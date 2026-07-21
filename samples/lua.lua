-- Lua sample — comprehensive feature coverage.
-- Highlights: constants (aqua), class names (blue).

local MAX_RETRIES = 3

local User = {}
User.__index = User

function User.new(id, name)
  local self = setmetatable({}, User)
  self.id = id
  self.name = name
  self.roles = {}
  return self
end

function User:add_role(role)
  table.insert(self.roles, role)
end

local UserRepo = {}
UserRepo.__index = UserRepo

function UserRepo.new()
  local self = setmetatable({}, UserRepo)
  self.cache = {}
  return self
end

function UserRepo:find(id)
  return self.cache[id]
end

function UserRepo:save(user)
  self.cache[user.id] = user
end

local repo = UserRepo.new()
repo:save(User.new(1, "Alice"))
local user = repo:find(1)
print("Found: " .. (user and user.name or "none"))