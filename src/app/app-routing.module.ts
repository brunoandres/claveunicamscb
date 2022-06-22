import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaSolicitudComponent } from './componentes/nueva-solicitud/nueva-solicitud.component';

const routes: Routes = [
  { path: "nueva", component: NuevaSolicitudComponent },
  { path: "", redirectTo: "/nueva", pathMatch: "full" },
  { path: "**", redirectTo: "/nueva" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
