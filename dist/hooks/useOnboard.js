"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnboard = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_1 = require("react");
const jotai_1 = require("jotai");
const useInitializeOnboard_1 = require("./useInitializeOnboard");
const constants_1 = require("../constants");
const useCookieOptions_1 = require("./useCookieOptions");
const useOnboard = () => {
    const [onboard] = jotai_1.useAtom(useInitializeOnboard_1.onboardAtom);
    const [address] = jotai_1.useAtom(useInitializeOnboard_1.addressAtom);
    const [network] = jotai_1.useAtom(useInitializeOnboard_1.networkAtom);
    const [networkName] = jotai_1.useAtom(useInitializeOnboard_1.networkNameAtom);
    const [provider] = jotai_1.useAtom(useInitializeOnboard_1.providerAtom);
    const [balance] = jotai_1.useAtom(useInitializeOnboard_1.balanceAtom);
    const [wallet] = jotai_1.useAtom(useInitializeOnboard_1.walletAtom);
    const cookieOptions = useCookieOptions_1.useCookieOptions();
    // External Functions
    const connectWallet = react_1.useCallback(async (postSignInCallback) => {
        try {
            // Let user select wallet
            const walletSelected = await onboard.walletSelect();
            if (!walletSelected) {
                return;
            }
            const walletIsReady = await onboard.walletCheck();
            if (!walletIsReady) {
                return;
            }
            trackWalletConnectedGoal(onboard);
            postSignInCallback?.();
        }
        catch (e) {
            console.error(e);
            console.warn('Onboard error');
        }
    }, [onboard]);
    const disconnectWallet = react_1.useCallback(() => {
        try {
            onboard.walletReset();
            js_cookie_1.default.remove(constants_1.SELECTED_WALLET_COOKIE_KEY, cookieOptions);
        }
        catch (e) {
            console.error(e);
            console.warn('Onboard error');
        }
    }, [onboard, cookieOptions]);
    // Hooks
    return {
        // Data
        onboard,
        address,
        network,
        provider,
        balance,
        wallet,
        // Convenience
        networkName,
        walletName: wallet?.name,
        isWalletConnected: Boolean(wallet) && Boolean(address),
        isOnboardReady: Boolean(onboard),
        // Functions
        connectWallet,
        disconnectWallet
    };
};
exports.useOnboard = useOnboard;
const WALLET_CONNECTED_GOALS_MAPPING = {
    'MetaMask': '7ES8KJDL',
    'WalletConnect': 'QRMTASRB',
    'Rainbow': 'FX8BNN3H',
    'Argent': 'F1RWQBVS',
    'Trust Wallet': 'X7JOP245',
    'Gnosis Safe': 'GT9K2R3Z',
    'Coinbase Wallet': 'PIYGDMAR',
    'Trezor': 'TU6DAWAZ',
    'Ledger': 'JHPHUI00',
    'Fortmatic': 'SYCBUNUA',
    'Portis': 'GFPDI0OW',
    'Authereum': 'F5U95ZHJ',
    'Torus': '0W1QGAYE',
    'Lattice': '4HZXMHK8',
    'Opera': 'VFMCHT9R',
    'Opera Touch': 'DS0XRUCJ',
    'MYKEY': 'ZGKE5KFX',
    'Huobi Wallet': 'UX6WJNB3',
    "D'CENT": 'HDO2XUKB',
    'imToken': '7IBOGHSP',
    'Web3 Wallet': '3BVHUJM2'
};
// If Fathom is available track which wallet was connected as a Goal
const trackWalletConnectedGoal = (onboard) => {
    const wallet = onboard.getState().wallet;
    if (window['fathom'] && wallet?.name) {
        const goalCode = WALLET_CONNECTED_GOALS_MAPPING[wallet.name];
        if (!goalCode) {
            console.warn(`Wallet: '${wallet.name}', wallet needs Fathom Goal set up for it`);
            return;
        }
        window['fathom'].trackGoal(goalCode, 1);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlT25ib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy91c2VPbmJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUErQjtBQUMvQixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLGlFQVErQjtBQUMvQiw0Q0FBeUQ7QUFDekQseURBQXFEO0FBRTlDLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBTyxDQUFDLGtDQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBTyxDQUFDLGtDQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBTyxDQUFDLGtDQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsZUFBTyxDQUFDLHNDQUFlLENBQUMsQ0FBQTtJQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsZUFBTyxDQUFDLG1DQUFZLENBQUMsQ0FBQTtJQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBTyxDQUFDLGtDQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsZUFBTyxDQUFDLGlDQUFVLENBQUMsQ0FBQTtJQUVwQyxNQUFNLGFBQWEsR0FBRyxtQ0FBZ0IsRUFBRSxDQUFBO0lBRXhDLHFCQUFxQjtJQUVyQixNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUMvQixLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFBRTtRQUMzQixJQUFJO1lBQ0YseUJBQXlCO1lBQ3pCLE1BQU0sY0FBYyxHQUFHLE1BQU0sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQ25ELElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ25CLE9BQU07YUFDUDtZQUVELE1BQU0sYUFBYSxHQUFHLE1BQU0sT0FBTyxDQUFDLFdBQVcs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