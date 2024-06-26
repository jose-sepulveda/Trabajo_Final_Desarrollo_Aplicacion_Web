package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import cl.ucm.coffee.persitence.repository.UserRepository;
import cl.ucm.coffee.service.TestimonialsService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialsController {
    @Autowired
    private TestimonialsService testimonialsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CoffeeRepository coffeeRepository;

    @PostMapping("/newTestimonials/{idCoffee}/{username}")
    public ResponseEntity<?> newTestimonials(@PathVariable int idCoffee , @PathVariable String username , @RequestBody TestimonialsEntity testimonialsEntity){
        try {
            Optional<CoffeeEntity> coffeeOptional = coffeeRepository.findById(idCoffee);
            if (coffeeOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Coffee with id " + idCoffee + " not found.");
            }

            Optional<UserEntity> userOptional = userRepository.findById(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with username " + username + " not found.");
            }

            testimonialsEntity.setIdCoffee(idCoffee);
            testimonialsEntity.setUsername(username);
            TestimonialsEntity saved = testimonialsService.save(testimonialsEntity);
            return ResponseEntity.ok(saved);

        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{idCoffee}")
    public ResponseEntity<?> findByIdCoffee(@PathVariable int idCoffee){
        try {
            List<TestimonialsEntity> testimonials = testimonialsService.findByCoffeeId(idCoffee);
            return ResponseEntity.ok(testimonials);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
