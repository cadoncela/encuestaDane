package co.gov.dane.application.ports.input;

import co.gov.dane.infraestructure.adapters.input.rest.model.request.AuthRequest;
import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;

import java.util.List;

/**
 * @author Oliver & Ragnar
 */
public interface AuthServicePort {

    List<AuthEntity> getUsers();
    AuthEntity authenticate(AuthRequest user);
    AuthEntity createUser(AuthEntity user);
}
