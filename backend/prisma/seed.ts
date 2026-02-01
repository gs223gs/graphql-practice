import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.todo.count();
  if (count > 0) return;

  await prisma.todo.createMany({
    data: [
      { title: "Learn GraphQL" },
      { title: "Build a TODO app" },
      { title: "Ship it", completed: true },
    ],
  });
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
