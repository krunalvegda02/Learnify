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
import { useState } from "react";

const Authentication = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const resetForms = () => {
    setLoginInput({ password: "", email: "" });
    setSignupInput({ username: "", password: "", email: "" });
  };

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    // console.log("e.target", e.target);

    // [] is not associated to array..in this context they are taking value of name otherwise name will literally kept name as a value
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = (type) => {
    const inputdata = type === "signup" ? signupInput : loginInput;
    console.log("inputdata", inputdata);
  };

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
              <Button onClick={() => handleRegistration("login")}>Login</Button>
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
                <Label htmlFor="username">username</Label>
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
              <Button onClick={() => handleRegistration("signup")}>
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
