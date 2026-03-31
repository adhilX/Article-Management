import { Request, Response, NextFunction } from "express";
import Article from "../models/articleModel";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const tag = req.query.tag as string;

    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    const total = await Article.countDocuments(query);
    const articles = await Article.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
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

    const tagsArray = Array.isArray(tags) ? tags : [];

    const article = await Article.create({
      title,
      content,
      description,
      tags: tagsArray,
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
      if (tags !== undefined) {
        article.tags = Array.isArray(tags) ? tags : [];
      }

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

// @desc    Get all unique tags for the logged-in user
// @route   GET /api/articles/tags
// @access  Private
export const getUniqueTags = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await Article.aggregate([
      { $match: { author: req.user._id } },
      { $unwind: "$tags" },
      { $group: { _id: { $toLower: "$tags" } } },
      { $sort: { _id: 1 } },
    ]);

    const tags = result.map((item) => item._id);
    res.json(tags);
  } catch (error) {
    next(error);
  }
};
