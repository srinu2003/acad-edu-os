import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  })
}

export function getAttendanceColor(percentage: number): string {
  if (percentage < 75) return "text-destructive"
  if (percentage < 85) return "text-chart-3"
  return "text-chart-2"
}

export function getAttendanceBg(percentage: number): string {
  if (percentage < 75) return "bg-destructive/10"
  if (percentage < 85) return "bg-chart-3/10"
  return "bg-chart-2/10"
}

export function getGradeColor(grade: string): string {
  if (grade === "A+" || grade === "A") return "bg-chart-2/15 text-chart-2"
  if (grade === "B+" || grade === "B") return "bg-chart-1/15 text-chart-1"
  if (grade === "C+" || grade === "C") return "bg-chart-3/15 text-chart-3"
  return "bg-destructive/15 text-destructive"
}
