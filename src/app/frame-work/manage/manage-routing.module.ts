import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'zs', loadChildren: () => import('./zones/zones.module').then(zones => zones.ZonesModule) },
  { path: 'r', loadChildren: () => import('./read/read.module').then(read => read.ReadModule) },
  { path: 'track', loadChildren: () => import('./tracking/tracking.module').then(trackingManager => trackingManager.TrackingModule) },
  { path: 's', loadChildren: () => import('./search/search.module').then(searchManager => searchManager.SearchModule) },
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'l', loadChildren: () => import('./list-manager/list-manager.module').then(listManagerModule => listManagerModule.ListManagerModule) },
  { path: 'al', loadChildren: () => import('./authLevels/authlevels.module').then(authLevels => authLevels.AuthlevelsModule) },
  { path: 'dbf', loadChildren: () => import('./dbf-output/dbf-output.module').then(dbf => dbf.DbfOutputModule) },
  { path: 'fbn', loadChildren: () => import('./forbidden/forbidden.module').then(forbidden => forbidden.ForbiddenModule) },
  { path: 'dma', loadChildren: () => import('./data-mining/data-mining.module').then(dataMining => dataMining.DataMiningModule) },
  { path: 'load', loadChildren: () => import('./load-agent-data/load-agent-data.module').then(load => load.LoadAgentDataModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }



