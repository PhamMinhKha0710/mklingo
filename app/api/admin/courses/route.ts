import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const course = await db.query.courses.findFirst({
            where: eq(courses.id, parseInt(id)),
        });
        return NextResponse.json(course);
    }

    const data = await db.query.courses.findMany();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await db.insert(courses).values({
        title: body.title,
        imageSrc: body.imageSrc,
    }).returning();
    
    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await db.update(courses)
        .set({
            title: body.title,
            imageSrc: body.imageSrc,
        })
        .where(eq(courses.id, body.id))
        .returning();
    
    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(courses).where(eq(courses.id, parseInt(id)));
    return NextResponse.json({ success: true });
}

