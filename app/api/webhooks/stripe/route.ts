import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get("Stripe-Signature");

    if (!signature) {
        return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    let event: Stripe.Event;
    
    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse(`Webhook verification failed: ${message}`, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is required", { status: 400 });
        }

        try {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            // Get timestamp from subscription - default to current time if not available
            const { current_period_end: periodEnd } = subscription as unknown as { current_period_end: number };
            const currentPeriodEnd = periodEnd || Math.floor(Date.now() / 1000);

            if (!currentPeriodEnd) {
                throw new Error("current_period_end is missing from subscription");
            }

            await db.insert(userSubscription).values({
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
            });

            // Revalidate pages to show updated subscription status
            revalidatePath("/shop");
            revalidatePath("/learn");
            revalidatePath("/lesson");
            revalidatePath("/questions");
            revalidatePath("/leaderboard");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Error in checkout.session.completed:", error);
            return new NextResponse(`Error: ${message}`, { status: 500 });
        }
    }

    // Handle invoice.payment_succeeded event (renewal)
    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as Stripe.Invoice;
        
        const invoiceData = invoice as unknown as { subscription?: string | null };
        const subscriptionId = typeof invoiceData.subscription === "string" ? invoiceData.subscription : null;
            
        if (!subscriptionId) {
            // Invoice might not be for a subscription, just return 200
            return new NextResponse(null, { status: 200 });
        }

        try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            
            // Get timestamp from subscription - default to current time if not available
            const { current_period_end: periodEnd } = subscription as unknown as { current_period_end: number };
            const currentPeriodEnd = periodEnd || Math.floor(Date.now() / 1000);

            await db.update(userSubscription).set({
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
            }).where(eq(userSubscription.stripeSubscriptionId, subscription.id));

            // Revalidate pages to show updated subscription status
            revalidatePath("/shop");
            revalidatePath("/learn");
            revalidatePath("/lesson");
            revalidatePath("/questions");
            revalidatePath("/leaderboard");
        } catch (error: unknown) {
            console.error("Error in invoice.payment_succeeded:", error);
            // Return 200 to avoid retries
            return new NextResponse(null, { status: 200 });
        }
    }

    return new NextResponse(null, { status: 200 });
}