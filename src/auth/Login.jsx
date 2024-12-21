import { Eye, EyeOff, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/UseAuth";
import { loginSchema } from "../schemas/loginSchema";
import { showToast } from "../Utils";
const Login = () => {
  const { login } = useAuth();
  // Use navigate hook for redirecting
  const navigate = useNavigate();
  // Refs to manage form inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  // Handle form submission for both login and signup
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    // Reset any previous errors

    // Gather form data from refs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Validation
    const formData = { email, password };

    try {
      // Use Zod to validate the data
      loginSchema.parse(formData);

      setIsLoading(true);

      // Simulate an API call (replace with actual API logic)
      setTimeout(() => {
        setIsLoading(false);
        if (type === "Login") {
          console.log("Logging in with:", { email, password });
          login(email, password);
          showToast("success", "Login Successful!");
          navigate("/dashboard"); // Redirect to dashboard on successful login
        }
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        showToast("error", errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center">
      <Card className="max-w-md w-full shadow-lg rounded-lg bg-white p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            Login
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600">
            Access your account with your credentials.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2 relative">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                ref={passwordRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {passwordVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/* <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              ref={passwordRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}
        </CardContent>

        {/* Button for Login */}
        <CardFooter className="flex justify-center">
          <Button
            onClick={(e) => handleSubmit(e, "Login")}
            className="relative w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader
                className="animate-spin text-white mr-2"
                width={20}
                height={20}
              />
            ) : null}
            Login
          </Button>
        </CardFooter>
        <CardFooter className="flex justify-center">
          <div className="mt-2 text-center text-sm">
            Already don't have an account?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
