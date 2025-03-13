package co.gov.dane.application.ports.output;

import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Oliver & Ragnar
 */
public interface AuthPersistencePort {

    AuthEntity findByUserAndPassword(String user);
    List<AuthEntity> findAll();
    AuthEntity save(AuthEntity user);
}
