// Swift sample — comprehensive feature coverage.
// Highlights: control (red), storage/operator (orange), types (yellow),
// functions (green), attributes/vars (aqua), classes/constants (purple).

import Foundation

@objc
public protocol Serializable {
    func serialize() -> Data
}

public enum Role: String, CaseIterable {
    case admin = "admin"
    case user = "user"
}

public struct User {
    public let id: Int
    public var name: String
    public var roles: [Role]

    public init(id: Int, name: String) {
        self.id = id
        self.name = name
        self.roles = []
    }

    public mutating func addRole(_ role: Role) {
        roles.append(role)
    }
}

public final class UserRepo {
    private var cache: [Int: User] = [:]

    public func find(_ id: Int) -> User? {
        cache[id]
    }

    public func save(_ user: User) {
        cache[user.id] = user
    }
}

let MAX_RETRIES = 3
var repo = UserRepo()
repo.save(User(id: 1, name: "Alice"))
if let user = repo.find(1) {
    print("Found: \(user.name)")
}