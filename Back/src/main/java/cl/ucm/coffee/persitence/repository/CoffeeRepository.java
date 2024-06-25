package cl.ucm.coffee.persitence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CoffeeRepository extends JpaRepository<CoffeeEntity, Integer>{
    @Query(value ="SELECT * FROM coffee WHERE name = :name", nativeQuery = true)
    Optional<CoffeeEntity> getCoffeeByName(@Param("name") String name);
}
