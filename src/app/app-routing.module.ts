import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './modules/general/index/index.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent, },    
  { path: 'index', component: IndexComponent, },
  { path: 'home', loadChildren: () => import('./modules/general/home/home.module').then(m => m.HomeModule) },  
  { path: 'detail/:id', loadChildren: () => import('./modules/general/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule) },  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
