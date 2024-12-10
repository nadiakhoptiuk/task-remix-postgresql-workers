import prisma from 'prisma/prismaClient';
import { PAGINATION_LIMIT } from '~/constants/constants';

import { NewTagType } from '~/types/common.types';

export async function getAllTagsList() {
  return await prisma.tag.findMany({
    select: { id: true, name: true },
    orderBy: [{ name: 'asc' }],
  });
}

export async function getTagsList(
  page: number,
  query?: string | undefined | null,
) {
  if (!query) {
    const totalCount = await prisma.tag.count();
    const pagesCount = Math.ceil(totalCount / PAGINATION_LIMIT);

    const actualPage = page > pagesCount ? pagesCount : page;

    const tags = await prisma.tag.findMany({
      skip: (actualPage - 1) * PAGINATION_LIMIT,
      take: PAGINATION_LIMIT,
      select: { id: true, name: true },
      orderBy: [{ name: 'asc' }],
    });

    return { tags, actualPage, pagesCount };
  }

  const totalCount = await prisma.tag.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });
  const pagesCount = Math.ceil(totalCount / PAGINATION_LIMIT);
  const actualPage = page > pagesCount ? pagesCount : page;

  const tags = await prisma.tag.findMany({
    where: { name: { contains: query, mode: 'insensitive' } },
    skip: actualPage !== 0 ? (actualPage - 1) * PAGINATION_LIMIT : 0,
    take: PAGINATION_LIMIT,
    select: { id: true, name: true },
    orderBy: [{ name: 'asc' }],
  });

  return { tags, actualPage, pagesCount };
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
