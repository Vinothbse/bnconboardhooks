"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitializeOnboard = exports.walletAtom = exports.balanceAtom = exports.providerAtom = exports.networkNameAtom = exports.networkAtom = exports.addressAtom = exports.onboardAtom = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const bnc_onboard_1 = __importDefault(require("@pooltogether/bnc-onboard"));
const react_1 = require("react");
const jotai_1 = require("jotai");
const ethers_1 = require("ethers");
const utilities_1 = require("@pooltogether/utilities");
const constants_1 = require("../constants");
const useCookieOptions_1 = require("./useCookieOptions");
exports.onboardAtom = jotai_1.atom(undefined);
exports.addressAtom = jotai_1.atom(undefined);
exports.networkAtom = jotai_1.atom(undefined);
exports.networkNameAtom = jotai_1.atom((get) => utilities_1.getNetworkNameAliasByChainId(get(exports.networkAtom)));
exports.providerAtom = jotai_1.atom(undefined);
exports.balanceAtom = jotai_1.atom(undefined);
exports.walletAtom = jotai_1.atom(undefined);
const useInitializeOnboard = (config = { defaultNetworkName: 'mainnet' }) => {
    const [onboard, setOnboard] = jotai_1.useAtom(exports.onboardAtom);
    const [address, setAddress] = jotai_1.useAtom(exports.addressAtom);
    const [network, setNetwork] = jotai_1.useAtom(exports.networkAtom);
    const [provider, setProvider] = jotai_1.useAtom(exports.providerAtom);
    const [balance, setBalance] = jotai_1.useAtom(exports.balanceAtom);
    const [wallet, setWallet] = jotai_1.useAtom(exports.walletAtom);
    const cookieOptions = useCookieOptions_1.useCookieOptions();
    // Initialize Onboard
    const getOnboard = async () => {
        return initOnboard({
            address: setAddress,
            network: setNetwork,
            balance: setBalance,
            wallet: (wallet) => {
                if (wallet.provider) {
                    setWallet(wallet);
                    setProvider(new ethers_1.ethers.providers.Web3Provider(wallet.provider, 'any'));
                    js_cookie_1.default.set(constants_1.SELECTED_WALLET_COOKIE_KEY, wallet.name, cookieOptions);
                }
                else {
                    setWallet(undefined);
                    setProvider(undefined);
                    js_cookie_1.default.remove(constants_1.SELECTED_WALLET_COOKIE_KEY, cookieOptions);
                }
            }
        }, config);
    };
    const handleLoadOnboard = async () => {
        const _onboard = await getOnboard();
        setOnboard(_onboard);
    };
    react_1.useEffect(() => {
        handleLoadOnboard();
    }, []);
    // Internal Functions
    const setSelectedWallet = react_1.useCallback((selectedWallet) => {
        try {
            onboard.walletSelect(selectedWallet);
        }
        catch (e) {
            console.error(e);
            console.warn("Onboard isn't ready!");
        }
    }, [onboard]);
    const disconnectWallet = react_1.useCallback(() => {
        try {
            onboard.walletReset();
            js_cookie_1.default.remove(constants_1.SELECTED_WALLET_COOKIE_KEY, cookieOptions);
        }
        catch (e) {
            console.error(e);
            console.warn("Onboard isn't ready!");
        }
    }, [onboard, cookieOptions]);
    // Hooks
    // Auto sign in
    react_1.useEffect(() => {
        const previouslySelectedWallet = js_cookie_1.default.get(constants_1.SELECTED_WALLET_COOKIE_KEY);
        if (onboard && Boolean(previouslySelectedWallet)) {
            disconnectWallet();
            setSelectedWallet(previouslySelectedWallet);
        }
    }, [onboard]);
};
exports.useInitializeOnboard = useInitializeOnboard;
const initOnboard = (subscriptions, walletConfig) => {
    const onboard = bnc_onboard_1.default;
    const APP_NAME = 'PoolTogether';
    const { infuraId: INFURA_ID, fortmaticKey: FORTMATIC_KEY, portisKey: PORTIS_KEY, defaultNetworkName, customWalletsConfig } = walletConfig;
    const defaultNetworkId = utilities_1.getChainIdByAlias(defaultNetworkName);
    const RPC_URL = defaultNetworkName && INFURA_ID
        ? `https://${defaultNetworkName}.infura.io/v3/${INFURA_ID}`
        : 'http://localhost:8545';
    const walletConnectOptions = {
        infuraKey: INFURA_ID,
        preferred: true,
        rpc: {
            42220: 'https://forno.celo.org',
            44787: 'https://alfajores-forno.celo-testnet.org',
            62320: 'https://baklava-forno.celo-testnet.org',
            1: RPC_URL,
            137: 'https://polygon-rpc.com'
        },
        bridge: 'https://pooltogether.bridge.walletconnect.org/'
    };
    const DEFAULT_WALLETS_CONFIG = [
        { walletName: 'metamask', preferred: true },
        {
            walletName: 'walletConnect',
            ...walletConnectOptions
        },
        { walletName: 'rainbow', preferred: true, ...walletConnectOptions },
        { walletName: 'argent', preferred: true, ...walletConnectOptions },
        { walletName: 'trustWallet', preferred: true, ...walletConnectOptions },
        { walletName: 'gnosisSafe', preferred: true, ...walletConnectOptions },
        { walletName: 'trust', preferred: true, rpcUrl: RPC_URL },
        { walletName: 'coinbase', preferred: true },
        {
            walletName: 'walletLink',
            preferred: true,
            rpcUrl: RPC_URL
        },
        {
            walletName: 'trezor',
            preferred: true,
            appUrl: 'https://app.pooltogether.com',
            email: 'hello@pooltogether.com',
            rpcUrl: RPC_URL
        },
        {
            walletName: 'ledger',
            preferred: true,
            rpcUrl: RPC_URL
        },
        {
            walletName: 'fortmatic',
            preferred: true,
            apiKey: FORTMATIC_KEY
        },
        {
            walletName: 'imToken',
            preferred: true,
            rpcUrl: RPC_URL
        },
        { walletName: 'valora', preferred: true, ...walletConnectOptions },
        {
            walletName: 'dcent',
            preferred: true
        },
        {
            walletName: 'huobiwallet',
            preferred: true,
            rpcUrl: RPC_URL
        },
        {
            walletName: 'portis',
            preferred: true,
            apiKey: PORTIS_KEY
        },
        {
            walletName: 'authereum',
            preferred: true
        },
        {
            walletName: 'status',
            preferred: true
        },
        {
            walletName: 'torus',
            preferred: true
        },
        {
            walletName: 'lattice',
            preferred: true,
            rpcUrl: RPC_URL,
            appName: APP_NAME
        },
        {
            walletName: 'mykey',
            preferred: true,
            rpcUrl: RPC_URL
        },
        {
            walletName: 'opera',
            preferred: true
        },
        {
            walletName: 'operaTouch',
            preferred: true
        },
        {
            walletName: 'web3Wallet',
            preferred: true
        }
    ];
    return onboard({
        hideBranding: true,
        networkId: defaultNetworkId,
        darkMode: true,
        subscriptions,
        walletSelect: {
            wallets: customWalletsConfig || DEFAULT_WALLETS_CONFIG
        },
        walletCheck: [
            { checkName: 'derivationPath' },
            { checkName: 'connect' },
            { checkName: 'accounts' },
            { checkName: 'network' }
        ]
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlSW5pdGlhbGl6ZU9uYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3MvdXNlSW5pdGlhbGl6ZU9uYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMERBQStCO0FBQy9CLDRFQUErQztBQUMvQyxpQ0FBOEM7QUFDOUMsaUNBQXFDO0FBQ3JDLG1DQUErQjtBQUUvQix1REFBeUY7QUFFekYsNENBQXlEO0FBQ3pELHlEQUFxRDtBQUV4QyxRQUFBLFdBQVcsR0FBRyxZQUFJLENBQU0sU0FBZ0IsQ0FBQyxDQUFBO0FBQ3pDLFFBQUEsV0FBVyxHQUFHLFlBQUksQ0FBUyxTQUFtQixDQUFDLENBQUE7QUFDL0MsUUFBQSxXQUFXLEdBQUcsWUFBSSxDQUFTLFNBQW1CLENBQUMsQ0FBQTtBQUMvQyxRQUFBLGVBQWUsR0FBRyxZQUFJLENBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLHdDQUE0QixDQUFDLEdBQUcsQ0FBQyxtQkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3ZGLFFBQUEsWUFBWSxHQUFHLFlBQUksQ0FDOUIsU0FBMEMsQ0FDM0MsQ0FBQTtBQUNZLFFBQUEsV0FBVyxHQUFHLFlBQUksQ0FBUyxTQUFtQixDQUFDLENBQUE7QUFDL0MsUUFBQSxVQUFVLEdBQUcsWUFBSSxDQUFTLFNBQW1CLENBQUMsQ0FBQTtBQUVwRCxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLFNBTUksRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsRUFDckMsRUFBRTtJQUNGLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsZUFBTyxDQUFDLG1CQUFXLENBQUMsQ0FBQTtJQUNsRCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLGVBQU8sQ0FBQyxtQkFBVyxDQUFDLENBQUE7SUFDbEQsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxlQUFPLENBQUMsbUJBQVcsQ0FB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