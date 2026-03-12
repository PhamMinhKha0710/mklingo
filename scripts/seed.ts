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
    await db.delete(schema.userSubscription);

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

      // Vietnamese - thêm units
      { id: 9, courseId: 2, title: "Bài 3", description: "Từ vựng đời sống hàng ngày", order: 3 },
      { id: 10, courseId: 2, title: "Bài 4", description: "Tiếng Việt giao tiếp", order: 4 },

      // American - thêm units
      { id: 11, courseId: 3, title: "Unit 3", description: "American Culture & Expressions", order: 3 },
      { id: 12, courseId: 3, title: "Unit 4", description: "Business American English", order: 4 },

      // Germany - thêm units
      { id: 13, courseId: 4, title: "Einheit 3", description: "Alltag und Einkaufen", order: 3 },
      { id: 14, courseId: 4, title: "Einheit 4", description: "Reisen und Unterkunft", order: 4 },
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

      // Vietnamese Unit 9
      { id: 28, unitId: 9, order: 1, title: "Màu sắc", description: "Từ vựng về màu sắc" },
      { id: 29, unitId: 9, order: 2, title: "Động vật", description: "Tên các loài động vật" },
      { id: 30, unitId: 9, order: 3, title: "Trường học", description: "Từ vựng về trường học" },
      { id: 31, unitId: 9, order: 4, title: "Cơ thể", description: "Các bộ phận cơ thể" },

      // Vietnamese Unit 10
      { id: 32, unitId: 10, order: 1, title: "Mua sắm", description: "Từ vựng mua sắm" },
      { id: 33, unitId: 10, order: 2, title: "Giao thông", description: "Phương tiện giao thông" },
      { id: 34, unitId: 10, order: 3, title: "Sức khỏe", description: "Từ vựng về sức khỏe" },
      { id: 35, unitId: 10, order: 4, title: "Cảm xúc", description: "Diễn đạt cảm xúc" },

      // American Unit 11
      { id: 36, unitId: 11, order: 1, title: "Family & Relationships", description: "American family vocabulary" },
      { id: 37, unitId: 11, order: 2, title: "Food & Dining", description: "American food culture" },
      { id: 38, unitId: 11, order: 3, title: "Sports & Hobbies", description: "American leisure activities" },
      { id: 39, unitId: 11, order: 4, title: "Holidays", description: "American holidays" },

      // American Unit 12
      { id: 40, unitId: 12, order: 1, title: "Meetings", description: "Business meeting vocabulary" },
      { id: 41, unitId: 12, order: 2, title: "Presentations", description: "Presentation skills" },
      { id: 42, unitId: 12, order: 3, title: "Email & Correspondence", description: "Professional email terms" },
      { id: 43, unitId: 12, order: 4, title: "Negotiations", description: "Negotiation vocabulary" },

      // Germany Unit 13
      { id: 44, unitId: 13, order: 1, title: "Einkaufen", description: "Shopping vocabulary" },
      { id: 45, unitId: 13, order: 2, title: "Im Restaurant", description: "Restaurant and food" },
      { id: 46, unitId: 13, order: 3, title: "Kleidung", description: "Clothing vocabulary" },
      { id: 47, unitId: 13, order: 4, title: "Tiere", description: "Animal names in German" },

      // Germany Unit 14
      { id: 48, unitId: 14, order: 1, title: "Reise", description: "Travel vocabulary" },
      { id: 49, unitId: 14, order: 2, title: "Hotel", description: "Hotel and accommodation" },
      { id: 50, unitId: 14, order: 3, title: "Flughafen", description: "Airport vocabulary" },
      { id: 51, unitId: 14, order: 4, title: "Richtungen", description: "Directions and locations" },
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

      // Vietnamese 28-35
      { id: 97, lessonId: 28, type: "SELECT", question: 'What is "Red" in Vietnamese?', order: 1 },
      { id: 98, lessonId: 28, type: "SELECT", question: 'What is "Blue" in Vietnamese?', order: 2 },
      { id: 99, lessonId: 28, type: "SELECT", question: 'What is "Green" in Vietnamese?', order: 3 },
      { id: 100, lessonId: 29, type: "SELECT", question: 'What is "Cat" in Vietnamese?', order: 1 },
      { id: 101, lessonId: 29, type: "SELECT", question: 'What is "Bird" in Vietnamese?', order: 2 },
      { id: 102, lessonId: 29, type: "SELECT", question: 'What is "Fish" in Vietnamese?', order: 3 },
      { id: 103, lessonId: 30, type: "SELECT", question: 'What is "Teacher" in Vietnamese?', order: 1 },
      { id: 104, lessonId: 30, type: "SELECT", question: 'What is "Student" in Vietnamese?', order: 2 },
      { id: 105, lessonId: 30, type: "SELECT", question: 'What is "Book" in Vietnamese?', order: 3 },
      { id: 106, lessonId: 31, type: "SELECT", question: 'What is "Hand" in Vietnamese?', order: 1 },
      { id: 107, lessonId: 31, type: "SELECT", question: 'What is "Eye" in Vietnamese?', order: 2 },
      { id: 108, lessonId: 31, type: "SELECT", question: 'What is "Head" in Vietnamese?', order: 3 },
      { id: 109, lessonId: 32, type: "SELECT", question: 'What does "mua" mean?', order: 1 },
      { id: 110, lessonId: 32, type: "SELECT", question: 'What does "giá" mean?', order: 2 },
      { id: 111, lessonId: 32, type: "SELECT", question: 'What does "tiền" mean?', order: 3 },
      { id: 112, lessonId: 33, type: "SELECT", question: 'What is "Car" in Vietnamese?', order: 1 },
      { id: 113, lessonId: 33, type: "SELECT", question: 'What is "Bicycle" in Vietnamese?', order: 2 },
      { id: 114, lessonId: 33, type: "SELECT", question: 'What is "Bus" in Vietnamese?', order: 3 },
      { id: 115, lessonId: 34, type: "SELECT", question: 'What does "bệnh" mean?', order: 1 },
      { id: 116, lessonId: 34, type: "SELECT", question: 'What does "khỏe" mean?', order: 2 },
      { id: 117, lessonId: 34, type: "SELECT", question: 'What does "bác sĩ" mean?', order: 3 },
      { id: 118, lessonId: 35, type: "SELECT", question: 'What is "Happy" in Vietnamese?', order: 1 },
      { id: 119, lessonId: 35, type: "SELECT", question: 'What is "Sad" in Vietnamese?', order: 2 },
      { id: 120, lessonId: 35, type: "SELECT", question: 'What is "Angry" in Vietnamese?', order: 3 },

      // American 36-43
      { id: 121, lessonId: 36, type: "SELECT", question: 'What does "sibling" mean?', order: 1 },
      { id: 122, lessonId: 36, type: "SELECT", question: 'What does "in-law" mean?', order: 2 },
      { id: 123, lessonId: 36, type: "SELECT", question: 'What does "extended family" mean?', order: 3 },
      { id: 124, lessonId: 37, type: "SELECT", question: 'What does "appetizer" mean?', order: 1 },
      { id: 125, lessonId: 37, type: "SELECT", question: 'What does "tip" mean in restaurant?', order: 2 },
      { id: 126, lessonId: 37, type: "SELECT", question: 'What does "takeout" mean?', order: 3 },
      { id: 127, lessonId: 38, type: "SELECT", question: 'What does "tailgate" mean?', order: 1 },
      { id: 128, lessonId: 38, type: "SELECT", question: 'What does "hobby" mean?', order: 2 },
      { id: 129, lessonId: 38, type: "SELECT", question: 'What does "workout" mean?', order: 3 },
      { id: 130, lessonId: 39, type: "SELECT", question: 'What does "Thanksgiving" celebrate?', order: 1 },
      { id: 131, lessonId: 39, type: "SELECT", question: 'What does "Fourth of July" mean?', order: 2 },
      { id: 132, lessonId: 39, type: "SELECT", question: 'What does "Black Friday" mean?', order: 3 },
      { id: 133, lessonId: 40, type: "SELECT", question: 'What does "agenda" mean?', order: 1 },
      { id: 134, lessonId: 40, type: "SELECT", question: 'What does "minutes" mean in business?', order: 2 },
      { id: 135, lessonId: 40, type: "SELECT", question: 'What does "follow-up" mean?', order: 3 },
      { id: 136, lessonId: 41, type: "SELECT", question: 'What does "slideshow" mean?', order: 1 },
      { id: 137, lessonId: 41, type: "SELECT", question: 'What does "Q&A" stand for?', order: 2 },
      { id: 138, lessonId: 41, type: "SELECT", question: 'What does "handout" mean?', order: 3 },
      { id: 139, lessonId: 42, type: "SELECT", question: 'What does "CC" mean in email?', order: 1 },
      { id: 140, lessonId: 42, type: "SELECT", question: 'What does "BCC" mean?', order: 2 },
      { id: 141, lessonId: 42, type: "SELECT", question: 'What does "attachment" mean?', order: 3 },
      { id: 142, lessonId: 43, type: "SELECT", question: 'What does "deal" mean in business?', order: 1 },
      { id: 143, lessonId: 43, type: "SELECT", question: 'What does "counteroffer" mean?', order: 2 },
      { id: 144, lessonId: 43, type: "SELECT", question: 'What does "compromise" mean?', order: 3 },

      // German 44-51
      { id: 145, lessonId: 44, type: "SELECT", question: 'What does "kaufen" mean?', order: 1 },
      { id: 146, lessonId: 44, type: "SELECT", question: 'What does "Preis" mean?', order: 2 },
      { id: 147, lessonId: 44, type: "SELECT", question: 'What does "bezahlen" mean?', order: 3 },
      { id: 148, lessonId: 45, type: "SELECT", question: 'What does "Rechnung" mean?', order: 1 },
      { id: 149, lessonId: 45, type: "SELECT", question: 'What does "bestellen" mean?', order: 2 },
      { id: 150, lessonId: 45, type: "SELECT", question: 'What does "Trinkgeld" mean?', order: 3 },
      { id: 151, lessonId: 46, type: "SELECT", question: 'What does "Hemd" mean?', order: 1 },
      { id: 152, lessonId: 46, type: "SELECT", question: 'What does "Hose" mean?', order: 2 },
      { id: 153, lessonId: 46, type: "SELECT", question: 'What does "Schuhe" mean?', order: 3 },
      { id: 154, lessonId: 47, type: "SELECT", question: 'What does "Hund" mean?', order: 1 },
      { id: 155, lessonId: 47, type: "SELECT", question: 'What does "Katze" mean?', order: 2 },
      { id: 156, lessonId: 47, type: "SELECT", question: 'What does "Vogel" mean?', order: 3 },
      { id: 157, lessonId: 48, type: "SELECT", question: 'What does "Reise" mean?', order: 1 },
      { id: 158, lessonId: 48, type: "SELECT", question: 'What does "Koffer" mean?', order: 2 },
      { id: 159, lessonId: 48, type: "SELECT", question: 'What does "Flugzeug" mean?', order: 3 },
      { id: 160, lessonId: 49, type: "SELECT", question: 'What does "Zimmer" mean?', order: 1 },
      { id: 161, lessonId: 49, type: "SELECT", question: 'What does "Reservierung" mean?', order: 2 },
      { id: 162, lessonId: 49, type: "SELECT", question: 'What does "Check-in" mean?', order: 3 },
      { id: 163, lessonId: 50, type: "SELECT", question: 'What does "Abflug" mean?', order: 1 },
      { id: 164, lessonId: 50, type: "SELECT", question: 'What does "Ankunft" mean?', order: 2 },
      { id: 165, lessonId: 50, type: "SELECT", question: 'What does "Gepäck" mean?', order: 3 },
      { id: 166, lessonId: 51, type: "SELECT", question: 'What does "links" mean?', order: 1 },
      { id: 167, lessonId: 51, type: "SELECT", question: 'What does "rechts" mean?', order: 2 },
      { id: 168, lessonId: 51, type: "SELECT", question: 'What does "geradeaus" mean?', order: 3 },
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

      // Vietnamese 97-120 options (3 per challenge)
      { id: 289, challengeId: 97, text: "Đỏ", correct: true },
      { id: 290, challengeId: 97, text: "Xanh", correct: false },
      { id: 291, challengeId: 97, text: "Vàng", correct: false },
      { id: 292, challengeId: 98, text: "Xanh dương", correct: true },
      { id: 293, challengeId: 98, text: "Đỏ", correct: false },
      { id: 294, challengeId: 98, text: "Đen", correct: false },
      { id: 295, challengeId: 99, text: "Xanh lá", correct: true },
      { id: 296, challengeId: 99, text: "Trắng", correct: false },
      { id: 297, challengeId: 99, text: "Tím", correct: false },
      { id: 298, challengeId: 100, text: "Mèo", correct: true },
      { id: 299, challengeId: 100, text: "Chó", correct: false },
      { id: 300, challengeId: 100, text: "Gà", correct: false },
      { id: 301, challengeId: 101, text: "Chim", correct: true },
      { id: 302, challengeId: 101, text: "Cá", correct: false },
      { id: 303, challengeId: 101, text: "Rắn", correct: false },
      { id: 304, challengeId: 102, text: "Cá", correct: true },
      { id: 305, challengeId: 102, text: "Mèo", correct: false },
      { id: 306, challengeId: 102, text: "Chó", correct: false },
      { id: 307, challengeId: 103, text: "Giáo viên", correct: true },
      { id: 308, challengeId: 103, text: "Học sinh", correct: false },
      { id: 309, challengeId: 103, text: "Hiệu trưởng", correct: false },
      { id: 310, challengeId: 104, text: "Học sinh", correct: true },
      { id: 311, challengeId: 104, text: "Giáo viên", correct: false },
      { id: 312, challengeId: 104, text: "Phụ huynh", correct: false },
      { id: 313, challengeId: 105, text: "Sách", correct: true },
      { id: 314, challengeId: 105, text: "Vở", correct: false },
      { id: 315, challengeId: 105, text: "Bút", correct: false },
      { id: 316, challengeId: 106, text: "Tay", correct: true },
      { id: 317, challengeId: 106, text: "Chân", correct: false },
      { id: 318, challengeId: 106, text: "Đầu", correct: false },
      { id: 319, challengeId: 107, text: "Mắt", correct: true },
      { id: 320, challengeId: 107, text: "Tai", correct: false },
      { id: 321, challengeId: 107, text: "Mũi", correct: false },
      { id: 322, challengeId: 108, text: "Đầu", correct: true },
      { id: 323, challengeId: 108, text: "Cổ", correct: false },
      { id: 324, challengeId: 108, text: "Lưng", correct: false },
      { id: 325, challengeId: 109, text: "To buy", correct: true },
      { id: 326, challengeId: 109, text: "To sell", correct: false },
      { id: 327, challengeId: 109, text: "To give", correct: false },
      { id: 328, challengeId: 110, text: "Price", correct: true },
      { id: 329, challengeId: 110, text: "Money", correct: false },
      { id: 330, challengeId: 110, text: "Discount", correct: false },
      { id: 331, challengeId: 111, text: "Money", correct: true },
      { id: 332, challengeId: 111, text: "Price", correct: false },
      { id: 333, challengeId: 111, text: "Bill", correct: false },
      { id: 334, challengeId: 112, text: "Xe hơi", correct: true },
      { id: 335, challengeId: 112, text: "Xe máy", correct: false },
      { id: 336, challengeId: 112, text: "Xe đạp", correct: false },
      { id: 337, challengeId: 113, text: "Xe đạp", correct: true },
      { id: 338, challengeId: 113, text: "Xe bus", correct: false },
      { id: 339, challengeId: 113, text: "Xe hơi", correct: false },
      { id: 340, challengeId: 114, text: "Xe bus", correct: true },
      { id: 341, challengeId: 114, text: "Tàu hỏa", correct: false },
      { id: 342, challengeId: 114, text: "Máy bay", correct: false },
      { id: 343, challengeId: 115, text: "Illness", correct: true },
      { id: 344, challengeId: 115, text: "Health", correct: false },
      { id: 345, challengeId: 115, text: "Medicine", correct: false },
      { id: 346, challengeId: 116, text: "Healthy", correct: true },
      { id: 347, challengeId: 116, text: "Sick", correct: false },
      { id: 348, challengeId: 116, text: "Tired", correct: false },
      { id: 349, challengeId: 117, text: "Doctor", correct: true },
      { id: 350, challengeId: 117, text: "Nurse", correct: false },
      { id: 351, challengeId: 117, text: "Patient", correct: false },
      { id: 352, challengeId: 118, text: "Vui", correct: true },
      { id: 353, challengeId: 118, text: "Buồn", correct: false },
      { id: 354, challengeId: 118, text: "Giận", correct: false },
      { id: 355, challengeId: 119, text: "Buồn", correct: true },
      { id: 356, challengeId: 119, text: "Vui", correct: false },
      { id: 357, challengeId: 119, text: "Sợ", correct: false },
      { id: 358, challengeId: 120, text: "Giận", correct: true },
      { id: 359, challengeId: 120, text: "Ngạc nhiên", correct: false },
      { id: 360, challengeId: 120, text: "Lo lắng", correct: false },

      // American 121-144
      { id: 361, challengeId: 121, text: "Brother or sister", correct: true },
      { id: 362, challengeId: 121, text: "Parent", correct: false },
      { id: 363, challengeId: 121, text: "Cousin", correct: false },
      { id: 364, challengeId: 122, text: "Relative by marriage", correct: true },
      { id: 365, challengeId: 122, text: "Blood relative", correct: false },
      { id: 366, challengeId: 122, text: "Step-family", correct: false },
      { id: 367, challengeId: 123, text: "Parents, grandparents, etc.", correct: true },
      { id: 368, challengeId: 123, text: "Immediate family only", correct: false },
      { id: 369, challengeId: 123, text: "Friends", correct: false },
      { id: 370, challengeId: 124, text: "Starter dish", correct: true },
      { id: 371, challengeId: 124, text: "Main course", correct: false },
      { id: 372, challengeId: 124, text: "Dessert", correct: false },
      { id: 373, challengeId: 125, text: "Extra money for service", correct: true },
      { id: 374, challengeId: 125, text: "Total bill", correct: false },
      { id: 375, challengeId: 125, text: "Discount", correct: false },
      { id: 376, challengeId: 126, text: "Food to go", correct: true },
      { id: 377, challengeId: 126, text: "Dine in", correct: false },
      { id: 378, challengeId: 126, text: "Delivery", correct: false },
      { id: 379, challengeId: 127, text: "Party before sports event", correct: true },
      { id: 380, challengeId: 127, text: "End of game", correct: false },
      { id: 381, challengeId: 127, text: "Team meeting", correct: false },
      { id: 382, challengeId: 128, text: "Leisure activity", correct: true },
      { id: 383, challengeId: 128, text: "Job", correct: false },
      { id: 384, challengeId: 128, text: "Sport", correct: false },
      { id: 385, challengeId: 129, text: "Exercise session", correct: true },
      { id: 386, challengeId: 129, text: "Work", correct: false },
      { id: 387, challengeId: 129, text: "Rest", correct: false },
      { id: 388, challengeId: 130, text: "Harvest / gratitude", correct: true },
      { id: 389, challengeId: 130, text: "Independence", correct: false },
      { id: 390, challengeId: 130, text: "Christmas", correct: false },
      { id: 391, challengeId: 131, text: "US Independence Day", correct: true },
      { id: 392, challengeId: 131, text: "Memorial Day", correct: false },
      { id: 393, challengeId: 131, text: "Labor Day", correct: false },
      { id: 394, challengeId: 132, text: "Big shopping day after Thanksgiving", correct: true },
      { id: 395, challengeId: 132, text: "Friday 13th", correct: false },
      { id: 396, challengeId: 132, text: "Last Friday of month", correct: false },
      { id: 397, challengeId: 133, text: "List of topics to discuss", correct: true },
      { id: 398, challengeId: 133, text: "Meeting notes", correct: false },
      { id: 399, challengeId: 133, text: "Schedule", correct: false },
      { id: 400, challengeId: 134, text: "Written record of meeting", correct: true },
      { id: 401, challengeId: 134, text: "60 seconds", correct: false },
      { id: 402, challengeId: 134, text: "Agenda", correct: false },
      { id: 403, challengeId: 135, text: "Next steps after meeting", correct: true },
      { id: 404, challengeId: 135, text: "Conclusion", correct: false },
      { id: 405, challengeId: 135, text: "Introduction", correct: false },
      { id: 406, challengeId: 136, text: "Presentation with images", correct: true },
      { id: 407, challengeId: 136, text: "Video", correct: false },
      { id: 408, challengeId: 136, text: "Document", correct: false },
      { id: 409, challengeId: 137, text: "Question and Answer", correct: true },
      { id: 410, challengeId: 137, text: "Quick and Accurate", correct: false },
      { id: 411, challengeId: 137, text: "Quality Assurance", correct: false },
      { id: 412, challengeId: 138, text: "Printed materials for audience", correct: true },
      { id: 413, challengeId: 138, text: "Hand gesture", correct: false },
      { id: 414, challengeId: 138, text: "Summary", correct: false },
      { id: 415, challengeId: 139, text: "Carbon Copy", correct: true },
      { id: 416, challengeId: 139, text: "Confidential Copy", correct: false },
      { id: 417, challengeId: 139, text: "Company Copy", correct: false },
      { id: 418, challengeId: 140, text: "Blind Carbon Copy", correct: true },
      { id: 419, challengeId: 140, text: "Business Copy", correct: false },
      { id: 420, challengeId: 140, text: "Backup Copy", correct: false },
      { id: 421, challengeId: 141, text: "File sent with email", correct: true },
      { id: 422, challengeId: 141, text: "Link", correct: false },
      { id: 423, challengeId: 141, text: "Signature", correct: false },
      { id: 424, challengeId: 142, text: "Agreement / bargain", correct: true },
      { id: 425, challengeId: 142, text: "Meeting", correct: false },
      { id: 426, challengeId: 142, text: "Contract", correct: false },
      { id: 427, challengeId: 143, text: "Alternative offer", correct: true },
      { id: 428, challengeId: 143, text: "Final offer", correct: false },
      { id: 429, challengeId: 143, text: "Initial offer", correct: false },
      { id: 430, challengeId: 144, text: "Mutual concession", correct: true },
      { id: 431, challengeId: 144, text: "Final agreement", correct: false },
      { id: 432, challengeId: 144, text: "Rejection", correct: false },

      // German 145-168
      { id: 433, challengeId: 145, text: "To buy", correct: true },
      { id: 434, challengeId: 145, text: "To sell", correct: false },
      { id: 435, challengeId: 145, text: "To pay", correct: false },
      { id: 436, challengeId: 146, text: "Price", correct: true },
      { id: 437, challengeId: 146, text: "Cost", correct: false },
      { id: 438, challengeId: 146, text: "Value", correct: false },
      { id: 439, challengeId: 147, text: "To pay", correct: true },
      { id: 440, challengeId: 147, text: "To buy", correct: false },
      { id: 441, challengeId: 147, text: "To receive", correct: false },
      { id: 442, challengeId: 148, text: "Bill / Invoice", correct: true },
      { id: 443, challengeId: 148, text: "Menu", correct: false },
      { id: 444, challengeId: 148, text: "Order", correct: false },
      { id: 445, challengeId: 149, text: "To order", correct: true },
      { id: 446, challengeId: 149, text: "To eat", correct: false },
      { id: 447, challengeId: 149, text: "To drink", correct: false },
      { id: 448, challengeId: 150, text: "Tip", correct: true },
      { id: 449, challengeId: 150, text: "Bill", correct: false },
      { id: 450, challengeId: 150, text: "Service", correct: false },
      { id: 451, challengeId: 151, text: "Shirt", correct: true },
      { id: 452, challengeId: 151, text: "Pants", correct: false },
      { id: 453, challengeId: 151, text: "Jacket", correct: false },
      { id: 454, challengeId: 152, text: "Pants / Trousers", correct: true },
      { id: 455, challengeId: 152, text: "Shirt", correct: false },
      { id: 456, challengeId: 152, text: "Dress", correct: false },
      { id: 457, challengeId: 153, text: "Shoes", correct: true },
      { id: 458, challengeId: 153, text: "Socks", correct: false },
      { id: 459, challengeId: 153, text: "Hat", correct: false },
      { id: 460, challengeId: 154, text: "Dog", correct: true },
      { id: 461, challengeId: 154, text: "Cat", correct: false },
      { id: 462, challengeId: 154, text: "Bird", correct: false },
      { id: 463, challengeId: 155, text: "Cat", correct: true },
      { id: 464, challengeId: 155, text: "Dog", correct: false },
      { id: 465, challengeId: 155, text: "Fish", correct: false },
      { id: 466, challengeId: 156, text: "Bird", correct: true },
      { id: 467, challengeId: 156, text: "Dog", correct: false },
      { id: 468, challengeId: 156, text: "Cat", correct: false },
      { id: 469, challengeId: 157, text: "Trip / Journey", correct: true },
      { id: 470, challengeId: 157, text: "Ticket", correct: false },
      { id: 471, challengeId: 157, text: "Hotel", correct: false },
      { id: 472, challengeId: 158, text: "Suitcase", correct: true },
      { id: 473, challengeId: 158, text: "Bag", correct: false },
      { id: 474, challengeId: 158, text: "Backpack", correct: false },
      { id: 475, challengeId: 159, text: "Airplane", correct: true },
      { id: 476, challengeId: 159, text: "Train", correct: false },
      { id: 477, challengeId: 159, text: "Car", correct: false },
      { id: 478, challengeId: 160, text: "Room", correct: true },
      { id: 479, challengeId: 160, text: "Hotel", correct: false },
      { id: 480, challengeId: 160, text: "Floor", correct: false },
      { id: 481, challengeId: 161, text: "Reservation", correct: true },
      { id: 482, challengeId: 161, text: "Check-in", correct: false },
      { id: 483, challengeId: 161, text: "Booking", correct: false },
      { id: 484, challengeId: 162, text: "Check-in process", correct: true },
      { id: 485, challengeId: 162, text: "Check-out", correct: false },
      { id: 486, challengeId: 162, text: "Reservation", correct: false },
      { id: 487, challengeId: 163, text: "Departure", correct: true },
      { id: 488, challengeId: 163, text: "Arrival", correct: false },
      { id: 489, challengeId: 163, text: "Delay", correct: false },
      { id: 490, challengeId: 164, text: "Arrival", correct: true },
      { id: 491, challengeId: 164, text: "Departure", correct: false },
      { id: 492, challengeId: 164, text: "Gate", correct: false },
      { id: 493, challengeId: 165, text: "Luggage", correct: true },
      { id: 494, challengeId: 165, text: "Ticket", correct: false },
      { id: 495, challengeId: 165, text: "Passport", correct: false },
      { id: 496, challengeId: 166, text: "Left", correct: true },
      { id: 497, challengeId: 166, text: "Right", correct: false },
      { id: 498, challengeId: 166, text: "Straight", correct: false },
      { id: 499, challengeId: 167, text: "Right", correct: true },
      { id: 500, challengeId: 167, text: "Left", correct: false },
      { id: 501, challengeId: 167, text: "Back", correct: false },
      { id: 502, challengeId: 168, text: "Straight ahead", correct: true },
      { id: 503, challengeId: 168, text: "Turn left", correct: false },
      { id: 504, challengeId: 168, text: "Turn right", correct: false },
    ]);

    console.log("Database seeded finished");
  } catch (error) {
    console.error("Seeding error:", error);
    throw new Error("Failed to seed database");
  }
};

main();
