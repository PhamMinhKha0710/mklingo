import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { courses } from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding database...");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengesOptions);
        await db.delete(schema.challengesProgress);

        await db.insert(schema.courses).values([
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

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, //English
                title: "unit 1",
                description: "Learn the basics of English",
                order: 1,
            },
            {
                id: 2,
                courseId: 1, //English
                title: "unit 2",
                description: "Learn the basics of Toiec",
                order: 2,
            },
            
        ]);
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, //English unit 1
                title: "lesson 1",
                description: "Learn the basics of English",
                order: 1,
            },
            {
                id: 2,
                unitId: 1, //English unit 1
                order: 2,
                title: "Verbs",
                description: "Learn the basics of English",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Adjectives",
                description: "Learn about adjectives and descriptions",
            },
        
            // --- Math unit (unitId = 2) ---
            {
                id: 4,
                unitId: 1,
                order: 1,
                title: "Lesson 1",
                description: "Understand basic arithmetic",
            },
            {
                id: 5,
                unitId: 1,
                order: 2,
                title: "Fractions",
                description: "Learn about fractions and decimals",
            },
            {
                id: 6,
                unitId: 1,
                order: 3,
                title: "Geometry Basics",
                description: "Introduction to shapes and geometry",
            },
        ]);
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, //English lesson 1
                type: "SELECT",
                question: 'Which one of these is the "Man"?"',
                order: 1,
            },
        ]);
        await db.insert(schema.challengesOptions).values([
            {
                id: 1,
                challengeId: 1,
                text: "The Man",
                correct: true,
                imageSrc: "/images/man.svg",
                audioSrc: "/audio/man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                text: "The Woman",
                correct: false,
                imageSrc: "/images/woman.svg",
                audioSrc: "/audio/woman.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                text: "The Robot",
                correct: false,
                imageSrc: "/images/Robot.svg",
                audioSrc: "/audio/robot.mp3",
            },
        ]);
         

        console.log("Database seeded finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();

