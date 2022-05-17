import React, { useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetail';
import Homepage from './pages/HomePage';
import NoMatch from './components/common/NoMatch';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import ShoppingCartContext from './utils/state/ShoppingCartContext';
import ShoppingCartReducer from './utils/state/ShoppingCartReducer';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [state, dispatch] = useReducer(ShoppingCartReducer,{
    items: [],
    itemCount: 0,
  })

  return (
    <>
      <BrowserRouter>
        <ShoppingCartContext.Provider value={{ state, dispatch }}>
          <Header />
          <Switch>
            <Route exact path="/wa-react-2021-q4-internal-capstone-project">
              <Homepage/>
            </Route>
            <Route exact path="/product-list">
              <ProductListPage/>
            </Route>
            <Route exact path="/product-detail/:id">
              <ProductDetailPage />
            </Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/cart">
              <CartPage state={state} dispatch={dispatch} />
            </Route>
            <Route exact path="/checkout">
              <CheckoutPage />
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </ShoppingCartContext.Provider>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
