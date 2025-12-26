import { Calendar, Clock, Shield } from "lucide-react";

/**
 * ProfileStats Component
 * 
 * Displays user statistics and account information.
 * Modern card grid layout with icons.
 */

export function ProfileStats() {
  const stats = [
    {
      icon: Calendar,
      label: "Member Since",
      value: "December 2024",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950/50",
    },
    {
      icon: Clock,
      label: "Last Active",
      value: "Just now",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950/50",
    },
    {
      icon: Shield,
      label: "Account Status",
      value: "Verified",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-950/50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
          >
            {/* Icon */}
            <div className={`mb-3 inline-flex rounded-lg p-3 ${stat.bgColor}`}>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{stat.value}</p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        );
      })}
    </div>
  );
}
