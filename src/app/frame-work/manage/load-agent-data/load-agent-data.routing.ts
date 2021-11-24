import { LoadAgentDataComponent } from './load-agent-data.component';
import { Routes } from "@angular/router";

export const loadAgentDataRoutes: Routes = [
  {
      path     : '',
      component: LoadAgentDataComponent,
      resolve  : {
          /* calendars: CalendarCalendarsResolver,
         */
      }
  }
];
