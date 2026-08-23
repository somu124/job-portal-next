'use server'

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import  argon2  from "argon2";
import { eq } from "drizzle-orm";



type loginData = {
    email: string;
    password: string;
};

export const loginAction = async (data: loginData) => {
    try {
        const { email, password } = data;

        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return { success: false, message: "Invalid Email or password" };
        }


        return { success: true, message: "Login successful", user };
        
    } catch (error) {
        console.error('Error occurred while logging in:', error);
        throw error;
    }
}