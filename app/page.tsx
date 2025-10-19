import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button size="lg">
        Click me
      </Button>
      <p className="text-green-500 font-bold">
        Hello, kha!</p>
    </div>
  )
}
