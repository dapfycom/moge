import aggregatorAbiUrl from "@/assets/abis/aggregator.abi.json";
import ashSwapAggregatorAbiUrl from "@/assets/abis/ashswap-aggregator.abi.json";
import bskFarmAbiUrl from "@/assets/abis/beskar-dao.abi.json";
import rewardsAbiUrl from "@/assets/abis/contract.abi.json";
import dustAbiUrl from "@/assets/abis/dust_sc.abi.json";
import onDexFarmAbiUrl from "@/assets/abis/farm_onedex.abi.json";
import ashSwapFarmAbiUrl from "@/assets/abis/farmclick_ashswap.abi.json";
import hatomParentAbiUrl from "@/assets/abis/hatom_parent.abi.json";
import mintingStakingNftAbiUrl from "@/assets/abis/minting_staking_nft.abi.json";

import originalOneDexAbiUrl from "@/assets/abis/original_OneDex.abi.json";
import pvpAbiUrl from "@/assets/abis/pvp.abi.json";
import flipAbiUrl from "@/assets/abis/sc_flip.abi.json";
import stakeBskAbiUrl from "@/assets/abis/staking-sc.abi.json";
import { selectedNetwork } from "@/config/network";
import { Address } from "@multiversx/sdk-core/out";
export { provider } from "./provider";
export const EGLD_VAL = Math.pow(10, 18);

export type WspTypes =
  | "maiarBskExchangeWsp"
  | "wrapEgldpWsp"
  | "wrapEgldpWspShard1"
  | "wrapEgldpWspShard2"
  | "maiarRouterWsp"
  | "bskFarmWsp"
  | "flipWsp"
  | "dustWsp"
  | "hatomParentWsp"
  | "aggregatorWsp"
  | "ashSwapFarmWsp"
  | "oneDexFarmWsp"
  | "ashSwapAggregatorWsp"
  | "originalOneDexWsp"
  | "rewardsWsp"
  | "stakeBskWsp"
  | "pvpWsp"
  | "mintingStakingNftWsp";

export const getInterface = (workspace: WspTypes) => {
  let address = null;
  let abiUrl: any = null;
  let implementsInterfaces = "";
  let simpleAddress = "";

  switch (workspace) {
    case "maiarBskExchangeWsp":
      simpleAddress = selectedNetwork.scAddress.maiarBskSwap;
      address = new Address(simpleAddress);
      break;

    case "wrapEgldpWsp":
      simpleAddress = selectedNetwork.scAddress.wrapEgld;
      address = new Address(simpleAddress);

      break;
    case "wrapEgldpWspShard1":
      simpleAddress = selectedNetwork.scAddress.wrapEgldShar1;
      address = new Address(simpleAddress);

      break;
    case "wrapEgldpWspShard2":
      simpleAddress = selectedNetwork.scAddress.wrapEgldShar2;
      address = new Address(simpleAddress);

      break;
    case "maiarRouterWsp":
      simpleAddress = selectedNetwork.scAddress.maiarRouter;
      address = new Address(simpleAddress);
      break;
    case "bskFarmWsp":
      simpleAddress = selectedNetwork.scAddress.farm;
      address = new Address(simpleAddress);
      abiUrl = bskFarmAbiUrl;
      implementsInterfaces = "Esdtrewards";
      break;
    case "flipWsp":
      simpleAddress = selectedNetwork.scAddress.flip;
      address = new Address(simpleAddress);
      abiUrl = flipAbiUrl;
      implementsInterfaces = "FlipContract";
      break;
    case "dustWsp":
      simpleAddress = selectedNetwork.scAddress.dust;
      address = new Address(simpleAddress);
      abiUrl = dustAbiUrl;
      implementsInterfaces = "DustContract";
      break;
    case "hatomParentWsp":
      simpleAddress = selectedNetwork.scAddress.hatomParent;
      address = new Address(simpleAddress);
      abiUrl = hatomParentAbiUrl;
      implementsInterfaces = "HatomParentContract";
      break;
    case "aggregatorWsp":
      simpleAddress = selectedNetwork.scAddress.aggregator;
      address = new Address(simpleAddress);
      abiUrl = aggregatorAbiUrl;
      implementsInterfaces = "AggregatorContract";
      break;
    case "ashSwapFarmWsp":
      simpleAddress = selectedNetwork.scAddress.ashSwapFarm;
      address = new Address(simpleAddress);
      abiUrl = ashSwapFarmAbiUrl;
      implementsInterfaces = "FarmClickContract";
      break;
    case "oneDexFarmWsp":
      simpleAddress = selectedNetwork.scAddress.oneDexFarm;
      address = new Address(simpleAddress);
      abiUrl = onDexFarmAbiUrl;
      break;
    case "ashSwapAggregatorWsp":
      simpleAddress = selectedNetwork.scAddress.ashSwapAggregator;
      address = new Address(simpleAddress);
      abiUrl = ashSwapAggregatorAbiUrl;
      implementsInterfaces = "FarmClickContract";
      break;
    case "originalOneDexWsp":
      simpleAddress = selectedNetwork.scAddress.originalOneDex;
      address = new Address(simpleAddress);
      abiUrl = originalOneDexAbiUrl;
      implementsInterfaces = "OneDex";
      break;
    case "rewardsWsp":
      simpleAddress = selectedNetwork.scAddress.rewards;
      address = new Address(simpleAddress);
      abiUrl = rewardsAbiUrl;
      implementsInterfaces = "Contract";
      break;
    case "stakeBskWsp":
      simpleAddress = selectedNetwork.scAddress.stakeBsk;
      address = new Address(simpleAddress);
      abiUrl = stakeBskAbiUrl;
      implementsInterfaces = "Staking";
      break;
    case "pvpWsp":
      simpleAddress = selectedNetwork.scAddress.pvp;
      address = new Address(simpleAddress);
      abiUrl = pvpAbiUrl;
      implementsInterfaces = "PvPGame";
      break;
    case "mintingStakingNftWsp":
      simpleAddress = selectedNetwork.scAddress.mintingStakingNft;
      address = new Address(simpleAddress);
      abiUrl = mintingStakingNftAbiUrl;
      implementsInterfaces = "MintingStakingNft";
      break;
    default:
      simpleAddress = workspace;
      address = new Address(simpleAddress);
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};
