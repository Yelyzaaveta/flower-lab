import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}

export function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
  return (
    <div className={cn("mx-auto py-20 px-10", className)}>
      {children}
    </div>
  );
}
