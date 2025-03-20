import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressBookService } from './services/address-book.service';
import { Address } from './models/address.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  addressBookService = inject(AddressBookService);
  isFormVisible = false;
  addresses: Address[] = [];
  currentAddress: Address = this.createEmptyAddress();
  zipCodesForSelectedState: string[] = [];
  citiesForSelectedState: string[] = [];
  errorMessage: string = '';
  newState: string = '';
  newCity: string = '';
  newZipCode: string = '';

  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep', 'Delhi', 'Puducherry', 'Jammu and Kashmir', 'Ladakh'
  ];
  
  
  cities: { [key: string]: string[] } = {
    'Andaman and Nicobar Islands': ['Port Blair'],
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada', 'Kurnool', 'Nellore', 'Ongole', 'Rajahmundry', 'Srikakulam', 'Tirupati', 'Vijayawada', 'Visakhapatnam', 'Vizianagaram'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun'],
    'Assam': ['Dibrugarh', 'Guwahati', 'Jorhat', 'Silchar', 'Tezpur'],
    'Bihar': ['Ara', 'Bhagalpur', 'Bihar Sharif', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Patna', 'Purnia'],
    'Chandigarh': ['Chandigarh'],
    'Chhattisgarh': ['Ambikapur', 'Bhilai', 'Bilaspur', 'Dhamtari', 'Durg', 'Jagdalpur', 'Korba', 'Raigarh', 'Raipur'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa'],
    'Delhi': ['New Delhi'],
    'Goa': ['Madgaon', 'Mapusa', 'Panaji', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Anand', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Mehsana', 'Rajkot', 'Surat', 'Vadodara', 'Valsad'],
    'Haryana': ['Ambala', 'Faridabad', 'Gurgaon', 'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Sonipat'],
    'Himachal Pradesh': ['Dharamshala', 'Mandi', 'Shimla', 'Solan'],
    'Jammu and Kashmir': ['Anantnag', 'Baramulla', 'Jammu', 'Kathua', 'Srinagar', 'Udhampur'],
    'Jharkhand': ['Bokaro', 'Deoghar', 'Dhanbad', 'Hazaribagh', 'Jamshedpur', 'Ranchi'],
    'Karnataka': ['Ballari', 'Bangalore', 'Belgaum', 'Bidar', 'Davanagere', 'Gulbarga', 'Hubli', 'Kolar', 'Mangalore', 'Mysore', 'Shivamogga', 'Tumkur'],
    'Kerala': ['Alappuzha', 'Kochi', 'Kollam', 'Kottayam', 'Kozhikode', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Lakshadweep': ['Kavaratti'],
    'Madhya Pradesh': ['Balaghat', 'Betul', 'Bhopal', 'Chhindwara', 'Dewas', 'Gwalior', 'Indore', 'Jabalpur', 'Khandwa', 'Mandsaur', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Shahdol', 'Ujjain', 'Vidisha'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Bhiwandi', 'Chandrapur', 'Kolhapur', 'Latur', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Pimpri-Chinchwad', 'Pune', 'Sangli', 'Solapur', 'Thane'],
    'Manipur': ['Imphal'],
    'Meghalaya': ['Shillong'],
    'Mizoram': ['Aizawl', 'Lunglei'],
    'Nagaland': ['Dimapur', 'Kohima'],
    'Odisha': ['Balasore', 'Berhampur', 'Bhadrak', 'Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
    'Punjab': ['Amritsar', 'Bathinda', 'Firozpur', 'Jalandhar', 'Ludhiana', 'Mohali', 'Patiala'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Bikaner', 'Bhilwara', 'Jaipur', 'Jodhpur', 'Kota', 'Sikar', 'Udaipur'],
    'Sikkim': ['Gangtok'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Erode', 'Madurai', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Vellore'],
    'Telangana': ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nizamabad', 'Warangal'],
    'Tripura': ['Agartala'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Bareilly', 'Ghaziabad', 'Gorakhpur', 'Jhansi', 'Kanpur', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Noida', 'Prayagraj', 'Saharanpur', 'Varanasi'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Haldwani', 'Rishikesh', 'Roorkee'],
    'West Bengal': ['Asansol', 'Durgapur', 'Howrah', 'Kolkata', 'Malda', 'Siliguri'],
    
  };
  
   

  zipCodes: { [key: string]: string[] } = {
    'Andhra Pradesh': ['500001', '520001', '530001', '518001', '533001', '516001'],
    'Arunachal Pradesh': ['791001'],
    'Assam': ['781001', '786001', '788001'],
    'Bihar': ['800001', '823001', '812001', '842001'],
    'Chhattisgarh': ['492001', '490001', '495001', '496001'],
    'Goa': ['403001', '403601'],
    'Gujarat': ['380001', '395001', '390001', '360001', '382010'],
    'Haryana': ['121001', '122001', '132103', '134003'],
    'Himachal Pradesh': ['171001', '176215'],
    'Jharkhand': ['834001', '831001', '826001'],
    'Karnataka': ['560001', '570001', '580001', '590001'],
    'Kerala': ['695001', '682001', '673001', '680001'],
    'Madhya Pradesh': ['452001', '462001', '474001', '482001', '456001', '470001'],
    'Maharashtra': ['400001', '411001', '422001', '421001', '440001'],
    'Manipur': ['795001'],
    'Meghalaya': ['793001'],
    'Mizoram': ['796001'],
    'Nagaland': ['797001'],
    'Odisha': ['751001', '753001', '769001'],
    'Punjab': ['141001', '143001', '144001', '147001'],
    'Rajasthan': ['302001', '342001', '324001', '313001'],
    'Sikkim': ['737101'],
    'Tamil Nadu': ['600001', '641001', '625001', '620001'],
    'Telangana': ['500001', '506001', '503001'],
    'Tripura': ['799001'],
    'Uttar Pradesh': ['226001', '208001', '282001', '250001', '221001'],
    'Uttarakhand': ['248001', '249401'],
    'West Bengal': ['700001', '711101', '713201'],
    'Andaman and Nicobar Islands': ['744101'],
    'Chandigarh': ['160001'],
    'Dadra and Nagar Haveli and Daman and Diu': ['396210'],
    'Lakshadweep': ['682555'],
    'Delhi': ['110001', '110002', '110003'],
    'Puducherry': ['605001'],
    'Jammu and Kashmir': ['180001', '190001'],
    'Ladakh': ['194101'],

  };
    

  constructor() {}

  ngOnInit(): void {
    this.fetchAddresses();
  }

  fetchAddresses() {
    this.addressBookService.getAddresses().subscribe({
      next: (data) => (this.addresses = data),
      error: (err) => console.error('Error fetching addresses:', err),
    });
  }

  addAddress() {
    this.isFormVisible = true;
    this.currentAddress = this.createEmptyAddress();
    this.zipCodesForSelectedState = [];
    this.citiesForSelectedState = [];
    this.errorMessage = '';
  }

  editAddress(address: Address) {
    this.isFormVisible = true;
    this.currentAddress = { ...address };
  
    this.errorMessage = '';
  }

  // updateNewCitiesAndZipCodes() {
  //   if (this.currentAddress.state !== 'other') {
  //     this.citiesForSelectedState = this.cities[this.currentAddress.state];
  //     this.zipCodesForSelectedState = this.zipCodes[this.currentAddress.state];
  //   } else {
  //     this.citiesForSelectedState = [];
  //     this.zipCodesForSelectedState = [];
  //     this.currentAddress.state = this.newState;
  //     if (!this.states.includes(this.newState)) {
  //       this.states.push(this.newState);
  //     }
  //   }
   
  //   if (this.currentAddress.city === 'other') {
  //     this.currentAddress.city = this.newCity;
  //     if (!this.citiesForSelectedState.includes(this.newCity)) {
  //       this.citiesForSelectedState.push(this.newCity);
  //     }
  //   }
  //   if (this.currentAddress.zipCode === 'other') {
  //     this.currentAddress.zipCode = this.newZipCode;
  //     if (!this.zipCodesForSelectedState.includes(this.newZipCode)) {
  //       this.zipCodesForSelectedState.push(this.newZipCode);
  //     }
  //   }
  // }

    updateNewCitiesAndZipCodes() {
      console.log("State Selected:", this.currentAddress.state);
      console.log("City Selected:", this.currentAddress.city);
      console.log("Zip Code Selected:", this.currentAddress.zipCode);
    
      // Handle new state entry
      if (this.currentAddress.state === 'other' && this.newState) {
        this.currentAddress.state = this.newState;
        if (!this.states.includes(this.newState)) {
          this.states.push(this.newState);
        }
        this.citiesForSelectedState = [];
        this.zipCodesForSelectedState = [];
      } else if (this.currentAddress.state !== 'other') {
        this.citiesForSelectedState = this.cities[this.currentAddress.state] || [];
        this.zipCodesForSelectedState = this.zipCodes[this.currentAddress.state] || [];
      }
    
      // Handle new city entry
      if (this.currentAddress.city === 'other' && this.newCity) {
        this.currentAddress.city = this.newCity;
        if (!this.citiesForSelectedState.includes(this.newCity)) {
          this.citiesForSelectedState.push(this.newCity);
        }
      }
    
      // Handle new zip code entry
      if (this.currentAddress.zipCode === 'other' && this.newZipCode) {
        this.currentAddress.zipCode = this.newZipCode;
        if (!this.zipCodesForSelectedState.includes(this.newZipCode)) {
          this.zipCodesForSelectedState.push(this.newZipCode);
        }
      }
    }
    

  saveAddress() {
    this.errorMessage = '';
    
    if (!this.validateAddress()) return;

    if (this.currentAddress.id) {
      this.addressBookService.updateAddress(this.currentAddress.id, this.currentAddress).subscribe({
        next: () => {
          this.isFormVisible = false;
          this.fetchAddresses();
          alert('Address Edited successfully!');
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert(err.error.message || 'Validation failed. Please check your input.');
        }
      });
    } else {
      this.addressBookService.addAddress(this.currentAddress).subscribe({
        next: () => {
          this.isFormVisible = false;
          this.fetchAddresses();
          alert('Address Added successfully!');
        },
        error: (err) => {
          console.error('Add failed:', err);
          alert(err.error.message || 'Validation failed. Please check your input.');
        }
      });
    }
    
  }

  deleteAddress(id: number) {
    this.addressBookService.deleteAddress(id).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        this.addresses = this.addresses.filter(address => address.id !== id);
        alert(response);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete address. Please try again.');
      }
    });
  }

  validateAddress(): boolean {
    const { fullName, phoneNumber, address, city, state, zipCode } = this.currentAddress;
    
    if (!fullName || fullName.trim().length === 0) {
      this.errorMessage = 'Full Name is required.';
    } else if (!/^[A-Z][A-Za-z ]+$/.test(fullName)) {
      this.errorMessage = 'Full Name should start from upper case can only contain alphabets and spaces.';
    } else if (fullName.length > 50) {
      this.errorMessage = 'Full Name must not exceed 50 characters.';
    } else if (!phoneNumber || !/^[1-9][0-9]{9}$/.test(phoneNumber)) {
      this.errorMessage = 'Invalid Phone Number format. It must be 10 digits without leading zeros.';
    } else if (!address || address.trim().length === 0) {
      this.errorMessage = 'Address is required.';
    } else if (address.length > 100) {
      this.errorMessage = 'Address must not exceed 100 characters.';
    } else if (!city || city.trim().length === 0) {
      this.errorMessage = 'City is required.';
    } else if (!state || state.trim().length === 0) {
      this.errorMessage = 'State is required.';
    } else if (!zipCode || !/^[0-9]{5,6}$/.test(zipCode) && zipCode !== 'other') {
      this.errorMessage = 'Invalid Zip Code. It must be 5 or 6 digits.';
    } else {
      return true;
    }

    alert(this.errorMessage);
    return false;
  }

  createEmptyAddress(): Address {
    return { id: undefined, fullName: '', phoneNumber: '', address: '', city: '', state: '', zipCode: '' };
  }
}
