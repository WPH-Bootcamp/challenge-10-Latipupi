export interface IAuthor {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string[]; 
  imageUrl: string;
  imagePublicId: string;
  createdAt: string; 
  likes: number;
  comments: number;
  author: IAuthor;
}

export interface BlogResponse {
  data: BlogPost[];
  total: number;
  page: number;
  lastPage: number;
  limit?: number;
  hasMore?: boolean;
}

export interface IPostingBody {
  title: string;
  content: string;
  tags: string[];
  image: string;
}