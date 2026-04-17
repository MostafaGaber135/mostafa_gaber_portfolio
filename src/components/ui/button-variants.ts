import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-black uppercase tracking-wider text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-[3px] border-foreground active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-bold hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-bold-lg",
        secondary:
          "bg-secondary text-secondary-foreground shadow-bold hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-bold-lg",
        surface:
          "bg-foreground text-background shadow-bold-primary hover:-translate-x-[2px] hover:-translate-y-[2px]",
        outline:
          "bg-background text-foreground shadow-bold hover:bg-foreground hover:text-background hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-bold-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow-bold hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-bold-lg",
        ghost:
          "border-transparent bg-transparent shadow-none hover:bg-foreground hover:text-background",
        link:
          "border-transparent bg-transparent shadow-none text-primary underline underline-offset-4 hover:text-secondary",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
