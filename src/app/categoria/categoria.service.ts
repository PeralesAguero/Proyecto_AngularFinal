import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  create(cat: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, cat);
  }

  update(cat: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${cat.id}`, cat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
