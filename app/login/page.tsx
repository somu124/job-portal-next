"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from "lucide-react";


import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import Link from 'next/link';
import { toast } from '@/components/ui/toast';
import { loginAction } from '@/lib/redux/auth/server/auth.action';

interface loginForm {
    email: string
    password: string
}



const Login: React.FC = () => {
    const [formData, setFormData] = useState<loginForm>({
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState<boolean>(true);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log('formData', formData)
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const loginData = {
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
            }

            const result = await loginAction(loginData);

            if (result.success) {
                toast.add({
                    type: "success",
                    title: "Login Successful",
                    description: result.message,
                });
            } else {
                toast.add({
                    type: "error",
                    title: "Login Failed",
                    description: result.message,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }


    }


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="gap-0.1">
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your details below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-1">
                                <Label htmlFor="email">Email*</Label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={formData.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative flex items-center">
                                    <Input id="password" type={!showPassword ? "text" : "password"} required value={formData.password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> :
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full cursor-pointer">
                                Login Account
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>

            </Card>

        </div>
    )
}

export default Login