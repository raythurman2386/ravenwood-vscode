// TypeScript sample — comprehensive feature coverage.
// Highlights: module types (white), type annotations (grey), directives (green),
// types/interfaces/classes (aqua), storage (orange), import/export/namespace (purple).

import { ConfigurationChangeEvent, workspace, window } from "vscode";
import type { Configuration } from "./interface";
import { getPalette } from "./palette";
import * as fs from "node:fs";

const MAX_RETRIES = 3;
const DEBUG_MODE: boolean = false;

export interface User {
  id: number;
  name: string;
  roles: string[];
}

export enum Role {
  Admin = "admin",
  User = "user",
}

export class UserRepo<T extends { id: number }> {
  private cache: Map<number, T> = new Map();

  constructor(private readonly name: string = "default") {}

  find(id: number): T | undefined {
    return this.cache.get(id);
  }

  save(item: T): void {
    this.cache.set(item.id, item);
  }

  async *iterate(): AsyncGenerator<T> {
    for (const item of this.cache.values()) {
      yield item;
    }
  }
}

namespace Config {
  export const DEFAULTS = { retries: MAX_RETRIES, debug: DEBUG_MODE };
}

function process<T>(items: T[], fn: (item: T) => void): void {
  for (const item of items) {
    fn(item);
  }
}

const repo = new UserRepo<User>("main");
repo.save({ id: 1, name: "Alice", roles: [Role.Admin] });
console.log(`Found: ${repo.find(1)?.name ?? "none"}`);