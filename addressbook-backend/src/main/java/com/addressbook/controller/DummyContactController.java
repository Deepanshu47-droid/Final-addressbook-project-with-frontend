package com.addressbook.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/addressbook/dummy")
public class DummyContactController {

    // Dummy GET Request - Fetch all contacts
    @GetMapping("/contacts/get/all")
    public String getAllDummyContacts() {
        log.info("Dummy request received: Fetch all contacts");
        return "Returning all contacts (Dummy Response)";
    }

    // Dummy POST Request - Add a new contact
    @PostMapping("/contacts/add")
    public String addDummyContact() {
        log.info("Dummy request received: Add new contact");
        return "New contact added successfully (Dummy Response)";
    }

    // Dummy GET Request - Fetch contact by ID
    @GetMapping("/contacts/get/{id}")
    public String getDummyContactById(@PathVariable int id) {
        log.info("Dummy request received: Fetch contact with ID: {}", id);
        return "Returning contact with ID: " + id + " (Dummy Response)";
    }

    // Dummy PUT Request - Update contact by ID
    @PutMapping("/contacts/update/{id}")
    public String updateDummyContact(@PathVariable int id) {
        log.info("Dummy request received: Update contact with ID: {}", id);
        return "Updated contact with ID: " + id + " (Dummy Response)";
    }

    // Dummy DELETE Request - Delete contact by ID
    @DeleteMapping("/contacts/delete/{id}")
    public String deleteDummyContact(@PathVariable int id) {
        log.info("Dummy request received: Delete contact with ID: {}", id);
        return "Deleted contact with ID: " + id + " (Dummy Response)";
    }
}
