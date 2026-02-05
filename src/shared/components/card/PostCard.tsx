import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { propsBlog } from "@/types/blog";
import Image from "next/image";

import moment from 'moment';


export default function PostCard({ blog }: propsBlog) {
    return (
        <>
            <div className="flex gap-4 ">
                <div className="w-[340px] h-[258px] rounded-md overflow-hidden relative hidden md:block">
                    <Image
                        src={blog.imageUrl}
                        alt="image post"
                        fill
                        sizes="340px"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <div >
                    <h2 className="text-xl font-bold mb-3 md:w-110.75 w-[351px]">{blog.title}</h2>
                    <div className="flex w-full flex-wrap justify-start gap-2 mb-3">
                        {
                            blog?.tags?.map(m =>
                                <Badge key={m} variant="outline">{m}</Badge>
                            )
                        }
                    </div>
                    <div
                        className="md:w-110.75 w-[341px] line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    <div className="flex gap-4 items-center mt-4">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                                className="grayscale"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{blog.author.name}<span className="text-gray-400 ">.  {moment(blog.createdAt).format('DD MMM YYYY')}</span></p>
                    </div>

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
            </div>
            <hr className="md:w-190 w-full my-6" />
        </>
    )
}