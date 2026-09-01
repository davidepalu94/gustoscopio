import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlateProvider } from './PlateContext';
import Toast from './components/Toast';
import Home from './pages/Home';
import FoodPage from './pages/FoodPage';

export default function App() {
  return (
    <PlateProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alimenti/:slug" element={<FoodPage />} />
        </Routes>
      </BrowserRouter>
    </PlateProvider>
  );
}
