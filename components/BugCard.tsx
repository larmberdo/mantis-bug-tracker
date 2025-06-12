import { Bug, StatusConfig } from '@/types/bug';

interface BugCardProps {
  bug: Bug;
  statusConfig: StatusConfig;
}

export default function BugCard({ bug, statusConfig }: BugCardProps) {
  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  const formatSteps = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div className="bug-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            🆔 {bug.id}: {bug.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className={`status-badge status-${bug.status}`}>
              {statusConfig.emoji} {statusConfig.label}
              {bug.note && `: ${bug.note}`}
            </span>
            {bug.assignee && (
              <span>
                <strong>👤 处理人员:</strong> {bug.assignee}
              </span>
            )}
          </div>
        </div>
      </div>

      {bug.description && (
        <div className="mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <strong className="text-gray-700">📝 问题描述:</strong>
            <div className="mt-2 text-gray-800">
              {formatDescription(bug.description)}
            </div>
          </div>
        </div>
      )}

      {bug.steps && (
        <div className="mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <strong className="text-gray-700">🔄 复现步骤:</strong>
            <div className="mt-2 text-gray-800">
              {formatSteps(bug.steps)}
            </div>
          </div>
        </div>
      )}

      {bug.screenshotPath && (
        <div className="mb-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <strong className="text-gray-700">📸 截图路径:</strong>
            <div className="mt-2 text-gray-800 font-mono text-sm">
              "{bug.screenshotPath}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 