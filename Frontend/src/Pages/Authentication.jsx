import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/Redux/Features/Api/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  //! we use [] for mutation and {} for query
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const resetForms = () => {
    setLoginInput({ password: "", email: "" });
    setSignupInput({ username: "", password: "", email: "" });
  };

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputdata = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;

    // Avoid submitting empty fields
    if (
      !inputdata.email ||
      !inputdata.password ||
      (type === "signup" && !inputdata.username)
    ) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      await action(inputdata);
    } catch (err) {
      console.error("Error occurred:", err);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "User Signup Successfull");

    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "User Login Successfull");
      navigate("/");
    }

    if (registerError) {
      toast.error(registerError?.data?.message || "User Signup Failed");
    }

    if (loginError) {
      toast.error(loginError?.data?.message || "User login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);
  return (
    <div className="flex justify-center mt-20">
      <Tabs
        defaultValue="login"
        onValueChange={resetForms}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After Signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  type="email"
                  required
                  placeholder="xyz@gmail.com"
                  onChange={(e) => {
                    changeInputHandler(e, "login");
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  type="password"
                  required
                  placeholder="xyz"
                  onChange={(e) => {
                    changeInputHandler(e, "login");
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account and Click on Sign Up when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  value={signupInput.username}
                  type="text"
                  placeholder="xyz"
                  required
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  type="email"
                  required
                  placeholder="xyz@gmail.com"
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  type="password"
                  required
                  placeholder="xyz"
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
