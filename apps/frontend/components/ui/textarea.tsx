import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#E55473] focus:ring-2 focus:ring-[#E55473]/30 shadow-sm placeholder:text-slate-400 text-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed transition",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
