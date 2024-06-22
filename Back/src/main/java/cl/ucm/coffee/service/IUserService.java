package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.persitence.repository.UserRepository;

import java.util.List;

public interface IUserService {
    List<UserEntity> getUsers();
    UserEntity save( UserEntity userEntity);
}
