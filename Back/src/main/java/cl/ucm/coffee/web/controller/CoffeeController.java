package cl.ucm.coffee.web.controller;


import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import cl.ucm.coffee.service.CoffeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {
    @Autowired
    private CoffeeService coffeeService;

    @Autowired
    private CoffeeRepository coffeeRepository;

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

    @PostMapping(value = "/newCoffee", consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> saveCoffee(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestParam("image64") MultipartFile image64) throws IOException {
        byte[] imageBytes = image64.getBytes();

        CoffeeEntity coffee = new CoffeeEntity();
        coffee.setName(name);
        coffee.setDescription(description);
        coffee.setPrice(price);
        coffee.setImage64(imageBytes);
        return ResponseEntity.ok(coffeeService.save(coffee));


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
