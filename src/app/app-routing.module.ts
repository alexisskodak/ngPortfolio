import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent as BlogListComponent } from './modules/blog/components/list/list.component';
import { InfoComponent as BlogInfoComponent} from './modules/blog/components/info/info.component';
import { ListComponent as CryptoListComponent } from './modules/crypto/components/list/list.component';
import { InfoComponent as CryptoInfoComponent } from './modules/crypto/components/info/info.component';
import {HomeComponent} from './modules/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'posts', component: BlogListComponent },
  { path: 'posts/:id', component: BlogInfoComponent },
  { path: 'crypto', component: CryptoListComponent },
  { path: 'crypto/:id', component: CryptoInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
