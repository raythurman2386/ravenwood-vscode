// Dart sample — comprehensive feature coverage.
// Highlights: dot punctuation (grey), primitive storage (orange), support classes (yellow),
// functions/interpolation (green), this keyword (blue), imports/annotations (purple).

import 'dart:collection';

const maxRetries = 3;

enum Role { admin, user }

class User {
  final int id;
  final String name;
  final List<Role> roles;

  User(this.id, this.name, [List<Role>? roles]) : roles = roles ?? [];

  void addRole(Role role) => roles.add(role);
}

class UserRepo {
  final Map<int, User> _cache = HashMap<int, User>();

  User? find(int id) => _cache[id];

  void save(User user) {
    _cache[user.id] = user;
  }

  void process(bool Function(User) predicate) {
    for (final user in _cache.values) {
      if (predicate(user)) {
        print('Found: ${user.name}');
      }
    }
  }
}

@override
String describe(User user) {
  return 'User(${user.id}, ${user.name})';
}

void main() {
  final repo = UserRepo();
  repo.save(User(1, 'Alice'));
  final user = repo.find(1);
  if (user != null) {
    print('Found: ${user.name}');
  } else {
    print('none');
  }
}