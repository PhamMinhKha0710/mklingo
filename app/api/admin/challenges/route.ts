import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const challenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, parseInt(id)),
        });
        return NextResponse.json(challenge);
    }

    const data = await db.query.challenges.findMany({
        orderBy: [asc(challenges.order)],
    });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await db.insert(challenges).values({
        lessonId: body.lessonId,
        type: body.type,
        question: body.question,
        order: body.order,
    }).returning();
    
    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await db.update(challenges)
        .set({
            lessonId: body.lessonId,
            type: body.type,
            question: body.question,
            order: body.order,
        })
        .where(eq(challenges.id, body.id))
        .returning();
    
    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(challenges).where(eq(challenges.id, parseInt(id)));
    return NextResponse.json({ success: true });
}

