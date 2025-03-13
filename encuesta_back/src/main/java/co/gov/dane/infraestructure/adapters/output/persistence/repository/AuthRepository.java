package co.gov.dane.infraestructure.adapters.output.persistence.repository;

import co.gov.dane.infraestructure.adapters.output.persistence.entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Oliver & Ragnar
 */
public interface AuthRepository extends JpaRepository<AuthEntity, Long> {

    public AuthEntity findByUser(String user);
}
