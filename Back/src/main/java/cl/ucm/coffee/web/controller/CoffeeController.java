package cl.ucm.coffee.web.controller;


import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.service.CoffeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
        return ResponseEntity.ok(coffeeService.getCoffees());
    }

    @GetMapping("/{coffeeId}")
    public ResponseEntity<CoffeeEntity> getOneCoffee(@PathVariable int coffeeId){
        CoffeeEntity coffee = coffeeService.getCoffeeById(coffeeId);
        return ResponseEntity.status(HttpStatus.OK).body(coffee);
    }

    @PostMapping("/newCoffee")
    public ResponseEntity<?> saveCoffee(@RequestBody CoffeeEntity coffeeEntity){
        return ResponseEntity.ok(coffeeService.save(coffeeEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoffeeEntity> updateCoffee(@PathVariable int id, @RequestBody CoffeeEntity updatedCoffee){
        CoffeeEntity updated = coffeeService.update(id, updatedCoffee);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{coffeeId}")
    public ResponseEntity<String> deleteCoffee(@PathVariable int coffeeId){
        coffeeService.delete(coffeeId);
        return ResponseEntity.status(HttpStatus.OK).body("Coffee with ID " + coffeeId + "has been deleted");
    }

}
