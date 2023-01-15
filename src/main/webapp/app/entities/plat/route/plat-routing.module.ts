import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlatComponent } from '../list/plat.component';
import { PlatDetailComponent } from '../detail/plat-detail.component';
import { PlatUpdateComponent } from '../update/plat-update.component';
import { PlatRoutingResolveService } from './plat-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const platRoute: Routes = [
  {
    path: '',
    component: PlatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlatDetailComponent,
    resolve: {
      plat: PlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlatUpdateComponent,
    resolve: {
      plat: PlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlatUpdateComponent,
    resolve: {
      plat: PlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(platRoute)],
  exports: [RouterModule],
})
export class PlatRoutingModule {}
