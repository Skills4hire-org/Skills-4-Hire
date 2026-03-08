import { searchCategories, searchFilters, serviceTypes } from '@/assets/data'
import Container from '@/components/global/Container'
import Ratings from '@/components/global/Ratings'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { currencyFormatter } from '@/utils/format'
import { ChevronLeft, Search, Sliders, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [open, setOpen] = useState(false)
  const [filterType, setFilterType] = useState('services')
  const [service, setService] = useState([''])
  const [price, setPrice] = useState<number[]>([0, 1000000])
  const [rating, setRating] = useState<undefined | number>(undefined)
  const [filters, setFilters] = useState<{
    service: string[]
    price: number[]
    rating: number | undefined
  }>({
    service: [''],
    price: [0, 1000000],
    rating: undefined,
  })
  const [category, setCategory] = useState('')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const search = queryParams.get('query')
  const [searchQuery, setSearchQuery] = useState(search || '')
  const navigate = useNavigate()
  const handleSelectCategory = (value: string) => {
    if (value === category) {
      setCategory('')
    } else {
      setCategory(value)
    }
  }
  const handleServiceChange = (value: string, checked: boolean) => {
    if (checked) {
      setService([...service, value])
    } else {
      setService(service.filter((s) => s !== value))
    }
  }
  const handleApplyFilter = () => {
    setFilters({
      service,
      price,
      rating,
    })
    setOpen(false)
  }
  const resetFilters = () => {
    setFilters({
      service: [''],
      price: [0, 1000000],
      rating: undefined,
    })
    setService([''])
    setPrice([0, 1000000])
    setRating(undefined)
  }
  const handleSearchQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const checkFilters =
    filters.rating !== undefined ||
    filters.service[0] !== '' ||
    filters.price[0] !== 0 ||
    filters.price[1] !== 1000000

  return (
    <>
      <div className="lg:grid lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Container className="py-2 lg:py-4 bg-white">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="sr-only">Back</span>
              </button>
              <form
                onSubmit={handleSearchQuery}
                className={`relative mx-auto flex-1`}
              >
                <Input
                  type="text"
                  className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
                  placeholder="Search"
                  name="searchQuery"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 text-white rounded-r-md flex items-center justify-center bg-primary cursor-pointer"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </form>
              <div className="relative h-8 md:h-9 lg:hidden">
                <button
                  className="px-1.5 md:px-2 rounded-md border h-8 md:h-9"
                  onClick={() => setOpen(true)}
                >
                  <Sliders className="w-4 h-4" />
                </button>
                {checkFilters && (
                  <span className="w-2 h-2 bg-primary absolute -top-0.5 -right-0.5 rounded-full" />
                )}
              </div>
            </div>
          </Container>
          <div>
            <div className="relative">
              <Carousel
                opts={{
                  align: 'center',
                }}
                className="w-full h-max pl-2 md:pl-4 pr-1 md:pr-2 bg-white py-2 lg:py-4 border-t"
              >
                <CarouselContent className="pl-2">
                  {searchCategories.map(({ label, value }, index) => (
                    <CarouselItem key={index} className={`basis-auto pl-2`}>
                      <button
                        className={`flex items-center gap-3 md:gap-4 border  py-1 md:py-1.5 px-2 rounded-full w-max text-xs md:text-sm cursor-pointer font-medium ${value == category ? 'text-white bg-primary border-primary' : 'border-primary/20'}`}
                        onClick={() => handleSelectCategory(value)}
                      >
                        {label}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            {/* search results */}
          </div>
        </div>
        <div className="bg-gray-200 gap-0 lg:block lg:col-span-2 hidden  grid">
          <div className="bg-white py-2 lg:py-5 relative text-center">
            <h3 className="text-base lg:text-lg">Filter By </h3>
          </div>
          <div className="grid grid-cols-5 overflow-y-auto h-max min-h-52">
            <div className="bg-white col-span-2">
              {searchFilters.map(({ label, value }) => {
                return (
                  <button
                    key={value}
                    className={`w-full text-sm py-1.5 font-medium ${filterType == value && 'bg-gray-200'}`}
                    onClick={() => setFilterType(value)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="col-span-3 p-2 flex flex-col gap-2">
              <>
                {filterType === 'services' &&
                  serviceTypes.map(({ label, value }) => {
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={label}
                          checked={service.includes(value)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(value, checked as boolean)
                          }
                          className="border border-primary rounded-full"
                        />
                        <Label
                          htmlFor={label}
                          className="text-sm lg:text-base font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  })}
                {filterType === 'price' && (
                  <div className="space-y-4">
                    <span className="text-sm font-medium block">
                      Price Range
                    </span>
                    <div className="space-y-2">
                      <Slider
                        value={price}
                        onValueChange={(value) => setPrice(value)}
                        max={1000000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>
                          {currencyFormatter(price[0] || filters.price[0])}
                        </span>
                        <span>
                          {currencyFormatter(price[1] || filters.price[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {filterType === 'rating' &&
                  [5, 4, 3, 2, 1].map((value) => {
                    return (
                      <div
                        key={value}
                        className="flex items-center gap-2 justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`rating${value}`}
                            checked={rating == value}
                            onCheckedChange={() => setRating(value)}
                            className="rounded-full border border-primary w-4 h-4"
                          />
                          <Label htmlFor={`rating${value}`}>
                            <Ratings rating={value} />
                          </Label>
                        </div>
                        <span className="text-sm lg:text-base">{value}</span>
                      </div>
                    )
                  })}
              </>
            </div>
          </div>
          <div className="relative h-18 flex">
            <div className="w-[40%] bg-white absolute left-0 top-0 h-full" />
            <button
              className="text-white font-medium text-sm lg:text-base w-[95%] text-center bg-primary h-9 cursor-pointer rounded-md absolute -bottom-2 left-1/2 -translate-1/2"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <button
              className="absolute left-3 -top-1 text-sm md:text-base underline text-primary"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[85%] bg-gray-200 gap-0 lg:hidden"
        >
          <SheetHeader className="bg-white py-2 relative">
            <div className="text-center">
              <SheetTitle>Filter By </SheetTitle>
              <SheetDescription className="sr-only">
                filter search result
              </SheetDescription>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          </SheetHeader>
          <div className="grid grid-cols-5 h-full overflow-y-auto flex-1">
            <div className="bg-white flex flex-col items-center col-span-2">
              {searchFilters.map(({ label, value }) => {
                return (
                  <button
                    key={value}
                    className={` w-full text-sm py-1.5 font-medium ${filterType == value && 'bg-gray-200'}`}
                    onClick={() => setFilterType(value)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="col-span-3 p-2 flex flex-col gap-2">
              <>
                {filterType === 'services' &&
                  serviceTypes.map(({ label, value }) => {
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={label}
                          checked={service.includes(value)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(value, checked as boolean)
                          }
                          className="border border-primary rounded-full"
                        />
                        <Label
                          htmlFor={label}
                          className="text-sm lg:text-base font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  })}
                {filterType === 'price' && (
                  <div className="space-y-4">
                    <span className="text-sm font-medium block">
                      Price Range
                    </span>
                    <div className="space-y-2">
                      <Slider
                        value={price}
                        onValueChange={(value) => setPrice(value)}
                        max={1000000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>
                          {currencyFormatter(price[0] || filters.price[0])}
                        </span>
                        <span>
                          {currencyFormatter(price[1] || filters.price[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {filterType === 'rating' &&
                  [5, 4, 3, 2, 1].map((value) => {
                    return (
                      <div
                        key={value}
                        className="flex items-center gap-2 justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`rating${value}`}
                            checked={rating == value}
                            onCheckedChange={() => setRating(value)}
                            className="rounded-full border border-primary w-4 h-4"
                          />
                          <Label htmlFor={`rating${value}`}>
                            <Ratings rating={value} />
                          </Label>
                        </div>
                        <span className="text-sm lg:text-base">{value}</span>
                      </div>
                    )
                  })}
              </>
            </div>
          </div>
          <SheetFooter className="relative h-14 flex">
            <div className="w-[40%] bg-white absolute left-0 top-0 h-full" />
            <button
              className="text-white font-medium text-sm lg:text-base w-[95%] text-center bg-primary h-9 cursor-pointer rounded-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-1/2"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <button
              className="absolute left-3 -top-4 text-sm md:text-base underline text-primary"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
