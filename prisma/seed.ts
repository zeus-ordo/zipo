import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      id: 'basic-' + crypto.randomUUID().slice(0, 8),
      name: 'Basic',
      price: 9.9,
      orderLimit: 50,
      channelLimit: 1,
      features: {},
      isDefault: true,
      isActive: true,
    },
    {
      id: 'pro-' + crypto.randomUUID().slice(0, 8),
      name: 'Pro',
      price: 19.9,
      orderLimit: 200,
      channelLimit: 2,
      features: {
        productCatalog: true,
        inventory: true,
      },
      isDefault: false,
      isActive: true,
    },
    {
      id: 'enterprise-' + crypto.randomUUID().slice(0, 8),
      name: 'Enterprise',
      price: 99,
      orderLimit: 0,
      channelLimit: 5,
      features: {
        productCatalog: true,
        inventory: true,
        advancedReports: true,
        apiAccess: true,
        prioritySupport: true,
      },
      isDefault: false,
      isActive: true,
    },
  ];

  await prisma.plan.deleteMany({});

  for (const plan of plans) {
    await prisma.plan.create({ data: plan });
    console.log(`Created plan: ${plan.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
