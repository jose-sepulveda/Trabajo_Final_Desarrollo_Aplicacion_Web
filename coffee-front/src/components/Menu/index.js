import { Link, NavLink } from "react-router-dom";

function Menu(){
    return <>
        <h2>Menu</h2>
        <ul>
            {
             routes.map( (item, index)=>(
                <li key={index}>
                    <NavLink 
                        style={({isActive}) => ({color:isActive?"green":"grey"})}
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

routes.push({to:"/", text:"Home"})
routes.push({to:"/page1", text:"Pagina 1"})
routes.push({to:"/page2", text:"Pagina 2"})
routes.push({to:"/cursos", text:"Mis Cursos"})

export {Menu}