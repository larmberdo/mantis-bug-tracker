import { StatusConfig } from '@/types/bug';

interface StatusLegendProps {
  statusConfig: Record<string, StatusConfig>;
}

export default function StatusLegend({ statusConfig }: StatusLegendProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📊 状态说明</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div
            key={key}
            className={`status-badge status-${key} justify-start`}
          >
            {config.emoji} {config.label}: {config.description}
          </div>
        ))}
      </div>
    </div>
  );
} 