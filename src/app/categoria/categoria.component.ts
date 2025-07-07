import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm!: FormGroup;
  editando: boolean = false;

  constructor(private service: CategoriaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarCategorias();
  }

  initForm(): void {
    this.categoriaForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required]
    });
  }

  cargarCategorias(): void {
    this.service.getAll().subscribe(data => this.categorias = data);
  }

  guardar(): void {
    const cat = this.categoriaForm.value;
    if (this.editando) {
      this.service.update(cat).subscribe(() => {
        this.editando = false;
        this.cargarCategorias();
        this.categoriaForm.reset();
      });
    } else {
      this.service.create(cat).subscribe(() => {
        this.cargarCategorias();
        this.categoriaForm.reset();
      });
    }
  }

  editar(c: Categoria): void {
    this.categoriaForm.patchValue(c);
    this.editando = true;
  }

  eliminar(id: number): void {
    this.service.delete(id).subscribe(() => this.cargarCategorias());
  }
}
