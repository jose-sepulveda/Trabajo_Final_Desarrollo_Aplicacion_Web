package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import cl.ucm.coffee.persitence.repository.TestimonialsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestimonialsService implements ITestimonialsService{
    public static final Logger logger = LoggerFactory.getLogger(CoffeeService.class);

    @Autowired
    private TestimonialsRepository testimonialsRepository;

    @Autowired
    private CoffeeRepository coffeeRepository;

    @Override
    public TestimonialsEntity save(TestimonialsEntity testimonials) {
        try {
              Optional<CoffeeEntity> coffee = coffeeRepository.findById(testimonials.getCoffee().getIdCoffee());
              if (coffee.isEmpty()){
                  throw new EntityNotFoundException("Cafe con id " + testimonials.getCoffee().getIdCoffee() + " no encontrada");
              }

              return testimonialsRepository.save(testimonials);
        } catch (Exception e){
            logger.error("Error al guardar el testimonio: ", e);
            throw new RuntimeException("Error al guardar el testimonio", e);
        }
    }

    @Override
    public List<TestimonialsEntity> findByCoffeeId(int idCoffee) {
        try {
            return testimonialsRepository.findByCoffeeId(idCoffee);
        } catch (Exception e){
            logger.error("Error al obtener los testimonios del coffee: {}", idCoffee, e);
            throw new RuntimeException("Error al obtener los testimonios del coffee: " + idCoffee, e);
        }
    }
}
