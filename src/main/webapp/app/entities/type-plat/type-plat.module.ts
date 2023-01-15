import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypePlatComponent } from './list/type-plat.component';
import { TypePlatDetailComponent } from './detail/type-plat-detail.component';
import { TypePlatUpdateComponent } from './update/type-plat-update.component';
import { TypePlatDeleteDialogComponent } from './delete/type-plat-delete-dialog.component';
import { TypePlatRoutingModule } from './route/type-plat-routing.module';

@NgModule({
  imports: [SharedModule, TypePlatRoutingModule],
  declarations: [TypePlatComponent, TypePlatDetailComponent, TypePlatUpdateComponent, TypePlatDeleteDialogComponent],
})
export class TypePlatModule {}
