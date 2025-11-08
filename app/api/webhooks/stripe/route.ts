import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event;
    
    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook verification failed: ${error.message}`, { status: 400 });
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

            // Get current_period_end from subscription item
            const subscriptionItem = subscription.items.data[0];
            const currentPeriodEnd = (subscriptionItem as any).current_period_end;

            if (!currentPeriodEnd) {
                throw new Error("current_period_end is missing from subscription item");
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
        } catch (error: any) {
            console.error("Error in checkout.session.completed:", error);
            return new NextResponse(`Error: ${error.message}`, { status: 500 });
        }
    }

    // Handle invoice.payment_succeeded event (renewal)
    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as Stripe.Invoice;
        
        const subscriptionId = (invoice as any).subscription;
        if (!subscriptionId) {
            // Invoice might not be for a subscription, just return 200
            return new NextResponse(null, { status: 200 });
        }

        try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
            
            // Get current_period_end from subscription item
            const subscriptionItem = subscription.items.data[0];
            const currentPeriodEnd = (subscriptionItem as any).current_period_end;

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
        } catch (error: any) {
            console.error("Error in invoice.payment_succeeded:", error);
            // Return 200 to avoid retries
            return new NextResponse(null, { status: 200 });
        }
    }

    return new NextResponse(null, { status: 200 });
}