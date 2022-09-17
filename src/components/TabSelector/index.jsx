import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import TabItem from "./TabItem";

const TabSelector = (props) => {
    const [isMint, setIsMint] = useState(true);
    const navigate = useNavigate();
    const onlyOnce = useRef(false);

    const handleSwitchTab = (b) => {
        setIsMint(b);
        if (b !== isMint) {
            if (b) {
                navigate('/');
            } else {
                navigate('/refer');
            }
        }
    }

    useEffect(() => {
        if (!onlyOnce.current) {
            if (window.location.pathname === '/refer') {
                setIsMint(false);
            }
            onlyOnce.current =  true;
        }
    }, [setIsMint]);

    return (
        <div className="tab__container">
            <TabItem title="Mint" isLeft={true} selected={isMint} onClick={() => handleSwitchTab(true)}/>
            <TabItem title="Refer" selected={!isMint} onClick={() => handleSwitchTab(false)}/>
        </div>
    );
}

export default TabSelector;