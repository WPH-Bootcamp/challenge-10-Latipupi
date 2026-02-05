import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Menu, X, Search  } from 'lucide-react';
import Link from "next/link";

export function MenuDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        
        <Button variant="ghost"><Menu /></Button>
      </DrawerTrigger>
      <DrawerContent className="!w-screen !max-w-full">
        <DrawerHeader>
            <DrawerTitle className="sr-only">Menu Navigasi</DrawerTitle>
          <DrawerDescription className="sr-only">
            Pilih menu login atau register untuk melanjutkan.
          </DrawerDescription>
          <div className="flex justify-end">
            <DrawerClose asChild>
            <Button variant="ghost"><X /></Button>
          </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col justify-center items-center gap-4">
         <DrawerClose>
            <Link href='/login' className="underline text-primary font-bold text-center">Login</Link>
        </DrawerClose>
        <DrawerClose  >
           <Button className="w-45.5 h-11 rounded-full">
            Register
        </Button>
        </DrawerClose>   
        </div>
      </DrawerContent>
    </Drawer>
  )
}
