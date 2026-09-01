import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlateProvider } from './PlateContext';
import Toast from './components/Toast';
import Home from './pages/Home';
import FoodPage from './pages/FoodPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';
import FoodBattlePage from './pages/FoodBattlePage';

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
        </Routes>
      </BrowserRouter>
    </PlateProvider>
  );
}
