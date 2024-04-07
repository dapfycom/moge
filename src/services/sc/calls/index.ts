import { AbiRegistry, Address } from "@multiversx/sdk-core/out";
import { WspTypes, getInterface } from "..";
import { SmartContractInteraction } from "./transaction";

export const getSmartContractInteraction = (
  key: WspTypes | string
): SmartContractInteraction => {
  const smartsContractsInteractions: {
    [key: string]: SmartContractInteraction;
  } = {
    bskFarmWsp: new SmartContractInteraction(
      getInterface("bskFarmWsp").simpleAddress
    ),
    maiarRouterWsp: new SmartContractInteraction(
      getInterface("maiarRouterWsp").simpleAddress
    ),
    wrapEgldpWspShard2: new SmartContractInteraction(
      getInterface("wrapEgldpWspShard2").simpleAddress
    ),
    wrapEgldpWspShard1: new SmartContractInteraction(
      getInterface("wrapEgldpWspShard1").simpleAddress
    ),
    wrapEgldpWsp: new SmartContractInteraction(
      getInterface("wrapEgldpWsp").simpleAddress
    ),
    maiarBskExchangeWsp: new SmartContractInteraction(
      getInterface("maiarBskExchangeWsp").simpleAddress
    ),
    flipWsp: new SmartContractInteraction(
      getInterface("flipWsp").simpleAddress
    ),
    dustWsp: new SmartContractInteraction(
      getInterface("dustWsp").simpleAddress
    ),
    hatomParentWsp: new SmartContractInteraction(
      getInterface("hatomParentWsp").simpleAddress
    ),
    aggregatorWsp: new SmartContractInteraction(
      getInterface("aggregatorWsp").simpleAddress,
      AbiRegistry.create(getInterface("aggregatorWsp").abiUrl)
    ),
    ashSwapFarmWsp: new SmartContractInteraction(
      getInterface("ashSwapFarmWsp").simpleAddress,
      AbiRegistry.create(getInterface("ashSwapFarmWsp").abiUrl)
    ),
    oneDexFarmWsp: new SmartContractInteraction(
      getInterface("oneDexFarmWsp").simpleAddress,
      AbiRegistry.create(getInterface("oneDexFarmWsp").abiUrl)
    ),
    ashSwapAggregatorWsp: new SmartContractInteraction(
      getInterface("ashSwapAggregatorWsp").simpleAddress,
      AbiRegistry.create(getInterface("ashSwapAggregatorWsp").abiUrl)
    ),
    originalOneDexWsp: new SmartContractInteraction(
      getInterface("originalOneDexWsp").simpleAddress,
      AbiRegistry.create(getInterface("originalOneDexWsp").abiUrl)
    ),
    rewardsWsp: new SmartContractInteraction(
      getInterface("rewardsWsp").simpleAddress,
      AbiRegistry.create(getInterface("rewardsWsp").abiUrl)
    ),
    stakeBskWsp: new SmartContractInteraction(
      getInterface("stakeBskWsp").simpleAddress,
      AbiRegistry.create(getInterface("stakeBskWsp").abiUrl)
    ),
    pvpWsp: new SmartContractInteraction(
      getInterface("pvpWsp").simpleAddress,
      AbiRegistry.create(getInterface("pvpWsp").abiUrl)
    ),

    mintingStakingNftWsp: new SmartContractInteraction(
      getInterface("mintingStakingNftWsp").simpleAddress,
      AbiRegistry.create(getInterface("mintingStakingNftWsp").abiUrl)
    ),
  };

  if (smartsContractsInteractions[key]) {
    return smartsContractsInteractions[key];
  } else {
    try {
      new Address(key);
    } catch (error) {
      throw new Error("Invalid address");
    }
    return new SmartContractInteraction(key);
  }
};
