import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './producto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  create(prod: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, prod);
  }

  update(prod: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${prod.id}`, prod);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
