import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ListenComponent } from './pages/listen/listen.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { CategoryComponent } from './pages/category/category.component';
import { authguardGuard } from './auth/authguard.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    
    {path: '', component: HomeComponent, canActivate: [authguardGuard]},
    {path: 'browse', component: BrowseComponent, canActivate: [authguardGuard]},
    {path: 'listen', component: ListenComponent, canActivate: [authguardGuard]},
    {path: 'listen/:trackID/:isrc', component: ListenComponent, canActivate: [authguardGuard]},
    {path: 'artists/:artistID', component: ArtistPageComponent, canActivate: [authguardGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [authguardGuard]},
    {path: 'search', component: SearchComponent, canActivate: [authguardGuard]},
    {path: 'category/:language', component: CategoryComponent, canActivate: [authguardGuard]},

    {path: '**', redirectTo:'login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
