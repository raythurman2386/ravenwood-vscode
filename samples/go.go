// Go sample — comprehensive feature coverage including generics (Go 1.18+).
// Highlights: control/package/import (red), var/const/func/struct/interface (orange),
// type names (yellow), functions (green), package/import names (aqua), constants (purple).

package main

import (
	"fmt"
	"sync"
)

const MaxConnections = 100

type Role string

const (
	Admin Role = "admin"
	User  Role = "user"
)

type User struct {
	ID    int64
	Name  string
	Roles []Role
}

func NewUser(id int64, name string) *User {
	return &User{
		ID:    id,
		Name:  name,
		Roles: []Role{},
	}
}

func (u *User) AddRole(role Role) {
	u.Roles = append(u.Roles, role)
}

type Repository[T any] interface {
	Find(id int64) (*T, error)
	Save(item T) error
}

type UserRepo struct {
	mu    sync.Mutex
	cache map[int64]*User
}

func (r *UserRepo) Find(id int64) (*User, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if u, ok := r.cache[id]; ok {
		return u, nil
	}
	return nil, fmt.Errorf("user not found: %d", id)
}

func (r *UserRepo) Save(item *User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.cache[item.ID] = item
	return nil
}

func process[T any](items []T, fn func(T)) {
	for _, item := range items {
		fn(item)
	}
}

func main() {
	ch := make(chan *User, MaxConnections)
	go func() {
		u := NewUser(1, "Alice")
		u.AddRole(Admin)
		ch <- u
	}()
	if u := <-ch; u != nil {
		fmt.Printf("Got user: %v\n", u)
	}
}