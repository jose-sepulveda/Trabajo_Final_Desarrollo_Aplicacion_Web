// import logo from './logo.svg';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Menu } from './components/Menu';
import { InicioPage } from './pages/InicioPage';
import { CoffeesPage } from './pages/CoffeesPage';
import { AcercaDePage } from './pages/AcercaDePage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { AuthProvider } from './auth/AuthContext';
import { GestionCoffePage } from './pages/GestionCoffePage';
import { ClientesPage} from './pages/ClientesPage';
import { PrivateRoute } from './auth/PrivateRoute';


function App() {
  return (
    <AuthProvider>
    <HashRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<InicioPage/>}/> 
        <Route path="/coffeesPage" element={<CoffeesPage />}/> 
        <Route path="/acercaDe" element={<AcercaDePage />}/> 
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/gestion-coffee" element={<PrivateRoute><GestionCoffePage /></PrivateRoute>}/>
        <Route path="/clientes-page" element={<PrivateRoute><ClientesPage /></PrivateRoute>}/>
        <Route path="/registroPage" element={<RegistroPage />}/>
        <Route path="*" element={<p>Ups, no existe la ruta</p>}/> 
      </Routes>
      <footer className="footer">
          Chile, 2024
        </footer>
    </HashRouter>
    </AuthProvider> //todo lo que este dentro de esto se podra usaar el metodo del AuthContext 
  );
}

export default App;
