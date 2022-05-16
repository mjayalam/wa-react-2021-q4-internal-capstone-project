
const ShoppingCartReducer = (state, action) => {
    let INITIAL_STATE = {
      items: [],
      itemCount: 0,
      totalCost: 0,
    }
    switch (action.type) {
      case "ADD_ITEM":
        const alreadyIn = state.items.filter(item => action.payload.product.id === item.id)
        const filteredState = state.items.filter(item => action.payload.product.id !== item.id)
        let newState = []
        if(alreadyIn.length === 0) {
          newState = [ ...state.items, {...action.payload.product, count: action.payload.itemCount}]
        } else {
          newState = [...filteredState, {...action.payload.product, count: alreadyIn[0].count + action.payload.itemCount}]
        }
        return {
          ...state,
          items: newState,
          itemCount: state.itemCount + action.payload.itemCount,
          totalCost: (state.totalCost === undefined ? 0 : state.totalCost) + (action.payload.product.data.price * action.payload.itemCount)
        };
      case "UPDATE_ITEM":
        return {
          ...state,
          items: state.items.map((item) => {
            if(item.id === action.payload.id) {
              return {
                ...item,
                count: action.payload.count
              }
            }
            return item;
          }),
          itemCount: state.itemCount + action.payload.remCount,
          totalCost: (state.totalCost === undefined ? 0 : state.totalCost) + (action.payload.data.price * action.payload.remCount)
        };
      case "REMOVE_ITEM":
        const newItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
    
        return {
          ...state,
          items: newItems,
          itemCount: state.itemCount - action.payload.count,
          totalCost: state.totalCost - (action.payload.data.price * action.payload.count)
        };

      case "RESET_ITEMS":  
        return {
          ...INITIAL_STATE
        };
      default:
        return state;
    }
};

export default ShoppingCartReducer;
