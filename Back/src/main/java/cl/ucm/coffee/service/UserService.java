package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.entity.UserRoleEntity;
import cl.ucm.coffee.persitence.repository.UserRepository;
import cl.ucm.coffee.persitence.repository.UserRoleRepository;
import org.apache.catalina.User;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public List<UserEntity> getUsers() {
        try {
            return (List<UserEntity>) userRepository.findAll();
        } catch (Exception e){
            logger.error("Error al obtener los usuarios", e);
            throw new RuntimeException("Error al obtener los usuarios");
        }
    }

    @Override
    public UserEntity getUserByUsername(String username) {
        try {
            Optional<UserEntity> user = userRepository.findById(username);
            return user.orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con username " + username));
        } catch (Exception e) {
            logger.error("Error al obtener el usuario con username {}", username, e);
            throw new RuntimeException("Error al obtener el usuario con username " + username);
        }
    }

    @Override
    public UserEntity save(UserEntity userEntity) throws UsernameAlreadyExistsException{
        Optional<UserEntity> existUser = userRepository.findById(userEntity.getUsername());
        if (existUser.isPresent()){
            throw new UsernameAlreadyExistsException("El username ya existe: "+ userEntity.getUsername());
        }

        try {
            UserEntity createUser = userRepository.save(userEntity);

            UserRoleEntity userRole = new UserRoleEntity();
            userRole.setUsername(createUser.getUsername());
            userRole.setRole("CUSTOMER");
            userRole.setGrantedDate(LocalDateTime.now());

            try {
                userRoleRepository.save(userRole);
            } catch (Exception e){
                logger.error("Error al guardar el rol del usuario para: " +createUser.getUsername(), e);
                throw new RuntimeException("Error al guardar el rol del usuario");
            }

            return createUser;
        } catch (Exception e) {
            logger.error("Error al guardar los usuarios: ", e);
            throw new RuntimeException("Error al guardar el usuario");
        }

    }

    @Override
    public UserEntity update(String username, UserEntity updateUser) {
        try {
            UserEntity existUser = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con username " + username));
            if (updateUser.getEmail() != null){
                existUser.setEmail(updateUser.getEmail());
            }
            if (updateUser.getPassword() != null){
                existUser.setPassword(updateUser.getPassword());
            }
            return userRepository.save(existUser);
        } catch (Exception e){
            logger.error("Error al actualizar el usuario con username{}", username, e);
            throw new RuntimeException("Error al actualizar el usuario con username " + username);
        }
    }

    @Override
    public UserEntity blockUser(String username) {
        try {
            UserEntity user = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con username " + username));
            user.setLocked(true);
            return userRepository.save(user);
        } catch (Exception e){
            logger.error("Error al bloquear el usuario con username{}", username, e);
            throw new RuntimeException("Error al bloquear el usuario con username " + username);
        }
    }

    @Override
    public UserEntity disableUser(String username) {
        try {
            UserEntity user = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con username " + username));
            user.setDisabled(true);
            return userRepository.save(user);
        } catch (Exception e){
            logger.error("Error al cerrar sesión del usuario con username{}", username, e);
            throw new RuntimeException("Error al cerrar sesión del usuario con username " + username);
        }
    }

    public static class UsernameAlreadyExistsException extends RuntimeException {
        public UsernameAlreadyExistsException(String message) {
            super(message);
        }
    }
}
