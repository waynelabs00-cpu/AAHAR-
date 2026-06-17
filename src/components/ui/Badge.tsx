import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline'
  className?: string
  children?: React.ReactNode
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700",
    success: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    warning: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
    outline: "text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
