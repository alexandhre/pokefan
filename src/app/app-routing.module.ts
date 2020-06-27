import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/general/home/home.component';
import { PokemonDetailComponent } from './modules/general/pokemon-detail/pokemon-detail.component';
import { IndexComponent } from './modules/general/index/index.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./modules/general/about/about.module')
  //   .then(mod => mod.AboutModule)},
  { path: '', component: IndexComponent, },  
  { path: 'detail/:id', component: PokemonDetailComponent, },
  { path: 'home', component: HomeComponent, },
  { path: 'index', component: IndexComponent, },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
