package cl.ucm.coffee.web.controller;


import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.service.CoffeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {
    @Autowired
    private CoffeeService coffeeService;

    @GetMapping("")
    public ResponseEntity<Map<String, String>> coffes(){
        Map map = new HashMap();
        map.put("coffee", "Coffees :Get)");
        return ResponseEntity.ok(map);
    }
    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> coffe(){
        Map map = new HashMap();
        map.put("coffee", "Coffees Post:)");
        return ResponseEntity.ok(map);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCoffees(){
        try {
            return ResponseEntity.ok(coffeeService.getCoffees());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/{coffeeId}")
    public ResponseEntity<CoffeeEntity> getOneCoffee(@PathVariable int coffeeId){
        try {
            CoffeeEntity coffee = coffeeService.getCoffeeById(coffeeId);
            return ResponseEntity.status(HttpStatus.OK).body(coffee);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/newCoffee")
    public ResponseEntity<?> saveCoffee(@RequestBody CoffeeEntity coffeeEntity){
        try {
            return ResponseEntity.ok(coffeeService.save(coffeeEntity));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<CoffeeEntity> updateCoffee(@PathVariable int id, @RequestBody CoffeeEntity updatedCoffee){
        try {
            CoffeeEntity updated = coffeeService.update(id, updatedCoffee);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/{coffeeId}")
    public ResponseEntity<String> deleteCoffee(@PathVariable int coffeeId){
        try {
            coffeeService.delete(coffeeId);
            return ResponseEntity.status(HttpStatus.OK).body("Café con ID " + coffeeId + " eliminado correctamente");
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> getCoffeeByName(@PathVariable String name){
        try {
            CoffeeEntity coffee = coffeeService.searchByName(name);
            return ResponseEntity.ok(coffee);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
