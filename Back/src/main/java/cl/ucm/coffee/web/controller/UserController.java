package cl.ucm.coffee.web.controller;

import cl.ucm.coffee.persitence.entity.UserEntity;
import cl.ucm.coffee.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/list")
    public ResponseEntity<?> users(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/newUser")
    public ResponseEntity<?> newUser(@RequestBody UserEntity userEntity){
        return ResponseEntity.ok(userService.save(userEntity));
    }
}
