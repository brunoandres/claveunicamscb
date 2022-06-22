import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  constructor() { }

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
      nombre: new FormControl('', [ Validators.required]),
      apellido: new FormControl('', [ Validators.required]),
      dni: new FormControl('', {
        validators: [ Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(8), Validators.minLength(8)],
        updateOn: "blur"
      }),
      nroTramite: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(11), Validators.minLength(11)],
        updateOn: "blur"
      }),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
}
