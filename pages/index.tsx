import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Bug, BugData } from '@/types/bug';
import BugCard from '@/components/BugCard';
import StatusLegend from '@/components/StatusLegend';
import BugFilter from '@/components/BugFilter';
import bugData from '@/data/bugs.json';

interface HomeProps {
  bugs: Bug[];
  statusConfig: BugData['statusConfig'];
}

export default function Home({ bugs, statusConfig }: HomeProps) {
  const [filteredBugs, setFilteredBugs] = useState<Bug[]>(bugs);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // 只在客户端设置当前时间，避免hydration错误
    setCurrentTime(new Date().toLocaleString('zh-CN'));
  }, []);

  // 按日期分组bugs
  const bugsByDate = filteredBugs.reduce((acc, bug) => {
    const date = bug.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(bug);
    return acc;
  }, {} as Record<string, Bug[]>);

  // 按日期排序（最新的在前）
  const sortedDates = Object.keys(bugsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    });
  };

  // 统计信息
  const getStatusStats = () => {
    const stats = Object.keys(statusConfig).reduce((acc, status) => {
      acc[status] = filteredBugs.filter(bug => bug.status === status).length;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <>
      <Head>
        <title>Mantis ECMS Bug 跟踪记录</title>
        <meta name="description" content="Mantis ECMS Bug 跟踪记录系统" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 pb-4 border-b-4 border-blue-500">
              🐛 Mantis ECMS Bug 跟踪记录
            </h1>

            <StatusLegend statusConfig={statusConfig} />

            {/* 统计信息 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 统计概览</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(statusStats).map(([status, count]) => (
                  <div key={status} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600">
                      {statusConfig[status]?.emoji} {statusConfig[status]?.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-lg font-semibold text-gray-700">
                  显示 {filteredBugs.length} / {bugs.length} 个Bug
                </span>
              </div>
            </div>

            {/* 筛选功能 */}
            <BugFilter 
              bugs={bugs}
              statusConfig={statusConfig}
              onFilterChange={setFilteredBugs}
            />

            {/* Bug列表 */}
            {sortedDates.length > 0 ? (
              sortedDates.map(date => (
                <div key={date} className="mb-12">
                  <div className="border-t-2 border-blue-500 pt-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4 border-l-4 border-blue-500">
                      📅 {formatDate(date)} ({bugsByDate[date].length} 个Bug)
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {bugsByDate[date].map(bug => (
                      <BugCard
                        key={bug.id}
                        bug={bug}
                        statusConfig={statusConfig[bug.status]}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">🔍 没有找到符合条件的Bug</div>
                <div className="text-gray-400">请调整筛选条件后重试</div>
              </div>
            )}

            <div className="text-center text-gray-600 mt-12 pt-8 border-t border-gray-200">
              <p className="mb-2">
                📅 最后更新时间: {currentTime || '加载中...'}
              </p>
              <p>🔗 如有问题请联系开发团队</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      bugs: bugData.bugs,
      statusConfig: bugData.statusConfig,
    },
  };
}; 