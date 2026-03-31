import api from "./api";

export interface ArticleData {
  title: string;
  description?: string;
  content: string;
  tags?: string[];
}

export const getArticles = async (params: { search?: string; tag?: string; page?: number; limit?: number } = {}) => {
  const response = await api.get("/articles", { params });
  return response.data;
};

export const getArticleById = async (id: string) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (articleData: ArticleData) => {
  const response = await api.post("/articles", articleData);
  return response.data;
};

export const updateArticle = async (id: string, articleData: ArticleData) => {
  const response = await api.put(`/articles/${id}`, articleData);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};

export const getTags = async () => {
  const response = await api.get("/articles/tags");
  return response.data;
};
