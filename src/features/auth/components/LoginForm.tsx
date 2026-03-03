"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"



import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useLogin } from "../hooks/hooks"
import Link from "next/link"


const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export function LoginForm() {
    const { mutate, isPending, error } = useLogin();
    console.log(error, 'error login');
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate(data, {
            onError: () => {
                toast.error("Login failed. Please check your credentials.");
            },
        });
    }

     if (error) {
        console.log('masuk error');
        toast.error("An unexpected error occurred. Please try again later.");
    }

    return (
        <div className="w-90 max-w-md mx-auto">
            <div className="rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold  mb-6">Sign In</h1>
                <form id="form-rhf-email" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        className="p-4 h-12 rounded-xl"
                                        id="form-rhf-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        className="p-4 h-12 rounded-xl"
                                        id="form-rhf-password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your password"
                                        autoComplete="off"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground  h-12 rounded-full"
                            disabled={isPending}>
                            Login
                        </Button>

                        <p className="text-center">Don't have an account? <span className="text-primary cursor-pointer font-bold"><Link href="/register">Register</Link></span></p>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}