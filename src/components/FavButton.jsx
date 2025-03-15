export default function FavButton(props) {
    
    if(props.isFaved) {
        return(
            <span className="active_heart absolute scale-[150%] right-[5%] z-2 ">&#129505;</span>
        );
    }

    return(
        <span className="deactive_heart absolute scale-[150%] right-[5%] z-2 ">&#129293;</span>
    );
}