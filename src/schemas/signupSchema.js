import { z } from "zod";

export const signUpSchema = z.object({
   name: z
   .string()
   .min(2, { message: "Name must be at least 2 characters long." })
   .max(50, { message: "Name must be less than 50 characters." })
   .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),

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