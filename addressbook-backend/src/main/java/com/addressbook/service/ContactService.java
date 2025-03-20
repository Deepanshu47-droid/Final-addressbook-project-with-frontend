package com.addressbook.service;

import com.addressbook.dto.ContactDTO;
import com.addressbook.exception.AddressBookException;
import com.addressbook.model.Contact;
import com.addressbook.repository.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ContactService {

    private List<Contact> contacts = new ArrayList<>();
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // Get All Contacts
    public List<Contact> getAllContactsDb() {
        log.info("Fetching all contacts from database...");
        return contactRepository.findAll();
    }

    // Get Contact by ID
    public Contact getContactByIdDb(Long id) {
        log.info("Fetching contact with ID from database: {}", id);
        return contactRepository.findById(id)
                .orElseThrow(() -> new AddressBookException("Address Book ID " + id + " not found"));
    }

    // Add New Contact
    public Contact addContactDb(ContactDTO contactDTO) {
        Contact newContact = new Contact();
        newContact.setFullName(contactDTO.getFullName());
        newContact.setPhoneNumber(contactDTO.getPhoneNumber());
        newContact.setAddress(contactDTO.getAddress());
        newContact.setCity(contactDTO.getCity());
        newContact.setState(contactDTO.getState());
        newContact.setZipCode(contactDTO.getZipCode());

        contactRepository.save(newContact);
        log.info("Added new contact to database: {}", newContact);
        return newContact;
    }

    // Update Contact
    public String updateContactDb(Long id, ContactDTO contactDTO) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new AddressBookException("Contact with ID " + id + " not found"));

        log.info("Updating contact with ID in database: {}", id);
        contact.setFullName(contactDTO.getFullName());
        contact.setPhoneNumber(contactDTO.getPhoneNumber());
        contact.setAddress(contactDTO.getAddress());
        contact.setCity(contactDTO.getCity());
        contact.setState(contactDTO.getState());
        contact.setZipCode(contactDTO.getZipCode());

        contactRepository.save(contact);
        log.info("Contact updated successfully in database: {}", contact);

        return "Contact updated successfully in database!";
    }

    // Delete Contact
    public String deleteContactDb(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            log.info("Deleted contact with ID in Database: {}", id);
            return "Contact deleted successfully in Database!";
        } else {
            log.error("Failed to delete. Contact with ID {} not found in Database!", id);
            throw new AddressBookException("Address Book ID " + id + " not found in Database");
        }
    }
}
