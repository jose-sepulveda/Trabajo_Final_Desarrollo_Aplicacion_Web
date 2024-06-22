package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoffeeService implements ICoffeeService{
    @Autowired
    private CoffeeRepository coffeeRepository;

    @Override
    public List<CoffeeEntity> getCoffees() {
        return coffeeRepository.findAll();
    }

    @Override
    public CoffeeEntity getCoffeeById(int coffeeId) {
        Optional<CoffeeEntity> coffee = coffeeRepository.findById(coffeeId);
        return coffee.orElseThrow(()-> new IllegalArgumentException("Coffee not found with id " + coffeeId));
    }

    @Override
    public CoffeeEntity save(CoffeeEntity coffeeEntity) {
        return coffeeRepository.save(coffeeEntity);
    }

    @Override
    public CoffeeEntity update(int coffeeId, CoffeeEntity updatedCoffee) {
        CoffeeEntity existingCoffee = coffeeRepository.findById(coffeeId).orElseThrow(() -> new IllegalArgumentException("Producto "+ coffeeId +" no encontrado"));

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
    }

    @Override
    public void delete(int coffeeId) {
        coffeeRepository.deleteById(coffeeId);
    }

}
