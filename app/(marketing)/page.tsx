import { Button } from "@/components/ui/button";
import { ClerkLoaded,
          ClerkLoading,
          SignUpButton,
          SignInButton,
          SignedIn,
          SignedOut } from "@clerk/nextjs";

import { Loader } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col items-center justify-center gap-8 p-4">
      <div className="relative w-full h-[240px] lg:h-[424px]">
        <Image src="/hero.svg" fill alt="hero" className="object-contain" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new languages with Mklingo.
        </h1>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
              <SignUpButton 
                mode="modal"
              >
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton 
                mode="modal"
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Button size="lg" variant="secondary" className="w-full" asChild>
              <a href="/learn">
                Continue Learning
              </a>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
}