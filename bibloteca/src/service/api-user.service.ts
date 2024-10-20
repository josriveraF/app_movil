import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILibro } from 'src/interface/bibloteca';
import { Iprestamo } from 'src/interface/bibloteca';
@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http : HttpClient) { }

  getBibloteca():Observable<ILibro[]>{
    return this.http.get<ILibro[]>(`${environment.apiUser}/libros`);

  }
  postprestamo(NewPrestamo: Iprestamo):Observable<Iprestamo>{
    return this.http.post<Iprestamo>(`${environment.apiUser}/prestar`,NewPrestamo);

  }
}

