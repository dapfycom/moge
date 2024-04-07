import { PROJECT_TOKEN } from "@/config";
import { selectedNetwork } from "@/config/network";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { getSmartContractInteraction } from "@/services/sc/calls";
import { scQuery } from "@/services/sc/queries";
import { Base64toString } from "@/utils/functions/sc";
import {
  Address,
  AddressValue,
  BytesValue,
  U32Value,
} from "@multiversx/sdk-core/out";
import { getCookie } from "cookies-next";
import {
  adaptGame,
  adaptGamePayment,
  adaptGamesWithUserInfo,
  adaptUserInfo,
} from "./adapters";
import { IGamePayment, IHistoryData, IUserInHistory } from "./interface";
// sc calls
export const createGame = (
  amount: number,
  username?: string,
  profileUrl?: string,
  tokenIdentifier: string = "EGLD",
  decimals: number = 18
) => {
  const args = [];

  const incognitoPreference = getCookie("incognito-mode");
  if (username && profileUrl && incognitoPreference !== "true") {
    args.push(BytesValue.fromUTF8(username));
    args.push(BytesValue.fromUTF8(profileUrl));
  }

  return getSmartContractInteraction("pvpWsp").ESDTorEGLDTransfer({
    functionName: "create_game",
    token: {
      collection: tokenIdentifier,
      decimals: decimals,
    },
    arg: args,
    value: amount,
    gasL: 80_000_000,
  });
};

export const joinGame = (
  gameId: number,
  amount: string,
  username: string = "",
  profileUrl: string = "",
  creatorAddress: string,
  creatorUsername: string = "",
  creatorProfileUrl: string = "",
  tokenIdentifier: string = "EGLD",
  decimals: number = 18
) => {
  const args: any[] = [new U32Value(gameId)];

  const incognitoPreference = getCookie("incognito-mode");
  if (incognitoPreference === "true") {
    args.push(BytesValue.fromUTF8(""));
    args.push(BytesValue.fromUTF8(""));
  } else {
    args.push(BytesValue.fromUTF8(username));
    args.push(BytesValue.fromUTF8(profileUrl));
  }
  args.push(new AddressValue(Address.fromBech32(creatorAddress)));
  args.push(BytesValue.fromUTF8(creatorUsername));
  args.push(BytesValue.fromUTF8(creatorProfileUrl));

  return getSmartContractInteraction("pvpWsp").ESDTorEGLDTransfer({
    functionName: "join_game",
    token: {
      collection: tokenIdentifier,
      decimals: decimals,
    },
    arg: args,
    realValue: amount,
    gasL: 20_000_000,
  });
};

export const cancelGame = (gameId: number) => {
  getSmartContractInteraction("pvpWsp").scCall({
    functionName: "cancel_game",
    arg: [new U32Value(gameId)],
    gasL: 20_000_000,
  });
};

// sc queries

export const fetchGameById = async (gameId: number) => {
  const res = await scQuery("pvpWsp", "getGameById", [new U32Value(gameId)]);

  return adaptGame(res?.firstValue?.valueOf());
};

export const fetchActiveGames = async () => {
  const res = await scQuery("pvpWsp", "getActiveGames");

  return adaptGamesWithUserInfo(res?.firstValue?.valueOf())?.filter(
    (game) => game.game?.token_identifier === PROJECT_TOKEN
  );
};

export const fetchUserInfo = async (address: string) => {
  const res = await scQuery("pvpWsp", "getUserInfo", [
    new AddressValue(new Address(address)),
  ]);

  return adaptUserInfo(res?.firstValue?.valueOf());
};

export const fetchUserEarnings = async (address: string) => {
  const res = await scQuery("pvpWsp", "getUserEarnings", [
    new AddressValue(new Address(address)),
  ]);

  return res?.firstValue?.valueOf().toString();
};

export const fetchMinAmounts = async (): Promise<IGamePayment[]> => {
  const res = await scQuery("pvpWsp", "getMinAmounts");

  return (res?.firstValue?.valueOf() || []).map((p: any) =>
    adaptGamePayment(p)
  );
};

export const fetchGamesHistory = async (): Promise<IHistoryData[]> => {
  const transactions = await fetchTransactions({
    receiver: selectedNetwork.scAddress.pvp,
    function: "join_game",
    size: 50,
    status: "success",
    withScResults: true,
    token: PROJECT_TOKEN,
  });

  const finishedGames = await scQuery("pvpWsp", "getFinishedGames");

  const parsedGames = adaptGamesWithUserInfo(
    finishedGames.firstValue?.valueOf()
  );

  const history: IHistoryData[] = transactions.map((tx) => {
    const dataHex = Base64toString(tx.data || "");

    let parts = dataHex.split("@");

    let gameId = 0;
    const isEsdt = parts[0] === "ESDTTransfer";
    if (isEsdt) {
      parts = parts.slice(3);
    }
    gameId = parseInt(parts[1], 16);

    const game = parsedGames?.find((game) => game.game?.id === gameId);

    const challenger: IUserInHistory = {
      address: game?.game?.user_challenger || Address.Zero().bech32(),
      profile_url: game?.user_challenger?.profile_url || "",
      username: game?.user_challenger?.username || "",
    };
    const creator: IUserInHistory = {
      address: game?.game?.user_creator || Address.Zero().bech32(),
      profile_url: game?.user_creator?.profile_url || "",
      username: game?.user_creator?.username || "",
    };
    const winner: IUserInHistory =
      game?.game?.winner === game?.game?.user_creator ? creator : challenger;

    const data: IHistoryData = {
      challenger: challenger,
      creator: creator,
      winner: winner,
      txHash: tx.txHash,
      date: tx.timestamp,
      gameId: gameId,
    };

    return data;
  });

  return history;
};
