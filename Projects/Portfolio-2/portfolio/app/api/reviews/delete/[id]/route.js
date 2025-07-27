import connectDB from '@/lib/mongoose';
import Review from '@/models/review';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); 
    console.log('DELETE: Attempting to delete review:', id, 'before:', tenMinutesAgo);
    const result = await Review.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      createdAt: { $gte: tenMinutesAgo },
    });
    if (result.deletedCount === 0) {
      console.log('DELETE: Review not deleted, too old or not found:', id);
      return NextResponse.json({ message: 'Cannot delete: review too old or not found' }, { status: 403 });
    }
    console.log('DELETE: Review deleted:', id);
    return NextResponse.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('DELETE error:', error.message, error.stack);
    return NextResponse.json({ message: 'Error deleting review', error: error.message }, { status: 500 });
  }
}