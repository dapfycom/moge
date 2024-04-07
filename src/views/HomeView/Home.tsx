import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { homeHeader, homeSections } from "@/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Home = () => {
  return (
    <Container className="min-h-[40vh]">
      <div className=" flex flex-col text-center mt-10 mb-5 md:mb-20">
        <PageHeaderHeading className={cn("mb-10 md:text-7xl gradienteTitle")}>
          {homeHeader.title}
        </PageHeaderHeading>
        <div className="text-center">
          <PageHeaderDescription className="mb-20 text-center">
            {homeHeader.description}
          </PageHeaderDescription>
        </div>
        <div className="text-center w-fit  m-auto">
          <ul className="flex flex-col gap-20">
            {homeSections.map((section, i) => {
              return (
                <li
                  key={section.title}
                  className="flex flex-col gap-2 items-center"
                >
                  <span className="text-4xl">{section.title}</span>
                  {section.subtitle && (
                    <span className="text-primary">{section.subtitle}</span>
                  )}

                  {section.description && (
                    <span className="max-w-[80%]">{section.description}</span>
                  )}

                  <Image
                    alt=""
                    src={section.img}
                    width={800}
                    height={100}
                    className={`overflow-hidden rounded-2xl ${
                      i === 0 ? "aspect-square" : ""
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Home;
