import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  delivered: "bg-success/10 text-success",
  shipped: "bg-info/10 text-info",
  processing: "bg-warning/10 text-warning",
  pending: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground",
  archived: "bg-muted text-muted-foreground",
  inactive: "bg-destructive/10 text-destructive",
  admin: "bg-primary/10 text-primary",
  manager: "bg-info/10 text-info",
  editor: "bg-warning/10 text-warning",
  viewer: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status] || "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}
