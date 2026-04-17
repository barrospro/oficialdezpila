import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  id?: string;
};

export function Reveal({ children, className, delay = 0, as = "div", id }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Comp = as;

  return (
    <Comp
      id={id}
      ref={ref as never}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
