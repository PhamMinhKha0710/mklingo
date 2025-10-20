import Image from "next/image";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkLoading,
    ClerkLoaded,
} from '@clerk/nextjs';
import { Loader } from "lucide-react";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Mklingo.io</h1>
                </div>
                
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-x-3">
                            <SignInButton
                                mode="modal"
                                forceRedirectUrl="/learn"
                            >
                                <button className="text-slate-700 hover:text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors">
                                    Login
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    );
}