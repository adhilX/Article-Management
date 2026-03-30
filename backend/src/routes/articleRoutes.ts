import express from "express";
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from "../controllers/articleController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(getArticles)
  .post(protect, createArticle);

router.route("/:id")
  .get(getArticleById)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

export default router;
