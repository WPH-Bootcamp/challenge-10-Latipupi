import api from '../../../lib/api';
import { BlogResponse, IPostingBody } from "../types/postingType";

export const fetchBlogs = async (page: number): Promise<BlogResponse> => {
  const response = await api.get<BlogResponse>(`/posts/recommended`, {
    params: { page, limit: 10 }
  });
  return response.data;
};

export const fetchMostLiked = async (page: number): Promise<BlogResponse> => {
  const response = await api.get<BlogResponse>(`/posts/most-liked`, {
    params: { page, limit: 10 }
  });
  return response.data;
};


export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const createPost = async (values: IPostingBody) => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("content", values.content);
  
  values.tags.forEach((tag: string) => {
    formData.append("tags", tag.trim());
  });

  if (values.image) {
    formData.append("image", values.image);
  }

  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });

  return response.data;
};