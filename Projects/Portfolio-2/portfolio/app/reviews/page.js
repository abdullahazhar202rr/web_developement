'use client';

import Navbar from '@/components/UI/Navbar';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import toast from 'react-hot-toast';
import FireButton from '@/components/Button';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', rating: 5, comment: '' },
  });

  useEffect(() => {
    const fetchReviews = async () => {
      await toast.promise(
        (async () => {
          const res = await fetch('/api/reviews');
          if (!res.ok) throw new Error('Failed to fetch reviews');
          const data = await res.json();
          setReviews(data);
        })(),
        {
          loading: 'Loading reviews...',
          success: 'Reviews loaded!',
          error: 'Error loading reviews',
        }
      );
    };
    fetchReviews();
  }, []);

  const onSubmit = async (data) => {
    await toast.promise(
      (async () => {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to submit');
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        reset();
      })(),
      {
        loading: 'Submitting your review...',
        success: 'Review submitted!',
        error: 'Failed to submit review',
      }
    );
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    await toast.promise(
      (async () => {
        const res = await fetch(`/api/reviews/delete/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Cannot delete');
        setReviews(reviews.filter((review) => review._id !== id));
      })(),
      {
        loading: 'Deleting review...',
        success: 'Review deleted!',
        error: 'Cannot delete: review older than 10 min or not found',
      }
    );
  };

  const canDelete = (createdAt) => {
    const reviewTime = new Date(createdAt);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    return reviewTime >= tenMinutesAgo;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[image:var(--background)] dark:bg-black">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Customer Reviews
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-800 dark:text-gray-300">
              Share your experience with us! Your feedback helps us improve.
            </p>
          </div>

          {/* Review Form */}
          <div className="bg-[image:var(--background)] dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8 lg:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Leave a Review
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`mt-1 block w-full p-3 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </label>
                <select
                  id="rating"
                  {...register('rating', { required: 'Rating is required' })}
                  className="mt-1 block w-full p-3 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} Star{value > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>}
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comment
                </label>
                <textarea
                  id="comment"
                  {...register('comment', {
                    required: 'Comment is required',
                    minLength: { value: 6, message: 'At least 6 characters' },
                  })}
                  rows={4}
                  className={`mt-1 block w-full p-3 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.comment ? 'border-red-500' : ''}`}
                  placeholder="Share your thoughts..."
                />
                {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>}
              </div>

              <div className="flex justify-end">
                <FireButton text="Submit Review" />
              </div>
            </form>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to share!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.539 1.118l-3.375-2.453a1 1 0 00-1.175 0l-3.375 2.453c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.236 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{review.comment}</p>

                  {canDelete(review.createdAt) && (
                    <div className="text-right mt-2">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete (available for 10 minutes)
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-6 border-t border-gray-700 text-gray-400 text-sm">
        <div className="text-center sm:text-left">
          <p>Phone: 03140632577 ❤️<br /> Email: abdullahazhar202rr@gmail.com</p>
        </div>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Abdullah Azhar. All rights reserved.
          <br /> Built with Next.js and Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/abdullahazhar202rr" target="_blank">
            <Image src="/githubpic.webp" width={40} height={40} className="rounded-full" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/abdullahazhar202" target="_blank">
            <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
      </footer>
    </div>
  );
}
