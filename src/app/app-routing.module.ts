import { ManagementModule } from './management/management.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { LayoutComponent } from './layout/layout.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'noticias',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule)
      },
      {path: 'reclamos', redirectTo: 'forms/reclamos'},
      {path: 'contacto', redirectTo: 'forms/contacto'},
      {
        path: 'directiva',
        loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'malla',
        loadChildren: () => import('./malla/malla.module').then(m => m.MallaModule)
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
      },
      {
        path: 'sube-tu-papeo',
        loadChildren: () => import('./papeo/papeo.module').then(m => m.PapeoModule)
      },
      {
        path: 'politicas-de-privacidad', component: PrivacyPolicyComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'admin', canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      { path: '**', redirectTo: '/home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
