import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'type-plat',
        data: { pageTitle: 'projetplatApp.typePlat.home.title' },
        loadChildren: () => import('./type-plat/type-plat.module').then(m => m.TypePlatModule),
      },
      {
        path: 'plat',
        data: { pageTitle: 'projetplatApp.plat.home.title' },
        loadChildren: () => import('./plat/plat.module').then(m => m.PlatModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
