import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed attorneys
  const attorneys = [
    {
      email: 'ca.aquereburu@aquereburu-partners.com',
      name: 'Me Coffi Alexis AQUEREBURU',
      role: 'AVOCAT' as const,
    },
    {
      email: 'cf.adama@aquereburu-partners.com',
      name: 'Me Claude Folly ADAMA',
      role: 'AVOCAT' as const,
    },
    {
      email: 'ka.bakoh@aquereburu-partners.com',
      name: 'Me Kossi Apow BAKOH',
      role: 'AVOCAT' as const,
    },
    {
      email: 'p.gayibor@aquereburu-partners.com',
      name: 'Me Pierrette GUILLAUME GAYIBOR',
      role: 'AVOCAT' as const,
    },
    {
      email: 'm.tidjani@aquereburu-partners.com',
      name: 'Me Moamar TIDJANI',
      role: 'AVOCAT' as const,
    },
    {
      email: 'y.gamisso@aquereburu-partners.com',
      name: 'Me Yvette GAMISSO-YEVENOU',
      role: 'AVOCAT' as const,
    },
    {
      email: 'e.sossoe@aquereburu-partners.com',
      name: 'Mlle Essi D. Mansan SOSSOE',
      role: 'AVOCAT' as const,
    },
    {
      email: 'i.dzoka@aquereburu-partners.com',
      name: 'Me Israël Eli K. DZOKA',
      role: 'AVOCAT' as const,
    },
    {
      email: 's.ayim@aquereburu-partners.com',
      name: 'Me Séphora P. Magnim AYIM',
      role: 'AVOCAT' as const,
    },
  ];

  for (const attorney of attorneys) {
    await prisma.user.upsert({
      where: { email: attorney.email },
      update: {},
      create: attorney,
    });
  }

  // Seed admin
  await prisma.user.upsert({
    where: { email: 'admin@aquereburu-partners.com' },
    update: {},
    create: {
      email: 'admin@aquereburu-partners.com',
      name: 'Administrateur',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
