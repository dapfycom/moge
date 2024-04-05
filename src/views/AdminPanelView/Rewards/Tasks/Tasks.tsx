import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Blacklist from "./Blacklist/Blacklist";
import CheckLastRewarded from "./CheckLastRewarded/CheckLastRewarded";
import { LeaderboardContainer } from "./Leaderboard/LeaderboardContainer";
import SupplyRewards from "./SupplyRewards/SupplyRewards";
import UserTasks from "./UserTasks/UserTasks";
import XUser from "./XUser/XUser";

const Tasks = () => {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <SupplyRewards />
        <CheckLastRewarded />
        <XUser />
      </div>
      <Tabs defaultValue="users" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="users" className="relative">
              Users
            </TabsTrigger>
            <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
            <TabsTrigger value="whitelist">User Tasks</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="border-none p-0 outline-none">
          <LeaderboardContainer />
        </TabsContent>
        <TabsContent value="blacklist" className="border-none p-0 outline-none">
          <Blacklist />
        </TabsContent>
        <TabsContent value="whitelist" className="border-none p-0 outline-none">
          <UserTasks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
