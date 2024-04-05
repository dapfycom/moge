import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Home = () => {
  return (
    <Container className="min-h-[40vh]">
      <div className=" flex flex-col text-center mt-10 mb-5 md:mb-20">
        <PageHeaderHeading className={cn("mb-10 md:text-7xl gradienteTitle")}>
          $MOGE is the original $DOGE meme coin based on MultiversX
        </PageHeaderHeading>
        <div className="text-center">
          <PageHeaderDescription className="mb-20 text-center">
            Our vision is that of a united pack, where each member is honored as
            the noblest of hunting dogs.
          </PageHeaderDescription>
        </div>
        <div className="text-center w-fit  m-auto">
          <ul className="flex flex-col gap-20">
            <li className="flex flex-col gap-2 items-center">
              <span className="text-4xl">+500 Holders</span>
              <Image
                alt=""
                src={"/images/GKUquLwXcAANVWQ.jpeg"}
                width={800}
                height={100}
                className="overflow-hidden rounded-2xl"
              />
            </li>
            <li className="flex flex-col gap-2 items-center">
              <span className="text-4xl ">Tokenomics</span>
              <span className="text-primary">7,500,000,000 MOGE</span>
              <span className="max-w-[80%]">
                We consider token management with great responsibility. We are
                pleased to inform you that we currently hold 430 million MOGE
                tokens. Our approach to allocating these tokens is designed to
                foster the growth and prosperity of our community.
              </span>
              <Image
                alt=""
                src={"/images/pksjdfi2q.png"}
                width={800}
                height={100}
                className="overflow-hidden rounded-2xl"
              />
            </li>
            <li className="flex flex-col gap-2 items-center">
              <span className="text-4xl">
                Together, we hold a bold vision for the future of MOGE.
              </span>
              <Image
                alt=""
                src={"/images/GKS-cPkW0AIOc8U.jpeg"}
                width={800}
                height={100}
                className="overflow-hidden rounded-2xl"
              />
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Home;
