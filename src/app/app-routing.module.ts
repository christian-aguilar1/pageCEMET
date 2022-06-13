import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PreloadService } from './core/services/preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { AdminGuard } from './admin.guard';
import { LayoutComponent } from './layout/layout.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'noticias',
        loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then((m) => m.FormsModule),
      },
      { path: 'reclamos', redirectTo: 'forms/reclamos' },
      { path: 'contacto', redirectTo: 'forms/contacto' },
      {
        path: 'quienes-somos',
        loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
      },
      {
        path: 'calendario',
        loadChildren: () => import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'malla',
        loadChildren: () => import('./malla/malla.module').then((m) => m.MallaModule),
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documents/documents.module').then((m) => m.DocumentsModule),
      },
      {
        path: 'sube-tu-papeo',
        loadChildren: () => import('./papeo/papeo.module').then((m) => m.PapeoModule),
      },
      {
        path: 'politicas-de-privacidad',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: '**',
        loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
