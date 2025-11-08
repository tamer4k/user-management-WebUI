import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ أضف هذا السطر
import { importProvidersFrom } from '@angular/core'; // ✅ أضف هذا السطر

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule) // ✅ فعّل HttpClient بشكل عام للتطبيق كله
  ]
}).catch(err => console.error(err));