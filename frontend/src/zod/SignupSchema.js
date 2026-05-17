 import z from "zod";

export const SignupSchema = z.object({
  // name
  name: z
    .string()
    .min(1, { message: 'Enter Your Name' })
    .min(3, { message: 'Name must be at least 3 characters' }),

// email
  email: z
    .string()
    .min(1, { message: 'Enter your Email' })
    .email({ message: 'Invalid Email Format' }),

// password
  password: z
    .string()
    .min(1, { message: 'Enter your Password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});
 