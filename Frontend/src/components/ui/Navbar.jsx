import { Menu, School } from "lucide-react";
import React from "react";
import DarkMode from "@/DarkMode";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";

function Navbar() {
  const user = true;
  const role = "instructor";

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800  border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Screen */}
      <div className="max-w-7xl md:mx-28 mx-auto hidden md:flex  justify-between items-center gap-10 h-full ">
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block font-bold text-2xl"> E-Learning </h1>
        </div>
        {/* User Icons And Dark Screen */}
        <div className="flex gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuSeparator />
                {role === "instructor" && (
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline"> Login</Button>
              <Button> Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Screen */}
      <div className="md:hidden flex  items-center h-full justify-between px-4">
        <p className="font-bold text-2xl"> E-Learning </p>
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Navbar;

function MobileNavbar() {
  const role = "instructor";

  return (
    <div className="flex justify-between ">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-slate-300"
          >
            <Menu className="text-black" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle className="font-semibold text-2xl">
              E-Learning
            </SheetTitle>
            <DarkMode />
          </SheetHeader>

          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <span>Log out!</span>
          </nav>

          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
