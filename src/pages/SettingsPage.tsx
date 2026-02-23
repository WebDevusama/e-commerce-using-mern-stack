import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your store configuration</p>
      </div>

      {/* Store Info */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-sm font-semibold text-card-foreground">Store Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Store Name</Label>
            <Input defaultValue="My E-Commerce Store" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Store Email</Label>
            <Input defaultValue="contact@store.com" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs text-muted-foreground">Store URL</Label>
            <Input defaultValue="https://mystore.com" />
          </div>
        </div>
        <Button size="sm">Save Changes</Button>
      </div>

      <Separator />

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-sm font-semibold text-card-foreground">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Order notifications", desc: "Receive alerts for new orders" },
            { label: "Low stock alerts", desc: "Get notified when stock is low" },
            { label: "Weekly reports", desc: "Receive weekly analytics reports" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="rounded-xl border border-destructive/30 bg-card p-6 space-y-4">
        <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">
          Permanently delete your store and all data. This action cannot be undone.
        </p>
        <Button variant="destructive" size="sm">Delete Store</Button>
      </div>
    </div>
  );
}
