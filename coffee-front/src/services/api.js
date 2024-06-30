//login = {username:"", password:""}
//login es una data 
export async function loginAccount(login){
    try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method:"POST",
            body:JSON.stringify(login),  //convierte a un string 
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }

}

//funcion registro
export async function registerAccount(newUser) {
    try {
        const res = await fetch("http://localhost:8080/api/auth/newUser", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            }
            
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


//funcion gestion coffee(formulario y tablita)
export async function createCoffee(token, formData) {
    try {
        const res = await fetch("http://localhost:8080/api/coffee/newCoffee", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await res.json();
        return data; 
    } catch (error) {
        console.error("Error al crear café:", error);
        throw error; 
    }
}

// Función para obtener la lista de cafés
export async function getCoffees(token) {
    try {
        const res = await fetch('http://localhost:8080/api/coffee/list', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`, // Asegúrate de incluir el token de autenticación aquí
            },
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data; // Retorna los datos de la lista de cafés
    } catch (error) {
        console.error('Error al obtener cafés:', error);
        throw error;
    }
}

//lista usuarios 
// Función para obtener datos de usuarios con rol ADMIN
export async function getUsersData(token) {
    try {
        const res = await fetch("http://localhost:8080/api/auth/list", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Asegúrate de incluir el token de autenticación aquí
                "Content-Type": "application/json",
            },
        });
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
        return null;
    }
}
