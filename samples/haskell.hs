-- Haskell sample — comprehensive feature coverage.
-- Highlights: arrows/colons (orange), storage types (yellow),
-- constants/strings (green), function names (blue), namespace/preprocessor (aqua).

module Ravenwood (process, User(..)) where

import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

data Role = Admin | User deriving (Eq, Show)

data User = User { userId :: Integer, userName :: String, userRoles :: [Role] }
  deriving (Show)

type UserCache = Map Integer User

findUser :: Integer -> UserCache -> Maybe User
findUser id cache = Map.lookup id cache

saveUser :: User -> UserCache -> UserCache
saveUser user cache = Map.insert (userId user) user cache

process :: [User] -> UserCache -> UserCache
process [] cache = cache
process (u:us) cache = process us (saveUser u cache)

main :: IO ()
main = do
  let repo = process [User 1 "Alice" [Admin]] Map.empty
  case findUser 1 repo of
    Just u  -> putStrLn $ "Found: " ++ userName u
    Nothing -> putStrLn "none"