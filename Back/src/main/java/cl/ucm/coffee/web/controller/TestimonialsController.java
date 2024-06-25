package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.service.TestimonialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialsController {
    @Autowired
    private TestimonialsService testimonialsService;

    @PostMapping("/newTestimonials")
    public ResponseEntity<?> newTestimonials(@RequestBody TestimonialsEntity testimonialsEntity){
        try {
            TestimonialsEntity testimonial = testimonialsService.save(testimonialsEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(testimonialsEntity);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
