export interface Bug {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'transfer' | 'not-bug';
  assignee: string;
  date: string;
  description: string;
  steps: string;
  screenshotPath: string;
  note?: string;
}

export interface StatusConfig {
  label: string;
  emoji: string;
  description: string;
  color: 'success' | 'danger' | 'warning';
}

export interface BugData {
  bugs: Bug[];
  statusConfig: Record<string, StatusConfig>;
} 