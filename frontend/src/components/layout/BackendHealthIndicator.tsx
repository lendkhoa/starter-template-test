import { useHealthCheck } from "@/hooks/useHealthCheck";

/**
 * BackendHealthIndicator Component
 * 
 * Displays the backend server health status.
 * Shows loading, error, or online status with version.
 */

export function BackendHealthIndicator() {
  const { data, loading, error } = useHealthCheck();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3 text-sm shadow-sm">
      <span className="text-muted-foreground">Backend Status</span>
      {loading ? (
        <span className="flex items-center text-yellow-500 animate-pulse">
          <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span> Connecting...
        </span>
      ) : error ? (
        <span className="flex items-center text-red-500">
          <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span> Offline
        </span>
      ) : (
        <span className="flex items-center text-green-500">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span> Online ({data?.version})
        </span>
      )}
    </div>
  );
}
