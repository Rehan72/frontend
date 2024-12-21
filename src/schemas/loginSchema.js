
import { z } from "zod";

// Define the schema for login form validation
export const loginSchema = z.object({
   email: z
   .string()
   .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid email format." }),
 password: z
   .string()
   .min(8, { message: "Password must be at least 8 characters long." })
   .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
     message: "Password must contain at least one letter and one number.",
   }),
});
