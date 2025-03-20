package com.addressbook.controller;

import com.addressbook.dto.ContactDTO;
import com.addressbook.model.Contact;
import com.addressbook.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")  // Fixed the typo in localhost URL
@RestController
@RequestMapping("/addressbook/database/contacts")
public class DatabaseContactController {

    private final ContactService contactService;

    public DatabaseContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // Get all contacts
    @GetMapping("/get/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContactsDb();
        return contacts.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(contacts);
    }

    // Get contact by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Contact contact = contactService.getContactByIdDb(id);
        return (contact != null) ? ResponseEntity.ok(contact) : ResponseEntity.notFound().build();
    }

    // Add a new contact
    @PostMapping("/add")
    public ResponseEntity<Contact> addModel(@Valid @RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.addContactDb(dto));
    }


    // Update contact by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateContact(@PathVariable Long id, @Valid @RequestBody ContactDTO contactDTO) {
        String responseMessage = contactService.updateContactDb(id, contactDTO);
        return ResponseEntity.ok(responseMessage);  // OK status for update
    }

    // Delete contact by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        String responseMessage = contactService.deleteContactDb(id);
        return ResponseEntity.ok(responseMessage);  // OK status for delete
    }
}
