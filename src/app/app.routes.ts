import { Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path : '', component: HomeComponent,
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'create-event', component: CreateEventComponent
  },
  {
    path: 'edit-event/:id', component: EditEventComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'mod', component: BoardModeratorComponent
  },
  {
    path: 'admin', component: BoardAdminComponent
  },
  {
    path: 'user', component: BoardUserComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }


];
