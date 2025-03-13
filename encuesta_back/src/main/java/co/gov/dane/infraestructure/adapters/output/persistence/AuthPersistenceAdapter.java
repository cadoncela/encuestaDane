package co.gov.dane.infraestructure.adapters.output.persistence;

import co.gov.dane.application.ports.output.AuthPersistencePort;
import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;
import co.gov.dane.infraestructure.adapters.output.persistence.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * @author Oliver & Ragnar
 */
@Component
@RequiredArgsConstructor
public class AuthPersistenceAdapter implements AuthPersistencePort {

    private final AuthRepository repository;
    @Override
    public AuthEntity findByUserAndPassword(String user) {
        return repository.findByUser(user);
    }

    @Override
    public List<AuthEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public AuthEntity save(AuthEntity user) {
        return repository.save(user);
    }
}
