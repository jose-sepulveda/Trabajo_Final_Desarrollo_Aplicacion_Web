import React from "react";
import { NavLink, useNavigate }from "react-router-dom";
import '../../Styles/menu.css';
import logo from '../../image/6.png';
import { AuthContext } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";



function Menu(){

    const {auth, logout} = React.useContext(AuthContext);//para cerrar sesion
    let decodedToken = null;
    const navigate = useNavigate(); 

    if (auth.token){ //crear condicion de role === "ADMIN"
        console.log(auth.token);
        decodedToken = jwtDecode(auth.token);
        console.log(decodedToken.role);


        routes.splice(0, routes.length); //limpia las rutas

        //rutas general
        routes.push({to:"/", text:"Inicio"})
        routes.push({to:"/acercaDe", text:"Acerca de"})


        //rutas para ADMIN
        if (decodedToken.role === "ADMIN") {
            routes.push({to:"/coffeesPage", text:"Coffees"})
            routes.push({ to: "/gestion-coffee", text: "Gestión coffee" });
            routes.push({ to: "/clientes-page", text: "Clientes Page" });
        }

        if (decodedToken.role === "CUSTOMER") {
            routes.push({to:"/testimonial-clientes", text:"Coffees"})
        }
    }



    const cerrarSession = ()=>{
        logout();

        //limpia las rutas despues de cerrar sesión 
        routes.splice(0, routes.length);
        routes.push({to:"/", text:"Inicio"})
        routes.push({to:"/coffeesPage", text:"Coffees"})
        routes.push({to:"/acercaDe", text:"Acerca de"})
        routes.push({to:"/login", text:"Iniciar sesión"})
        routes.push({to:"/registroPage", text:"Registrate"})

        navigate("/");
    }

    return <>
        <div className="container-barra">
            <div className="logo-container">
                <img src={logo} alt="" className="logo" />
            </div>
            <ul className="menu">
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
                {
                    auth.token?
                    <button onClick={cerrarSession}>Salir</button>:
                    ""
                }
            </ul>
        </div>
    </>
}

const routes = [];

routes.push({to:"/", text:"Inicio"})
routes.push({to:"/coffeesPage", text:"Coffees"})
routes.push({to:"/acercaDe", text:"Acerca de"})
routes.push({to:"/login", text:"Iniciar sesión"})
routes.push({to:"/registroPage", text:"Registrate"})

export {Menu}