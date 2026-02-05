import { propsBlog } from "@/types/blog";
import Image from "next/image";

export default function MostLikedCard({ blog }: propsBlog) {
    return (
        <div className="w-74.25 mb-3">
            <div>
                <h2 className="text-xl font-bold mb-3 ">{blog.title}</h2>
                <div
                    className=" line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex gap-4 mt-5 items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/images/like.svg" alt="like" width={20} height={20} />
                        20
                    </div>
                    <div className="flex items-center gap-2">
                        <Image src="/images/comment.svg" alt="like" width={20} height={20} />
                        20
                    </div>
                </div>
            </div>

            <hr className="my-6"/>
        </div>
    )
}