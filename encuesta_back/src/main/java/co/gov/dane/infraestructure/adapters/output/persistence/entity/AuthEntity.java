package co.gov.dane.infraestructure.adapters.output.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Oliver & Ragnar
 */

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class AuthEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long id;

    @NotEmpty(message = "El campo user no puede estar vacio")
    private String user;

    @NotEmpty(message = "El campo name no puede estar vacio")
    private String name;

    @NotEmpty(message = "El campo password no puede estar vacio")
    private String password;

    @NotEmpty(message = "El email no puede estar vacio")
    private String email;
}
