import * as dotenv from 'dotenv';
dotenv.config();
import { prisma } from './lib/prisma';
async function main() {
  const count = await prisma.category.count();
  console.log('Categories:', count);
  const last = await prisma.category.findMany({orderBy:{createdAt:'desc'}, take: 10});
  console.log('Last added categories:', JSON.stringify(last.map(c => c.name), null, 2));
}
main().finally(() => process.exit(0));
