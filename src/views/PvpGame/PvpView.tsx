import Container from "@/components/ui-system/Container";
import CreateGame from "./components/CreateGame/CreateGame";
import GamesTabs from "./components/GamesTabs/GamesTabs";
import Heading from "./components/Heading/Heading";
import Incognito from "./components/Incognito/Incognito";
import Stats from "./components/Stats/Stats";
import { fetchScStats } from "./utils/server-services";

const PvpView = async () => {
  const stats = await fetchScStats();

  return (
    <Container className=" xl:max-w-[1000px]">
      <div className="min-h-screen flex flex-col items-center ">
        <Heading />
        <Stats stats={stats} />
        <Incognito />
        <CreateGame />
        <div className="w-full grid ">
          <GamesTabs />
        </div>
      </div>
    </Container>
  );
};

export default PvpView;
