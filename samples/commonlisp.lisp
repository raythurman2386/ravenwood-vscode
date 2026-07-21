;;; Common Lisp sample — comprehensive feature coverage.
;; Highlights: meta.function (white), function-type storage (red),
;; constants (green), function names (aqua).

(defpackage ravenwood
  (:use :cl))
(in-package :ravenwood)

(defconstant +max-retries+ 3)

(defclass user ()
  ((id    :reader user-id    :initarg :id)
   (name  :reader user-name  :initarg :name)
   (roles :accessor user-roles :initform '())))

(defun make-user (id name)
  (make-instance 'user :id id :name name))

(defclass user-repo ()
  ((cache :reader repo-cache :initform (make-hash-table))))

(defgeneric find-user (repo id))
(defmethod find-user ((repo user-repo) id)
  (gethash id (repo-cache repo)))

(defgeneric save-user (repo user))
(defmethod save-user ((repo user-repo) (user user))
  (setf (gethash (user-id user) (repo-cache repo)) user))

(defparameter *repo* (make-instance 'user-repo))
(save-user *repo* (make-user 1 "Alice"))
(let ((user (find-user *repo* 1)))
  (format t "Found: ~a~%" (if user (user-name user) "none")))