import { Prisma, PrismaClient } from '@prisma/client';
import { passwordHash } from '~/utils/passwordHash';

const prisma = new PrismaClient();

async function seed() {
  const password = 'admin1234';
  const hashedPassword = await passwordHash(password);

  const firstAdmin: Prisma.UserCreateInput = {
    email: 'admin.example@mail.remix',
    name: 'Admin',
    password: hashedPassword,
    role: 'ADMIN',
  };

  const existedUser = await prisma.user.findUnique({
    where: {
      email: 'admin.example@mail.remix',
    },
  });

  if (existedUser) {
    console.log('First Admin is already exist in database');
    return;
  }

  await prisma.user.create({ data: firstAdmin });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
