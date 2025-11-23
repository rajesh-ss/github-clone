import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { OverviewContent } from "@/components/profile/OverviewContent";
import { RepositoryList } from "@/components/profile/RepositoryList";
import { ProjectsContent } from "@/components/profile/ProjectsContent";
import { StarsContent } from "@/components/profile/StarsContent";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import { userSocialMediaType, userType } from "@/types/userTypes";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default async function UserDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ userName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userName } = await params;
  const { year, tab } = await searchParams;
  const currentYear = new Date().getFullYear();
  const selectedYear = year ? Number.parseInt(year as string) : currentYear;

  let userSocialMedia;
  let usrDetails;

  try {
    userSocialMedia = await apiClient.get<userSocialMediaType>(
      API_ENDPOINTS.userSocialMedia(userName)
    );
    usrDetails = await apiClient.get<userType>(API_ENDPOINTS.user(userName));
  } catch (error: any) {
    if (error?.statusCode === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <main className="container mx-auto p-8 max-w-[1280px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProfileSidebar
            user={usrDetails?.data}
            userSocialMedia={userSocialMedia?.data}
          />
        </div>
        <div className="md:col-span-3 flex flex-col gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            {(() => {
              const currentTab = (tab as string) || "overview";
              switch (currentTab) {
                case "repositories":
                  return <RepositoryList userName={userName} />;
                case "projects":
                  return <ProjectsContent />;
                case "packages":
                  return (
                    <div className="py-10 text-center text-muted-foreground">
                      Packages content placeholder
                    </div>
                  );
                case "stars":
                  return <StarsContent />;
                case "overview":
                default:
                  return (
                    <OverviewContent userName={userName} year={selectedYear} />
                  );
              }
            })()}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
