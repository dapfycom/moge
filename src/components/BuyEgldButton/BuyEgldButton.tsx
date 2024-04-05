"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import queryString from "query-string";
import { WalletIcon } from "../ui-system/icons/ui-icons";
import { Button } from "../ui/button";

interface IPros {}
const BuyEgldButton = () => {
  const address = useAppSelector(selectUserAddress);

  const tradesilvaniaUrl = queryString.stringifyUrl({
    url: "https://ramp.tradesilvania.com/",
    query: {
      partnerId: "65bcb0cbc9cb8dcfdd313284",
      assetTo: "EGLD",
      networkTo: "egld",
      language: "en",
      addressTo: address,
      redirectTo: "/",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          key="1"
          className=" text-white font-semibold py-2 h-auto  px-8 rounded-full flex items-center justify-center space-x-2"
        >
          <WalletIcon className="text-white h-5 w-5" />
          <span>Buy EGLD</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <iframe
              src={tradesilvaniaUrl}
              allowFullScreen
              width="100%"
              height="700"
              allow="camera"
            ></iframe>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BuyEgldButton;
