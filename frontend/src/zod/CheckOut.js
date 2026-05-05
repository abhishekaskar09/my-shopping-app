import { z } from "zod";

export const checkoutSchema = z.object({
  street: z.string().trim()
    .min(1, { message: "Enter Your Location..." })
    .min(6, { messagee: "Address is too short" }),

  city: z.string().trim()
    .min(1, { message: "Enter Your city..." })
    .min(3, { message: "City name too short" }),

  pincode: z.string().trim()
    .min(1, { message: "Enter your pincode..." })
    .regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),

  phone: z.string().trim()
    .min(1, { message: "Enter your phone number..." })
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});