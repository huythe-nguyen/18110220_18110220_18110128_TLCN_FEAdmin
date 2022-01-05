import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: Employee;
  btnDisabled= false;
  mess:string

  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/login'
  constructor(private rest:RestApiService,
    private data: DataService,
    private router: Router) {
      this.employee= new Employee;
     }

  ngOnInit() {
  }
  validate(){
    return true;
  }
  async login(){
    this.btnDisabled=true;
    if(this.validate()){
      this.rest.post(this.url,this.employee).then(data=>{
        this.employee = (data as {user: Employee }).user;
        if(this.employee.role==="admin"){
          let value = data as { id: string, email:string, name:string,tokens:string, token:string}
          localStorage.setItem('tokens',value.token);
          localStorage.setItem('user',JSON.stringify(data));
          localStorage.setItem('token',value.tokens);
          localStorage.setItem('name',value.name);
          console.log('user', value.id)
          this.router.navigate(['/home'])
          this.btnDisabled=false;
        }else{
          window.alert("Tài khoản của bạn chưa được cấp quyền!")
          this.router.navigate(['/login'])
          this.employee= new Employee;
          this.btnDisabled=false;
        }
      })
      .catch(error=>{
        this.data.error('Incorrect email or password');
        this.btnDisabled=false;
        this.mess='Incorrect email or password';
      })
    }
  }


}
