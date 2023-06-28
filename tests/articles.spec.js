const request = require("supertest");
const {app} = require("../server");
const config = require("../config");
const jwt = require("jsonwebtoken");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model");

describe('Tester API Articles', () => {
    let token
    const USER_ID = "000000000000000000000000";
    const ARTICLE_ID = "FAKE_ID_ARTICLE"
    const MOCK_DATA = {
            _id: USER_ID,
            name: "ana",
            email: "nfegeg@gmail.com",
            role: "admin"
        };
    const mockArticleCreate = {
            title: "Article Crée",
            content: "Contenu d'un article crée"
        };
    const mockArticleUse = {
        _id: ARTICLE_ID,
        title: "Article existant",
        content: "Contenu de l'article existant",
        userId: USER_ID,
    };
    const mockArticleAfterUpdate = {
        _id: ARTICLE_ID,
        title: "Article modifier",
        content: "Contenu de l'article existant",
        userId: USER_ID,
    };

    beforeEach(() => {
        tokenData = MOCK_DATA;
        token = jwt.sign({tokenData }, config.secretJwtToken);
        mockingoose(Article).toReturn(mockArticleAfterUpdate, 'findOneAndUpdate');
        mockingoose(Article).toReturn(mockArticleUse, 'findOneAndDelete');
        mockingoose(Article).toReturn(mockArticleUse, "find");
        mockingoose(Article).toReturn(mockArticleCreate, "save");
    });

    test("Creation article : POST /api/articles", async () => {
        const res = await request(app).post('/api/articles')
            .set("x-access-token", token)
            .send(mockArticleCreate);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(mockArticleCreate.title);
    });

    
    test("Modification d'un article : PUT /api/articles/:id", async () => {
        const res = await request(app)
            .put(`/api/articles/${mockArticleUse._id}`)
            
            .send(mockArticleAfterUpdate).set("x-access-token", token);
        expect(res.status).toBe(200);
        expect(res.body.title).not.toBe(mockArticleUse.title);
    });

    
    test("Supression d'un article : /api/articles/:id", async () => {
        const res = await request(app)
            .delete(`/api/articles/${mockArticleUse._id}`)
            .set("x-access-token", token);
        expect(res.status).toBe(204);
        expect(res.body).toStrictEqual({});
    });
    
});
