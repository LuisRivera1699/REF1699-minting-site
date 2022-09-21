import "./index.css";
import square from "../../assets/ref-icon.png";
import Header from "../Header";
import TabSelector from "../TabSelector";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {

    return (
        <div className="page__container">
            <Header />
            <section className="page__content">
                <div className="__content">
                    <TabSelector />
                    <div className="image__container">
                        <img src={square} alt="" />
                    </div>
                    <div className="child__content">
                        {props.children}
                    </div>
                </div>
            </section>
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default MainLayout;