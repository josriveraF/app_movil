import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IlisPrestado } from 'src/interface/bibloteca';
@Injectable({
  providedIn: 'root'
})
export class ApiAlumnoService {

  constructor(private http : HttpClient) { }

  getBibloteca():Observable<IlisPrestado[]>{
    return this.http.get<IlisPrestado[]>(`${environment.apiUser}/prestamos?usuario_id=1`);
  }
//getBibloteca(usuarioId: number): Observable<IlisPrestado[]> {
 // return this.http.get<IlisPrestado[]>(`${environment.apiUser}/prestamos?usuario_id=${usuarioId}`);


}
