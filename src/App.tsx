import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import ProductsList from './pages/ProductsList.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import CreateProduct from './pages/CreateProduct.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/create" element={<CreateProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
