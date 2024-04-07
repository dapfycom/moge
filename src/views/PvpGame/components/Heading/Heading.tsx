import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
import TotalWon from "./TotalWon";

const Heading = () => {
  return (
    <div className="flex flex-col items-center text-center mt-5 w-full">
      <PageHeaderHeading className="mb-6">
        <span className={"gradienteTitle"}>Player Vs Player</span>
      </PageHeaderHeading>
      <TotalWon />

      <div key="1" className="flex items-center justify-center w-full">
        <div className="flex w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 overflow-hidden shadow-lg transform transition-transform hover:scale-100">
          <button className="flex w-1/2 items-center justify-center bg-[#34D399] py-2 text-sm font-bold text-white hover:bg-[#22A884] transition-colors rounded-l-lg">
            Winning odds 50%
          </button>
          <button className="flex w-1/2 items-center justify-center bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors rounded-r-lg">
            Loosing odds 50%
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
