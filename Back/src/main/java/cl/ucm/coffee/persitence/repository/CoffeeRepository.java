package cl.ucm.coffee.persitence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;

public interface CoffeeRepository extends JpaRepository<CoffeeEntity, Integer>{
    
}
