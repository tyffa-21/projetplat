import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlatComponent } from './list/plat.component';
import { PlatDetailComponent } from './detail/plat-detail.component';
import { PlatUpdateComponent } from './update/plat-update.component';
import { PlatDeleteDialogComponent } from './delete/plat-delete-dialog.component';
import { PlatRoutingModule } from './route/plat-routing.module';

@NgModule({
  imports: [SharedModule, PlatRoutingModule],
  declarations: [PlatComponent, PlatDetailComponent, PlatUpdateComponent, PlatDeleteDialogComponent],
})
export class PlatModule {}
