import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getVariantsByCompany(id:any){
    return this.httpClient.get(this.url + 
      "/api/bikes/variants/"+ id);
    }


  getById(id:any){
      return this.httpClient.get(this.url + 
        "/api/bikes/variants/fetchById/"+ id);
    }

  generateReport(data:any){
    return this.httpClient.post(this.url + 
      "/bike/generateReport/", data,{
        headers: new HttpHeaders().set('Content-Type', "application/json"),
      });
  }

  getPDF(data:any): Observable<Blob>{
      return this.httpClient.post(this.url + "/bike/getPdf", data,{
        responseType:'blob'
      });
  }

}
