import "zone.js";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from "./keycloak-theme/app.component";
import { appConfig } from "./keycloak-theme/app.config";
// Bootstrap the Angular application
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
