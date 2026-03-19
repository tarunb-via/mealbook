import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const meals = [
  {
    name: 'Tuscan Braised Short Rib',
    category: 'Comfort classic',
    description: 'Red wine braised beef short rib with parmesan polenta, roasted carrots, and rosemary jus.',
    pricePerPerson: 34,
    prepTime: '4 hours slow cooked',
    serves: '2 to 8 people',
    spiceLevel: 'Mild and rich',
  },
  {
    name: 'Coconut Curry Supper',
    category: 'Vibrant favorite',
    description: 'Golden coconut curry with charred vegetables, jasmine rice, pickled onions, and warm naan.',
    pricePerPerson: 24,
    prepTime: '90 minutes',
    serves: '2 to 10 people',
    spiceLevel: 'Medium warmth',
  },
  {
    name: 'Garden Lasagna Bake',
    category: 'Family table',
    description: 'Layers of basil ricotta, roasted zucchini, spinach, mozzarella, and slow-simmered tomato sauce.',
    pricePerPerson: 22,
    prepTime: '2 hours',
    serves: '4 to 12 people',
    spiceLevel: 'Kid-friendly',
  },
  {
    name: 'Harissa Roast Chicken',
    category: 'Dinner party',
    description: 'Crisp-skinned roast chicken with harissa glaze, lemon potatoes, whipped feta, and herbs.',
    pricePerPerson: 29,
    prepTime: '2.5 hours',
    serves: '2 to 6 people',
    spiceLevel: 'Bright and bold',
  },
];

const sampleBookings = [
  {
    customerName: 'Maya Thompson',
    email: 'maya@example.com',
    city: 'Brooklyn',
    guests: 4,
    eventDate: new Date('2026-03-24'),
    notes: 'Birthday dinner with one gluten-free guest.',
    mealName: 'Tuscan Braised Short Rib',
  },
  {
    customerName: 'Ethan Rivera',
    email: 'ethan@example.com',
    city: 'Queens',
    guests: 6,
    eventDate: new Date('2026-03-27'),
    notes: 'Pickup after 6 PM please.',
    mealName: 'Garden Lasagna Bake',
  },
];

async function main() {
  await prisma.booking.deleteMany();
  await prisma.meal.deleteMany();

  await prisma.meal.createMany({ data: meals });

  const storedMeals = await prisma.meal.findMany();
  const mealMap = new Map(storedMeals.map((meal) => [meal.name, meal.id]));

  for (const booking of sampleBookings) {
    await prisma.booking.create({
      data: {
        customerName: booking.customerName,
        email: booking.email,
        city: booking.city,
        guests: booking.guests,
        eventDate: booking.eventDate,
        notes: booking.notes,
        mealId: mealMap.get(booking.mealName),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
