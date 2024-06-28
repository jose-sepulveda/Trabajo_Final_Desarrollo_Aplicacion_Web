import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import "../Styles/loginPage.css";


function LoginPage(){
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setToken} = React.useContext(AuthContext);
    const navigate = useNavigate();
    
    const login =async()=>{
        const resp = await loginAccount({username:username, password:password});
        //resp={token:kahsbasb}
        if (resp){
            await setToken(resp.token)
            navigate("/");
        }else {
            console.log(resp); //mensaje de error cambiar yooo
        }

    }

    return <>
        <div className="login-page-container">
            <div className="login">
                <h3>Iniciar Sesión</h3>
                <input type="text" onChange={(e)=>(setUsername(e.target.value))} placeholder="Nombre de usuario"/>
                <input type="password" onChange={(e)=>(setPassword(e.target.value))} placeholder="Contraseña"/>
                <button onClick={login}>Iniciar sesión</button>
            </div>

        </div>
    </>
}
export {LoginPage};