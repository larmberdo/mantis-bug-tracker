import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Bug, BugData } from '@/types/bug';
import BugCard from '@/components/BugCard';
import StatusLegend from '@/components/StatusLegend';
import bugData from '@/data/bugs.json';

interface HomeProps {
  bugs: Bug[];
  statusConfig: BugData['statusConfig'];
}

export default function Home({ bugs, statusConfig }: HomeProps) {
  // 按日期分组bugs
  const bugsByDate = bugs.reduce((acc, bug) => {
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

            {sortedDates.map(date => (
              <div key={date} className="mb-12">
                <div className="border-t-2 border-blue-500 pt-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4 border-l-4 border-blue-500">
                    📅 {formatDate(date)}
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
            ))}

            <div className="text-center text-gray-600 mt-12 pt-8 border-t border-gray-200">
              <p className="mb-2">
                📅 最后更新时间: {new Date().toLocaleString('zh-CN')}
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