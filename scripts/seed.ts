import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    // Xóa theo thứ tự: bảng con -> bảng cha để tránh lỗi FK
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.courses);

    // Courses
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "English",
        imageSrc: "/images/eg.svg",
      },
      {
        id: 2,
        title: "Vietnamese",
        imageSrc: "/images/vn.svg",
      },
      {
        id: 3,
        title: "American",
        imageSrc: "/images/america.svg",
      },
      {
        id: 4,
        title: "Germany",
        imageSrc: "/images/duc.svg",
      },
    ]);

    // Units
    await db.insert(schema.units).values([
      // English Course Units
      {
        id: 1,
        courseId: 1, // English
        title: "unit 1",
        description: "Learn the basics of English",
        order: 1,
      },
      {
        id: 2,
        courseId: 1, // English
        title: "unit 2",
        description: "Learn the basics of TOEIC",
        order: 2,
      },

      // Vietnamese Course Units
      {
        id: 3,
        courseId: 2, // Vietnamese
        title: "Bài 1",
        description: "Học tiếng Việt cơ bản",
        order: 1,
      },
      {
        id: 4,
        courseId: 2, // Vietnamese
        title: "Bài 2",
        description: "Từ vựng tiếng Việt nâng cao",
        order: 2,
      },

      // American Course Units
      {
        id: 5,
        courseId: 3, // American
        title: "Unit 1",
        description: "American English Basics",
        order: 1,
      },
      {
        id: 6,
        courseId: 3, // American
        title: "Unit 2",
        description: "American Slang & Culture",
        order: 2,
      },

      // Germany Course Units
      {
        id: 7,
        courseId: 4, // Germany
        title: "Einheit 1",
        description: "Grundlagen der deutschen Sprache",
        order: 1,
      },
      {
        id: 8,
        courseId: 4, // Germany
        title: "Einheit 2",
        description: "Deutsche Grammatik",
        order: 2,
      },
    ]);

    // Lessons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // English unit 1
        title: "lesson 1",
        description: "Learn the basics of English",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // English unit 1
        order: 2,
        title: "Verbs",
        description: "Learn the basics of English verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Adjectives",
        description: "Learn about adjectives and descriptions",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Family",
        description: "Words about family members",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Animals",
        description: "Common animal names",
      },
      {
        id: 6,
        unitId: 1,
        order: 6,
        title: "Food",
        description: "Common food vocabulary",
      },

      // Unit 2 - TOEIC Vocabulary Lessons
      {
        id: 7,
        unitId: 2,
        order: 1,
        title: "Marketing",
        description: "Essential marketing vocabulary for TOEIC",
      },
      {
        id: 8,
        unitId: 2,
        order: 2,
        title: "Business & Contracts",
        description: "Business and contract-related terms",
      },
      {
        id: 9,
        unitId: 2,
        order: 3,
        title: "Finance & Banking",
        description: "Financial and banking vocabulary",
      },
      {
        id: 10,
        unitId: 2,
        order: 4,
        title: "Employment",
        description: "Job and recruitment vocabulary",
      },
      {
        id: 11,
        unitId: 2,
        order: 5,
        title: "Technology",
        description: "Technology and communication terms",
      },
      {
        id: 12,
        unitId: 2,
        order: 6,
        title: "Travel",
        description: "Travel and transportation vocabulary",
      },

      // Vietnamese Course - Unit 3 Lessons
      {
        id: 13,
        unitId: 3,
        order: 1,
        title: "Chào hỏi",
        description: "Cách chào hỏi cơ bản",
      },
      {
        id: 14,
        unitId: 3,
        order: 2,
        title: "Gia đình",
        description: "Từ vựng về gia đình",
      },
      {
        id: 15,
        unitId: 3,
        order: 3,
        title: "Số đếm",
        description: "Học đếm số từ 1-100",
      },

      // Vietnamese Course - Unit 4 Lessons
      {
        id: 16,
        unitId: 4,
        order: 1,
        title: "Thời tiết",
        description: "Từ vựng về thời tiết",
      },
      {
        id: 17,
        unitId: 4,
        order: 2,
        title: "Đồ ăn",
        description: "Tên các món ăn Việt Nam",
      },

      // American Course - Unit 5 Lessons
      {
        id: 18,
        unitId: 5,
        order: 1,
        title: "Greetings",
        description: "American greetings and introductions",
      },
      {
        id: 19,
        unitId: 5,
        order: 2,
        title: "Numbers",
        description: "American number system",
      },
      {
        id: 20,
        unitId: 5,
        order: 3,
        title: "Colors",
        description: "American color vocabulary",
      },

      // American Course - Unit 6 Lessons
      {
        id: 21,
        unitId: 6,
        order: 1,
        title: "Slang",
        description: "Common American slang",
      },
      {
        id: 22,
        unitId: 6,
        order: 2,
        title: "Idioms",
        description: "Popular American idioms",
      },

      // Germany Course - Unit 7 Lessons
      {
        id: 23,
        unitId: 7,
        order: 1,
        title: "Begrüßungen",
        description: "German greetings",
      },
      {
        id: 24,
        unitId: 7,
        order: 2,
        title: "Zahlen",
        description: "German numbers",
      },
      {
        id: 25,
        unitId: 7,
        order: 3,
        title: "Farben",
        description: "German colors",
      },

      // Germany Course - Unit 8 Lessons
      {
        id: 26,
        unitId: 8,
        order: 1,
        title: "Verben",
        description: "Common German verbs",
      },
      {
        id: 27,
        unitId: 8,
        order: 2,
        title: "Adjektive",
        description: "German adjectives",
      },
    ]);

    // Challenges (questions)
    await db.insert(schema.challenges).values([
      // Lesson 1 challenges
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one of these is the "Man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        imageSrc: "/images/mascot.svg",
        question: 'Which picture shows someone "running"?',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one is "happy"?',
        order: 3,
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one is the "Mother"?',
        order: 4,
      },
      {
        id: 5,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one is a "Dog"?',
        order: 5,
      },
      {
        id: 6,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one is "Apple"?',
        order: 6,
      },

      // Lesson 2 challenges (Verbs)
      {
        id: 7,
        lessonId: 2,
        type: "SELECT",
        question: 'Which picture shows someone "eating"?',
        order: 1,
      },
      {
        id: 8,
        lessonId: 2,
        type: "SELECT",
        question: 'Which picture shows someone "sleeping"?',
        order: 2,
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        question: 'Which picture shows someone "reading"?',
        order: 3,
      },
      {
        id: 10,
        lessonId: 2,
        type: "SELECT",
        question: 'Which picture shows someone "writing"?',
        order: 4,
      },
      {
        id: 11,
        lessonId: 2,
        type: "SELECT",
        question: 'Which picture shows someone "drinking"?',
        order: 5,
      },

      // Lesson 7 - Marketing (10 words)
      {
        id: 12,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "consumer" mean?',
        order: 1,
      },
      {
        id: 13,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "strategy" mean?',
        order: 2,
      },
      {
        id: 14,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "brand" mean?',
        order: 3,
      },
      {
        id: 15,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "competition" mean?',
        order: 4,
      },
      {
        id: 16,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "target" mean?',
        order: 5,
      },
      {
        id: 17,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "campaign" mean?',
        order: 6,
      },
      {
        id: 18,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "promote" mean?',
        order: 7,
      },
      {
        id: 19,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "survey" mean?',
        order: 8,
      },
      {
        id: 20,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "launch" mean?',
        order: 9,
      },
      {
        id: 21,
        lessonId: 7,
        type: "SELECT",
        question: 'What does "competitor" mean?',
        order: 10,
      },

      // Lesson 8 - Business & Contracts (10 words)
      {
        id: 22,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "contract" mean?',
        order: 1,
      },
      {
        id: 23,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "negotiate" mean?',
        order: 2,
      },
      {
        id: 24,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "agreement" mean?',
        order: 3,
      },
      {
        id: 25,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "proposal" mean?',
        order: 4,
      },
      {
        id: 26,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "deadline" mean?',
        order: 5,
      },
      {
        id: 27,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "partnership" mean?',
        order: 6,
      },
      {
        id: 28,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "clause" mean?',
        order: 7,
      },
      {
        id: 29,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "obligation" mean?',
        order: 8,
      },
      {
        id: 30,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "terminate" mean?',
        order: 9,
      },
      {
        id: 31,
        lessonId: 8,
        type: "SELECT",
        question: 'What does "vendor" mean?',
        order: 10,
      },

      // Lesson 9 - Finance & Banking (10 words)
      {
        id: 32,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "invoice" mean?',
        order: 1,
      },
      {
        id: 33,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "budget" mean?',
        order: 2,
      },
      {
        id: 34,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "revenue" mean?',
        order: 3,
      },
      {
        id: 35,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "expense" mean?',
        order: 4,
      },
      {
        id: 36,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "profit" mean?',
        order: 5,
      },
      {
        id: 37,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "interest" mean?',
        order: 6,
      },
      {
        id: 38,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "deposit" mean?',
        order: 7,
      },
      {
        id: 39,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "withdraw" mean?',
        order: 8,
      },
      {
        id: 40,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "transaction" mean?',
        order: 9,
      },
      {
        id: 41,
        lessonId: 9,
        type: "SELECT",
        question: 'What does "balance" mean?',
        order: 10,
      },

      // Lesson 10 - Employment (10 words)
      {
        id: 42,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "recruit" mean?',
        order: 1,
      },
      {
        id: 43,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "applicant" mean?',
        order: 2,
      },
      {
        id: 44,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "resume" mean?',
        order: 3,
      },
      {
        id: 45,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "salary" mean?',
        order: 4,
      },
      {
        id: 46,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "benefit" mean?',
        order: 5,
      },
      {
        id: 47,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "position" mean?',
        order: 6,
      },
      {
        id: 48,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "qualify" mean?',
        order: 7,
      },
      {
        id: 49,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "experience" mean?',
        order: 8,
      },
      {
        id: 50,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "hire" mean?',
        order: 9,
      },
      {
        id: 51,
        lessonId: 10,
        type: "SELECT",
        question: 'What does "resign" mean?',
        order: 10,
      },

      // Lesson 11 - Technology (10 words)
      {
        id: 52,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "software" mean?',
        order: 1,
      },
      {
        id: 53,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "update" mean?',
        order: 2,
      },
      {
        id: 54,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "install" mean?',
        order: 3,
      },
      {
        id: 55,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "network" mean?',
        order: 4,
      },
      {
        id: 56,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "device" mean?',
        order: 5,
      },
      {
        id: 57,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "access" mean?',
        order: 6,
      },
      {
        id: 58,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "download" mean?',
        order: 7,
      },
      {
        id: 59,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "upload" mean?',
        order: 8,
      },
      {
        id: 60,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "database" mean?',
        order: 9,
      },
      {
        id: 61,
        lessonId: 11,
        type: "SELECT",
        question: 'What does "password" mean?',
        order: 10,
      },

      // Lesson 12 - Travel (10 words)
      {
        id: 62,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "destination" mean?',
        order: 1,
      },
      {
        id: 63,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "reservation" mean?',
        order: 2,
      },
      {
        id: 64,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "itinerary" mean?',
        order: 3,
      },
      {
        id: 65,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "departure" mean?',
        order: 4,
      },
      {
        id: 66,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "arrival" mean?',
        order: 5,
      },
      {
        id: 67,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "luggage" mean?',
        order: 6,
      },
      {
        id: 68,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "delay" mean?',
        order: 7,
      },
      {
        id: 69,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "accommodation" mean?',
        order: 8,
      },
      {
        id: 70,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "passenger" mean?',
        order: 9,
      },
      {
        id: 71,
        lessonId: 12,
        type: "SELECT",
        question: 'What does "cancel" mean?',
        order: 10,
      },

      // Vietnamese Course - Lesson 13 (Chào hỏi)
      {
        id: 72,
        lessonId: 13,
        type: "SELECT",
        question: 'How do you say "Hello" in Vietnamese?',
        order: 1,
      },
      {
        id: 73,
        lessonId: 13,
        type: "SELECT",
        question: 'How do you say "Goodbye" in Vietnamese?',
        order: 2,
      },
      {
        id: 74,
        lessonId: 13,
        type: "SELECT",
        question: 'How do you say "Thank you" in Vietnamese?',
        order: 3,
      },

      // Vietnamese Course - Lesson 14 (Gia đình)
      {
        id: 75,
        lessonId: 14,
        type: "SELECT",
        question: 'What is "Mother" in Vietnamese?',
        order: 1,
      },
      {
        id: 76,
        lessonId: 14,
        type: "SELECT",
        question: 'What is "Father" in Vietnamese?',
        order: 2,
      },
      {
        id: 77,
        lessonId: 14,
        type: "SELECT",
        question: 'What is "Sister" in Vietnamese?',
        order: 3,
      },

      // Vietnamese Course - Lesson 15 (Số đếm)
      {
        id: 78,
        lessonId: 15,
        type: "SELECT",
        question: 'What is "One" in Vietnamese?',
        order: 1,
      },
      {
        id: 79,
        lessonId: 15,
        type: "SELECT",
        question: 'What is "Ten" in Vietnamese?',
        order: 2,
      },

      // American Course - Lesson 18 (Greetings)
      {
        id: 80,
        lessonId: 18,
        type: "SELECT",
        question: 'Which is a casual American greeting?',
        order: 1,
      },
      {
        id: 81,
        lessonId: 18,
        type: "SELECT",
        question: 'How do Americans typically say goodbye?',
        order: 2,
      },
      {
        id: 82,
        lessonId: 18,
        type: "SELECT",
        question: 'What does "What\'s up?" mean?',
        order: 3,
      },

      // American Course - Lesson 19 (Numbers)
      {
        id: 83,
        lessonId: 19,
        type: "SELECT",
        question: 'How do you write 100 in words?',
        order: 1,
      },
      {
        id: 84,
        lessonId: 19,
        type: "SELECT",
        question: 'What is 1,000 in words?',
        order: 2,
      },

      // American Course - Lesson 21 (Slang)
      {
        id: 85,
        lessonId: 21,
        type: "SELECT",
        question: 'What does "cool" mean in slang?',
        order: 1,
      },
      {
        id: 86,
        lessonId: 21,
        type: "SELECT",
        question: 'What does "sick" mean in slang?',
        order: 2,
      },
      {
        id: 87,
        lessonId: 21,
        type: "SELECT",
        question: 'What does "dude" mean?',
        order: 3,
      },

      // Germany Course - Lesson 23 (Begrüßungen)
      {
        id: 88,
        lessonId: 23,
        type: "SELECT",
        question: 'How do you say "Hello" in German?',
        order: 1,
      },
      {
        id: 89,
        lessonId: 23,
        type: "SELECT",
        question: 'How do you say "Good morning" in German?',
        order: 2,
      },
      {
        id: 90,
        lessonId: 23,
        type: "SELECT",
        question: 'How do you say "Goodbye" in German?',
        order: 3,
      },

      // Germany Course - Lesson 24 (Zahlen)
      {
        id: 91,
        lessonId: 24,
        type: "SELECT",
        question: 'What is "One" in German?',
        order: 1,
      },
      {
        id: 92,
        lessonId: 24,
        type: "SELECT",
        question: 'What is "Five" in German?',
        order: 2,
      },
      {
        id: 93,
        lessonId: 24,
        type: "SELECT",
        question: 'What is "Ten" in German?',
        order: 3,
      },

      // Germany Course - Lesson 26 (Verben)
      {
        id: 94,
        lessonId: 26,
        type: "SELECT",
        question: 'What does "essen" mean?',
        order: 1,
      },
      {
        id: 95,
        lessonId: 26,
        type: "SELECT",
        question: 'What does "trinken" mean?',
        order: 2,
      },
      {
        id: 96,
        lessonId: 26,
        type: "SELECT",
        question: 'What does "schlafen" mean?',
        order: 3,
      },
    ]);

    // Challenges options
    await db.insert(schema.challengesOptions).values([
      // challenge 1 (Man)
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
        imageSrc: "/images/robot.svg",
        audioSrc: "/audio/robot.mp3",
      },

      // challenge 2 (Running)
      {
        id: 4,
        challengeId: 2,
        text: "A person running",
        correct: true,
        imageSrc: "/images/running.svg",
        audioSrc: "/audio/running.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        text: "A person sitting",
        correct: false,
        imageSrc: "/images/sitting.svg",
        audioSrc: "/audio/sitting.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        text: "A person sleeping",
        correct: false,
        imageSrc: "/images/sleeping.svg",
        audioSrc: "/audio/sleeping.mp3",
      },

      // challenge 3 (Happy)
      {
        id: 7,
        challengeId: 3,
        text: "A smiling face",
        correct: true,
        imageSrc: "/images/happy.svg",
        audioSrc: "/audio/happy.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        text: "A crying face",
        correct: false,
        imageSrc: "/images/sad.svg",
        audioSrc: "/audio/sad.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        text: "A angry face",
        correct: false,
        imageSrc: "/images/neutral.svg",
        audioSrc: "/audio/neutral.mp3",
      },

      // challenge 4 (Mother)
      {
        id: 10,
        challengeId: 4,
        text: "Mother",
        correct: true,
        imageSrc: "/images/mother.svg",
        audioSrc: "/audio/mother.mp3",
      },
      {
        id: 11,
        challengeId: 4,
        text: "zombie",
        correct: false,
        imageSrc: "/images/zombie.svg",
        audioSrc: "/audio/zombie.mp3",
      },
      {
        id: 12,
        challengeId: 4,
        text: "Brother",
        correct: false,
        imageSrc: "/images/brother.svg",
        audioSrc: "/audio/brother.mp3",
      },

      // challenge 5 (Dog)
      {
        id: 13,
        challengeId: 5,
        text: "Dog",
        correct: true,
        imageSrc: "/images/dog.svg",
        audioSrc: "/audio/dog.mp3",
      },
      {
        id: 14,
        challengeId: 5,
        text: "Cat",
        correct: false,
        imageSrc: "/images/cat.svg",
        audioSrc: "/audio/cat.mp3",
      },
      {
        id: 15,
        challengeId: 5,
        text: "Bird",
        correct: false,
        imageSrc: "/images/bird.svg",
        audioSrc: "/audio/bird.mp3",
      },

      // challenge 6 (Apple)
      {
        id: 16,
        challengeId: 6,
        text: "Apple",
        correct: true,
        imageSrc: "/images/apple.svg",
        audioSrc: "/audio/apple.mp3",
      },
      {
        id: 17,
        challengeId: 6,
        text: "Banana",
        correct: false,
        imageSrc: "/images/banana.svg",
        audioSrc: "/audio/banana.mp3",
      },
      {
        id: 18,
        challengeId: 6,
        text: "Orange",
        correct: false,
        imageSrc: "/images/orange.svg",
        audioSrc: "/audio/orange.mp3",
      },

      // challenge 7 (Eating)
      {
        id: 19,
        challengeId: 7,
        text: "A person eating",
        correct: true,
        imageSrc: "/images/eating.svg",
        audioSrc: "/audio/eating.mp3",
      },
      {
        id: 20,
        challengeId: 7,
        text: "A person drinking",
        correct: false,
        imageSrc: "/images/drinking.svg",
        audioSrc: "/audio/drinking.mp3",
      },
      {
        id: 21,
        challengeId: 7,
        text: "A person cooking",
        correct: false,
        imageSrc: "/images/cooking.svg",
        audioSrc: "/audio/cooking.mp3",
      },

      // challenge 8 (Sleeping)
      {
        id: 22,
        challengeId: 8,
        text: "A person sleeping",
        correct: true,
        imageSrc: "/images/sleeping.svg",
        audioSrc: "/audio/sleeping.mp3",
      },
      {
        id: 23,
        challengeId: 8,
        text: "A person sitting",
        correct: false,
        imageSrc: "/images/sitting.svg",
        audioSrc: "/audio/sitting.mp3",
      },
      {
        id: 24,
        challengeId: 8,
        text: "A person standing",
        correct: false,
        imageSrc: "/images/standing.svg",
        audioSrc: "/audio/standing.mp3",
      },

      // challenge 9 (Reading)
      {
        id: 25,
        challengeId: 9,
        text: "A person reading",
        correct: true,
        imageSrc: "/images/reading.svg",
        audioSrc: "/audio/reading.mp3",
      },
      {
        id: 26,
        challengeId: 9,
        text: "A person writing",
        correct: false,
        imageSrc: "/images/writing.svg",
        audioSrc: "/audio/writing.mp3",
      },
      {
        id: 27,
        challengeId: 9,
        text: "A person drawing",
        correct: false,
        imageSrc: "/images/drawing.svg",
        audioSrc: "/audio/drawing.mp3",
      },

      // challenge 10 (Writing)
      {
        id: 28,
        challengeId: 10,
        text: "A person writing",
        correct: true,
        imageSrc: "/images/writing.svg",
        audioSrc: "/audio/writing.mp3",
      },
      {
        id: 29,
        challengeId: 10,
        text: "A person typing",
        correct: false,
        imageSrc: "/images/typing.svg",
        audioSrc: "/audio/typing.mp3",
      },
      {
        id: 30,
        challengeId: 10,
        text: "A person reading",
        correct: false,
        imageSrc: "/images/reading.svg",
        audioSrc: "/audio/reading.mp3",
      },

      // challenge 11 (Drinking)
      {
        id: 31,
        challengeId: 11,
        text: "A person drinking",
        correct: true,
        imageSrc: "/images/drinking.svg",
        audioSrc: "/audio/drinking.mp3",
      },
      {
        id: 32,
        challengeId: 11,
        text: "A person eating",
        correct: false,
        imageSrc: "/images/eating.svg",
        audioSrc: "/audio/eating.mp3",
      },
      {
        id: 33,
        challengeId: 11,
        text: "A person pouring",
        correct: false,
        imageSrc: "/images/pouring.svg",
        audioSrc: "/audio/pouring.mp3",
      },

      // Lesson 7 - Marketing Options
      // Challenge 12: consumer
      {
        id: 34,
        challengeId: 12,
        text: "Người tiêu dùng",
        correct: true,
      },
      {
        id: 35,
        challengeId: 12,
        text: "Người bán hàng",
        correct: false,
      },
      {
        id: 36,
        challengeId: 12,
        text: "Nhà sản xuất",
        correct: false,
      },

      // Challenge 13: strategy
      {
        id: 37,
        challengeId: 13,
        text: "Chiến lược",
        correct: true,
      },
      {
        id: 38,
        challengeId: 13,
        text: "Chiến thuật",
        correct: false,
      },
      {
        id: 39,
        challengeId: 13,
        text: "Chiến dịch",
        correct: false,
      },

      // Challenge 14: brand
      {
        id: 40,
        challengeId: 14,
        text: "Thương hiệu",
        correct: true,
      },
      {
        id: 41,
        challengeId: 14,
        text: "Sản phẩm",
        correct: false,
      },
      {
        id: 42,
        challengeId: 14,
        text: "Nhãn hiệu",
        correct: false,
      },

      // Challenge 15: competition
      {
        id: 43,
        challengeId: 15,
        text: "Sự cạnh tranh",
        correct: true,
      },
      {
        id: 44,
        challengeId: 15,
        text: "Sự hợp tác",
        correct: false,
      },
      {
        id: 45,
        challengeId: 15,
        text: "Sự kinh doanh",
        correct: false,
      },

      // Challenge 16: target
      {
        id: 46,
        challengeId: 16,
        text: "Mục tiêu",
        correct: true,
      },
      {
        id: 47,
        challengeId: 16,
        text: "Đối tượng",
        correct: false,
      },
      {
        id: 48,
        challengeId: 16,
        text: "Khách hàng",
        correct: false,
      },

      // Challenge 17: campaign
      {
        id: 49,
        challengeId: 17,
        text: "Chiến dịch",
        correct: true,
      },
      {
        id: 50,
        challengeId: 17,
        text: "Chương trình",
        correct: false,
      },
      {
        id: 51,
        challengeId: 17,
        text: "Dự án",
        correct: false,
      },

      // Challenge 18: promote
      {
        id: 52,
        challengeId: 18,
        text: "Quảng bá",
        correct: true,
      },
      {
        id: 53,
        challengeId: 18,
        text: "Bán hàng",
        correct: false,
      },
      {
        id: 54,
        challengeId: 18,
        text: "Sản xuất",
        correct: false,
      },

      // Challenge 19: survey
      {
        id: 55,
        challengeId: 19,
        text: "Khảo sát",
        correct: true,
      },
      {
        id: 56,
        challengeId: 19,
        text: "Phỏng vấn",
        correct: false,
      },
      {
        id: 57,
        challengeId: 19,
        text: "Nghiên cứu",
        correct: false,
      },

      // Challenge 20: launch
      {
        id: 58,
        challengeId: 20,
        text: "Ra mắt",
        correct: true,
      },
      {
        id: 59,
        challengeId: 20,
        text: "Phát hành",
        correct: false,
      },
      {
        id: 60,
        challengeId: 20,
        text: "Giới thiệu",
        correct: false,
      },

      // Challenge 21: competitor
      {
        id: 61,
        challengeId: 21,
        text: "Đối thủ cạnh tranh",
        correct: true,
      },
      {
        id: 62,
        challengeId: 21,
        text: "Đối tác",
        correct: false,
      },
      {
        id: 63,
        challengeId: 21,
        text: "Khách hàng",
        correct: false,
      },

      // Lesson 8 - Business & Contracts Options
      // Challenge 22: contract
      {
        id: 64,
        challengeId: 22,
        text: "Hợp đồng",
        correct: true,
      },
      {
        id: 65,
        challengeId: 22,
        text: "Thỏa thuận",
        correct: false,
      },
      {
        id: 66,
        challengeId: 22,
        text: "Giao dịch",
        correct: false,
      },

      // Challenge 23: negotiate
      {
        id: 67,
        challengeId: 23,
        text: "Đàm phán",
        correct: true,
      },
      {
        id: 68,
        challengeId: 23,
        text: "Thương lượng",
        correct: false,
      },
      {
        id: 69,
        challengeId: 23,
        text: "Tranh luận",
        correct: false,
      },

      // Challenge 24: agreement
      {
        id: 70,
        challengeId: 24,
        text: "Thỏa thuận",
        correct: true,
      },
      {
        id: 71,
        challengeId: 24,
        text: "Hợp đồng",
        correct: false,
      },
      {
        id: 72,
        challengeId: 24,
        text: "Cam kết",
        correct: false,
      },

      // Challenge 25: proposal
      {
        id: 73,
        challengeId: 25,
        text: "Đề xuất",
        correct: true,
      },
      {
        id: 74,
        challengeId: 25,
        text: "Kế hoạch",
        correct: false,
      },
      {
        id: 75,
        challengeId: 25,
        text: "Dự án",
        correct: false,
      },

      // Challenge 26: deadline
      {
        id: 76,
        challengeId: 26,
        text: "Thời hạn",
        correct: true,
      },
      {
        id: 77,
        challengeId: 26,
        text: "Hạn chót",
        correct: false,
      },
      {
        id: 78,
        challengeId: 26,
        text: "Ngày cuối",
        correct: false,
      },

      // Challenge 27: partnership
      {
        id: 79,
        challengeId: 27,
        text: "Quan hệ đối tác",
        correct: true,
      },
      {
        id: 80,
        challengeId: 27,
        text: "Công ty",
        correct: false,
      },
      {
        id: 81,
        challengeId: 27,
        text: "Hợp tác",
        correct: false,
      },

      // Challenge 28: clause
      {
        id: 82,
        challengeId: 28,
        text: "Điều khoản",
        correct: true,
      },
      {
        id: 83,
        challengeId: 28,
        text: "Mệnh đề",
        correct: false,
      },
      {
        id: 84,
        challengeId: 28,
        text: "Quy định",
        correct: false,
      },

      // Challenge 29: obligation
      {
        id: 85,
        challengeId: 29,
        text: "Nghĩa vụ",
        correct: true,
      },
      {
        id: 86,
        challengeId: 29,
        text: "Trách nhiệm",
        correct: false,
      },
      {
        id: 87,
        challengeId: 29,
        text: "Cam kết",
        correct: false,
      },

      // Challenge 30: terminate
      {
        id: 88,
        challengeId: 30,
        text: "Chấm dứt",
        correct: true,
      },
      {
        id: 89,
        challengeId: 30,
        text: "Kết thúc",
        correct: false,
      },
      {
        id: 90,
        challengeId: 30,
        text: "Hủy bỏ",
        correct: false,
      },

      // Challenge 31: vendor
      {
        id: 91,
        challengeId: 31,
        text: "Nhà cung cấp",
        correct: true,
      },
      {
        id: 92,
        challengeId: 31,
        text: "Người bán",
        correct: false,
      },
      {
        id: 93,
        challengeId: 31,
        text: "Đại lý",
        correct: false,
      },

      // Lesson 9 - Finance & Banking Options
      // Challenge 32: invoice
      {
        id: 94,
        challengeId: 32,
        text: "Hóa đơn",
        correct: true,
      },
      {
        id: 95,
        challengeId: 32,
        text: "Biên lai",
        correct: false,
      },
      {
        id: 96,
        challengeId: 32,
        text: "Phiếu thu",
        correct: false,
      },

      // Challenge 33: budget
      {
        id: 97,
        challengeId: 33,
        text: "Ngân sách",
        correct: true,
      },
      {
        id: 98,
        challengeId: 33,
        text: "Dự toán",
        correct: false,
      },
      {
        id: 99,
        challengeId: 33,
        text: "Kinh phí",
        correct: false,
      },

      // Challenge 34: revenue
      {
        id: 100,
        challengeId: 34,
        text: "Doanh thu",
        correct: true,
      },
      {
        id: 101,
        challengeId: 34,
        text: "Thu nhập",
        correct: false,
      },
      {
        id: 102,
        challengeId: 34,
        text: "Lợi nhuận",
        correct: false,
      },

      // Challenge 35: expense
      {
        id: 103,
        challengeId: 35,
        text: "Chi phí",
        correct: true,
      },
      {
        id: 104,
        challengeId: 35,
        text: "Phí tổn",
        correct: false,
      },
      {
        id: 105,
        challengeId: 35,
        text: "Giá thành",
        correct: false,
      },

      // Challenge 36: profit
      {
        id: 106,
        challengeId: 36,
        text: "Lợi nhuận",
        correct: true,
      },
      {
        id: 107,
        challengeId: 36,
        text: "Doanh thu",
        correct: false,
      },
      {
        id: 108,
        challengeId: 36,
        text: "Thu nhập",
        correct: false,
      },

      // Challenge 37: interest
      {
        id: 109,
        challengeId: 37,
        text: "Lãi suất",
        correct: true,
      },
      {
        id: 110,
        challengeId: 37,
        text: "Tiền lãi",
        correct: false,
      },
      {
        id: 111,
        challengeId: 37,
        text: "Quan tâm",
        correct: false,
      },

      // Challenge 38: deposit
      {
        id: 112,
        challengeId: 38,
        text: "Gửi tiền",
        correct: true,
      },
      {
        id: 113,
        challengeId: 38,
        text: "Đặt cọc",
        correct: false,
      },
      {
        id: 114,
        challengeId: 38,
        text: "Tiền gửi",
        correct: false,
      },

      // Challenge 39: withdraw
      {
        id: 115,
        challengeId: 39,
        text: "Rút tiền",
        correct: true,
      },
      {
        id: 116,
        challengeId: 39,
        text: "Rút lui",
        correct: false,
      },
      {
        id: 117,
        challengeId: 39,
        text: "Thu hồi",
        correct: false,
      },

      // Challenge 40: transaction
      {
        id: 118,
        challengeId: 40,
        text: "Giao dịch",
        correct: true,
      },
      {
        id: 119,
        challengeId: 40,
        text: "Chuyển khoản",
        correct: false,
      },
      {
        id: 120,
        challengeId: 40,
        text: "Thanh toán",
        correct: false,
      },

      // Challenge 41: balance
      {
        id: 121,
        challengeId: 41,
        text: "Số dư",
        correct: true,
      },
      {
        id: 122,
        challengeId: 41,
        text: "Cân bằng",
        correct: false,
      },
      {
        id: 123,
        challengeId: 41,
        text: "Tổng số",
        correct: false,
      },

      // Lesson 10 - Employment Options
      // Challenge 42: recruit
      {
        id: 124,
        challengeId: 42,
        text: "Tuyển dụng",
        correct: true,
      },
      {
        id: 125,
        challengeId: 42,
        text: "Thuê",
        correct: false,
      },
      {
        id: 126,
        challengeId: 42,
        text: "Tìm kiếm",
        correct: false,
      },

      // Challenge 43: applicant
      {
        id: 127,
        challengeId: 43,
        text: "Ứng viên",
        correct: true,
      },
      {
        id: 128,
        challengeId: 43,
        text: "Nhân viên",
        correct: false,
      },
      {
        id: 129,
        challengeId: 43,
        text: "Người xin việc",
        correct: false,
      },

      // Challenge 44: resume
      {
        id: 130,
        challengeId: 44,
        text: "Sơ yếu lý lịch",
        correct: true,
      },
      {
        id: 131,
        challengeId: 44,
        text: "Hồ sơ",
        correct: false,
      },
      {
        id: 132,
        challengeId: 44,
        text: "CV",
        correct: false,
      },

      // Challenge 45: salary
      {
        id: 133,
        challengeId: 45,
        text: "Lương",
        correct: true,
      },
      {
        id: 134,
        challengeId: 45,
        text: "Thu nhập",
        correct: false,
      },
      {
        id: 135,
        challengeId: 45,
        text: "Tiền công",
        correct: false,
      },

      // Challenge 46: benefit
      {
        id: 136,
        challengeId: 46,
        text: "Phúc lợi",
        correct: true,
      },
      {
        id: 137,
        challengeId: 46,
        text: "Lợi ích",
        correct: false,
      },
      {
        id: 138,
        challengeId: 46,
        text: "Quyền lợi",
        correct: false,
      },

      // Challenge 47: position
      {
        id: 139,
        challengeId: 47,
        text: "Vị trí",
        correct: true,
      },
      {
        id: 140,
        challengeId: 47,
        text: "Chức vụ",
        correct: false,
      },
      {
        id: 141,
        challengeId: 47,
        text: "Công việc",
        correct: false,
      },

      // Challenge 48: qualify
      {
        id: 142,
        challengeId: 48,
        text: "Đủ điều kiện",
        correct: true,
      },
      {
        id: 143,
        challengeId: 48,
        text: "Phù hợp",
        correct: false,
      },
      {
        id: 144,
        challengeId: 48,
        text: "Đạt yêu cầu",
        correct: false,
      },

      // Challenge 49: experience
      {
        id: 145,
        challengeId: 49,
        text: "Kinh nghiệm",
        correct: true,
      },
      {
        id: 146,
        challengeId: 49,
        text: "Trải nghiệm",
        correct: false,
      },
      {
        id: 147,
        challengeId: 49,
        text: "Thử nghiệm",
        correct: false,
      },

      // Challenge 50: hire
      {
        id: 148,
        challengeId: 50,
        text: "Thuê",
        correct: true,
      },
      {
        id: 149,
        challengeId: 50,
        text: "Tuyển dụng",
        correct: false,
      },
      {
        id: 150,
        challengeId: 50,
        text: "Nhận việc",
        correct: false,
      },

      // Challenge 51: resign
      {
        id: 151,
        challengeId: 51,
        text: "Từ chức",
        correct: true,
      },
      {
        id: 152,
        challengeId: 51,
        text: "Nghỉ việc",
        correct: false,
      },
      {
        id: 153,
        challengeId: 51,
        text: "Thôi việc",
        correct: false,
      },

      // Lesson 11 - Technology Options
      // Challenge 52: software
      {
        id: 154,
        challengeId: 52,
        text: "Phần mềm",
        correct: true,
      },
      {
        id: 155,
        challengeId: 52,
        text: "Chương trình",
        correct: false,
      },
      {
        id: 156,
        challengeId: 52,
        text: "Ứng dụng",
        correct: false,
      },

      // Challenge 53: update
      {
        id: 157,
        challengeId: 53,
        text: "Cập nhật",
        correct: true,
      },
      {
        id: 158,
        challengeId: 53,
        text: "Nâng cấp",
        correct: false,
      },
      {
        id: 159,
        challengeId: 53,
        text: "Làm mới",
        correct: false,
      },

      // Challenge 54: install
      {
        id: 160,
        challengeId: 54,
        text: "Cài đặt",
        correct: true,
      },
      {
        id: 161,
        challengeId: 54,
        text: "Tải xuống",
        correct: false,
      },
      {
        id: 162,
        challengeId: 54,
        text: "Thiết lập",
        correct: false,
      },

      // Challenge 55: network
      {
        id: 163,
        challengeId: 55,
        text: "Mạng lưới",
        correct: true,
      },
      {
        id: 164,
        challengeId: 55,
        text: "Kết nối",
        correct: false,
      },
      {
        id: 165,
        challengeId: 55,
        text: "Hệ thống",
        correct: false,
      },

      // Challenge 56: device
      {
        id: 166,
        challengeId: 56,
        text: "Thiết bị",
        correct: true,
      },
      {
        id: 167,
        challengeId: 56,
        text: "Máy móc",
        correct: false,
      },
      {
        id: 168,
        challengeId: 56,
        text: "Dụng cụ",
        correct: false,
      },

      // Challenge 57: access
      {
        id: 169,
        challengeId: 57,
        text: "Truy cập",
        correct: true,
      },
      {
        id: 170,
        challengeId: 57,
        text: "Tiếp cận",
        correct: false,
      },
      {
        id: 171,
        challengeId: 57,
        text: "Đăng nhập",
        correct: false,
      },

      // Challenge 58: download
      {
        id: 172,
        challengeId: 58,
        text: "Tải xuống",
        correct: true,
      },
      {
        id: 173,
        challengeId: 58,
        text: "Tải về",
        correct: false,
      },
      {
        id: 174,
        challengeId: 58,
        text: "Tải lên",
        correct: false,
      },

      // Challenge 59: upload
      {
        id: 175,
        challengeId: 59,
        text: "Tải lên",
        correct: true,
      },
      {
        id: 176,
        challengeId: 59,
        text: "Upload",
        correct: false,
      },
      {
        id: 177,
        challengeId: 59,
        text: "Đăng tải",
        correct: false,
      },

      // Challenge 60: database
      {
        id: 178,
        challengeId: 60,
        text: "Cơ sở dữ liệu",
        correct: true,
      },
      {
        id: 179,
        challengeId: 60,
        text: "Dữ liệu",
        correct: false,
      },
      {
        id: 180,
        challengeId: 60,
        text: "Kho dữ liệu",
        correct: false,
      },

      // Challenge 61: password
      {
        id: 181,
        challengeId: 61,
        text: "Mật khẩu",
        correct: true,
      },
      {
        id: 182,
        challengeId: 61,
        text: "Mã PIN",
        correct: false,
      },
      {
        id: 183,
        challengeId: 61,
        text: "Mã bảo mật",
        correct: false,
      },

      // Lesson 12 - Travel Options
      // Challenge 62: destination
      {
        id: 184,
        challengeId: 62,
        text: "Điểm đến",
        correct: true,
      },
      {
        id: 185,
        challengeId: 62,
        text: "Địa điểm",
        correct: false,
      },
      {
        id: 186,
        challengeId: 62,
        text: "Nơi đến",
        correct: false,
      },

      // Challenge 63: reservation
      {
        id: 187,
        challengeId: 63,
        text: "Đặt chỗ",
        correct: true,
      },
      {
        id: 188,
        challengeId: 63,
        text: "Dự trú",
        correct: false,
      },
      {
        id: 189,
        challengeId: 63,
        text: "Đặt trước",
        correct: false,
      },

      // Challenge 64: itinerary
      {
        id: 190,
        challengeId: 64,
        text: "Lịch trình",
        correct: true,
      },
      {
        id: 191,
        challengeId: 64,
        text: "Kế hoạch",
        correct: false,
      },
      {
        id: 192,
        challengeId: 64,
        text: "Hành trình",
        correct: false,
      },

      // Challenge 65: departure
      {
        id: 193,
        challengeId: 65,
        text: "Khởi hành",
        correct: true,
      },
      {
        id: 194,
        challengeId: 65,
        text: "Cất cánh",
        correct: false,
      },
      {
        id: 195,
        challengeId: 65,
        text: "Xuất phát",
        correct: false,
      },

      // Challenge 66: arrival
      {
        id: 196,
        challengeId: 66,
        text: "Đến nơi",
        correct: true,
      },
      {
        id: 197,
        challengeId: 66,
        text: "Hạ cánh",
        correct: false,
      },
      {
        id: 198,
        challengeId: 66,
        text: "Tới đích",
        correct: false,
      },

      // Challenge 67: luggage
      {
        id: 199,
        challengeId: 67,
        text: "Hành lý",
        correct: true,
      },
      {
        id: 200,
        challengeId: 67,
        text: "Vali",
        correct: false,
      },
      {
        id: 201,
        challengeId: 67,
        text: "Túi xách",
        correct: false,
      },

      // Challenge 68: delay
      {
        id: 202,
        challengeId: 68,
        text: "Trì hoãn",
        correct: true,
      },
      {
        id: 203,
        challengeId: 68,
        text: "Chậm trễ",
        correct: false,
      },
      {
        id: 204,
        challengeId: 68,
        text: "Hoãn lại",
        correct: false,
      },

      // Challenge 69: accommodation
      {
        id: 205,
        challengeId: 69,
        text: "Chỗ ở",
        correct: true,
      },
      {
        id: 206,
        challengeId: 69,
        text: "Khách sạn",
        correct: false,
      },
      {
        id: 207,
        challengeId: 69,
        text: "Nơi lưu trú",
        correct: false,
      },

      // Challenge 70: passenger
      {
        id: 208,
        challengeId: 70,
        text: "Hành khách",
        correct: true,
      },
      {
        id: 209,
        challengeId: 70,
        text: "Khách du lịch",
        correct: false,
      },
      {
        id: 210,
        challengeId: 70,
        text: "Người đi",
        correct: false,
      },

      // Challenge 71: cancel
      {
        id: 211,
        challengeId: 71,
        text: "Hủy bỏ",
        correct: true,
      },
      {
        id: 212,
        challengeId: 71,
        text: "Hủy đặt chỗ",
        correct: false,
      },
      {
        id: 213,
        challengeId: 71,
        text: "Dừng lại",
        correct: false,
      },

      // Vietnamese - Challenge 72: Hello
      {
        id: 214,
        challengeId: 72,
        text: "Xin chào",
        correct: true,
      },
      {
        id: 215,
        challengeId: 72,
        text: "Tạm biệt",
        correct: false,
      },
      {
        id: 216,
        challengeId: 72,
        text: "Cảm ơn",
        correct: false,
      },

      // Vietnamese - Challenge 73: Goodbye
      {
        id: 217,
        challengeId: 73,
        text: "Tạm biệt",
        correct: true,
      },
      {
        id: 218,
        challengeId: 73,
        text: "Xin chào",
        correct: false,
      },
      {
        id: 219,
        challengeId: 73,
        text: "Hẹn gặp lại",
        correct: false,
      },

      // Vietnamese - Challenge 74: Thank you
      {
        id: 220,
        challengeId: 74,
        text: "Cảm ơn",
        correct: true,
      },
      {
        id: 221,
        challengeId: 74,
        text: "Xin lỗi",
        correct: false,
      },
      {
        id: 222,
        challengeId: 74,
        text: "Không sao",
        correct: false,
      },

      // Vietnamese - Challenge 75: Mother
      {
        id: 223,
        challengeId: 75,
        text: "Mẹ",
        correct: true,
      },
      {
        id: 224,
        challengeId: 75,
        text: "Bố",
        correct: false,
      },
      {
        id: 225,
        challengeId: 75,
        text: "Chị",
        correct: false,
      },

      // Vietnamese - Challenge 76: Father
      {
        id: 226,
        challengeId: 76,
        text: "Bố",
        correct: true,
      },
      {
        id: 227,
        challengeId: 76,
        text: "Mẹ",
        correct: false,
      },
      {
        id: 228,
        challengeId: 76,
        text: "Anh",
        correct: false,
      },

      // Vietnamese - Challenge 77: Sister
      {
        id: 229,
        challengeId: 77,
        text: "Chị / Em gái",
        correct: true,
      },
      {
        id: 230,
        challengeId: 77,
        text: "Anh / Em trai",
        correct: false,
      },
      {
        id: 231,
        challengeId: 77,
        text: "Mẹ",
        correct: false,
      },

      // Vietnamese - Challenge 78: One
      {
        id: 232,
        challengeId: 78,
        text: "Một",
        correct: true,
      },
      {
        id: 233,
        challengeId: 78,
        text: "Hai",
        correct: false,
      },
      {
        id: 234,
        challengeId: 78,
        text: "Ba",
        correct: false,
      },

      // Vietnamese - Challenge 79: Ten
      {
        id: 235,
        challengeId: 79,
        text: "Mười",
        correct: true,
      },
      {
        id: 236,
        challengeId: 79,
        text: "Năm",
        correct: false,
      },
      {
        id: 237,
        challengeId: 79,
        text: "Trăm",
        correct: false,
      },

      // American - Challenge 80: Casual greeting
      {
        id: 238,
        challengeId: 80,
        text: "Hey! / What's up?",
        correct: true,
      },
      {
        id: 239,
        challengeId: 80,
        text: "Good evening",
        correct: false,
      },
      {
        id: 240,
        challengeId: 80,
        text: "How do you do?",
        correct: false,
      },

      // American - Challenge 81: Goodbye
      {
        id: 241,
        challengeId: 81,
        text: "See you later / Bye",
        correct: true,
      },
      {
        id: 242,
        challengeId: 81,
        text: "Good morning",
        correct: false,
      },
      {
        id: 243,
        challengeId: 81,
        text: "Hello",
        correct: false,
      },

      // American - Challenge 82: What's up?
      {
        id: 244,
        challengeId: 82,
        text: "How are you? / What's happening?",
        correct: true,
      },
      {
        id: 245,
        challengeId: 82,
        text: "Look up",
        correct: false,
      },
      {
        id: 246,
        challengeId: 82,
        text: "Stand up",
        correct: false,
      },

      // American - Challenge 83: 100
      {
        id: 247,
        challengeId: 83,
        text: "One hundred",
        correct: true,
      },
      {
        id: 248,
        challengeId: 83,
        text: "One thousand",
        correct: false,
      },
      {
        id: 249,
        challengeId: 83,
        text: "Ten",
        correct: false,
      },

      // American - Challenge 84: 1,000
      {
        id: 250,
        challengeId: 84,
        text: "One thousand",
        correct: true,
      },
      {
        id: 251,
        challengeId: 84,
        text: "One hundred",
        correct: false,
      },
      {
        id: 252,
        challengeId: 84,
        text: "One million",
        correct: false,
      },

      // American - Challenge 85: cool (slang)
      {
        id: 253,
        challengeId: 85,
        text: "Awesome / Great",
        correct: true,
      },
      {
        id: 254,
        challengeId: 85,
        text: "Cold",
        correct: false,
      },
      {
        id: 255,
        challengeId: 85,
        text: "Bad",
        correct: false,
      },

      // American - Challenge 86: sick (slang)
      {
        id: 256,
        challengeId: 86,
        text: "Awesome / Cool",
        correct: true,
      },
      {
        id: 257,
        challengeId: 86,
        text: "Ill / Unwell",
        correct: false,
      },
      {
        id: 258,
        challengeId: 86,
        text: "Tired",
        correct: false,
      },

      // American - Challenge 87: dude
      {
        id: 259,
        challengeId: 87,
        text: "Guy / Man / Friend",
        correct: true,
      },
      {
        id: 260,
        challengeId: 87,
        text: "Woman",
        correct: false,
      },
      {
        id: 261,
        challengeId: 87,
        text: "Old person",
        correct: false,
      },

      // German - Challenge 88: Hello
      {
        id: 262,
        challengeId: 88,
        text: "Hallo / Guten Tag",
        correct: true,
      },
      {
        id: 263,
        challengeId: 88,
        text: "Tschüss",
        correct: false,
      },
      {
        id: 264,
        challengeId: 88,
        text: "Danke",
        correct: false,
      },

      // German - Challenge 89: Good morning
      {
        id: 265,
        challengeId: 89,
        text: "Guten Morgen",
        correct: true,
      },
      {
        id: 266,
        challengeId: 89,
        text: "Gute Nacht",
        correct: false,
      },
      {
        id: 267,
        challengeId: 89,
        text: "Guten Abend",
        correct: false,
      },

      // German - Challenge 90: Goodbye
      {
        id: 268,
        challengeId: 90,
        text: "Auf Wiedersehen / Tschüss",
        correct: true,
      },
      {
        id: 269,
        challengeId: 90,
        text: "Hallo",
        correct: false,
      },
      {
        id: 270,
        challengeId: 90,
        text: "Guten Tag",
        correct: false,
      },

      // German - Challenge 91: One
      {
        id: 271,
        challengeId: 91,
        text: "Eins",
        correct: true,
      },
      {
        id: 272,
        challengeId: 91,
        text: "Zwei",
        correct: false,
      },
      {
        id: 273,
        challengeId: 91,
        text: "Drei",
        correct: false,
      },

      // German - Challenge 92: Five
      {
        id: 274,
        challengeId: 92,
        text: "Fünf",
        correct: true,
      },
      {
        id: 275,
        challengeId: 92,
        text: "Vier",
        correct: false,
      },
      {
        id: 276,
        challengeId: 92,
        text: "Sechs",
        correct: false,
      },

      // German - Challenge 93: Ten
      {
        id: 277,
        challengeId: 93,
        text: "Zehn",
        correct: true,
      },
      {
        id: 278,
        challengeId: 93,
        text: "Neun",
        correct: false,
      },
      {
        id: 279,
        challengeId: 93,
        text: "Elf",
        correct: false,
      },

      // German - Challenge 94: essen
      {
        id: 280,
        challengeId: 94,
        text: "To eat",
        correct: true,
      },
      {
        id: 281,
        challengeId: 94,
        text: "To drink",
        correct: false,
      },
      {
        id: 282,
        challengeId: 94,
        text: "To sleep",
        correct: false,
      },

      // German - Challenge 95: trinken
      {
        id: 283,
        challengeId: 95,
        text: "To drink",
        correct: true,
      },
      {
        id: 284,
        challengeId: 95,
        text: "To eat",
        correct: false,
      },
      {
        id: 285,
        challengeId: 95,
        text: "To run",
        correct: false,
      },

      // German - Challenge 96: schlafen
      {
        id: 286,
        challengeId: 96,
        text: "To sleep",
        correct: true,
      },
      {
        id: 287,
        challengeId: 96,
        text: "To eat",
        correct: false,
      },
      {
        id: 288,
        challengeId: 96,
        text: "To walk",
        correct: false,
      },
    ]);

    console.log("Database seeded finished");
  } catch (error) {
    console.error("Seeding error:", error);
    throw new Error("Failed to seed database");
  }
};

main();
