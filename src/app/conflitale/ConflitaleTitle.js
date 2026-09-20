import { Swords } from "lucide-react";

export default function ConflitaleTitle() {
    return (
        <h1
            className="flex items-center justify-center text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-title", gap: "0.05em" }}
        >
            <span>CONFLITA</span>
            <Swords
                className="text-amber-600"
                style={{ width: "0.9em", height: "0.9em"}}
                strokeWidth={2.5}
            />
            <span>LE</span>
        </h1>
    )
}