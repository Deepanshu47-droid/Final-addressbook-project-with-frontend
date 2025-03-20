import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model'; 

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private apiUrl = 'http://localhost:8080/addressbook/database/contacts';
  private http = inject(HttpClient);

  // Get all contacts
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/get/all`);
  }

  // Get address by ID
  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/get/${id}`);
  }

  // Add a new contact
  addAddress(address: Address): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, address);
  }

  // Update address
  updateAddress(id: number, address: Address): Observable<string> {
    return this.http.put(`${this.apiUrl}/update/${id}`, address, { responseType: 'text' });
  }
  

  // Delete address
  deleteAddress(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
  
}
