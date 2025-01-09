import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Link, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "@/Redux/Features/Api/authApi";
import { toast } from "sonner";

function Navbar() {
  const user = true;
  const role = "instructor";
  const navigate = useNavigate();

  const [LogOutUser, { data, isLoading, isSuccess, isError, error }] =
    useLogOutUserMutation();

  const logOutHandler = () => {
    LogOutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout  Succesfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800  border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Screen */}
      <div className="max-w-6xl mx-auto hidden md:flex  justify-between items-center gap-10 h-full ">
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
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="@shadcn"
                  />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* My Learning BUtton */}
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>

                  {/* Edit Profile Button */}
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* Alert for Logout */}
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <p className="text-red-800 text-sm ml-2">Logout</p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you Sure, You want to Logout?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logOutHandler}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>

                {/* Dashboard button for when we are instructor*/}
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
  const user = true;
  const role = "instructor";
  const navigate = useNavigate();

  const [LogOutUser, { data, isLoading, isSuccess, isError, error }] =
    useLogOutUserMutation();

  const logOutHandler = () => {
    LogOutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout  Succesfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      {user && (
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
                <Link to="my-learning">
                  <span>My Learning</span>
                </Link>
                <Link to="profile">
                  <span>Edit Profile</span>
                </Link>

                {/* Logout Alert modal */}
                <AlertDialog className="rounded-full">
                  <AlertDialogTrigger>
                    <p className="text-red-800 text-base text-left">Logout</p>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-left">
                        Confirm Logout
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-left">
                        Are you Sure, You want to Logout?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-row gap-2 items-end">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={logOutHandler}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
      )}
    </>
  );
}
