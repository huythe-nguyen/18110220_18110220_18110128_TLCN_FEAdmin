import { RestApiService } from './rest-api.service';
import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';
  employee!: Employee | null;
  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message: string) {
    this.messageType = 'denger';
    this.message = message;
  }
  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }
  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }
}
