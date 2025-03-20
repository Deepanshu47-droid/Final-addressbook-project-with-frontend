import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes'; // ✅ Ensure this is imported

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    provideRouter(routes), // ✅ Now includes routing
    importProvidersFrom(FormsModule) // ✅ Correctly providing FormsModule
  ]
};