import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

const FavoriteButton = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();
    const [isLocalFavorite, setIsLocalFavorite] = useState(false);

    useEffect(() => {
        const isFav = store.favorites.some(fav => 
            fav.uid === item.uid && fav.type === item.type
        );
        setIsLocalFavorite(isFav);
    }, [store.favorites, item.uid, item.type]);

    const toggleFavorite = () => {
        const newFavoriteState = !isLocalFavorite;
        setIsLocalFavorite(newFavoriteState);

        if (newFavoriteState) {
            dispatch({ type: "ADD_FAVORITE", payload: item });
        } else {
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        }
    };

    return (
        <button 
            className={`btn-favorite ${isLocalFavorite ? "active" : ""}`} 
            onClick={toggleFavorite}
            data-type={item.type}
            data-uid={item.uid}
        >
            {isLocalFavorite ? "❤️" : "🤍"}
        </button>
    );
};

export default FavoriteButton;
