import { useState } from "react";
import {Share2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export function ShareButton({ url, title }: { url: string; title: string }) {
    const [tooltip, setTooltip] = useState("");

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch {
                console.error("Share cancelled");
            }
        } else {
            navigator.clipboard.writeText(url);
            setTooltip("Copied!");
            setTimeout(() => setTooltip(""), 2000);
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={handleShare}
            >
                <Share2 className="h-5 w-5 text-gray-600" />
            </Button>
            {tooltip && (
                <span className="absolute bottom-full mb-2 px-2 py-1 text-sm bg-gray-700 text-white rounded">
          {tooltip}
        </span>
            )}
        </div>
    );
}
