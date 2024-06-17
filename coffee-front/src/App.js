// import logo from './logo.svg';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Menu } from './components/Menu';
import { InicioPage } from './pages/InicioPage';
import { CoffeesPage } from './pages/CoffeesPage';
import { AcercaDePage } from './pages/AcercaDePage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';



import { Cursos } from './pages/Cursos';
import { MiCurso } from './components/MiCurso';


function App() {
  return (
    <HashRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<InicioPage/>}/> 
        <Route path="/coffeesPage" element={<CoffeesPage />}/> 
        <Route path="/acercaDe" element={<AcercaDePage />}/> 
        <Route path="/loginPage" element={<LoginPage />}/>
        <Route path="/registroPage" element={<RegistroPage />}/>

        <Route path="/cursos" element={<Cursos />}>
          <Route path=":url" element={<MiCurso />}/> 
        </Route> 
        <Route path="*" element={<p>Ups, no existe la ruta</p>}/> 
      </Routes>
    </HashRouter>

  );
}

export default App;
