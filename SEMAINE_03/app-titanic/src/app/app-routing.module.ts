import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'search', 
    canActivate: [GuardService],
    component: SearchComponent,
  },
  {
    path : 'login',
    component : LoginComponent
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
