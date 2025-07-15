import { object, string, TypeOf, z } from "zod"

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
    }),
})

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            message: "Email is required",
        }).email("Email is invalid"),
    }),
})

export const logoutSchema = object({
    body: object({
        token: string({
            message: "Token is required",
        }),
    }),
})

export const resetPasswordSchema = object({
    params: object({
        resetToken: string(),
    }),
    body: object({
        password: string({
            message: "Password is required",
        }).min(8, "Password must be more than 8 characters"),
    }),
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(1),
    }),
})

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string(),
    }),
})
