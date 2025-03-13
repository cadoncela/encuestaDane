package co.gov.dane.application.service;

import co.gov.dane.application.ports.input.AuthServicePort;
import co.gov.dane.application.ports.output.AuthPersistencePort;
import co.gov.dane.infraestructure.adapters.input.rest.model.request.AuthRequest;
import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.List;

/**
 * @author Oliver & Ragnar
 */
@Service
@RequiredArgsConstructor
public class AuthService implements AuthServicePort {

    private final AuthPersistencePort persistencePort;
    @Override
    public List<AuthEntity> getUsers() {

        List<AuthEntity> lsUsers = persistencePort.findAll();
        System.out.println("Usuarios: " + lsUsers.size());
        return lsUsers;
    }

    @Override
    public AuthEntity authenticate(AuthRequest user) {
        AuthEntity response = new AuthEntity();
        AuthEntity dataBaseUser = persistencePort.findByUserAndPassword(user.getUser());
        if (dataBaseUser != null){
            String md5Hex = DigestUtils
                    .md5Hex(user.getPassword());
            if(dataBaseUser.getPassword().equalsIgnoreCase(md5Hex)){
                response = dataBaseUser;
                System.out.println("AUTENTICADO!!");
            }else {
                response.setUser("-2");
                System.out.println("ERROR CONTRASENIA!!");
            }
        } else {
            response.setUser("-1");
            System.out.println("NO EXISTE!!");
        }
        return response;
    }

    @Transactional
    @Override
    public AuthEntity createUser(AuthEntity user) {
        String md5Hex = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(md5Hex);
        System.out.println("id: " + user.getId());
        System.out.println("user: " + user.getUser());
        System.out.println("psw: " + user.getPassword());
        System.out.println("name: " + user.getName());
        System.out.println("email: " + user.getEmail());
        user.setId(null);
        return persistencePort.save(user);
    }
}
