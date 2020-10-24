import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'mc', loadChildren: () => import('./country/country.module').then(mc => mc.CountryModule) },
  { path: 'mp', loadChildren: () => import('./province/province.module').then(mp => mp.ProvinceModule) },
  { path: 'mr', loadChildren: () => import('./region/region.module').then(mr => mr.RegionModule) },
  { path: 'mz', loadChildren: () => import('./zone/zone.module').then(mz => mz.ZoneModule) },
  { path: 'mrm', loadChildren: () => import('./role-manager/role-manager.module').then(mrm => mrm.RoleManagerModule) },
  { path: 'mzd', loadChildren: () => import('./zone-bound/zone-bound.module').then(mzd => mzd.ZoneBoundModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }



