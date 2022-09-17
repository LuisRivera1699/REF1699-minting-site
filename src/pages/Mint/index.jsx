import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import "./index.css";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/contracts/contracts";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import githubSVG from "../../assets/github.svg";


const Mint = (props) => {
    const [mintQuantity, setMintQuantity] = useState(1);
    const [searchParams] = useSearchParams();

    const [totalSupply, setTotalSupply] = useState(0);
    const [balance, setBalance] = useState(0);
    const [saleStage, setSaleStage] = useState(false);

    const { currentAccount } = useAuthContext();

    const MAX_SUPPLY = 4000;

    const handleAddMintQuantity = () => {
        if (mintQuantity < 20) {
            setMintQuantity(mintQuantity + 1);
        }
    }

    const handleMinusMintQuantity = () => {
        if (mintQuantity > 1) {
            setMintQuantity(mintQuantity - 1);
        }
    }

    const getTotalSupply = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let tSupply = await contract.totalSupply();
                let sStage = await contract.saleStage();

                setTotalSupply(tSupply.toNumber());
                setSaleStage(sStage);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getBalance = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let b = await contract.balanceOf(currentAccount);

                setBalance(b.toNumber());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const mint = async () => {
        if (saleStage === 0 || saleStage === 2 || balance === 20) {
            return;
        }

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let amount = (0.015 * mintQuantity).toFixed(3);

                let mintTxn = await contract.publicMint(mintQuantity, searchParams.get("referrer") ? searchParams.get("referrer") : "0x0000000000000000000000000000000000000000", { value: ethers.utils.parseEther(amount.toString()) });

                await mintTxn.wait();

                toast.success('Successfully minted your NFT!. You can now go to Opensea and see it! :D');

                getBalance();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (currentAccount) {
            getTotalSupply();
            getBalance();
        }
    });

    return (
        <MainLayout>
            <h1>Mint your NFT!</h1>
            <span className="minted__text">Currently minted</span>
            <span className="minted__text">{totalSupply} / {MAX_SUPPLY}</span>
            <div className="quantity__container">
                <div className="quantity__button" onClick={handleMinusMintQuantity}>
                    <span className="quantity__text unselectable">-</span>
                </div>
                <div>
                    <span className="quantity__text unselectable">{mintQuantity}</span>
                </div>
                <div className="quantity__button" onClick={handleAddMintQuantity}>
                    <span className="quantity__text unselectable">+</span>
                </div>
            </div>
            <Button text={
                saleStage === 0 ?
                    "COMMING SOON" :
                    saleStage === 1 ?
                        balance < 20 ? "MINT NOW" : "MAX MINTS REACHED" :
                        "SOLD OUT"
            } method={mint} />
            {
                searchParams.get("referrer") ?
                    <div className="referrer__container">
                        <small>Referrer address:</small>
                        <small>{searchParams.get("referrer")}</small>
                    </div>
                    :
                    null
            }
            <div className="rrss__container">
                <small>Check out how this is made.</small>
                <a href="https://github.com/LuisRivera1699/REF1699-standard" target="_blank" rel="noreferrer"><img src={githubSVG} alt="" /></a>
            </div>
        </MainLayout>
    );
}

export default Mint;