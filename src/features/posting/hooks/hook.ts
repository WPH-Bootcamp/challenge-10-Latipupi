"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogResponse } from '../types/postingType';
import { createPost, fetchBlogs, fetchMostLiked } from '../services/postingService';
import { useRouter } from 'next/navigation';

export const useBlogs = (page: number) => {
  const queryClient = useQueryClient();

  const queryInfo = useQuery<BlogResponse, Error>({
    queryKey: ['blogs', page],
    queryFn: () => fetchBlogs(page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ['blogs', nextPage],
      queryFn: () => fetchBlogs(nextPage),
    });
  };

  return {
    ...queryInfo,
    prefetchNextPage,
  };
};

export const useMostLiked = (page: number) => {
  const queryClient = useQueryClient();

  const queryInfo = useQuery<BlogResponse, Error>({
    queryKey: ['mostliked', page],
    queryFn: () => fetchMostLiked(page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ['mostliked', nextPage],
      queryFn: () => fetchMostLiked(nextPage),
    });
  };

  return {
    ...queryInfo,
    prefetchNextPage,
  };
};

export function useCreatePosting() {
  const router = useRouter();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
       router.push("/");
    },
  });
}