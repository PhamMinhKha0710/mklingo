import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { Courses } from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding database...");

        await db.delete(schema.Courses);
        await db.insert(schema.userProgress);

        await db.insert(schema.Courses).values([
            {
                id: 1,
                title: "English",
                imageSrc: "/images/eg.svg",
            },
            {
                id:2,
                title:"Vietnamese",
                imageSrc: "/images/vn.svg",
            },
            {
                id:3,
                title:"American",
                imageSrc: "/images/america.svg",
            },
            {
                id:4,
                title:"Germany",
                imageSrc: "/images/duc.svg",
            },
        ]);

        console.log("Database seeded finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();

