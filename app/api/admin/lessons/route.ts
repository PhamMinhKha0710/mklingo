import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const lesson = await db.query.lessons.findFirst({
            where: eq(lessons.id, parseInt(id)),
        });
        return NextResponse.json(lesson);
    }

    const data = await db.query.lessons.findMany({
        orderBy: [asc(lessons.order)],
    });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await db.insert(lessons).values({
        title: body.title,
        description: body.description,
        unitId: body.unitId,
        order: body.order,
    }).returning();
    
    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await db.update(lessons)
        .set({
            title: body.title,
            description: body.description,
            unitId: body.unitId,
            order: body.order,
        })
        .where(eq(lessons.id, body.id))
        .returning();
    
    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(lessons).where(eq(lessons.id, parseInt(id)));
    return NextResponse.json({ success: true });
}

