package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;

import java.util.List;

public interface ICoffeeService {
    List<CoffeeEntity> getCoffees();
    CoffeeEntity getCoffeeById(int coffeeId);
    CoffeeEntity save(CoffeeEntity coffeeEntity);
    CoffeeEntity update(int coffeeId, int price);
    void delete(int coffeeId);
    CoffeeEntity searchByName(String name);
}
