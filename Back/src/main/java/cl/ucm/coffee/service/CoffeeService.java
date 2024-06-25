package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoffeeService implements ICoffeeService{
    public static final Logger logger = LoggerFactory.getLogger(CoffeeService.class);

    @Autowired
    private CoffeeRepository coffeeRepository;

    @Override
    public List<CoffeeEntity> getCoffees() {
        try {
            return coffeeRepository.findAll();
        } catch (Exception e){
            logger.error("Error al obtener los cafes: ", e);
            throw new RuntimeException("Error al obtener los cafes", e);
        }
    }

    @Override
    public CoffeeEntity getCoffeeById(int coffeeId) {
        try {
            Optional<CoffeeEntity> coffee = coffeeRepository.findById(coffeeId);
            return coffee.orElseThrow(()-> new IllegalArgumentException("Cafe con id " + coffeeId + "no encontrado"));
        } catch (Exception e){
            logger.error("Error al obtener el café con id {}", coffeeId, e);
            throw new RuntimeException("Error al obtener el café con id " + coffeeId, e);
        }
    }

    @Override
    public CoffeeEntity save(CoffeeEntity coffeeEntity) {
        try {
            return coffeeRepository.save(coffeeEntity);
        } catch (Exception e){
            logger.error("Error al guardar el café: ", e);
            throw new RuntimeException("Error al guardar el café", e);
        }
    }

    @Override
    public CoffeeEntity update(int coffeeId, CoffeeEntity updatedCoffee) {
        try {
            CoffeeEntity existingCoffee = coffeeRepository.findById(coffeeId).orElseThrow(() -> new IllegalArgumentException("Café "+ coffeeId +" no encontrado"));

            if (updatedCoffee.getName() != null) {
                existingCoffee.setName(updatedCoffee.getName());
            }
            if (updatedCoffee.getDescription() != null) {
                existingCoffee.setDescription(updatedCoffee.getDescription());
            }
            if (updatedCoffee.getPrice() != 0) {
                existingCoffee.setPrice(updatedCoffee.getPrice());
            }
            if (updatedCoffee.getImage64() != null) {
                existingCoffee.setImage64(updatedCoffee.getImage64());
            }

            return coffeeRepository.save(existingCoffee);
        } catch (Exception e){
            logger.error("Error al actualizar el café con id {}", coffeeId, e);
            throw new RuntimeException("Error al actualizar el café con id " + coffeeId, e);
        }
    }

    @Override
    public void delete(int coffeeId) {
        try {
            Optional<CoffeeEntity> existCoffee = coffeeRepository.findById(coffeeId);
            if (existCoffee.isPresent()){
                coffeeRepository.deleteById(coffeeId);
            } else {
                throw new IllegalArgumentException("No se puede eliminar, café con id "+ coffeeId + "no encontrado");
            }
        } catch (Exception e){
            logger.error("Error al eliminar el café con id {}", coffeeId, e);
            throw new RuntimeException("Error al eliminar el café con id " + coffeeId, e);
        }
    }

    @Override
    public CoffeeEntity searchByName(String name) {
        try {
            Optional<CoffeeEntity> coffee = coffeeRepository.getCoffeeByName(name);
            return coffee.orElseThrow(() -> new IllegalArgumentException("Café no encontrado"));
        } catch (Exception e){
            logger.error("Error al obtener el café con el nombre: {}", name, e);
            throw new RuntimeException("Error al obtener el café con el nombre: " + name, e);
        }
    }

}
