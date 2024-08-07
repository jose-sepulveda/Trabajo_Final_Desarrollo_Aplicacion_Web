//LOGIN
export async function loginAccount(login){
    try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method:"POST",
            body:JSON.stringify(login),  
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

//REGISTRO DE USUARIO
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



//CREAR CAFE
export async function createCoffee(token, formData) {
    try {
        const res = await fetch(`http://localhost:8080/api/coffee/newCoffee`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return res; 
    } catch (error) {
        console.error("Error al crear café:", error);
        throw error; 
    }
}


//OBTENER LISTA DE CAFE 
export async function getCoffees() {
    try {
        const response = await fetch("http://localhost:8080/api/coffee/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Otro error: ${response.status}`);
        }
        const coffees = await response.json();
        return coffees;
    } catch (error) {
        console.error("Error al obtener coffee list:", error);
        throw error;
    }
}

//ACTUALIZAR CAFE POR ID 
export const updateCoffee = async (token, coffeeId, newPrice) => {
    try {
        const response = await fetch(`http://localhost:8080/api/coffee/${coffeeId}?price=${newPrice}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const updatedCoffee = await response.json();
            return updatedCoffee; 
        } else {
            console.error(`Error al actualizar el precio del café ${coffeeId}`);
            throw new Error(`Error al actualizar cafe con ID ${coffeeId}. estado: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al intentar actualizar el precio del café:', error);
        throw error;
    }
};



//ELIMINAR CAFE POR ID 
export async function deleteCoffee(token, coffeeId) {
    try {
        const response = await fetch(`http://localhost:8080/api/coffee/${coffeeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`otro error: ${response.status}`);
        }
        return response.text(); 
    } catch (error) {
        console.error(`Error al eliminar coffee with ID ${coffeeId}:`, error);
        throw error;
    }
}

//FILTRAR CAFE
export const getCoffeeByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:8080/api/coffee/search/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Debe ingresar un nombre de Café`);
      }
      return response.json();
    } catch (error) {
      console.error('Error al obtener coffee por nombre:', error);
      throw error;
    }
  };


//OBTENER LISTA DE USUARIOS
export async function getUsersData(token) {
    try {
        const res = await fetch("http://localhost:8080/api/auth/list", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        
        if (!res.ok) {
            throw new Error('...');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
        return null;
    }
}

//CREAR TESTIMONIO
export async function createTestimonial(token, idCoffee, username, testimonialData) {
    try {
        const res = await fetch(`http://localhost:8080/api/testimonials/newTestimonials/${idCoffee}/${username}`, {
            method: "POST",
            body: JSON.stringify(testimonialData), 
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await res.json();
        return data; 
    } catch (error) {
        console.error("Error al crear testimonio:", error);
        throw error; 
    }
}


//OBTENER TESTIMONIOS 
export async function getTestimonioCoffee(idCoffee) {
    const response = await fetch(`http://localhost:8080/api/testimonials/${idCoffee}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Error al obtener testimonios');
    }
    return await response.json();
}


//BLOQUEAR USUARIO 
export async function blockUser(username, token) {  
    try {
      const response = await fetch(`http://localhost:8080/api/auth/bloquear/${username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        return true; 
      } else {
        throw new Error('Error al bloquear usuario');
      }
    } catch (error) {
      console.error('Error al bloquear/desbloquear usuario:', error);
      throw error;
    }
  } 