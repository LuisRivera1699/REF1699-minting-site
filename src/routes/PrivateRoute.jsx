import { useAuthContext } from "../context/AuthContext";
import ConnectWallet from "../pages/ConnectWallet";

const PrivateRoute = ({children}) => {
    const { currentAccount } = useAuthContext();

    if (currentAccount) {
        return children;
    } else {
        return <ConnectWallet/>
    }
}

export default PrivateRoute;