import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema });



const main = async () => {
    try {
        console.log("Resetting database...");
        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengesOptions),
            db.delete(schema.userSubscription),
        ]);

        console.log("Inserting courses...");
        const courses = await db
            .insert(schema.courses)
            .values([
                { title: "Spanish", imageSrc: "/images/es.svg" },
                { title: "French", imageSrc: "/images/fr.svg" },
                { title: "German", imageSrc: "/images/de.svg" },
                { title: "Japanese", imageSrc: "/images/ja.svg" },
                { title: "Korean", imageSrc: "/images/ko.svg" },
            ])
            .returning();

        console.log("Courses inserted successfully");
        console.log("Database reset and seeding completed!");
    } catch (error) {
        console.error("Error resetting database:", error);
        process.exit(1);
    }
    
    process.exit(0);
};

main();

