import { useState, type FormEvent } from "react";
import Container from "../global/Container";
import servicesAroundImage1 from "../../assets/JoshuaBarber.png";
import {
  ArrowRight,
  CheckCircle2,
  Edit2,
  Edit2Icon,
  FileText,
  MapPin,
  Minus,
  Star,
} from "lucide-react";
import { currencyFormatter } from "@/utils/format";
import { user } from "@/utils/database";
import SwitchRoleButton from "../buttons/SwitchRoleButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  serviceProviderActivityTabList,
  serviceProviderTabList,
} from "@/assets/data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import EmptyTab from "../service-provider/EmptyTab";
import ServiceProviderGallery from "../service-provider/ServiceProviderGallery";
import PostCard from "../home/PostCard";
import ServiceProviderServicesCard from "../service-provider/ServiceProviderServicesCard";
import { Button } from "../ui/button";
import ServiceProviderAbout from "../service-provider/ServiceProviderAbout";

export default function ServiceProviderProfileForm() {
  const [formData, setFormData] = useState({
    desc: "Men and Kids Ultimate grooming Hair",
    minCharge: 800,
    image: servicesAroundImage1,
    coverImage: servicesAroundImage1,
    maxCharge: 90000,
    address: "No.19 IyeruOkin Street, Tanke Ilorin",
    about: user?.serviceProviderInfo?.about,
    gallery: null,
    services: [...user?.serviceProviderInfo?.services],
    comments: [...user?.serviceProviderInfo?.comments],
    accountNumber: "1234567890",
    posts: [...user?.serviceProviderInfo?.posts],
    postsImages: [...user?.serviceProviderInfo?.postImages],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="-mt-2 md:-mt-6">
      <div>
        <div className="relative">
          <div
            className={` w-full bg-cover bg-center h-[20vh] md:h-[25vh]`}
            style={{ backgroundImage: `url(${formData.image})` }}
          />
          <button className="bg-white p-2 text-primary rounded-full absolute top-3 md:top-5 right-4 md:right-6">
            <Edit2 strokeWidth={3} className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
            <span className="sr-only">edit cover photo</span>
          </button>
        </div>

        <Container className="border-b-8 relative">
          <div className="relative">
            <figure className="bg-blue-200 -mt-13 md:-mt-18.5  mb-1 md:mb-2 w-max rounded-full border-4 border-background">
              <img
                src={formData?.image}
                alt={user?.serviceProviderInfo?.name}
                className="aspect-square object-cover w-24 md:w-34 rounded-full"
              />
            </figure>
            <button className="text-primary absolute bottom-6 md:bottom-8 right-0">
              <Edit2 strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="sr-only">edit profile overview</span>
            </button>
          </div>

          <div className=" pb-3 md:pb-4 text-start">
            <div className="space-y-0.5">
              <div className="flex items-center gap-4 ">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-lg md:text-xl">
                    {user?.serviceProviderInfo?.name}
                  </h1>

                  {user?.verified && (
                    <span className="capitalize text-primary font-medium flex items-center gap-0.5 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-background fill-primary" />
                      verified
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm md:text-base capitalize text-primary font-medium block">
                {user?.serviceProviderInfo?.occupation}
              </span>

              <p className=" text-base md:text-lg">{formData?.desc}</p>
              <span className="text-primary font-semibold text-sm md:text-base -mt-0.5 block capitalize">
                12 endosers
              </span>
              <p className="flex items-center justify-start gap-1  text-sm md:text-base ">
                From
                <span className="flex items-center gap-0.5">
                  <span>{currencyFormatter(formData?.minCharge)}</span>
                  <Minus className="w-4 h-4" />
                  <span>{currencyFormatter(formData?.maxCharge)}</span>
                </span>
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base  ">
                <MapPin className="w-4 h-4" />
                {formData?.address}
              </p>
              <div className="text-xs md:text-sm flex items-center justify-start gap-4 mt-1 ">
                <span className="flex items-center text-xs gap-1">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                  {user?.serviceProviderInfo?.averageRating} (
                  {user?.serviceProviderInfo?.totalReviews}{" "}
                  {user?.serviceProviderInfo?.totalReviews > 1
                    ? "comments"
                    : "comment"}
                  )
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />{" "}
                  {user?.serviceProviderInfo?.totalJobs}{" "}
                  {user?.serviceProviderInfo?.totalJobs > 1 ? "tasks" : "task"}
                </span>
              </div>
              <div className="mt-4 w-max mx-auto">
                <SwitchRoleButton className="bg-primary text-white hover:bg-primary/90  h-8" />
              </div>
            </div>
          </div>
        </Container>
        <div>
          <Container className="border-b-8 py-2 md:py-4">
            <Tabs defaultValue="about" className="space-y-2 ">
              <TabsList className="border-b-0 bg-background  rounded-none relative p-0 space-x-12 md:space-x-24">
                {serviceProviderTabList.map((status, index) => {
                  return (
                    <TabsTrigger
                      key={index}
                      value={status}
                      className={cn(
                        "bg-background cursor-pointer capitalize border-b-1 border-b-transparent text-base md:text-lg text-muted-foreground data-[state=active]:border-b-foreground data-[state=active]:border-b-1 px-0 data-[state=active]:text-foreground"
                      )}
                    >
                      {status}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {serviceProviderTabList.map((status) => {
                return (
                  <TabsContent key={status} value={status} className="md:pt-1">
                    {status === "about" ? (
                      <div className="relative">
                        <ServiceProviderAbout
                          about={user?.serviceProviderInfo?.about}
                        />
                        <button className="text-primary absolute -top-5 md:-top-6 right-0">
                          <Edit2
                            strokeWidth={2}
                            className="w-5 h-5 md:w-6 md:h-6"
                          />
                          <span className="sr-only">edit about</span>
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                          {user?.serviceProviderInfo?.gallery?.map(
                            (image, index) => (
                              <ServiceProviderGallery
                                key={index}
                                image={image}
                              />
                            )
                          )}
                        </div>
                        <button className="text-primary absolute -top-5 md:-top-6 right-0">
                          <Edit2
                            strokeWidth={2}
                            className="w-5 h-5 md:w-6 md:h-6"
                          />
                          <span className="sr-only">edit gallery</span>
                        </button>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </Container>
          <Container className="border-b-8 pt-2 md:pt-4 relative">
            <div className="space-y-4 relative">
              <h2 className="font-semibold text-lg md:text-xl ">Activity</h2>
              <Tabs defaultValue="posts" className="space-y-2">
                <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8 ">
                  {serviceProviderActivityTabList.map((status, index) => {
                    return (
                      <div>
                        <TabsTrigger
                          key={index}
                          value={status}
                          className={cn(
                            "bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-normal"
                          )}
                        >
                          {status}
                        </TabsTrigger>
                        {status === "posts" && (
                          <button className="absolute right-0 top-0 border-1 border-primary rounded-full text-primary px-2 py-1 text-xs md:text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-white">
                            Create a post{" "}
                            <Edit2Icon className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </TabsList>
                {serviceProviderActivityTabList.map((status) => {
                  return (
                    <TabsContent
                      key={status}
                      value={status}
                      className="md:pt-1"
                    >
                      {status === "posts" && (
                        <div className="pb-10 md:pb-12">
                          {formData.posts?.slice(0, 1)?.map((post, index) => (
                            <PostCard key={index} {...post} />
                          ))}

                          <Link
                            to=""
                            className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2"
                          >
                            Show all posts
                            <ArrowRight strokeWidth={3} className="w-4 h-4" />
                          </Link>

                          {formData.posts.length == 0 && (
                            <EmptyTab label="posts" />
                          )}
                        </div>
                      )}
                      {status === "images" && (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                            {formData.postsImages.map((image, index) => (
                              <ServiceProviderGallery
                                key={index}
                                image={image}
                              />
                            ))}
                          </div>

                          {formData.postsImages.length == 0 && (
                            <EmptyTab label="image uploaded" />
                          )}
                        </>
                      )}
                      {status === "comments" && (
                        <>
                          {formData.comments.length == 0 && (
                            <EmptyTab label="comments" />
                          )}
                        </>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </Container>
          <Container className=" pt-2 pb-4 md:py-4">
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-lg md:text-xl ">Services</h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {formData.services.map((service, index) => (
                  <ServiceProviderServicesCard key={index} {...service} />
                ))}
                {formData.services.length === 0 && (
                  <EmptyTab label="service added" />
                )}
              </ul>
              <div className="w-max mx-auto">
                <Button className="h-8 md:h-10 md:px-4 px-2 text-sm md:text-base font-medium rounded-sm flex items-center gap-2">
                  {formData.services.length === 0
                    ? "Add a service"
                    : "Add more services"}
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </form>
  );
}
