# CoffeeScript sample — comprehensive feature coverage.
# Highlights: function storage (orange).

MAX_RETRIES = 3

class User
  constructor: (@id, @name) ->
    @roles = []

  addRole: (role) -> @roles.push role

class UserRepo
  constructor: ->
    @cache = {}

  find: (id) -> @cache[id]
  save: (user) -> @cache[user.id] = user

repo = new UserRepo()
repo.save(new User(1, "Alice"))
user = repo.find(1)
console.log "Found: #{user?.name ? 'none'}"