import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert('Man, go and get Metamask!');
            return;
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            setCurrentAccount(account);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Man, go and get Metamask!');
                return;
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    });

    const value = {
        currentAccount,
        connectWallet
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth;
}