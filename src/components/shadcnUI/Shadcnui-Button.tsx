import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = cva(
  "flex justify-center items-center border border-transparent shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-500 ease-in-out",
  {
    variants: {
      variant: {
        fullWidth:
          "w-full bg-indigo-600 text-white hover:bg-indigo-700 text-base py-3",
        paddingWidth:
          "bg-indigo-600 text-white hover:bg-indigo-700 text-base py-3 px-6",
        bgIcon:
          "bg-indigo-600 text-white hover:bg-indigo-700 text-base py-4 px-4",
        icon: "border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white px-6 py-3 text-xl",
        iconSmall:
          "border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white px-2 py-2 text-xl",
        link: "text-primary underline-offset-4 hover:underline",
      },
      round: {
        default: "rounded",
        sm: "rounded-sm ",
        md: "rounded-md ",
        lg: "rounded-lg ",
        xl: "rounded-xl ",
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ShadcnUIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, round, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, className, round }))}
        ref={ref}
        {...props}
      />
    );
  }
);

ShadcnUIButton.displayName = "ShadcnUIButton";

export { ShadcnUIButton, buttonVariants };
