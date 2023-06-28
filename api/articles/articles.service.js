const Article = require("./articles.model");
// const bcrypt = require("bcrypt");

class ArticleService {
  getAll() {
    return Article.find();
  }
  get(id) {
    return Article.findById(id);
  }
  create(data, userId) {
    data.user = userId;
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
  async getUserArticles(userId) {
    // const articles = await Article.find({ user: userId }).select("-password");
    const articles = await Article.find({ user: userId })
    .select("-user.password")
    .populate("user", "-password");
  return articles;
  }
}

module.exports = new ArticleService();
