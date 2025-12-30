import Hero from '@/components/blog/Hero'
import Posts from '@/components/blog/Posts'
import Container from '@/components/global/Container'

export default function Blog() {
  return (
    <Container className="pb-10 pt-4">
      <div className="space-y-10">
        <Hero />
        <Posts />
      </div>
    </Container>
  )
}
