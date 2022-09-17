import { useState } from "react";
import "./index.css";

const Button = (props) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClick = async () => {
        setIsProcessing(true);
        await props.method();
        setIsProcessing(false);
    }

    return (
        <button className="__button" onClick={handleClick}>
            {
                isProcessing ?
                <span>...</span> :
                <span className="unselectable">{props.text}</span>
            }   
        </button>
    );
}

export default Button;