import express from "express";
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle, getUniqueTags } from "../controllers/articleController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/tags", protect, getUniqueTags);

router.route("/")
  .get(getArticles)
  .post(protect, createArticle);

router.route("/:id")
    .get(getArticleById)
    .put(protect, updateArticle)
    .delete(protect, deleteArticle);

export default router;
