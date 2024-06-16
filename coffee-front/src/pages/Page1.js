import React from "react";
import { getUsers } from "../services/api";

function Page1(){

    const [personas, setPersonas]= React.useState([]);


    React.useEffect( () => {
        async function obtenerUsuarios(){
            const data = await getUsers();
            setPersonas(data.results)
        }
        obtenerUsuarios();

    } ,[])

    return <>
        <h3>Lista de usuarios</h3>
        
        {
            personas.map( (item, index) => (
                <p key={index}>
                    <img src={item.picture.medium} alt=""/>
                    {item.name.first}
                </p>
            ) )
        }

    </>
}


export {Page1};