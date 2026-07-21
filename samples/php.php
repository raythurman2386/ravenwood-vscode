<?php
// PHP sample — comprehensive feature coverage.
// Highlights: class operator (white), trait storage (orange),
// constants/namespaces (aqua), import/include/storage (purple).

namespace Ravenwood;

use Ramsey\Uuid\Uuid;

const MAX_RETRIES = 3;

enum Role: string {
    case Admin = 'admin';
    case User = 'user';
}

class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public array $roles = []
    ) {}
}

trait Cacheable {
    protected array $cache = [];
}

class UserRepo {
    use Cacheable;

    public function find(int $id): ?User {
        return $this->cache[$id] ?? null;
    }

    public function save(User $user): void {
        $this->cache[$user->id] = $user;
    }
}

$repo = new UserRepo();
$repo->save(new User(1, 'Alice', [Role::Admin]));
$user = $repo->find(1);
echo "Found: " . ($user?->name ?? 'none') . "\n";
?>