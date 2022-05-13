import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetail';
import Homepage from './pages/HomePage';
import NoMatch from './components/common/NoMatch';
import SearchPage from './pages/SearchPage';

function App() {


  return (
    <>
      <BrowserRouter>
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
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
