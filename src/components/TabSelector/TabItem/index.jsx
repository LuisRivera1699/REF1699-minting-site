import "./index.css";

const TabItem = (props) => {
    return (
        <div className={`tab__item ${props.isLeft ? 'item__left' : 'item__right'} ${props.selected ? 'tab__item__selected' : ''}`}
            onClick={props.onClick}>
            <p>{props.title}</p>
        </div>
    );
}

export default TabItem;