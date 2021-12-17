export declare const useOnboard: () => {
    onboard: import("@pooltogether/bnc-onboard/dist/src/interfaces").API;
    address: string;
    network: number;
    provider: import("@ethersproject/providers").Web3Provider;
    balance: string;
    wallet: import("@pooltogether/bnc-onboard/dist/src/interfaces").Wallet;
    networkName: string;
    walletName: string;
    isWalletConnected: boolean;
    isOnboardReady: boolean;
    connectWallet: (postSignInCallback: any) => Promise<void>;
    disconnectWallet: () => void;
};
