"use client";

import useAuthentication from "@/hooks/useAuthentication";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { useGetEgldPrice } from "@multiversx/sdk-dapp/hooks";
import { useGetUserEarnings } from "../../utils/hooks";
const TotalWon = () => {
  const { earnings } = useGetUserEarnings();
  const { price } = useGetEgldPrice();
  const { isLoggedIn } = useAuthentication();

  return (
    <div>
      {" "}
      {price && isLoggedIn && (
        <p className="text-4xl font-bold mb-5">
          Total Won:{" "}
          {formatBalanceDollar(
            {
              balance: earnings,
              decimals: 18,
            },
            price
          )}{" "}
          $
        </p>
      )}
    </div>
  );
};

export default TotalWon;
