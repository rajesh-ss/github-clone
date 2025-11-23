import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userSocialMediaType, userType } from "@/types/userTypes";
import { Users, MapPin, Mail, Link as LinkIcon, Building2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const getLastSegment = (url: string) => {
  if (!url) return "";
  const parts = url.split("/").filter(Boolean); // removes all empty "" segments
  return parts[parts.length - 1] || "";
};

const SocialMediaComp = ({
  userSocialMedia,
}: {
  userSocialMedia: userSocialMediaType;
}) => {
  if (userSocialMedia?.length === 0) {
    return <></>;
  }
  return userSocialMedia.map((socialMedia) => {
    switch (socialMedia.provider) {
      case "github":
        return (
          <Fragment key={socialMedia.provider}>
            {socialMedia.url ? (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a
                  href={socialMedia.url}
                  className="hover:text-primary hover:underline"
                >
                  {getLastSegment(socialMedia.url)}
                </a>
              </div>
            ) : (
              <></>
            )}
          </Fragment>
        );

      case "linkedin":
        return (
          <>
            {socialMedia.url ? (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  role="img"
                  aria-labelledby="asxtypamjlhnu95o6kahye2izyc5es3z"
                  className="octicon"
                >
                  <title id="asxtypamjlhnu95o6kahye2izyc5es3z">LinkedIn</title>
                  <g clip-path="url(#clip0_202_91845)">
                    <path
                      d="M14.5455 0H1.45455C0.650909 0 0 0.650909 0 1.45455V14.5455C0 15.3491 0.650909 16 1.45455 16H14.5455C15.3491 16 16 15.3491 16 14.5455V1.45455C16 0.650909 15.3491 0 14.5455 0ZM5.05746 13.0909H2.912V6.18764H5.05746V13.0909ZM3.96291 5.20073C3.27127 5.20073 2.712 4.64 2.712 3.94982C2.712 3.25964 3.272 2.69964 3.96291 2.69964C4.65236 2.69964 5.21309 3.26036 5.21309 3.94982C5.21309 4.64 4.65236 5.20073 3.96291 5.20073ZM13.0938 13.0909H10.9498V9.73382C10.9498 8.93309 10.9353 7.90327 9.83491 7.90327C8.71855 7.90327 8.54691 8.77527 8.54691 9.67564V13.0909H6.40291V6.18764H8.46109V7.13091H8.49018C8.77673 6.58836 9.47636 6.016 10.52 6.016C12.6924 6.016 13.0938 7.44582 13.0938 9.30473V13.0909V13.0909Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <a
                  href={socialMedia.url}
                  className="hover:text-primary hover:underline"
                >
                  {getLastSegment(socialMedia.url)}
                </a>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      case "twitter":
        return (
          <>
            {socialMedia.url ? (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  role="img"
                  aria-labelledby="ajh32gilqvwbmerlswtl59uqiqkygpll"
                  className="octicon"
                >
                  <title id="ajh32gilqvwbmerlswtl59uqiqkygpll">X</title>
                  <path
                    fill="currentColor"
                    d="M9.332 6.925 14.544 1h-1.235L8.783 6.145 5.17 1H1l5.466 7.78L1 14.993h1.235l4.78-5.433 3.816 5.433H15L9.332 6.925ZM7.64 8.848l-.554-.775L2.68 1.91h1.897l3.556 4.975.554.775 4.622 6.466h-1.897L7.64 8.848Z"
                  ></path>
                </svg>
                <a
                  href={socialMedia.url}
                  className="hover:text-primary hover:underline"
                >
                  {getLastSegment(socialMedia.url)}
                </a>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      default:
        return <></>;
    }
  });
};

export function ProfileSidebar({
  user,
  userSocialMedia,
}: {
  user: userType;
  userSocialMedia: userSocialMediaType;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <Avatar className="w-64 h-64 border border-border">
          {user?.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt="Shreeram Kushwaha" />
          ) : (
            <AvatarFallback>SK</AvatarFallback>
          )}
        </Avatar>
        <div className="absolute bottom-8 right-4 bg-background rounded-full p-1 border border-border flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-accent">
          <span className="text-xs">🎯</span>
        </div>
      </div>

      <div className="py-2">
        <h1 className="text-2xl font-bold leading-tight">
          {user?.name ? user?.name : "NA"}
        </h1>
        <p className="text-xl text-muted-foreground font-light">
          {user?.login ? user?.login : "NA"}
        </p>
      </div>

      <Button className="w-full mb-4" variant="secondary">
        Follow
      </Button>

      <div className="text-base mb-4">
        {user.company}
        <br />
        {user.location}
      </div>

      <div className="flex items-center gap-2 text-muted-foreground mb-4 text-sm">
        <Users className="w-4 h-4" />
        <span className="font-bold text-foreground">
          {user?.followers ? user?.followers : "NA"}
        </span>{" "}
        followers
        <span>·</span>
        <span className="font-bold text-foreground">
          {user?.following ? user?.following : "NA"}
        </span>{" "}
        following
      </div>

      <div className="flex flex-col gap-2 text-sm">
        {user.company && (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span>{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        )}
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a
              href={`mailto:${user.email}`}
              className="hover:text-primary hover:underline"
            >
              {user.email}
            </a>
          </div>
        )}
        {user.blog && (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            <a href={user.blog} className="hover:text-primary hover:underline">
              {user.blog}
            </a>
          </div>
        )}
        <SocialMediaComp userSocialMedia={userSocialMedia} />
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <h3 className="font-semibold mb-2">Achievements</h3>
        <div className="mt-2 text-xs text-muted-foreground cursor-pointer hover:text-primary">
          Block or Report
        </div>
      </div>
    </div>
  );
}
