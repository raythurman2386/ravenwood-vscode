// Java sample — comprehensive feature coverage.
// Highlights: separators (grey), import/package (red), arrow/ternary (orange),
// properties (aqua), wildcard/annotation/module (purple).

package com.example.ravenwood;

import java.util.*;
import java.util.function.*;

public class UserRepo<T extends Comparable<T>> {
    private final Map<Long, T> cache = new HashMap<>();
    private final String name;

    public UserRepo(String name) {
        this.name = name;
    }

    public Optional<T> find(long id) {
        return Optional.ofNullable(cache.get(id));
    }

    public void save(Long id, T item) {
        cache.put(id, item);
    }

    public void process(Function<T, Boolean> predicate) {
        cache.values().stream()
            .filter(predicate::apply)
            .forEach(System.out::println);
    }

    public record Point(int x, int y) {}

    public sealed interface Shape permits Circle, Square {}

    public static void main(String[] args) {
        var repo = new UserRepo<String>("main");
        repo.save(1L, "Alice");
        String result = repo.find(1L).orElse("none");
        System.out.println("Found: " + result);
    }
}