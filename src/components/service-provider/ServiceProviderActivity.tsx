import { serviceProviderActivityTabList } from "@/assets/data";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import PostCard from "../home/PostCard";
import type { ServiceProvider } from "@/utils/types";
import { Link } from "react-router-dom";
import ServiceProviderGallery from "./ServiceProviderGallery";
import { ArrowRight } from "lucide-react";
import EmptyTab from "./EmptyTab";

export default function ServiceProviderActivity({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined;
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg md:text-xl ">Activity</h2>
      <Tabs defaultValue="posts" className="space-y-2">
        <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8">
          {serviceProviderActivityTabList.map((status, index) => {
            return (
              <TabsTrigger
                key={index}
                value={status}
                className={cn(
                  "bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-normal"
                )}
              >
                {status}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {serviceProviderActivityTabList.map((status) => {
          return (
            <TabsContent key={status} value={status} className="md:pt-1">
              {status === "posts" && (
                <div className="pb-10 md:pb-12">
                  {getServiceProvider?.posts
                    ?.slice(0, 1)
                    ?.map((post, index) => (
                      <PostCard key={index} {...post} />
                    ))}

                  <Link
                    to=""
                    className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2"
                  >
                    Show all posts
                    <ArrowRight strokeWidth={3} className="w-4 h-4" />
                  </Link>

                  {getServiceProvider?.posts?.length == 0 && (
                    <EmptyTab label="posts" />
                  )}
                </div>
              )}
              {status === "images" && (
                <>
                  <ServiceProviderGallery
                    gallery={getServiceProvider?.postImages}
                  />
                  {getServiceProvider?.postImages?.length == 0 && (
                    <EmptyTab label="image uploaded" />
                  )}
                </>
              )}
              {status === "comments" && (
                <>
                  {getServiceProvider?.comments?.length == 0 && (
                    <EmptyTab label="comments" />
                  )}
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
