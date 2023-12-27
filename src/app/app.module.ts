import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { CrearClientesComponent } from './crear-clientes/crear-clientes.component';
import { ModificarClientesComponent } from './modificar-clientes/modificar-clientes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { LoginComponent } from './login/login.component';
import { CreatePositionComponent } from './create-position/create-position.component';
import { LogoutComponent } from './logout/logout.component';
import { TurneroComponent } from './turnero/turnero.component';
import { ListaTuneroComponent } from './lista-tunero/lista-tunero.component';




@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    CrearClientesComponent,
    ModificarClientesComponent,
    CreateUserComponent,
    DeleteUserComponent,
    GetUsersComponent,
    LoginComponent,
    CreatePositionComponent,
    LogoutComponent,
    TurneroComponent,
    ListaTuneroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
