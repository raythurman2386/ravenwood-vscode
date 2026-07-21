// C++ sample — comprehensive feature coverage.
// Highlights: function calls/params (white), dot-access (grey), directives/namespace (red),
// pointer-access/angle brackets (orange), members (aqua), access modifiers (blue).

#include <iostream>
#include <vector>
#include <memory>
#include <optional>

#define MAX_RETRIES 3

namespace ravenwood {

template <typename T>
class Repository {
public:
    virtual std::optional<T> find(long id) const = 0;
    virtual void save(const T &item) = 0;
    virtual ~Repository() = default;
};

struct User {
    long id;
    std::string name;
};

class UserRepo : public Repository<User> {
private:
    std::vector<User> cache;
public:
    std::optional<User> find(long id) const override {
        for (const auto &u : cache) {
            if (u.id == id) return u;
        }
        return std::nullopt;
    }
    void save(const User &item) override {
        cache.push_back(item);
    }
};

} // namespace ravenwood

int main() {
    using namespace ravenwood;
    auto repo = std::make_unique<UserRepo>();
    repo->save({1, "Alice"});
    auto user = repo->find(1);
    if (user) std::cout << "Found: " << user->name << "\n";
    return 0;
}