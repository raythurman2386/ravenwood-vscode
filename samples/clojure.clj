;; Clojure sample — comprehensive feature coverage.
;; Highlights: keywords/variables (green), globals (purple), function names (blue).

(ns ravenwood.core
  (:require [clojure.string :as str]))

(def ^:const max-retries 3)

(defrecord User [id name roles])

(defprotocol Repository
  (find-user [repo id])
  (save-user [repo user]))

(defrecord UserRepo [cache]
  Repository
  (find-user [_ id]
    (get @cache id))
  (save-user [_ user]
    (swap! cache assoc (:id user) user)))

(def repo (->UserRepo (atom {})))
(save-user repo (->User 1 "Alice" []))
(let [user (find-user repo 1)]
  (println "Found:" (if user (:name user) "none")))