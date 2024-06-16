import { Link, Outlet } from "react-router-dom"
import { cursos } from "../data/cursos"

function Cursos(){
    return <>
        <h3>Mis Cursos</h3>
        
        {
            cursos.map( (item) => (
                <Link to={item.url}>
                    {item.name} &nbsp;&nbsp;
                </Link>
            )  )
        }
<Outlet/>
       
    </>
}

export {Cursos}