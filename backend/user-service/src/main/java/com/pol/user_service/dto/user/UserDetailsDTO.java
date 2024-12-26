package com.pol.user_service.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class UserDetailsDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;

}
