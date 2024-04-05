"use client";
import Container from "@/components/ui-system/Container";
import AllTimeEarned from "./common/AllTimeEarned";
import CollectedEgld from "./common/CollectedEgld";
import DashboardHeading from "./common/DashboadHeading";
import LoginButton from "./common/LogginButton";
import NFTsStaking from "./common/NFTsStaking/NFTsStaking";
import Participants from "./common/Participants";
import StreakDays from "./common/StreakeDays";
import { useGetUserInfo, useGetUserSfts } from "./lib/nfts-hooks";
import { useBindXUserWithDapfyUser, useStreakDialog } from "./lib/tasks-hooks";

const Rewards = () => {
  useBindXUserWithDapfyUser();
  useStreakDialog();

  const { userNfts } = useGetUserInfo();
  const { nfts } = useGetUserSfts();

  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px] text-center justify-center">
      <DashboardHeading />

      <LoginButton />

      <Participants />

      <AllTimeEarned />

      <StreakDays />

      <CollectedEgld />
      {(userNfts.length > 0 || nfts.length > 0) && <NFTsStaking />}

      {/* <EmailReports /> */}
    </Container>
  );
};

export default Rewards;
