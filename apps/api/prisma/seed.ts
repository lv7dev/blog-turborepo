import 'dotenv/config';
import { faker } from '@faker-js/faker/locale/zu_ZA';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { hash } from 'argon2';

// Initialize the adapter according to your driver's requirements
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]*/g, ''); // Remove all non-word characters except hyphens
}

async function main() {
  const defaultPassword = await hash('123');

  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 40 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.url(),
    authorId: faker.number.int({ min: 1, max: 10 }), // Assuming user IDs are from 1 to 10
    published: true,
  }));

  await Promise.all(
    posts.map(
      async (post) =>
        await prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({ length: 20 }).map(() => ({
                  content: faker.lorem.sentences(),
                  authorId: faker.number.int({ min: 1, max: 10 }), // Assuming user IDs are from 1 to 10
                })),
              },
            },
          },
        }),
    ),
  );

  console.log('Seeding Completed!');
}

async function bootstrap() {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void bootstrap();
