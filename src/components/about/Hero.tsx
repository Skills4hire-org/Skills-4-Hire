import Container from '../global/Container'

export default function Hero() {
  return (
    <div>
      <div className="w-full h-[50vh] max-h-[600px] bg-[#C9D9FE] flex items-end justify-center rounded-b-3xl">
        <p className="w-[90%] max-w-md mx-auto py-6 md:py-10 text-2xl md:text-4xl/12 font-semibold text-center">
          Making service hiring simple, trusted, and accessible for everyone.
        </p>
      </div>
      <Container className="py-10 md:py-12">
        <p className="text-base md:text-lg max-w-md mx-auto text-center">
          To make it easy, safe, and rewarding for anyone to hire trusted
          service providers while empowering service providers to showcase their
          skills, grow their business, and earn more.
        </p>
      </Container>
    </div>
  )
}
