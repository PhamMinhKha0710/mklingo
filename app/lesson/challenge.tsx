import { challenges, challengesOptions } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";
type Props = {
    options: typeof challengesOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled: boolean;
    type: typeof challenges.$inferSelect["type"];
}

export const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
}: Props ) => {
    return (
        <div className={cn("grid gap-2", 
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" && "grid-cols-2 lg:grid-cols-3"
        )}>
            {options.map((option,i) => (
                <Card
                key={option.id}
                id={option.id}
                text={option.text}
                imageSrc={option.imageSrc}
                shortcut={`${i + 1}`}
                //TODO : remove hardoded true
                selected={selectedOption === option.id}
                onClick={() => onSelect(option.id)}
                status={status}
                audioSrc={option.audioSrc}
                disabled={disabled}
                type={type}
                />
            ))}
        </div>
    );
};