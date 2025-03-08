import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash passwords
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tims.edu' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@tims.edu',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  // Create Student Users
  const students = await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john@tims.edu', password: passwordHash, role: 'STUDENT' },
      { name: 'Jane Smith', email: 'jane@tims.edu', password: passwordHash, role: 'STUDENT' },
      { name: 'Alice Johnson', email: 'alice@tims.edu', password: passwordHash, role: 'STUDENT' },
      { name: 'Bob Williams', email: 'bob@tims.edu', password: passwordHash, role: 'STUDENT' },
      { name: 'Charlie Brown', email: 'charlie@tims.edu', password: passwordHash, role: 'STUDENT' },
    ],
  });

  // Fetch users
  const users = await prisma.user.findMany({ where: { role: 'STUDENT' } });

  // Create Tags
  const tags = ['DSA', 'Web Development', 'AI/ML', 'Cloud Computing', 'Cybersecurity'];

  await prisma.tag.createMany({
    data: tags.map((tag) => ({ name: tag })),
    skipDuplicates: true,
  });

  // Create Posts
  const posts = [
    { content: 'Learning DSA on LeetCode!', userId: users[0].id, tags: ['DSA'] },
    { content: 'Understanding system design principles.', userId: users[1].id, tags: ['DSA'] },
    { content: 'Developing my first full-stack app with Next.js.', userId: users[2].id, tags: ['Web Development'] },
    { content: 'Exploring machine learning algorithms.', userId: users[3].id, tags: ['AI/ML'] },
    { content: 'Deploying applications on AWS!', userId: users[4].id, tags: ['Cloud Computing'] },
    { content: 'Studying network security and ethical hacking.', userId: users[0].id, tags: ['Cybersecurity'] },
  ];

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });

  // Create Leaderboard Entries (Based on Post Count)
  await prisma.leaderboard.createMany({
    data: users.map((user, index) => ({
      userId: user.id,
      rank: index + 1,
      score: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
    })),
    skipDuplicates: true,
  });

  // Create Streaks (Tracking Weekly Post Streaks)
  await prisma.streak.createMany({
    data: users.map((user) => ({
      userId: user.id,
      currentStreak: Math.floor(Math.random() * 5), // Random streak between 0-5 weeks
      longestStreak: Math.floor(Math.random() * 10), // Random longest streak between 0-10 weeks
    })),
    skipDuplicates: true,
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
