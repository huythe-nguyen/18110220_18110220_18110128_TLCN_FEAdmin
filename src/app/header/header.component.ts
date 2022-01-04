import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  refreshToken='';
  employee:Employee
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/logout'
  constructor( private data: DataService,private router: Router
    ,private rest:RestApiService) {

  }
  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  name = localStorage.getItem('name')
  logout(){
    const token = localStorage.getItem('tokens')
    console.log(token)
    this.refreshToken=token
    console.log(this.refreshToken)
    if(this.refreshToken){
      this.rest.delete(this.url,this.refreshToken).then(data=>{
      localStorage.clear();
      this.router.navigate(['/login']);
      })
    }
  }
}
