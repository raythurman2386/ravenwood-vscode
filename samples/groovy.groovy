// Groovy sample — comprehensive feature coverage.
// Highlights: navigation (white), separator (grey), import/package (red),
// def (orange), interpolation/methods (green), import modifiers (aqua), annotation (purple).

package com.example.ravenwood

import groovy.transform.CompileStatic
import java.util.concurrent.*

@CompileStatic
class User {
    Long id
    String name
    List<String> roles = []
}

def repo = new ConcurrentHashMap<User>()
repo[1L] = new User(id: 1L, name: "Alice", roles: ["admin"])
println "Found: ${repo[1L].name}"