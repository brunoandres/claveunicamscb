import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrudService } from 'src/app/servicios/crud.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {

  form: FormGroup;
  numberRegEx =/^-?(0|[0-9]\d*)?$/;
  matcher = new MyErrorStateMatcher();
  load = false;
  msg: string;
  class: string;
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get nombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get dni(){
    return this.form.get('dni').invalid && this.form.get('dni').touched;
  }

  get nroTramite(){
    return this.form.get('nroTramite').invalid && this.form.get('nroTramite').touched;
  }

  get email(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  createForm(){
    this.form = new FormGroup({
      nombre: new FormControl('BRUNO', [ Validators.required]),
      apellido: new FormControl('OVANDO', [ Validators.required]),
      dni: new FormControl('38091463', {
        validators: [ Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(8), Validators.minLength(8)],
        updateOn: "blur"
      }),
      nroTramite: new FormControl('00525210459', {
        validators: [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(11), Validators.minLength(11)],
        updateOn: "blur"
      }),
      email: new FormControl('brunoandres2013@gmail.com', [Validators.required, Validators.email])
    });
  }

  async solicitarClave(){
    this.load = true;
    await this.crudService.add(this.form.value).then((data:any)=>{
      this.load = false;
      if(data === true){
        this.class = "alert alert-success";
        this.msg = 'Solicitud enviada correctamente'
      }else{
        this.class = "alert alert-warning";
        this.msg = "Error al generar solicitud, intente nuevamente";
      }
    })/*.catch(e=>{
      this.load = false;
      this.class = "alert alert-danger";
      this.msg = "Error al generar solicitud, intente nuevamente";
    })*/
  }
}
