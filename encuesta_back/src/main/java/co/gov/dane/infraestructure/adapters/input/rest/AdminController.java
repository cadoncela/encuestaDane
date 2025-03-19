package co.gov.dane.infraestructure.adapters.input.rest;

import co.gov.dane.application.ports.input.AuthServicePort;
import co.gov.dane.infraestructure.adapters.input.rest.model.request.AuthRequest;
import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Oliver & Ragnar
 */

@RestController
@RequestMapping("/encuesta")
@RequiredArgsConstructor
public class AdminController {

    private final AuthServicePort servicePort;

    @GetMapping("/v1/api/sumar/{param}/{param2}")
    public ResponseEntity<Integer> sumarNumerosGet(
            @PathVariable int param,
            @PathVariable int param2) {

        int sum = param+param2;
        System.out.println("PruebaArchivo.sumarNumerosGet. Resultado suma : " + sum);
        return new ResponseEntity<Integer>(sum, HttpStatus.PARTIAL_CONTENT);
    }

    @GetMapping("/v1/api")
    public List<AuthEntity> findAll(){
        return servicePort.getUsers();
    }

    @GetMapping("/v1/api/{id}")
    public ResponseEntity<AuthEntity> findById(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK)
               .body(servicePort.findById(id));
    }

    @PostMapping("/v1/api")
    public ResponseEntity<AuthEntity> authenticate(@Valid @RequestBody AuthRequest auth){
        return ResponseEntity.status(HttpStatus.OK)
                .body(servicePort.authenticate(auth));
    }

    @PostMapping("/v1/api/create")
    public ResponseEntity<AuthEntity> createUser(@Valid @RequestBody AuthEntity user){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(servicePort.createUser(user));
    }
}
