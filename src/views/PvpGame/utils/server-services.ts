import { PROJECT_TOKEN } from "@/config";
import { scQuery } from "@/services/sc/queries";
import {
  BytesValue,
  OptionalType,
  OptionalValue,
  TokenIdentifierType,
} from "@multiversx/sdk-core/out";
import { IStats } from "./interface";

export const fetchScStats = async (): Promise<IStats> => {
  const optionalValueType = new OptionalType(new TokenIdentifierType());
  const res = await scQuery("pvpWsp", "getStats", [
    new OptionalValue(optionalValueType, BytesValue.fromUTF8(PROJECT_TOKEN)),
  ]);

  const data = res?.firstValue?.valueOf();

  return {
    gamesPlayed: data.total_games.toNumber(),
    volume: data.volume.map((vol: any) => {
      return {
        amount: vol.amount.toString(),
        token: vol.token,
      };
    }),
    total_users: data.total_users.toNumber(),
  };
};
