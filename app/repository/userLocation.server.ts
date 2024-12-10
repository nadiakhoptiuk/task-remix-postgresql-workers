import prisma from 'prisma/prismaClient';

export const getAllActiveEditorsLocation = async (userId: number) => {
  const allActiveEditors = await prisma.location.findMany({
    where: { userId: { not: userId } },
    select: {
      columnId: true,
      rowIndex: true,
      time: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return allActiveEditors;
};

export const sendUserLocation = async ({
  rowIndex,
  columnId,
  editorId,
}: {
  rowIndex: string;
  columnId: string;
  editorId: string;
}) => {
  return await prisma.location.upsert({
    where: { userId: Number(editorId) },
    update: {
      time: new Date(),
      rowIndex: rowIndex,
      columnId: columnId,
    },
    create: {
      userId: Number(editorId),
      time: new Date(),
      columnId: columnId,
      rowIndex: rowIndex,
    },
  });
};

export const deleteCurrentUserLocation = async (editorId: string) => {
  return await prisma.location.delete({
    where: { userId: Number(editorId) },
  });
};

export const deleteAllUsersLocations = async () => {
  return await prisma.location.deleteMany({
    where: {
      time: { lt: new Date(Date.now() - 5 * 60 * 1000) },
    },
  });
};
