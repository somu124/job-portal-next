'use server'

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

// Server action in Next js are special fuctions that can be called from the client side and run on the server side. They are used to handle server-side logic, such as database operations, authentication, and other backend tasks, while still being able to interact with the client-side components.

export const registrationAction = async (data:
    { fullName: string; username: string; email: string; password: string; role: "jobSeeker" | "employer"; }
) => {
    // Implementation for registration logic
    try {
        const { fullName, username, email, password, role } = data;

        const [existingUser] = await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, username)));

        if (existingUser) {
            if (existingUser.email === email) {
                return { success: false, message: "Email already exists" };
            } else if (existingUser.userName === username) {
                return { success: false, message: "Username already exists" };
            }
        }



        const hasPassword = await argon2.hash(password); // Hash the password before storing it in the database

        await db.insert(users).values({ 
            name: fullName, userName: username, email, password: hasPassword, role 
        });

        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Registration failed");
    }

};


//  const {fullName, username, email, password, role} = Object.fromEntries(formData.entries());
//     console.log('formData', {fullName, username, email, password, role});




// Note: for password hashing, you can use libraries like bcrypt or argon2 to securely hash passwords before storing them in the database. This is important for security reasons, as storing plain text passwords is a bad practice. npm i argon2


// npm i zod : validation library for TypeScript and JavaScript. It allows you to define schemas for your data and validate that the data conforms to those schemas. Zod is often used for input validation, ensuring that the data received from users or external sources meets certain criteria before processing it further.





