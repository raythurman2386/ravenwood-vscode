# // Python sample — comprehensive feature coverage.
# // Highlights: control flow (red), storage/operators (orange), types/decorators (yellow),
# // functions/magic methods/f-strings (green), constants (aqua), imports (purple).

import asyncio
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class User:
    id: int
    name: str
    roles: List[str] = None

    def __init__(self, id: int, name: str) -> None:
        self.id = id
        self.name = name
        self.roles = []

    def __repr__(self) -> str:
        return f"User(id={self.id}, name={self.name!r}, roles={self.roles})"

    @classmethod
    def from_dict(cls, data: dict) -> "User":
        return cls(data["id"], data["name"])


MAX_RETRIES = 3


def process_items(items: list[int]) -> int:
    count = 0
    for i, item in enumerate(items):
        if item % 2 == 0:
            count += 1
        elif item > 100:
            break
    return count


async def fetch_user(user_id: int) -> Optional[User]:
    await asyncio.sleep(0.1)
    return User(user_id, f"user_{user_id}")


if __name__ == "__main__":
    users = [User.from_dict({"id": i, "name": f"User {i}"}) for i in range(5)]
    print(f"Processed {len(users)} users")
    for u in users:
        print(repr(u))