import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from './solicitud';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  api: string = "http://localhost/claveunicamscb/server/";
  constructor(private httpClient: HttpClient) { }

  add(data: Solicitud){
    return new Promise(async(resolve) => {
      this.httpClient.post<any>(this.api + "?insertar=1", data).subscribe(resp => {
        resolve(resp); 
      });
    });
  }
}
