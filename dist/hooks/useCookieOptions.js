"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitCookieOptions = exports.useCookieOptions = void 0;
const react_1 = require("react");
const jotai_1 = require("jotai");
const domainAtom = jotai_1.atom('');
const useCookieOptions = () => {
    const [domain] = jotai_1.useAtom(domainAtom);
    return {
        sameSite: 'strict',
        secure: domain === 'pooltogether.com',
        domain: domain && `.${domain}`
    };
};
exports.useCookieOptions = useCookieOptions;
const useInitCookieOptions = (domain) => {
    const [, setDomain] = jotai_1.useAtom(domainAtom);
    react_1.useEffect(() => {
        setDomain(domain);
    }, [domain]);
};
exports.useInitCookieOptions = useInitCookieOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29va2llT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy91c2VDb29raWVPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyxpQ0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQUcsWUFBSSxDQUFTLEVBQUUsQ0FBQyxDQUFBO0FBRTVCLE1BQU0sZ0JBQWdCLEdBQUcsR0FBcUIsRUFBRTtJQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsZUFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3BDLE9BQU87UUFDTCxRQUFRLEVBQUUsUUFBUTtRQUNsQixNQUFNLEVBQUUsTUFBTSxLQUFLLGtCQUFrQjtRQUNyQyxNQUFNLEVBQUUsTUFBTSxJQUFJLElBQUksTUFBTSxFQUFFO0tBQy9CLENBQUE7QUFDSCxDQUFDLENBQUE7QUFQWSxRQUFBLGdCQUFnQixvQkFPNUI7QUFFTSxNQUFNLG9CQUFvQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDckQsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsZUFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3pDLGlCQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25CLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDZCxDQUFDLENBQUE7QUFMWSxRQUFBLG9CQUFvQix3QkFLaEMifQ==