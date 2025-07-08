import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './producto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {
  productoForm!: FormGroup;
  productos: Producto[] = [];
  editando = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, Validators.required],
      categoriaId: [0, Validators.required]
    });

    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getAll().subscribe(data => this.productos = data);
  }

  guardar(): void {
    const producto = this.productoForm.value;
    if (this.editando) {
      this.productoService.update(producto).subscribe(() => {
        this.editando = false;
        this.productoForm.reset();
        this.cargarProductos();
      });
    } else {
      this.productoService.create(producto).subscribe(() => {
        this.productoForm.reset();
        this.cargarProductos();
      });
    }
  }

  editar(p: Producto): void {
    this.productoForm.patchValue(p);
    this.editando = true;
  }

  eliminar(id: number): void {
    this.productoService.delete(id).subscribe(() => this.cargarProductos());
  }
}
