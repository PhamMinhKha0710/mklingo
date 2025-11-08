import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const unit = await db.query.units.findFirst({
            where: eq(units.id, parseInt(id)),
        });
        return NextResponse.json(unit);
    }

    const data = await db.query.units.findMany({
        orderBy: [asc(units.order)],
    });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await db.insert(units).values({
        title: body.title,
        description: body.description,
        courseId: body.courseId,
        order: body.order,
    }).returning();
    
    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await db.update(units)
        .set({
            title: body.title,
            description: body.description,
            courseId: body.courseId,
            order: body.order,
        })
        .where(eq(units.id, body.id))
        .returning();
    
    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(units).where(eq(units.id, parseInt(id)));
    return NextResponse.json({ success: true });
}

