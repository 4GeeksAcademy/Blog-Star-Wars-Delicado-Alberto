const initialStore = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || []
};

const storeReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
      case "ADD_FAVORITE":
          const exists = state.favorites.some(
              fav => fav.uid === action.payload.uid && fav.type === action.payload.type
          );
          
          if (exists) {
              return state;
          }
          
          newState = { 
              ...state, 
              favorites: [...state.favorites, action.payload] 
          };
          localStorage.setItem("favorites", JSON.stringify(newState.favorites));
          return newState;

      case "REMOVE_FAVORITE":
          newState = { 
              ...state, 
              favorites: state.favorites.filter(
                  fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
              ) 
          };
          localStorage.setItem("favorites", JSON.stringify(newState.favorites));
          return newState;

      case "SET_FAVORITES":
          newState = { ...state, favorites: action.payload };
          localStorage.setItem("favorites", JSON.stringify(action.payload));
          return newState;

      default:
          return state;
  }
};

export { initialStore, storeReducer };
