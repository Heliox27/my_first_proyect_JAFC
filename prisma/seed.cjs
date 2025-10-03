// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { name: 'Acme' },
    update: {},
    create: { name: 'Acme' },
  });

  const password = await bcrypt.hash('Admin123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@acme.io' },
    update: {},
    create: {
      email: 'admin@acme.io',
      password,
      tenantId: tenant.id,
      profile: { create: { firstName: 'Jairo', lastName: 'Flores' } },
    },
  });

  console.log('✅ Seed OK');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
