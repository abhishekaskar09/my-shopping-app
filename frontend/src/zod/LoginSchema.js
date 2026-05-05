import  z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1,{message:'Enter Your Email'})
    .email("Invalid Email Formate" ),

  password: z
    .string()
    .min(1,{message:'Enter Your Password'})
    .min(6, "Password must be at least 6 characters"),
});

