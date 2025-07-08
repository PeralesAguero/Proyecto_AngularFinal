import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];
  editando = false;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required]
    });

    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.getAll().subscribe(data => this.categorias = data);
  }

  guardar() {
    const cat = this.categoriaForm.value;
    if (this.editando) {
      this.categoriaService.update(cat).subscribe(() => {
        this.categoriaForm.reset();
        this.editando = false;
        this.obtenerCategorias();
      });
    } else {
      this.categoriaService.create(cat).subscribe(() => {
        this.categoriaForm.reset();
        this.obtenerCategorias();
      });
    }
  }

  editar(cat: Categoria) {
    this.categoriaForm.patchValue(cat);
    this.editando = true;
  }

  eliminar(id: number) {
    this.categoriaService.delete(id).subscribe(() => this.obtenerCategorias());
  }
}
