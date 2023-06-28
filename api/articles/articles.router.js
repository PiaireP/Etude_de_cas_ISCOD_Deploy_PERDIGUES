const express = require("express");
const articleController = require("./articles.controller");
const router = express.Router();

// Création d'un article
router.post("/", articleController.create);

// Mise à jour d'un article
router.put("/:articleId", articleController.update);

// Suppression d'un article
router.delete("/:articleId", articleController.delete);

// Get Article
router.get("/:articleId", articleController.getById);
router.get("/", articleController.getAll);

module.exports = router;
