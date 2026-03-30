import { Request, Response, NextFunction } from "express";
import Article from "../models/articleModel";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", "name email");

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create an article
// @route   POST /api/articles
// @access  Private
export const createArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, description, tags } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: "Please add a title and content" });
      return;
    }

    const article = await Article.create({
      title,
      content,
      description,
      tags,
      author: req.user._id,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private
export const updateArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, description, tags } = req.body;

    const article = await Article.findById(req.params.id);

    if (article) {
      // Check if user is the author
      if (article.author.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "Not authorized to update this article" });
        return;
      }

      article.title = title || article.title;
      article.content = content || article.content;
      article.description = description || article.description;
      article.tags = tags || article.tags;

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private
export const deleteArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      // Check if user is the author
      if (article.author.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "Not authorized to delete this article" });
        return;
      }

      await article.deleteOne();
      res.json({ message: "Article removed" });
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    next(error);
  }
};
