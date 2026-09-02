import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlateProvider } from './PlateContext';
import { AuthProvider } from './AuthContext';
import RequirePremium from './components/RequirePremium';
import Toast from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Corsi from './pages/Corsi';
import FoodPage from './pages/FoodPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';
import FoodBattlePage from './pages/FoodBattlePage';
import StrumentiPage from './pages/StrumentiPage';
import FabbisognoPage from './pages/FabbisognoPage';
import ProteinePage from './pages/ProteinePage';
import BmiPage from './pages/BmiPage';
import ApriIlFrigoPage from './pages/ApriIlFrigoPage';
import LabPage from './pages/LabPage';
import MitoOVeritaPage from './pages/MitoOVeritaPage';
import AlimentiPage from './pages/AlimentiPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import PercorsiPage from './pages/PercorsiPage';

export default function App() {
  return (
    <AuthProvider>
    <PlateProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accedi" element={<Login />} />
          <Route
            path="/corsi"
            element={
              <RequirePremium>
                <Corsi />
              </RequirePremium>
            }
          />
          <Route path="/alimenti" element={<AlimentiPage />} />
          <Route path="/alimenti/:slug" element={<FoodPage />} />
          <Route path="/ricette" element={<RecipesPage />} />
          <Route path="/ricette/:slug" element={<RecipePage />} />
          <Route path="/confronta" element={<FoodBattlePage />} />
          <Route path="/strumenti" element={<StrumentiPage />} />
          <Route path="/strumenti/fabbisogno" element={<FabbisognoPage />} />
          <Route path="/strumenti/proteine" element={<ProteinePage />} />
          <Route path="/strumenti/bmi" element={<BmiPage />} />
          <Route path="/apri-il-frigo" element={<ApriIlFrigoPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/mito-o-verita" element={<MitoOVeritaPage />} />
          <Route path="/articoli" element={<ArticlesPage />} />
          <Route path="/articoli/:slug" element={<ArticlePage />} />
          <Route path="/percorsi-personalizzati" element={<PercorsiPage />} />
        </Routes>
      </BrowserRouter>
    </PlateProvider>
    </AuthProvider>
  );
}
