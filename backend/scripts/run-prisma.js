import { config } from 'dotenv';
import { spawn } from 'child_process';

config({ path: '.env.development' });

const args = process.argv.slice(2);

const prisma = spawn('npx', ['prisma', ...args], {
  stdio: 'inherit',
  shell: true
});

prisma.on('close', (code) => {
  process.exit(code);
});
