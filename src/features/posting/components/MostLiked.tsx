"use client"
import { useEffect, useState } from "react";
import { useMostLiked } from "../hooks/hook";
import MostLikedCard from "@/shared/components/card/MostLikedCard";

export default function MostLiked() {
    const [page, setPage] = useState<number>(1);
    
    const {
        data,
        isLoading,
        isError,
        error,
        prefetchNextPage
    } = useMostLiked(page);

    useEffect(() => {
        if (data && page < data.lastPage) {
            prefetchNextPage(page + 1);
        }
    }, [data, page]);

    if (isLoading) return <div>Memuat artikel...</div>;
    if (isError) return <div>Terjadi kesalahan: {error.message}</div>;

    return (
        <div>
            {data?.data.map((post) => (
                <MostLikedCard blog={post} key={post.id}  />
            ))}
        </div>
    )
}