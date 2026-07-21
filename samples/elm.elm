module Main exposing (..)

-- Elm sample — comprehensive feature coverage.
-- Highlights: period keyword (white), storage types (yellow).

import Html exposing (Html, text, div)
import Dict exposing (Dict)


type Role
    = Admin
    | User


type alias User =
    { id : Int, name : String, roles : List Role }


type alias UserRepo =
    Dict Int User


findUser : Int -> UserRepo -> Maybe User
findUser id repo =
    Dict.get id repo


saveUser : User -> UserRepo -> UserRepo
saveUser user repo =
    Dict.insert user.id user repo


main : Html msg
main =
    let
        repo =
            saveUser (User 1 "Alice" [ Admin ]) Dict.empty

        user =
            findUser 1 repo
    in
    div []
        [ text <|
            "Found: "
                ++ (Maybe.map .name user |> Maybe.withDefault "none")
        ]