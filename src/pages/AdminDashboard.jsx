import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";


export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, paidOrders: 0, revenue: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    Promise.all([
      fetch("http://localhost:5000/admin/stats", { signal }).then((res) => res.json()),
      fetch("http://localhost:5000/admin/orders", { signal }).then((res) => res.json()),
    ])
      .then(([statsData, ordersData]) => {
        setStats(statsData);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Failed to load dashboard");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const totalOrders = stats.totalOrders ?? 0;
  const paidOrders = stats.paidOrders ?? 0;
  const revenueCents = stats.revenue ?? 0;
  const revenueDollars = (revenueCents / 100).toFixed(2);
  const conversionRate = totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(1) : "0";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-5 text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${Number(revenueDollars).toLocaleString()}`}
          change="From paid orders"
          changeType="neutral"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={String(totalOrders)}
          change="All orders"
          changeType="neutral"
          icon={ShoppingCart}
        />
        <StatCard
          title="Paid Orders"
          value={String(paidOrders)}
          change="Completed payments"
          changeType="neutral"
          icon={Package}
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change="Paid / total orders"
          changeType="neutral"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="text-sm font-semibold text-card-foreground">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Order</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-card-foreground">
                      #{String(order._id).slice(-6).toUpperCase()}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status || "pending"} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-card-foreground">
                      ${((order.amount ?? 0) / 100).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <a
                        href={`http://localhost:5000/invoice/${order._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
