// F# sample — comprehensive feature coverage.
// Highlights: symbols/unit (white), format specifiers/types (yellow), strings (green),
// sections (blue), attribute functions (purple).

module Ravenwood

open System
open System.Collections.Generic

[<Literal>]
let MaxRetries = 3

type Role = Admin | User

type User = {
    Id: int64
    Name: string
    Roles: Role list
}

module Repo =
    let private cache = Dictionary<int64, User>()

    let find (id: int64) : User option =
        match cache.TryGetValue id with
        | true, u -> Some u
        | false, _ -> None

    let save (user: User) : unit =
        cache[user.Id] <- user

[<EntryPoint>]
let main _ =
    Repo.save { Id = 1L; Name = "Alice"; Roles = [Admin] }
    match Repo.find 1L with
    | Some u -> printfn "Found: %s" u.Name
    | None -> printfn "none"
    0