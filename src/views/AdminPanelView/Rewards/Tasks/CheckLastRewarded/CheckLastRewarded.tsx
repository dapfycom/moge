"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { selectedNetwork } from "@/config/network";
import { decodeBase64ToString, decodeHexToListOfAddress } from "@/lib/coder";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { formatAddress } from "@/utils/functions/formatAddress";
import useSWR from "swr";

const CheckLastRewarded = () => {
  const { data } = useSWR("rewards/transactions", () => {
    return fetchTransactions({
      receiver: selectedNetwork.scAddress.rewards,
      size: 2,
      status: "success",
      function: "set_users",
    });
  });

  if (!data) {
    return <div>Loading...</div>;
  }
  const transaction = data[0];
  const hexData = decodeBase64ToString(transaction.data || "");
  const addressInHex = hexData.split("@")[2];
  const addressList = decodeHexToListOfAddress(addressInHex);

  return (
    <div>
      <h3 className="text-xl mb-3 text-green-500">Last users rewarded</h3>
      <div className="mb-2">Users Rewarded : {addressList.length}</div>
      <div className="flex flex-wrap gap-2">
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Show users</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">
                  List of rewarded users
                </DialogTitle>
                <DialogDescription>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto max-h-[500px]">
                    {addressList.map((userAddress) => {
                      return (
                        <a
                          key={userAddress}
                          href={
                            selectedNetwork.network.explorerAddress +
                            "/accounts/" +
                            userAddress
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          <div>{formatAddress(userAddress)}</div>
                        </a>
                      );
                    })}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Button asChild>
          <a
            href={
              selectedNetwork.network.explorerAddress +
              "/transactions/" +
              transaction.txHash
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Transaction
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CheckLastRewarded;
