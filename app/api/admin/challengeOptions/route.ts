import db from "@/db/drizzle";
import { challengesOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const option = await db.query.challengesOptions.findFirst({
            where: eq(challengesOptions.id, parseInt(id)),
        });
        return NextResponse.json(option);
    }

    const data = await db.query.challengesOptions.findMany();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await db.insert(challengesOptions).values({
        challengeId: body.challengeId,
        text: body.text,
        correct: body.correct || false,
        imageSrc: body.imageSrc || null,
        audioSrc: body.audioSrc || null,
    }).returning();
    
    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await db.update(challengesOptions)
        .set({
            challengeId: body.challengeId,
            text: body.text,
            correct: body.correct,
            imageSrc: body.imageSrc,
            audioSrc: body.audioSrc,
        })
        .where(eq(challengesOptions.id, body.id))
        .returning();
    
    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(challengesOptions).where(eq(challengesOptions.id, parseInt(id)));
    return NextResponse.json({ success: true });
}

