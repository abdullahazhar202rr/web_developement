import connectDB from '@/lib/mongoose';
import Review from '@/models/review';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const { name, rating, comment } = await request.json();
  if (!name || !rating || !comment) {
    return NextResponse.json({ message: 'Fill all fields' }, { status: 400 });
  }
  try {
    const review = new Review({ name, rating: parseInt(rating), comment });
    await review.save();
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving review' }, { status: 500 });
  }
}