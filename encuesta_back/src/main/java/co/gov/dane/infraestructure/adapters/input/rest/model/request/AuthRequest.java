package co.gov.dane.infraestructure.adapters.input.rest.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * @author Oliver & Ragnar
 */

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    @NotBlank(message = "Field user cannot be empty or null.")
    private String user;

    @NotBlank(message = "Field password cannot be empty or null.")
    private String password;
}
