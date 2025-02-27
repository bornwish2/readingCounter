import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { DateJalaliComponent } from './../core/_layouts/header/date-jalali/date-jalali.component';
import { DateJalaliModule } from './../core/_layouts/header/date-jalali/date-jalali.module';


@NgModule({
    declarations: [
        DateJalaliComponent
    ],
    imports: [
        DateJalaliModule,
        FormsModule,
        DpDatePickerModule
    ],
    exports: [
        DateJalaliModule,
        DpDatePickerModule,
        FormsModule,
        DateJalaliComponent
    ]
})
export class SharedThreeModule {
    static forRoot(): ModuleWithProviders<SharedThreeModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedThreeModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
