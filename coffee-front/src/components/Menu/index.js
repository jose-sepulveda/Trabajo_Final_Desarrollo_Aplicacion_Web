import { Link, NavLink } from "react-router-dom";
import '../../Styles/menu.css';
import logo from '../../image/6.png';



function Menu(){
    return <>
        <ul className="menu">
        <div className="logo-container">
            <img src={logo} alt="" className="logo" />
         </div>
            {
             routes.map( (item, index)=>(
                <li key={index}>
                    <NavLink 
                        style={({isActive}) => ({color:isActive?"gray":"white"})}
                        to={item.to}>
                        {item.text}
                    </NavLink>
                </li>
             ) )
            }
        </ul>

    </>
}

const routes = [];

routes.push({to:"/", text:"Inicio"})
routes.push({to:"/coffeesPage", text:"Coffees"})
routes.push({to:"/acercaDe", text:"Acerca de"})
routes.push({to:"/loginPage", text:"Iniciar sesión"})
routes.push({to:"/registroPage", text:"Registrate"})

routes.push({to:"/cursos", text:"Mis Cursos"})

export {Menu}