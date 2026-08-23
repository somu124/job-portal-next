// import "server-only";
// import mysql2 from "mysql2/promise";
// import { drizzle } from "drizzle-orm/mysql2";

// const pool = mysql2.createPool(process.env.DATABASE_URL as string);

// export const db = drizzle({ client: pool });




import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle({ client: pool });