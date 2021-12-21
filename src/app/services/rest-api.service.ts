import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

constructor(private http: HttpClient,
   private router: Router ) {}
getHeaders(){
  const tokens = localStorage.getItem('tokens');

  return tokens? new HttpHeaders().set('Authorization','Bearer ' + tokens) : null;
}
get(link:string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/', {headers: headers}).toPromise();
  return this.router.navigate(['/login'])
}
gets(link:string, page:number,size: number){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'?page='+ page +'&&size='+size, {headers: headers}).toPromise();
 return this.router.navigate(['/login'])
}
getOder(link:string, page:number,size: number, status: string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link+'/'+status +'?page='+ page+'&&size='+size, {headers: headers}).toPromise();
 return this.router.navigate(['/login'])
}
getDashboard(link:string, page:number,size: number,day: number, status: string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link+'/'+status +'?page='+ page+'&&size='+size+'&&day='+day, {headers: headers}).toPromise();
 return this.router.navigate(['/login'])
}
getCountDashboard(link:string,day: number, status: string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link+'/'+status +'?day='+day, {headers: headers}).toPromise();
 return this.router.navigate(['/login'])
}
searchOder(link: string,key:string,status: string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+status+key, {headers: headers}).toPromise();
  return this.http.get(link +'/'+key ).toPromise();
}
search(link: string,key:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+key, {headers: headers}).toPromise();
  return this.http.get(link +'/'+key ).toPromise();
}
searchOrder(link: string,key:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'&phone='+key, {headers: headers}).toPromise();
  return this.http.get(link +'/'+key ).toPromise();
}
getOne(link: string,id:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+id, {headers: headers}).toPromise();
  return this.http.get(link +'/'+id ).toPromise();
}
post(link: string, body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.post(link,body, {headers: headers}).toPromise();
  return this.http.post(link,body).toPromise();
}
postOne(link: string, id:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.post(link +'/'+id, {headers: headers}).toPromise();
}
put(link: string,id: string, body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.put(link +'/'+id ,body, {headers: headers}).toPromise();
  return this.http.put(link +'/'+id ,body).toPromise();
}
delete(link: string , id: string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.delete(link +'/'+ id, {headers: headers}).toPromise();
  return this.http.delete(link +'/'+ id ).toPromise();
}
}
