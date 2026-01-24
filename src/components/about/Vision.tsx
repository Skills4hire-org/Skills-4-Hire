import Container from '../global/Container'
import helping from '../../assets/images/vision.jpg'
export default function Vision() {
  return (
    <div className="bg-[#C9D9FE]">
      <Container className="py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-2 md:place-items-center ">
          <div className="text-center md:text-start space-y-2 md:space-y-4">
            <h2 className="font-semibold text-2xl md:text-4xl capitalize">
              our vision
            </h2>
            <p className="text-sm md:text-base max-w-md mx-auto md:mx-0">
              To create a world where services are easily accessible and
              trustworthy, enriching the lives of individuals and communities.
            </p>
          </div>
          <figure className="h-60 md:h-66 lg:h-76 w-full rounded-3xl overflow-hidden">
            <img
              src={helping}
              alt="helping"
              className="object-cover object-center w-full h-full"
              loading="lazy"
            />
          </figure>
        </div>
      </Container>
    </div>
  )
}
