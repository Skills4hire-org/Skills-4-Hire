import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import { blogPosts } from '@/utils/database'
import { dateFormatter } from '@/utils/format'
import { ChevronLeft, Dot, Link2 } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function BlogPost() {
  return (
    <Container className="pt-4 md:pt-10 pb-10">
      <div className="space-y-10 md:space-y-12">
        <section className="space-y-4">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-xs md:text-sm group"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="group-hover:text-primary group-hover:underline">
              All Posts
            </span>
          </Link>
          <div className="flex items-center gap-6 text-xs md:text-sm">
            <span className="capitalizes bg-muted rounded-full py-0.5 w-max px-2.5 ">
              Articles
            </span>
            <span>4 min read</span>
          </div>
          <h2 className="text-xl md:text-2xl">
            The Future of Local Hiring: Trust, Skills & Technology
          </h2>
          <figure className="w-full h-44 md:h-54 lg:h-64 bg-gray-400 rounded-lg"></figure>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-y-2 gap-x-8 flex-1">
              <div>
                <p className="text-muted-foreground text-xs block md:text-sm">
                  Written by
                </p>
                <p className="text-sm md:text-base">Michelle Owolabi</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm block">
                  Published on
                </p>
                <p className="text-sm md:text-base">January 14, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="bg-gray-200 p-1 md:p-1.5 rounded-full">
                <Link2 className="w-4 h-4 md:w-5 md:h-5 -rotate-45" />
              </div>
              <div className="bg-gray-200 p-1 md:p-1.5 rounded-full">
                <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm md:text-base">
              <p>
                The local services industry is undergoing a major
                transformation. For decades, finding a reliable professional
                whether a plumber, electrician, or digital freelancer often
                relied on word of mouth, personal referrals, or guesswork. But
                as digital platforms continue to mature, technology is rapidly
                reshaping how customers and skilled providers connect,
                communicate, and collaborate.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs md:text-sm">Share this post</p>
              <div className="flex items-center gap-1 md:gap-2">
                <div className="bg-gray-200 p-1 md:p-1.5 rounded-full">
                  <Link2 className="w-4 h-4 md:w-5 md:h-5 -rotate-45" />
                </div>
                <div className="bg-gray-200 p-1 md:p-1.5 rounded-full">
                  <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>
            <div className="border-t mt-8 pt-4">
              <div className="flex items-center gap-3">
                <ProfileImage noStatus size="size-8 md:size-9" />
                <div>
                  <h3 className="text-sm lg:text-base font-medium">
                    Michelle Owolabi
                  </h3>
                  <div className="flex items-center text-xs lg:text-sm -mt-0.5 text-muted-foreground">
                    <p>Business Analyst, Skills4Hire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4 justify-between">
            <h2 className="text-2xl md:text-3xl font-medium">Latest Posts</h2>
            <Link
              to="/blog"
              className="text-xs md:text-sm hover:text-primary hover:underline font-medium"
            >
              View all
            </Link>
          </div>
          <div className=" grid md:grid-cols-3 gap-x-6 gap-y-10">
            {blogPosts?.map(
              ({ tag, title, summary, author, createdAt, minRead }) => {
                return (
                  <div className="space-y-4">
                    <figure className="w-full h-48 md:h-64 bg-gray-500 rounded-2xl"></figure>
                    <div>
                      <span className="capitalize text-sm block mb-3 bg-muted rounded-full py-0.5 w-max px-2.5 ">
                        {tag}
                      </span>
                      <Link to="/blog/id">
                        <h2 className="mb-3 text-lg lg:text-xl font-medium line-clamp-2 hover:text-primary">
                          {title}
                        </h2>
                      </Link>

                      <p className="text-xs lg:text-sm mb-4 line-clamp-3">
                        {summary}
                      </p>
                      <div className="flex items-center gap-3">
                        <ProfileImage noStatus size="size-11 md:size" />
                        <div>
                          <h3 className="text-sm lg:text-base font-medium">
                            {author}
                          </h3>
                          <div className="flex items-center text-xs lg:text-sm -mt-1 text-muted-foreground">
                            <span>{dateFormatter(createdAt)}</span>{' '}
                            <Dot className="-mx-1" />
                            <span>{minRead}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </section>
      </div>
    </Container>
  )
}
