import { Button } from "@/components/ui/button";
import Image from "next/image";
import InputInputGroup from "../input-group/InputGroup";
import { Search } from "lucide-react";
import Link from "next/link";
import { MenuDrawer } from "../drawer/MenuDrawer";

import { cookies } from 'next/headers';
import { Profile } from "@/features/auth/components/Profile";

import { PenLine } from "lucide-react";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  return (
    <nav className="flex items-center justify-between bg-gray-50 py-5 px-4 sm:px-6 lg:px-25 border-b mb-5">
      <div>
        <Link href={'/'}>
            <Image src="/images/logo.svg" alt="Logo" width={120} height={40} />
        </Link>
      </div>
      <div className="w-100 hidden md:block">
        <InputInputGroup 
          icon={<Search />}
          iconALign="inline-start"
          />
      </div>
      {
        !token ?
        <>
        <div className="hidden md:block">
        <Link href='/login' className="underline text-primary mr-8 font-bold">Login </Link>
        <Button className="w-45.5 h-11 rounded-full">
            Register
        </Button>
      </div>
      <div className="flex md:hidden items-center">
        <Button variant="ghost">
          <Search />
        </Button>
        <MenuDrawer />
      </div>
        </> : 
        <div className="flex gap-6 items-center">
           <Link href='/create-posting' className="underline text-primary mr-8 font-bold flex items-center gap-2"><PenLine/> Write Post</Link>
           <Profile />
        </div>
        
      }
      
    </nav>
  );
}
