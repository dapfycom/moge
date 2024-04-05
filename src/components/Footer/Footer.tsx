"use client";
import { externnalLinks, routeNames } from "@/config/routes";
import { Dot, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import Container from "../ui-system/Container";
import { Button } from "../ui/button";

const productsRoutes: RouteProps[] = [
  {
    href: routeNames.rewards,
    label: "Earn",
  },
  {
    href: routeNames.aggregator,
    label: "Swap",
  },
  {
    href: routeNames.farm,
    label: "Farm",
  },
  {
    href: routeNames.dust,
    label: "Dust",
  },
  {
    href: routeNames.tools,
    label: "Free tools",
  },

  // {
  //   href: routeNames.upgrade,
  //   label: "Upgrade",
  // },
];

const resourcesRoutes: RouteProps[] = [
  {
    href: routeNames.help,
    label: "Help",
  },

  {
    href: externnalLinks.dextools,
    label: "Dextools",
    isExternal: true,
  },
];

const Footer = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className="flex items-center justify-center pt-20">
        <NewsletterForm />
      </div>
      <footer className=" ">
        <Container>
          <div className="mb-10">
            <div className="flex flex-wrap justify-between gap-10">
              <div className="text-center flex flex-col">
                <Link href={routeNames.home}>
                  <div className="flex items-center space-x-5">
                    <Image
                      src={
                        "https://media.elrond.com/tokens/asset/MOGE-3aadc7/logo.svg"
                      }
                      alt="Logo"
                      width={120}
                      height={50}
                    />
                  </div>
                </Link>

                <p className="text-blue-800 font-semibold flex items-center">
                  <Dot
                    size={60}
                    className="inline-block mr-[-20px] ml-[-20px]"
                  />{" "}
                  All systems normal.
                </p>

                <div className="flex-1 flex items-end">
                  <div className="flex space-x-5">
                    {/* Twiiter */}
                    <Link
                      href={externnalLinks.twitter}
                      className=" hover:text-primary transition duration-300"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={"20"}
                        height="20"
                        className="hover:scale-110"
                      >
                        <g>
                          <path
                            fill="currentColor"
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                          ></path>
                        </g>
                      </svg>
                    </Link>
                    {/* Telegram */}
                    <Link
                      href={externnalLinks.telegram}
                      className=" hover:text-primary transition duration-300"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={"20"}
                        height="20"
                        className="hover:scale-110"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.5914 0.0395918C21.9293 0.284844 0.898886 8.65108 0.749936 8.72847C-0.12748 9.18423 -0.25237 9.84491 0.46738 10.2233C0.577396 10.2811 1.9371 10.738 3.48891 11.2386L6.3104 12.1487L12.7156 7.99298C16.2384 5.70735 19.2101 3.80707 19.3192 3.77012C19.5859 3.67987 19.7731 3.73129 19.7731 3.89484C19.7731 3.99348 18.6882 5.0307 14.7499 8.69728C11.9871 11.2694 9.65186 13.4451 9.56047 13.532L9.3944 13.69L9.20777 16.4598C9.10512 17.9833 9.02135 19.2841 9.02156 19.3507C9.02198 19.4515 9.05032 19.4715 9.19165 19.4705C9.54962 19.4681 9.77576 19.2862 11.2923 17.7808L12.7883 16.2959L13.058 16.4987C13.2064 16.6103 14.455 17.5583 15.8328 18.6053C17.2106 19.6523 18.4356 20.5541 18.555 20.6092C18.8261 20.7344 19.1848 20.7874 19.4345 20.7391C19.7058 20.6866 20.0433 20.3225 20.1866 19.9276C20.2493 19.7549 21.1331 15.566 22.1505 10.6187C23.5564 3.78319 24.0004 1.53563 24 1.25666C23.9995 0.864146 23.8527 0.441677 23.6537 0.25962C23.4228 0.0483586 22.8744 -0.0652322 22.5914 0.0395918Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <LinksSections title="Company" routes={companyRoutes} /> */}
              <LinksSections title="Products" routes={productsRoutes} />
              <LinksSections title="Resources" routes={resourcesRoutes} />

              <div className="flex justify-center mb-4 gap-3">
                <Button
                  size={"icon"}
                  variant={theme === "dark" ? "secondary" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="rounded-full"
                >
                  <Moon className=" h-[1.2rem] w-[1.2rem]" />
                </Button>
                <Button
                  size={"icon"}
                  variant={theme === "light" ? "secondary" : "outline"}
                  onClick={() => setTheme("light")}
                  className="rounded-full"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem]   " />
                </Button>
                <Button
                  size={"icon"}
                  variant={theme === "system" ? "secondary" : "outline"}
                  className="rounded-full"
                >
                  <Monitor
                    className=" h-[1.2rem] w-[1.2rem]"
                    onClick={() => setTheme("system")}
                  />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;

interface RouteProps {
  href: string;
  label: string;
  isExternal?: boolean;
  soon?: boolean;
  download?: boolean;
}
interface LinksSectionsProps {
  title: string;
  routes: RouteProps[];
}

const LinksSections = ({ title, routes }: LinksSectionsProps) => {
  return (
    <div>
      <div className="font-bold mb-5">{title} </div>
      <div className="flex flex-col gap-2 text-muted-foreground">
        {routes.map((route) => {
          return (
            <LinkItem
              key={route.href}
              {...route}
              href={route.href}
              isExternal={route.isExternal}
              label={route.label}
            />
          );
        })}
      </div>
    </div>
  );
};

interface LinkItemProps {
  href: string;
  label: string;
  isExternal?: boolean;
  soon?: boolean;
  download?: boolean;
}

const LinkItem = ({
  href,
  label,
  isExternal,
  download,
  soon,
}: LinkItemProps) => {
  const isExternalProps = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  const soonClasses = soon ? "pointer-events-none" : "";

  if (download) {
    return (
      <a
        className={`hover:text-primary ${soonClasses}`}
        href={href}
        {...isExternalProps}
        download
      >
        <span className="border-b pb-[2px]">
          {label} <span className="text-primary">{soon ? "(soon)" : ""}</span>
        </span>
      </a>
    );
  }

  return (
    <Link
      className={`hover:text-primary ${soonClasses}`}
      href={href}
      {...isExternalProps}
    >
      <span className="border-b pb-[2px]">
        {label} <span className="text-primary">{soon ? "(soon)" : ""}</span>
      </span>
    </Link>
  );
};
