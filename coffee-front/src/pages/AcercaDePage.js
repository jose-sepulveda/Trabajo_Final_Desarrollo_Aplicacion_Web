import imagen1 from '../image/jose.png';
import imagen2 from '../image/sofi.png';
import '../Styles/acercaDe.css';

function AcercaDePage (){
    return <>

        <div className="titulo"><h3>Perfil alumnos</h3></div>
        
        <div className="perfil-alumnos">

            <div className="alumno">
                <img src={imagen1} alt="" />
                <p>Nombre: José Andrés Sepulveda Gajardo </p>
                <p>Carrera: Ingenieria Civil Informática</p>
                
            </div>

            <div className="alumna">
                <img src={imagen2} alt="" />
                <p>Nombre: Sofia Victoria Silva Muñoz</p>
                <p>Carrera: Ingenieria Civil Informática</p>
            </div>

        </div>
        <div className="github">
            <a href='https://github.com/jose-sepulveda/Trabajo_Final_Desarrollo_Aplicacion_Web.git'>
                Link a Repositorio de GitHub
            </a>
        </div>
    </>
}

export {AcercaDePage}