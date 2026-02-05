"use client"
import { useEffect, useState } from "react";
import { useBlogs } from "../hooks/hook";
import PostCard from "@/shared/components/card/PostCard";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Recomended() {
    const [page, setPage] = useState<number>(1);

    const {
        data,
        isLoading,
        isError,
        error,
        isPlaceholderData,
        prefetchNextPage
    } = useBlogs(page);

    console.log(data, "data");
    useEffect(() => {
        if (data && page < data.lastPage) {
            prefetchNextPage(page + 1);
        }
    }, [data, page]);

    const lastPage = data?.lastPage || 1

    if (isLoading) return <div>Memuat artikel...</div>;
    if (isError) return <div>Terjadi kesalahan: {error.message}</div>;

    return (
        <div>
            {data?.data.map((post) => (
                <PostCard blog={post} key={post.id} />
            ))}

            {/* shadcn Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage((p) => Math.max(p - 1, 1));
                            }}
                            // Tambahkan class disabled manual jika di halaman 1
                            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {/* Logika angka halaman sederhana */}
                    {[...Array(lastPage)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <PaginationItem key={pageNum} className="md:inline-block">
                                <PaginationLink
                                    href="#"
                                    isActive={page === pageNum}
                                    className={page === pageNum ? "bg-primary rounded-full text-white hover:bg-blue-400 hover:text-white" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(pageNum);
                                    }}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!isPlaceholderData && page < lastPage) {
                                    setPage((p) => p + 1);
                                }
                            }}
                            className={page >= lastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}