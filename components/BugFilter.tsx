import { useState, useEffect } from 'react';
import { Bug, StatusConfig } from '@/types/bug';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, RotateCcw } from 'lucide-react';

interface BugFilterProps {
  bugs: Bug[];
  statusConfig: Record<string, StatusConfig>;
  onFilterChange: (filteredBugs: Bug[]) => void;
}

export default function BugFilter({ bugs, statusConfig, onFilterChange }: BugFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('__all__');
  const [selectedDate, setSelectedDate] = useState('__all__');
  const [selectedAssignee, setSelectedAssignee] = useState('__all__');

  // 获取所有唯一的处理人员
  const uniqueAssignees = Array.from(new Set(bugs.map(bug => bug.assignee).filter(Boolean)));
  
  // 获取所有唯一的日期
  const uniqueDates = Array.from(new Set(bugs.map(bug => bug.date).filter(Boolean))).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const applyFilters = () => {
    let filteredBugs = bugs;

    // 状态筛选
    if (selectedStatus && selectedStatus !== '__all__') {
      filteredBugs = filteredBugs.filter(bug => bug.status === selectedStatus);
    }

    // 日期筛选 - 精确匹配选中的日期
    if (selectedDate && selectedDate !== '__all__') {
      filteredBugs = filteredBugs.filter(bug => bug.date === selectedDate);
    }

    // 处理人员筛选
    if (selectedAssignee && selectedAssignee !== '__all__') {
      filteredBugs = filteredBugs.filter(bug => bug.assignee === selectedAssignee);
    }

    onFilterChange(filteredBugs);
  };

  const resetFilters = () => {
    setSelectedStatus('__all__');
    setSelectedDate('__all__');
    setSelectedAssignee('__all__');
    onFilterChange(bugs);
  };

  // 实时应用筛选
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedDate, selectedAssignee]);

  // 格式化日期显示
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">筛选功能</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* 状态筛选 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">状态筛选</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">所有状态</SelectItem>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{config.emoji}</span>
                    <span>{config.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 日期筛选 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            日期筛选
          </label>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger>
              <SelectValue placeholder="选择日期" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">所有日期</SelectItem>
              {uniqueDates.map(date => (
                <SelectItem key={date} value={date}>
                  {formatDateForDisplay(date)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 处理人员筛选 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">处理人员</label>
          <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
            <SelectTrigger>
              <SelectValue placeholder="选择处理人员" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">所有人员</SelectItem>
              {uniqueAssignees.map(assignee => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          找到 {bugs.filter(bug => {
            const statusMatch = selectedStatus === '__all__' || bug.status === selectedStatus;
            const dateMatch = selectedDate === '__all__' || bug.date === selectedDate;
            const assigneeMatch = selectedAssignee === '__all__' || bug.assignee === selectedAssignee;
            return statusMatch && dateMatch && assigneeMatch;
          }).length} 个Bug
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          重置筛选
        </Button>
      </div>
    </div>
  );
} 