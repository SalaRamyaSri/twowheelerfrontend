import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/api/companies/createCompany", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  getCategorys(){
    return this.httpClient.get(this.url+ "/api/companies/getAllCompanies");
  }

  update(data:any){
    return this.httpClient.patch(this.url + 
      "/api/companies/updateCompany/", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  delete(id:any){
    return this.httpClient.delete(this.url + 
      "/api/companies/delete/"+ id,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }
}
