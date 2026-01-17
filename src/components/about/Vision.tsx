import Container from '../global/Container'

export default function Vision() {
  return (
    <div className="bg-[#C9D9FE]">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 ">
          <div className=" py-10 text-center md:text-start space-y-2 md:space-y-4">
            <h2 className="font-semibold text-2xl md:text-4xl capitalize">
              our vision
            </h2>

            <p className="text-sm md:text-base max-w-md mx-auto">
              To create a world where services are easily accessible and
              trustworthy, enriching the lives of individuals and communities.
            </p>
          </div>
          <figure className="w-full"></figure>
        </div>
      </Container>
    </div>
  )
}
