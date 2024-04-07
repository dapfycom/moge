import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import {
  IEGLDPaymentProps,
  IESDTNFTTransferProps,
  IESDTTransferProps,
  IMultiESDTNFTTransferProps,
  IScCallProps,
  ISendTransactionProps,
  IwrapEgldAndEsdtTranferProps,
} from "@/types/sc.interface";
import {
  AbiRegistry,
  Address,
  ContractFunction,
  IAddress,
  Interaction,
  SmartContract,
  TokenTransfer,
  Transaction,
} from "@multiversx/sdk-core";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { SendTransactionReturnType } from "@multiversx/sdk-dapp/types";
import { refreshAccount } from "@multiversx/sdk-dapp/utils";
import BigNumber from "bignumber.js";
import { WspTypes, getInterface } from "..";

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

export class SmartContractInteraction {
  private contract;
  constructor(smartContractAddress: string, abiFile?: any) {
    const scAddress = new Address(smartContractAddress);

    this.contract = new SmartContract({ address: scAddress, abi: abiFile });
  }

  // get contract
  public getContract() {
    return this.contract;
  }

  private static createTransactionFromInteraction(
    interaction: Interaction,
    options?: {
      gasL?: number;
      egldVal?: BigNumber.Value;
      realValue?: BigNumber.Value;
    }
  ): Transaction {
    console.log({ interaction, options });

    const sender = store.getState().dapp.userAddress;
    const senderAddress = new Address(sender);

    const tx = interaction
      .withSender(senderAddress)
      .withValue(
        options?.realValue
          ? TokenTransfer.egldFromBigInteger(options.realValue)
          : TokenTransfer.egldFromAmount(options?.egldVal || 0)
      )
      .withGasLimit(options?.gasL || 50000000)
      .withChainID(selectedNetwork.ChainID)
      .buildTransaction();

    return tx;
  }

  public static async sendTransaction({
    interaction,
    options,
  }: ISendTransactionProps) {
    const tx = SmartContractInteraction.createTransactionFromInteraction(
      interaction,
      options
    );

    await refreshAccount();

    return await sendTransactions({
      transactions: tx,
    });
  }

  public static async sendMultipleTransactions({
    txs,
  }: {
    txs: Transaction[];
  }): Promise<SendTransactionReturnType> {
    await refreshAccount();

    const res = await sendTransactions({
      transactions: txs,
    });

    return res;
  }

  private createInteraction(
    functionName: string,
    arg: any[] = [],
    customContract?: SmartContract
  ): Interaction {
    const contractFunction = new ContractFunction(functionName);

    let interaction = new Interaction(
      customContract || this.contract,
      contractFunction,
      arg
    );
    return interaction;
  }

