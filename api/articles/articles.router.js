const express = require("express");
const articleController = require("./articles.controller");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");

// router.get("/", usersController.getAll);
// router.get("/:id", usersController.getById);
// router.post("/", usersController.create);
// router.put("/:id", usersController.update);
// router.delete("/:id", usersController.delete);

// Création d'un article
router.post("/", authMiddleware, articleController.create);

// Mise à jour d'un article
router.put("/:articleId", articleController.update);

// Suppression d'un article
router.delete("/:articleId", articleController.delete);

// Get Article
router.get("/:articleId", articleController.getById);
router.get("/", articleController.getAll);

module.exports = router;
