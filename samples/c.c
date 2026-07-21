// C sample — comprehensive feature coverage.
// Highlights: function calls/params (white), dot-access (grey), directives (red),
// pointer-access (orange), members (aqua).

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_RETRIES 3

typedef struct {
    long id;
    char *name;
} User;

User *user_new(long id, const char *name) {
    User *u = malloc(sizeof(User));
    u->id = id;
    u->name = strdup(name);
    return u;
}

static void process(User **users, size_t count) {
    for (size_t i = 0; i < count; i++) {
        if (users[i] != NULL) {
            printf("User %ld: %s\n", users[i]->id, users[i]->name);
        }
    }
}

int main(void) {
    User *u = user_new(1, "Alice");
    User *users[] = { u };
    process(users, 1);
    free(u->name);
    free(u);
    return 0;
}