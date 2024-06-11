import { Provider } from 'react-redux';
import ProductList from './components/ProductList';
import './styles/css/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from './redux/store';
import ProductView from './components/ProductView';
import AddProductForm from './components/AddProductForm';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductView/>}/>
                    <Route path="/add-product" element={<AddProductForm/>}/>
                </Routes>
            </Router>
        </ Provider >
    );
}

export default App;
