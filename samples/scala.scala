// Scala sample — comprehensive feature coverage.
// Highlights: package (purple), constants (blue), import (aqua), strings (green),
// classes (yellow), declarations (orange), import (red).

package com.example.ravenwood

import scala.collection.mutable
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

case class User(id: Long, name: String, roles: List[Role] = List.empty)

sealed trait Role
object Admin extends Role
object User extends Role

class UserRepo {
  private val cache = mutable.Map[Long, User]()

  def find(id: Long): Option[User] = cache.get(id)
  def save(user: User): Unit = cache(user.id) = user
}

object Main extends App {
  val repo = new UserRepo
  repo.save(User(1, "Alice"))
  repo.find(1) match {
    case Some(u) => println(s"Found: ${u.name}")
    case None    => println("none")
  }
}