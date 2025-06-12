const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function addBug() {
  console.log('🐛 添加新的Bug记录\n');

  const id = await question('Bug ID (例如: 0000211): ');
  const title = await question('Bug标题: ');
  const status = await question('状态 (completed/pending/transfer/not-bug): ');
  const assignee = await question('处理人员: ');
  const date = await question('日期 (YYYY-MM-DD, 默认今天): ') || new Date().toISOString().split('T')[0];
  const description = await question('问题描述: ');
  const steps = await question('复现步骤: ');
  const screenshotPath = await question('截图路径 (可选): ');
  const note = await question('备注 (可选): ');

  const newBug = {
    id,
    title,
    status,
    assignee,
    date,
    description,
    steps,
    screenshotPath,
    ...(note && { note })
  };

  // 读取现有数据
  const dataPath = path.join(__dirname, '../data/bugs.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // 添加新bug到数组开头（最新的在前）
  data.bugs.unshift(newBug);

  // 写回文件
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

  console.log('\n✅ Bug记录已成功添加！');
  console.log('📝 记录详情:');
  console.log(`   ID: ${id}`);
  console.log(`   标题: ${title}`);
  console.log(`   状态: ${status}`);
  console.log(`   日期: ${date}`);

  rl.close();
}

addBug().catch(console.error); 