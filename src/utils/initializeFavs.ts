import { PrismaClient } from '@prisma/client';

export async function initializeFavs() {
  const prisma = new PrismaClient();
  const favoritesCount = await prisma.favorites.count();
  if (favoritesCount === 0) {
    await prisma.favorites.create({
      data: {
        artists: [],
        tracks: [],
        albums: [],
      },
    });
  }

  await prisma.$disconnect();
}
