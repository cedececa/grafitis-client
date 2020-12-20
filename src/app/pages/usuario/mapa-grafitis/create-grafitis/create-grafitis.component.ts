import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
import { UsuarioPublicacionService } from 'src/app/core/services/usuario-services/usuario-publicacion.service';
import { MapaGrafitisService } from '../mapa-grafitis.service';
@Component({
  selector: 'app-create-grafitis',
  templateUrl: './create-grafitis.component.html',
  styleUrls: ['./create-grafitis.component.css'],
})
export class CreateGrafitisComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private usuarioPublicacionService: UsuarioPublicacionService,
    private mapaGrafitisService: MapaGrafitisService,
    private nzModalRef: NzModalRef
  ) {}
  validateForm: FormGroup = null;
  initForm() {
    this.validateForm = this.fb.group({
      autor: ['', Validators.required],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
      foto: ['', Validators.required],
    });
  }
  submitForm() {
    console.log(this.validateForm.getRawValue());
    this.usuarioPublicacionService
      .create(this.validateForm.getRawValue() as PublicacionEntity)
      .subscribe((response) => {
        if (response.code == 200) {
          this.mapaGrafitisService.addEntity(response.data);
          this.nzModalRef.close();
        }
      });
  }
  ngOnInit(): void {
    this.initForm();
  }
  center = {
    lat: 36.7213028,
    lng: -4.4216366,
  };
  g() {
    const a = {
      latitud: 36.7213028 + ((Math.random() - 0.5) * 2) / 10,
      longitud: -4.4216366 + ((Math.random() - 0.5) * 2) / 10,
      autor: '',
      foto: '',
    };
    this.validateForm.patchValue(a);
    console.log(a);
  }
}
