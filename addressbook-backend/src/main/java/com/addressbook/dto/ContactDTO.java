package com.addressbook.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {

    @NotNull(message = "Name shouldn't be null.")
    @NotBlank(message = "Name cannot be empty")
    @Size(max = 50, message = "Name must not exceed 50 characters")
    @Pattern(regexp = "^[A-Z][A-Za-z ]+$", message = "Name can only contain alphabets and spaces")
    private String fullName;

    @Pattern(regexp = "^[1-9][0-9]{9}$", message = "Invalid phone number format")
    private String phoneNumber;

    @NotBlank(message = "Address cannot be empty")
    @Size(max = 100, message = "Address must not exceed 100 characters")
    private String address;

    @NotBlank(message = "City cannot be empty")
    @Size(max = 50, message = "City must not exceed 50 characters")
    private String city;

    @NotBlank(message = "State cannot be empty")
    @Size(max = 50, message = "State must not exceed 50 characters")
    private String state;

    @NotBlank(message = "Zipcode cannot be empty")
    @Pattern(regexp = "^[0-9]{5,6}$|^other$", message = "Zipcode must be 5 or 6 digits")
    private String zipCode;
}
