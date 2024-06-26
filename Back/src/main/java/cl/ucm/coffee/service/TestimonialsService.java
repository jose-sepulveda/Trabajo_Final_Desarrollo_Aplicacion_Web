package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.repository.CoffeeRepository;
import cl.ucm.coffee.persitence.repository.TestimonialsRepository;
import cl.ucm.coffee.persitence.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;


    @Override
    public TestimonialsEntity save(TestimonialsEntity testimonials) {
        try {
            return testimonialsRepository.save(testimonials);
        } catch (RuntimeException e) {
            System.err.println("Error saving testimonial: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error crear el : ", e);
            throw new RuntimeException("Error al crear el testimonio del coffee: ", e);
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
