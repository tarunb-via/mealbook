import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/meals', async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({ orderBy: { id: 'asc' } });
    res.json(meals);
  } catch (error) {
    console.error('Meals fetch error:', error);
    res.status(500).json({ error: 'Unable to load meals.' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { meal: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });

    res.json(
      bookings.map((booking) => ({
        ...booking,
        eventDateLabel: format(new Date(booking.eventDate), 'EEE, MMM d'),
      }))
    );
  } catch (error) {
    console.error('Bookings fetch error:', error);
    res.status(500).json({ error: 'Unable to load bookings.' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { customerName, email, city, guests, eventDate, notes, mealId } = req.body;

    if (!customerName || !email || !city || !guests || !eventDate || !mealId) {
      return res.status(400).json({ error: 'Please complete all required booking details.' });
    }

    const meal = await prisma.meal.findUnique({ where: { id: Number(mealId) } });
    if (!meal) {
      return res.status(404).json({ error: 'Selected meal was not found.' });
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        email,
        city,
        guests: Number(guests),
        eventDate: new Date(eventDate),
        notes: notes || '',
        mealId: meal.id,
      },
      include: { meal: true },
    });

    res.status(201).json({
      ...booking,
      eventDateLabel: format(new Date(booking.eventDate), 'EEE, MMM d'),
    });
  } catch (error) {
    console.error('Booking create error:', error);
    res.status(500).json({ error: 'Unable to create booking.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('MealBook server running');
});
