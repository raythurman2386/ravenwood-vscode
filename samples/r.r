# R sample — comprehensive feature coverage.
# Highlights: keywords (orange), functions (green), constants (aqua), namespaces (purple).

MAX_RETRIES <- 3

User <- setRefClass("User",
  fields = list(
    id = "numeric",
    name = "character",
    roles = "character"
  ),
  methods = list(
    add_role = function(role) {
      roles <<- c(roles, role)
    }
  )
)

UserRepo <- setRefClass("UserRepo",
  fields = list(cache = "environment"),
  methods = list(
    find = function(id) {
      if (exists(as.character(id), envir = cache)) {
        return(get(as.character(id), envir = cache))
      }
      return(NULL)
    },
    save = function(user) {
      assign(as.character(user$id), user, envir = cache)
    }
  )
)

repo <- UserRepo$new()
repo$save(User$new(id = 1, name = "Alice", roles = character(0)))
user <- repo$find(1)
cat("Found:", if (is.null(user)) "none" else user$name, "\n")