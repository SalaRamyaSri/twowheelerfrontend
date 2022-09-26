import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Variant } from '../interfaces/variant';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  url = environment.apiUrl;
  // private baseURL = "http://localhost:8080/api/variants";
  constructor(private httpClient: HttpClient) { }

  // getVariantsList(): Observable<Variant[]>{
  //   return this.httpClient.get<Variant[]>(`${this.baseURL}`);
  // }

  // createVariant(Variant: Variant): Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}`, Variant);
  // }

  // getVariantById(id: number): Observable<Variant>{
  //   return this.httpClient.get<Variant>(`${this.baseURL}/${id}`);
  // }

  // updateVariant(id: number, Variant: Variant): Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/${id}`, Variant);
  // }

  // deleteVariant(id: number): Observable<Object>{
  //   return this.httpClient.delete(`${this.baseURL}/${id}`);
  // }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/api/variants/createVariant", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  update(data:any){
    return this.httpClient.patch(this.url + 
      "/api/variants/updateVariant", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  getVariants(){
    return this.httpClient.get(this.url+ "/api/variants/getAllVariants");
  }

  updateStatus(data:any){
    return this.httpClient.patch(this.url + 
      "/api/variants/updateStatus/", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  delete(id:any){
    return this.httpClient.delete(this.url + 
      "/api/variants/deleteVariant/"+ id,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  // getVariantsByCompany(id:any){
  //   return this.httpClient.get(this.url + 
  //     "/api/variants/fetchAllByCompany/"+ id);
  //   }


  // getById(id:any){
  //     return this.httpClient.get(this.url + 
  //       "/api/variants/fetchById/"+ id);
  //   }
}
