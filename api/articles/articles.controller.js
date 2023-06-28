const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const articlesService = require("./articles.service");

class ArtcileController {
  async getAll(req, res, next) {
    try {
      const article = await articlesService.getAll();
      res.json(article);
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.articleId;
      const article = await articlesService.get(id).populate("user", "-password");
      if (!article) {
        throw new NotFoundError();
      }
      res.json(article);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user.tokenData;
      const article = await articlesService.create(req.body, userId);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    const userRole = req.user.tokenData.role;
    try {
      if (userRole != 'admin') {
        throw new UnauthorizedError(); 
      }
      const articleId = req.params.articleId;
      const data = req.body;
      const articleModified = await articlesService.update(articleId, data);
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    const userRole = req.user.tokenData.role;
    try {
      if (userRole !== 'admin') {
        throw new UnauthorizedError(); 
      }
      const articleId = req.params.articleId;
      await articlesService.delete(articleId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = new ArtcileController();
