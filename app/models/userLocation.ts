import prisma from 'prisma/prismaClient';

export const sendEditorLocation = async (
  userId: number,
  locationString: string,
) => {
  const location = await prisma.location.upsert({
    where: { userId },
    update: {
      time: new Date(),
      location: locationString,
    },
    create: { userId: userId, time: new Date(), location: locationString },
  });

  return location;
};

export const getAllActiveEditorsLocation = async (userId: number) => {
  const allActiveEditors = await prisma.location.findMany({
    where: { userId: { not: userId } },
    select: {
      user: {
        select: {
          name: true,
          location: { select: { location: true, time: true } },
        },
      },
    },
  });

  return allActiveEditors;
};
