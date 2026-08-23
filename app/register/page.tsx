"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
import { registrationAction } from './register.action'
import { toast } from "@/components/ui/toast"




interface registrationForm {
    fullName: string
    username: string
    email: string
    password: string
    confirmPassword: string
    role: "jobSeeker" | "employer"
}



const Registration: React.FC = () => {
    const [formData, setFormData] = useState<registrationForm>({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'jobSeeker'
    })
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log('formData', formData)
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registrationData = {
            fullName: formData.fullName.trim(),
            username: formData.username.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            role: formData.role
        }

        if (formData.password !== formData.confirmPassword) return toast.add({
            // type: "warning",
            type: "info",
            title: "Password Mismatch",
            description: "Passwords do not match",
        });

        const resurlt = await registrationAction(registrationData);
        if (resurlt.success) {
            toast.add({
                type: "success",
                title: "Registration Successful",
                description: resurlt.message,
            })
        } else {
            toast.add({
                type: "error",
                title: "Registration Failed",
                description: resurlt.message,
            })
        }

    }


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="gap-0.1">
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link"><Link href="/login">Login</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form id="register-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-1">
                                <Label htmlFor="fullName">Full Name*</Label>
                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={formData.fullName}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fullName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="username">Username*</Label>
                                <div className="relative">
                                    <UserCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="john_doe"
                                        required
                                        value={formData.username}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="email">Email*</Label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={formData.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="role">I Am a*</Label>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onValueChange={(value: "jobSeeker" | "employer" | null) => {
                                        handleInputChange("role", value || "jobSeeker");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="jobSeeker">Job Seeker</SelectItem>
                                        <SelectItem value="employer">Employer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative flex items-center">
                                    <Input id="password" name="password" type={!showPassword ? "text" : "password"} required value={formData.password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)} />
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

                            <div className="grid gap-1">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative flex items-center">

                                    <Input id="confirmPassword" name="confirmPassword"
                                        type={!showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("confirmPassword", e.target.value)} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> :
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                        }
                                    </Button>
                                </div>

                            </div>

                        </div>

                        <Button type="submit" className="w-full cursor-pointer">
                            Create Account
                        </Button>

                    </form>
                </CardContent>
                {/* <CardFooter >
                    <p>cdsjbh</p>
                </CardFooter> */}

            </Card>

        </div>
    )
}

export default Registration