  public scCall({ functionName, arg = [], gasL }: IScCallProps) {
    const contractFunction = new ContractFunction(functionName);

    let interaction = new Interaction(this.contract, contractFunction, arg);

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: {
        gasL,
      },
    });
  }

  public ESDTTransfer({
    functionName,
    token,
    arg = [],
    gasL,
    value,
    realValue,
  }: IESDTTransferProps) {
    let interaction = this.createInteraction(functionName, arg);

    interaction.withSingleESDTTransfer(
      realValue
        ? TokenTransfer.fungibleFromBigInteger(
            token.collection,
            realValue,
            token.decimals
          )
        : TokenTransfer.fungibleFromAmount(
            token.collection,
            value || 0,
            token.decimals!
          )
    );

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: { gasL },
    });
  }

  public ESDTNFTTransfer({
    functionName,
    token,
    arg = [],
    gasL,
  }: IESDTNFTTransferProps) {
    let interaction = this.createInteraction(functionName, arg);

    interaction.withSingleESDTNFTTransfer(
      TokenTransfer.nonFungible(token.collection, token.nonce)
    );

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: { gasL },
    });
  }

  public ESDTSFTTransfer({
    functionName,
    token,
    quantity,
    arg = [],
    gasL,
  }: IESDTNFTTransferProps & { quantity: number }) {
    let interaction = this.createInteraction(functionName, arg);

    interaction.withSingleESDTNFTTransfer(
      TokenTransfer.semiFungible(token.collection, token.nonce, quantity)
    );

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: { gasL },
    });
  }

  /**
   * EGLDPayment
   */
  public EGLDPayment({
    functionName,
    value,
    realValue,
    arg = [],
    gasL,
  }: IEGLDPaymentProps) {
    let interaction = this.createInteraction(functionName, arg);

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: { gasL, egldVal: value, realValue },
    });
  }

  /**
   * ESDTorEGLDTransfer
   */
  public ESDTorEGLDTransfer({
    functionName,
    token,
    arg = [],
    gasL,
    value,
    realValue,
  }: IESDTTransferProps) {
    let interaction = this.createInteraction(functionName, arg);

    if (token.collection === selectedNetwork.tokensID.egld) {
      console.log({ token: token.collection });

      return SmartContractInteraction.sendTransaction({
        interaction,
        options: { gasL, egldVal: value, realValue },
      });
    } else {
      interaction.withSingleESDTTransfer(
        realValue
          ? TokenTransfer.fungibleFromBigInteger(
              token.collection,
              realValue,
              token.decimals
            )
          : TokenTransfer.fungibleFromAmount(
              token.collection,
              value || 0,
              token.decimals!
            )
      );

      return SmartContractInteraction.sendTransaction({
        interaction,
        options: { gasL },
      });
    }
  }

  // ------BEGINS Transactions only ------
  /**
   * scCallOnlyTx
   */
  public scCallOnlyTx({
    functionName,
    arg = [],
    gasL,
  }: IScCallProps): Transaction {
    const contractFunction = new ContractFunction(functionName);

    let interaction = new Interaction(this.contract, contractFunction, arg);

    const tx = SmartContractInteraction.createTransactionFromInteraction(
      interaction,
      {
        gasL,
      }
    );

    return tx;
  }

  /**
   * ESDTTransferOnlyTx
   */
  public ESDTTransferOnlyTx({
    functionName,
    token,
    arg = [],
    gasL,
    value,
    realValue,
  }: IESDTTransferProps): Transaction {
    let interaction = this.createInteraction(functionName, arg);

    interaction.withSingleESDTTransfer(
      realValue
        ? TokenTransfer.fungibleFromBigInteger(
            token.collection,
            realValue,
            token.decimals
          )
        : TokenTransfer.fungibleFromAmount(
            token.collection,
            value || 0,
            token.decimals!
          )
    );

    const tx = SmartContractInteraction.createTransactionFromInteraction(
      interaction,
      {
        gasL,
      }
    );

    return tx;
  }

  /**
   * EGLDPaymentOnlyTx
   */
  public EGLDPaymentOnlyTx({
    functionName,
    value,
    arg = [],
    gasL,
    realValue,
  }: IEGLDPaymentProps): Transaction {
    let interaction = this.createInteraction(functionName, arg);

    const tx = SmartContractInteraction.createTransactionFromInteraction(
      interaction,
      {
        gasL,
        egldVal: value,
        realValue: realValue,
      }
    );

    return tx;
  }

  /**
   * MultiESDTNFTTransferOnlyTx
   */
  public MultiESDTNFTTransferOnlyTx({
    functionName,
    tokens,
    arg = [],
    gasL,
  }: IMultiESDTNFTTransferProps) {
    let interaction = this.createInteraction(functionName, arg);

    const tokensToTransfer = tokens.map((token) => {
      let tokenTransfer: TokenTransfer;
      if (!token.nonce || token.nonce === 0) {
        tokenTransfer = TokenTransfer.fungibleFromAmount(
          token.collection,
          token.value,
          token?.decimals || 0
        );
      } else {
        tokenTransfer = TokenTransfer.nonFungible(
          token.collection,
          token.nonce
        );
      }

      return tokenTransfer;
    });

    interaction.withMultiESDTNFTTransfer(tokensToTransfer);

    const tx = SmartContractInteraction.createTransactionFromInteraction(
      interaction,
      {
        gasL,
      }
    );

    return tx;
  }
  // ------ENDS Transactions only ------

  /**
   * wrapEgldAndEsdtTranfer
   */
  public wrapEgldAndEsdtTranfer({
    functionName,
    value,
    arg = [],
    gasL,
  }: IwrapEgldAndEsdtTranferProps) {
    //wrap egld
    const wrapEgldFunctionName = "wrapEgld";
    let { address }: { address?: IAddress | null } =
      getInterface("wrapEgldpWsp");

    if (address) {
      const wrapeEgldContract = new SmartContract({ address: address });

      let wrapInteraction = this.createInteraction(
        wrapEgldFunctionName,
        [],
        wrapeEgldContract
      );

      const tx1 = SmartContractInteraction.createTransactionFromInteraction(
        wrapInteraction,
        {
          egldVal: value,
        }
      );

      //esdt transfer

      let esdtTranferInteraction = this.createInteraction(functionName, arg);

      const tokenIdentifier = selectedNetwork.tokensID.wegld;

      esdtTranferInteraction.withSingleESDTTransfer(
        TokenTransfer.fungibleFromAmount(tokenIdentifier, value || 0, 18)
      );
      const tx2 = SmartContractInteraction.createTransactionFromInteraction(
        esdtTranferInteraction,
        {
          gasL,
        }
      );

      SmartContractInteraction.sendMultipleTransactions({
        txs: [tx1, tx2],
      });
    }
  }

  /**
   * MultiESDTNFTTransfer
   */
  public MultiESDTNFTTransfer({
    functionName,
    tokens,
    arg = [],
    gasL,
  }: IMultiESDTNFTTransferProps) {
    let interaction = this.createInteraction(functionName, arg);

    const tokensToTransfer = tokens.map((token) => {
      let tokenTransfer: TokenTransfer;
      if (!token.nonce || token.nonce === 0) {
        if (token?.decimals) {
          tokenTransfer = TokenTransfer.fungibleFromAmount(
            token.collection,
            token.value,
            token.decimals
          );
        } else {
          tokenTransfer = TokenTransfer.fungibleFromBigInteger(
            token.collection,
            token.value
          );
        }
      } else {
        tokenTransfer = TokenTransfer.nonFungible(
          token.collection,
          token.nonce
        );
      }

      return tokenTransfer;
    });

    interaction.withMultiESDTNFTTransfer(tokensToTransfer);

    return SmartContractInteraction.sendTransaction({
      interaction,
      options: {
        gasL,
      },
    });
  }
}
