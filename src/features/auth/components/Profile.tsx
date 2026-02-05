"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMe } from "../hooks/hooks";
import { useRouter } from "next/navigation"

import Cookies from "js-cookie"
import { toast } from "sonner";

export function Profile() {
    const router = useRouter();

    const {
        data,
    } = useMe();

    const logout = () => {
        Cookies.remove("auth_token")
        localStorage.removeItem("user-data")
        toast.success("Logged out successfully")
        router.push("/")
        router.refresh()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src={data?.avatarUrl} alt="shadcn" />
                        <AvatarFallback>UL</AvatarFallback>
                    </Avatar>
                    {data?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={()=> logout()}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
