import prisma from 'prisma/prismaClient';
import { NewTagType } from '~/types/common.types';

export async function getTagsList() {
  return await prisma.tag.findMany({
    select: { id: true, name: true },
    orderBy: [{ name: 'asc' }],
  });
}

export async function createNewTag({ tagName, users }: NewTagType) {
  const existedTag = await prisma.tag.findUnique({
    where: {
      name: tagName,
    },
  });

  if (existedTag) {
    throw new Error('Tag with such name is already exist in database');
  }

  const existedUsers = await prisma.user.findMany({
    where: {
      id: { in: users.map(user => Number(user)) },
    },
  });

  if (existedUsers.length === 0) {
    return await prisma.tag.create({
      data: {
        name: tagName,
      },
    });
  }

  const tag = await prisma.tag.create({
    data: {
      name: tagName,
    },
    include: {
      users: true,
    },
  });

  await prisma.userTag.createMany({
    data: existedUsers.map(user => {
      return { userId: user.id, tagId: tag.id };
    }),
  });

  return tag;
}

export async function getTagById(tagId: number) {
  return await prisma.tag.findUnique({
    where: { id: tagId },
    include: {
      users: {
        select: {
          user: { select: { name: true, role: true, id: true } },
        },
      },
    },
  });
}

export async function updateTag(
  tagId: number,
  { tagName, users }: { tagName: string; users: string[] },
) {
  const existedTag = await prisma.tag.findUnique({
    where: {
      name: tagName,
    },
  });

  if (!existedTag) {
    throw new Error('Tag with such name is not exist in database');
  }

  const existedUsers = await prisma.user.findMany({
    where: {
      id: { in: users.map(user => Number(user)) },
    },
  });

  if (existedUsers.length === 0) {
    return await prisma.tag.update({
      where: { id: Number(tagId) },
      data: {
        name: tagName,
        users: {
          set: [],
        },
      },
      include: {
        users: true,
      },
    });
  }

  await prisma.userTag.deleteMany({
    where: { tagId: existedTag.id },
  });

  await prisma.userTag.createMany({
    data: existedUsers.map(user => {
      return { userId: user.id, tagId: existedTag.id };
    }),
  });

  return existedTag;
}

export async function deleteTagById(tagId: number) {
  const existedTag = await prisma.tag.findUnique({
    where: {
      id: tagId,
    },
  });

  if (!existedTag) {
    throw new Error('Tag with such id is not exist in database');
  }

  await prisma.userTag.deleteMany({
    where: { tagId },
  });

  await prisma.tag.delete({
    where: { id: tagId },
  });
}
