// JavaScript sample — comprehensive feature coverage.
// Highlights: unquoted strings (white), accessors/separators (grey),
// jsdoc tags (red), storage types (orange).

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string[]} roles
 */

const MAX_RETRIES = 3;
let debugMode = false;
var globalCache = {};

class UserRepo {
  constructor(name = "default") {
    this.cache = new Map();
    this.name = name;
  }

  find(id) {
    return this.cache.get(id);
  }

  save(item) {
    this.cache.set(item.id, item);
  }
}

const arrow = (a, b) => a + b;
const asyncFn = async (items) => {
  for (const item of items) {
    await Promise.resolve(item);
  }
};

const repo = new UserRepo("main");
repo.save({ id: 1, name: "Alice", roles: ["admin"] });
console.log(`Found: ${repo.find(1)?.name ?? "none"}`);
export { UserRepo, MAX_RETRIES };
export default arrow;