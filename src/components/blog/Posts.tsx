import { useState } from 'react'
import ProfileImage from '../global/ProfileImage'
import { Dot } from 'lucide-react'
import { blogPosts } from '@/utils/database'
import { dateFormatter } from '@/utils/format'
import { blogCategories } from '@/assets/data'
import bg from '../../assets/images/blog.png'
import { Link } from 'react-router-dom'

export default function Posts() {
  const [category, setCategory] = useState('all')
  const [visibleCategory, setVisibleCategory] = useState(12)
  const filteredPosts = blogPosts?.filter((post) => {
    const matchesCategory = category == 'all' || post.tag == category

    return matchesCategory
  })
  const handleVisibleCategory = () => {
    setVisibleCategory(visibleCategory + 12)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap gap-2">
        {blogCategories.map(({ value, label }) => (
          <button
            key={label}
            onClick={() => setCategory(value)}
            className={` py-2.5 px-5 rounded-sm text-xs md:text-sm  ${
              value == category
                ? 'bg-primary text-white'
                : 'text-foreground font-medium'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div>
        <div className=" grid md:grid-cols-3 gap-x-6 gap-y-10">
          {filteredPosts?.map(
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
        <button
          onClick={handleVisibleCategory}
          className="rounded-md py-2 px-8 text-sm border w-max mx-auto block mt-12 hover:border-background hover:shadow-sm cursor-pointer"
        >
          Load More
        </button>
      </div>
      <div
        className="bg-cover bg-center rounded-lg pt-10 pb-20 text-center px-4 space-y-4 mt-10"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2 className="text-white text-2xl md:text-3xl max-w-lg mx-auto">
          Ready to hire trusted professionals or showcase your skills?
        </h2>
        <p className="text-white text-xs md:text-sm">
          Join Skills4Hire to connect, work, and grow whether you need help or
          offer expertise.
        </p>
        <Link
          to="/sign-up"
          className="bg-white text-sm py-2 px-8 rounded-md mt-6 block w-max mx-auto shadow-sm hover:shadow-md cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
