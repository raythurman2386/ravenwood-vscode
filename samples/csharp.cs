// C# sample — comprehensive feature coverage.
// Highlights: using (red), types/escapes (yellow), strings (green), properties (aqua), namespace (purple).

using System;
using System.Collections.Generic;

namespace Ravenwood;

public enum Role { Admin, User }

public class User
{
    public long Id { get; init; }
    public string Name { get; set; }
    public List<Role> Roles { get; } = new();

    public User(long id, string name)
    {
        Id = id;
        Name = name;
    }
}

public interface IRepository<T> where T : class
{
    T? Find(long id);
    void Save(T item);
}

public class UserRepo : IRepository<User>
{
    private readonly Dictionary<long, User> _cache = new();

    public User? Find(long id) => _cache.TryGetValue(id, out var u) ? u : null;
    public void Save(User item) => _cache[item.Id] = item;
}

class Program
{
    static void Main()
    {
        var repo = new UserRepo();
        repo.Save(new User(1, "Alice"));
        Console.WriteLine($"Found: {repo.Find(1)?.Name ?? "none"}");
    }
}