import { useState } from "react";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";

const Refer = (props) => {
    const [showUrl, setShowUrl] = useState(false);
    const [coppied, setIsCoppied] = useState(false);
    const { currentAccount } = useAuthContext();

    const handleCopyToClipboard = () => {
        setIsCoppied(true);
        navigator.clipboard.writeText(getReferrerUrl());
    }

    const getReferrerUrl = () => {
        return window.location.origin+'?referrer='+currentAccount;
    }

    return (
        <MainLayout>
            <h1>Refer minters and earn $ETHs!</h1>
            <span>We give 10% to referrer holders and 1% to non holders referrers per each referral mint.</span>
            <span className={!showUrl ? '__mt20 __mb20' : '__mt20'}>
                {
                    showUrl ?
                    "Click the generated url to copy it on your clipboard and send it to your friends." :
                    "Click the button below to get your referrer url and start referring."
                }
                
            </span>
            <div className={`rurl__container ${!showUrl ? 'hidden' : ''}`}>
                {
                    coppied ?
                    <span className="coppied__disclaimer">URL coppied to clipboard!</span> :
                    <span onClick={handleCopyToClipboard}>{getReferrerUrl()}</span>
                }
            </div>
            <Button text={showUrl ? 'CLICK ON URL TO COPY' : 'GET REFERRER URL'} method={() => {setShowUrl(true)}}/>
        </MainLayout>
    );
}

export default Refer;