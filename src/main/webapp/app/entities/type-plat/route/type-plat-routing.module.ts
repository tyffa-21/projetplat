import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypePlatComponent } from '../list/type-plat.component';
import { TypePlatDetailComponent } from '../detail/type-plat-detail.component';
import { TypePlatUpdateComponent } from '../update/type-plat-update.component';
import { TypePlatRoutingResolveService } from './type-plat-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typePlatRoute: Routes = [
  {
    path: '',
    component: TypePlatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypePlatDetailComponent,
    resolve: {
      typePlat: TypePlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypePlatUpdateComponent,
    resolve: {
      typePlat: TypePlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypePlatUpdateComponent,
    resolve: {
      typePlat: TypePlatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typePlatRoute)],
  exports: [RouterModule],
})
export class TypePlatRoutingModule {}
