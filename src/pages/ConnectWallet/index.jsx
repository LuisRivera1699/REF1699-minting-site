import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";

const ConnectWallet = (props) => {
    const { connectWallet } = useAuthContext();

    return (
        <MainLayout>
            <Button text="CONNECT WITH METAMASK" method={connectWallet}/>
        </MainLayout>
    );
}

export default ConnectWallet;