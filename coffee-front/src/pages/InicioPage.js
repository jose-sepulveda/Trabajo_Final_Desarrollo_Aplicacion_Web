import React from 'react';
import imagen from '../image/5.png';
import '../Styles/inicioPage.css';


function InicioPage(){
    return <>
        <div className="container">
            <img src={imagen} alt="" />
        </div>
    </>
}

export {InicioPage}