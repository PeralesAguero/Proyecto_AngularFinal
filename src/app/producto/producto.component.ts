import { Component, OnInit } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoForm!: FormGroup;
  editando: boolean = false;

  constructor(private service: ProductoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.cargarProductos();
  }

  initForm() {
    this.productoForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, Validators.required],
      categoriaId: [0, Validators.required]
    });
  }

  cargarProductos() {
    this.service.getAll().subscribe(data => this.productos = data);
  }

  guardar() {
    const producto = this.productoForm.value;
    if (this.editando) {
      this.service.update(producto).subscribe(() => {
        this.editando = false;
        this.cargarProductos();
        this.productoForm.reset();
      });
    } else {
      this.service.create(producto).subscribe(() => {
        this.cargarProductos();
        this.productoForm.reset();
      });
    }
  }

  editar(p: Producto) {
    this.productoForm.patchValue(p);
    this.editando = true;
  }

  eliminar(id: number) {
    this.service.delete(id).subscribe(() => this.cargarProductos());
  }
}
