import React from 'react';
import imagen from '../image/10.png';
import imagenM from '../image/imagenM.jpg';
import imagenG from '../image/imagenG.jpg';
import imagenS from '../image/imagenS.jpg';
import '../Styles/inicioPage.css';


function InicioPage(){
    return <>
        <div className="container">
            <img src={imagen} alt="banner" />

        <div className='card-inicio'>

            <div className="card">
                <h4>Nuestras Maquinas</h4>
                <img src={imagenM} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
              
                <p>
                    Nuestras máquinas de café 
                </p>
            </div>

            <div className="card">
                <h4>Nuestros granos</h4>
                <img src={imagenG} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
             
                <p>
                    Los granos para cada cafe son de selección premiun
                </p>
            </div>

            <div className="card">
                <h4>Sucursal</h4>
                <img src={imagenS} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
                <p>
                    La sucursal se encuentra en Curicó
                </p>
            </div>
        </div>

        </div>
    </>
}

export {InicioPage}