import { LogOut, LucideLogOut, Menu, School, User2 } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { LogoutUser } from "@/Redux/Features/authSlice";
import avatarWeb from "../../assets/user.png";

function Navbar() {
  const userdata = useSelector((state) => state.auth);
  const isAuth = userdata?.isAuthenticated;
  const role = userdata?.user?.role;

  const avatar = userdata.user?.avatar || null;
  console.log("avatar", avatar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LogOutUser, { data, isSuccess }] = useLogOutUserMutation();

  const logOutHandler = () => {
    dispatch(LogoutUser);
    LogOutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout  Succesfully");
      window.location.reload();
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800  border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Screen */}
      <div className="max-w-6xl mx-auto  hidden md:flex  justify-between items-center gap-10 h-full px-3">
        <Link to="/">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="hidden md:block font-se text-2xl font-serif">
              Learnify
            </h1>
          </div>
        </Link>

        {/* User Icons And Dark Screen */}
        <div className="flex gap-5">
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={avatar || avatarWeb} alt="@shadcn" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* My Learning BUtton */}

                  <Link to="my-learning">
                    <DropdownMenuItem>My Learning </DropdownMenuItem>
                  </Link>

                  {/* Edit Profile Button */}

                  <Link to="profile">
                    <DropdownMenuItem>Edit Profile </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* Alert for Logout */}
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger className="flex my-auto mx-auto px-2 gap-36  text-red-800">
                      <p className="text-red-800 text-sm ">Logout</p>
                      <LucideLogOut className="" size={18} />
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
                  <Link to="/admin/dashboard">
                    <DropdownMenuItem className="bg-blue-500 flex justify-center font-semibold text-sm">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}> Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Screen */}
      <div className="md:hidden flex  items-center h-full justify-between px-4">
        <Link to="/">
          <p className="font-bold text-2xl font-serif"> Learnify</p>
        </Link>
        <MobileNavbar user={userdata} />
      </div>
    </div>
  );
}

export default Navbar;

function MobileNavbar({ user }) {
  const isAuth = user?.isAuthenticated;
  const role = user?.user?.role;
  // console.log("role", role);

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
      {isAuth && (
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
                <SheetTitle className="font-semibold font-serif text-2xl">
                  Learnify
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
                    <Button
                      type="submit"
                      onClick={() => {
                        navigate("/admin/dashboard");
                      }}
                    >
                      Dashboard
                    </Button>
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
