"use client";
import { logoSrc, resources, socialMedia } from "@/config";
import { routeNames } from "@/config/routes";
import { Dot, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
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
    href: routeNames.dust,
    label: "Dust",
  },
];

const resourcesRoutes: RouteProps[] = resources.map((r) => ({
  href: r.link,
  label: r.label,
  isExternal: true,
}));

const Footer = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <footer className="mt-16">
        <Container>
          <div className="mb-10">
            <div className="flex flex-wrap justify-between gap-10">
              <div className="text-center flex flex-col">
                <Link href={routeNames.home}>
                  <div className="flex items-center space-x-5">
                    <Image src={logoSrc} alt="Logo" width={120} height={50} />
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
                    {socialMedia.map((social) => {
                      return (
                        <Link
                          key={social.label}
                          href={social.link}
                          className=" hover:text-primary transition duration-300"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {social.icon}
                        </Link>
                      );
                    })}
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
