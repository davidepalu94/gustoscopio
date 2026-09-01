import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlateProvider } from './PlateContext';
import Toast from './components/Toast';
import Home from './pages/Home';
import FoodPage from './pages/FoodPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';
import FoodBattlePage from './pages/FoodBattlePage';
import StrumentiPage from './pages/StrumentiPage';
import FabbisognoPage from './pages/FabbisognoPage';
import ProteinePage from './pages/ProteinePage';
import BmiPage from './pages/BmiPage';
import ApriIlFrigoPage from './pages/ApriIlFrigoPage';

export default function App() {
  return (
    <PlateProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alimenti/:slug" element={<FoodPage />} />
          <Route path="/ricette" element={<RecipesPage />} />
          <Route path="/ricette/:slug" element={<RecipePage />} />
          <Route path="/confronta" element={<FoodBattlePage />} />
          <Route path="/strumenti" element={<StrumentiPage />} />
          <Route path="/strumenti/fabbisogno" element={<FabbisognoPage />} />
          <Route path="/strumenti/proteine" element={<ProteinePage />} />
          <Route path="/strumenti/bmi" element={<BmiPage />} />
          <Route path="/apri-il-frigo" element={<ApriIlFrigoPage />} />
        </Routes>
      </BrowserRouter>
    </PlateProvider>
  );
}
