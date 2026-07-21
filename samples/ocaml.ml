(* OCaml sample — comprehensive feature coverage.
   Highlights: value-signature type (white), keywords (orange), variant constants (aqua). *)

module type Repository = sig
  type t
  val find : int -> t option
  val save : t -> unit
end

type role = Admin | User

type user = {
  id : int;
  name : string;
  roles : role list;
}

module UserRepo = struct
  let cache = Hashtbl.create 16

  let find id =
    try Some (Hashtbl.find cache id)
    with Not_found -> None

  let save user =
    Hashtbl.replace cache user.id user
end

let () =
  UserRepo.save { id = 1; name = "Alice"; roles = [Admin] };
  match UserRepo.find 1 with
  | Some u -> Printf.printf "Found: %s\n" u.name
  | None   -> Printf.printf "none\n"