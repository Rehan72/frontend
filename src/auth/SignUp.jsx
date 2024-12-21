import { Eye, EyeOff, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast
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
import { signUpSchema } from "../schemas/signupSchema";
import { showToast } from "../Utils";



const SignUp = () => {
  const { createUser } = useAuth();
  // Use navigate hook for redirecting
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState("");
  const [password, setPassword] = useState("");
  // Refs to manage form inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef(); // For SignUp

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
    // Password Strength Checker
    const checkPasswordStrength = (password) => {
      if (password.length === 0) return "";
      if (password.length < 6) return "Weak";
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return "Strong";
      }
      return "Medium";
    };
  
    const handlePasswordChange = (e) => {
      const pwd = e.target.value;
      setPassword(pwd);
      setPasswordStrength(checkPasswordStrength(pwd));
    };

  // Handle form submission for both login and signup
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    // Reset any previous errors

    // Gather form data from refs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value

     // Validation
     const formData = {name, email, password };
// Validate form data with Zod schema
const validationResult = signUpSchema.safeParse(formData);

if (!validationResult.success) {
  // Show the first validation error
  const errorMessage = validationResult.error.errors[0]?.message;
  showToast("error", errorMessage || "Validation failed");
  return;
}

setIsLoading(true);

// Simulate an API call
setTimeout(() => {
  setIsLoading(false);
  if (type === "signup") {
    console.log("Creating account with:", formData);
    createUser(formData.name, formData.email, formData.password);
    showToast("success", "User created successfully!");
    navigate("/");
  }
}, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-center">
      <Card className="max-w-md w-full shadow-lg rounded-lg bg-white p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            SignUp
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600">
            Create a account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Enter your name"
              ref={nameRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
                value={password}
              onChange={handlePasswordChange}
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
          {passwordStrength && (
              <p
                className={`text-sm font-medium ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {passwordStrength} Password
              </p>
            )}
        </CardContent>

        {/* Button for Login */}
        <CardFooter className="flex justify-center">
          <Button
            onClick={(e) => handleSubmit(e, "signup")}
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
            Create account
          </Button>
        </CardFooter>
        <CardFooter className="flex justify-center">
          <div className=" text-center text-sm">
          Already have an account?{" "}
          <Link to={'/'} className="underline">
            Login
          </Link>
        </div>
        </CardFooter>
      </Card>

    </div>
  );
};



export default SignUp;
