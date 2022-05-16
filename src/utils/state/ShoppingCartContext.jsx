import React from 'react';

const ShoppingCartContext = React.createContext({
    items: [],
    itemCount: 0,
    totalCost: 0,
});

export default ShoppingCartContext;
