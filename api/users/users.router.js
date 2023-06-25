const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

// Endpoint pour afficher les articles d'un utilisateur (public)
router.get("/:userId/articles", usersController.getUserArticles);

module.exports = router;
