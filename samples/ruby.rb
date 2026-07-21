# Ruby sample — comprehensive feature coverage.
# Highlights: method with args (white), method separator (grey),
# pseudo-method/variable storage (orange), special methods (green),
# module/constant punctuation (purple), regexp (yellow), constants (blue).

module Ravenwood
  MAX_RETRIES = 3

  class User
    attr_accessor :id, :name, :roles

    def initialize(id, name)
      @id = id
      @name = name
      @roles = []
    end

    def add_role(role)
      @roles << role
    end

    def admin?
      @roles.include?(:admin)
    end
  end

  class UserRepo
    def initialize
      @cache = {}
    end

    def find(id)
      @cache[id]
    end

    def save(user)
      @cache[user.id] = user
    end
  end
end

repo = Ravenwood::UserRepo.new
repo.save(Ravenwood::User.new(1, "Alice"))
user = repo.find(1)
puts "Found: #{user&.name || 'none'}"
pattern = /\A[a-z]+\z/