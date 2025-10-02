import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import InterviewCard from '@/components/InterviewCard'

// Import dummyInterviews from your index.ts file
import { dummyInterviews } from '@/constants/index'  // adjust the path if needed

const Page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="card-cta flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-2xl font-bold">
            Get Interview Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-600">
            Practice with real interview questions and receive instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          priority
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interview Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="interview-section flex flex-wrap gap-4">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      {/* Interview List Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-xl font-semibold">Your Interviews</h2>
        <div className="interviews-section p-4 border rounded-md text-gray-500">
          <p>You haven't taken any interviews yet.</p>
        </div>
      </section>

      {/* Take an Interview Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interview-section flex flex-wrap gap-4">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Page
