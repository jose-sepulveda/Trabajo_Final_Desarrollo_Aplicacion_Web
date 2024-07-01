import imagen1 from '../image/jose.png';
import imagen2 from '../image/sofi.png';
import '../Styles/acercaDe.css';

function AcercaDePage (){
    return <>
        <h3>Perfil alumnos</h3>
        <div className="perfil-alumnos">

            <div className="alumno">
                <img src={imagen1} alt="" />
                <p>
                Nombre: José Andrés Sepulveda Gajardo 
                Carrera: Ingenieria Civil Informática
            </p>
                
            </div>

            <div className="alumna">
                <img src={imagen2} alt="" />
                <p>
                Nombre: Sofia Victoria Silva Muñoz 
                Carrera: Ingenieria Civil Informática
            </p>

            </div>
        </div>
    </>
}

export {AcercaDePage}