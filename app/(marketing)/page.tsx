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
    <div className="max-w-[1200px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4">
      {/* Hero Image - Left side on desktop, top on mobile */}
      <div className="relative w-full lg:w-[60%] h-[280px] lg:h-[500px]">
        <Image src="/images/hero.svg" fill alt="hero" className="object-contain" />
      </div>
      
      {/* Content - Right side on desktop, bottom on mobile */}
      <div className="flex flex-col items-center lg:items-start gap-y-6 w-full lg:w-[40%]">
        <h1 className="text-lg lg:text-2xl font-bold text-neutral-600 max-w-[420px] text-center lg:text-left">
          Learn, practice, and master new languages with Mklingo.
        </h1>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <div className="flex flex-col items-center lg:items-start gap-y-3 max-w-[280px] w-full">
              <SignUpButton 
                mode="modal"
              >
                <Button size="default" variant="secondary" className="w-full text-sm">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton 
                mode="modal"
              >
                <Button size="default" variant="primaryOutline" className="w-full text-sm">
                  I already have an account
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Button size="default" variant="secondary" className="w-full max-w-[280px] text-sm" asChild>
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