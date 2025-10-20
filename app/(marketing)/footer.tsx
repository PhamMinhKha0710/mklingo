import Image from "next/image";
import { Button } from "@/components/ui/button";
const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost">
                    <Image 
                        src="/eg.svg" 
                        alt="English" 
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    English
                </Button>
                <Button size="lg" variant="ghost">
                    <Image 
                        src="/vn.svg" 
                        alt="Vietnam" 
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Vietnam
                </Button>
                <Button size="lg" variant="ghost">
                    <Image 
                        src="/america.svg" 
                        alt="American" 
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    American
                </Button>
                <Button size="lg" variant="ghost">
                    <Image 
                        src="/duc.svg" 
                        alt="Germany" 
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Germany
                </Button>
                <Button size="lg" variant="ghost">
                    <Image 
                        src="/us.svg" 
                        alt="Australia" 
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Australia
                </Button>
            </div>
        </footer>
    );
}

export default Footer;