import React from 'react';
import imagen from '../image/10.png';
//import imagenM from '../image/11.png';
//import imagenG from '../image/11.png';
//import imagenS from '../image/11.png';
import '../Styles/inicioPage.css';


function InicioPage(){
    return <>
        <div className="container">
            <img src={imagen} alt="" />

        <div className='card-inicio'>
            <div className="card">
                <h3>Nuestras Maquinas</h3>
              
                <p>
                    descripcion
                </p>
            </div>

            <div className="card">
                <h3>Nuestras Maquinas</h3>
             
                <p>
                    descripcion
                </p>
            </div>

            <div className="card">
                <h3>Nuestras Maquinas</h3>
                <p>
                    descripcion
                </p>
            </div>
        </div>

        </div>
    </>
}

export {InicioPage}