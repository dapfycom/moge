import axiosDapfy from "@/services/rest/dapfy-api";
import { getSmartContractInteraction } from "@/services/sc/calls";
import { scQuery } from "@/services/sc/queries";
import { IUserX } from "@/types/rewards.interface";
import { Address } from "@multiversx/sdk-core/out";

export const syncXUserWithDapfyUser = async (data: IUserX, address: string) => {
  return axiosDapfy.post("/bind-user", {
    ...data,
    address,
  });
};

export const fetchUsersAvatars = async () => {
  return await axiosDapfy.get<{
    usersAvatars: { profile_image_url: string }[];
  }>("/x-users-avatars");
};

export const fetchUnCollectedRewards = async (
  address: string
): Promise<string> => {
  const res = await scQuery("rewardsWsp", "getUserClaimable", [
    new Address(address),
  ]);

  const res2 = await scQuery("rewardsWsp", "getSupplyAmount");
  console.log({ supply: res2.firstValue?.valueOf().toString() });

  const value = res.firstValue?.valueOf().toString();
  console.log({ value });

  return (res.firstValue?.valueOf().toString() as string) || "0";
};

export const fetchHasClaimedRewards = async (): Promise<boolean> => {
  const res = await scQuery("rewardsWsp", "hasClaimed");
  console.log({ hasClaimed: res.firstValue?.valueOf() });

  return res.firstValue?.valueOf();
};

// calls
export const claimRewards = () => {
  return getSmartContractInteraction("rewardsWsp").scCall({
    functionName: "claim",
    gasL: 5_000_000,
  });
};
