"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, me, register } from "../services/authService";

import Cookies from 'js-cookie';
import { Profile } from "../types/type";

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
       Cookies.set('auth_token', data.token, { expires: 7, path: '/'})
       router.push("/");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
       Cookies.set('auth_token', data.token, { expires: 7, path: '/'})
       router.push("/login");
    },
  });
}

export const useMe = () => {
  const queryInfo = useQuery<Profile, Error>({
    queryKey: ['me'],
    queryFn: () => me(),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryInfo,
  };
};