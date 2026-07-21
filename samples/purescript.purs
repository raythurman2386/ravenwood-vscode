-- PureScript sample — comprehensive feature coverage.
-- Highlights: type signature (white), arrows/colons (orange),
-- functions (yellow), strings/types (green), modules (purple).

module Main where

import Prelude
import Data.Maybe (Maybe(..), maybe)
import Effect (Effect)
import Effect.Console (log)

data Role = Admin | User

derive instance eqRole :: Eq Role

type User = { id :: Int, name :: String, roles :: Array Role }

mkUser :: Int -> String -> User
mkUser id name = { id, name, roles: [] }

findUser :: Int -> Array User -> Maybe User
findUser _ [] = Nothing
findUser id (u : rest)
  | u.id == id = Just u
  | otherwise = findUser id rest

saveUser :: User -> Array User -> Array User
saveUser user repo = repo <> [ user ]

main :: Effect Unit
main = do
  let repo = saveUser (mkUser 1 "Alice") []
  let user = findUser 1 repo
  log $ "Found: " <> maybe "none" _.name user