import { type ReactNode } from "react";
import { clsx } from "clsx";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "default" | "secondary";

const variants: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  default: "bg-gray-100 text-gray-800 border-gray-200",
  secondary: "bg-purple-100 text-purple-800 border-purple-200",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
}

export function statusPendaftaranVariant(status: string): BadgeVariant {
  if (status === "Selesai") return "success";
  if (status === "Menunggu") return "warning";
  if (status === "Sedang Diperiksa") return "info";
  if (status === "Dibatalkan") return "danger";
  return "default";
}

export function statusPembayaranVariant(status: string): BadgeVariant {
  if (status === "Sudah Dibayar") return "success";
  if (status === "Belum Dibayar") return "warning";
  if (status === "Dibatalkan") return "danger";
  return "default";
}

export function statusResepVariant(status: string): BadgeVariant {
  if (status === "Sudah Diserahkan") return "success";
  if (status === "Sedang Diproses") return "info";
  if (status === "Menunggu") return "warning";
  return "default";
}

export function statusDokterVariant(status: string): BadgeVariant {
  return status === "Aktif" ? "success" : "danger";
}
