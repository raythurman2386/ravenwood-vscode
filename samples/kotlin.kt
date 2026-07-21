// Kotlin sample — comprehensive feature coverage.
// Highlights: import (red), storage (orange), constants (aqua), package/annotation (purple).

package com.example.ravenwood

import kotlinx.coroutines.*
import java.util.*

const val MAX_RETRIES = 3

data class User(
    val id: Long,
    val name: String,
    val roles: List<Role> = emptyList()
)

enum class Role { ADMIN, USER }

@OptIn(ExperimentalStdlibApi::class)
class UserRepo {
    private val cache = mutableMapOf<Long, User>()

    suspend fun find(id: Long): User? {
        delay(10)
        return cache[id]
    }

    fun save(user: User) {
        cache[user.id] = user
    }
}

fun main() = runBlocking {
    val repo = UserRepo()
    repo.save(User(1, "Alice", listOf(Role.ADMIN)))
    val user = repo.find(1)
    println("Found: ${user?.name ?: "none"}")
}