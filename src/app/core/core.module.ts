import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      // StoreModule.forRoot(reducers, {
      //     metaReducers,
      //     runtimeChecks: {
      //         strictStateImmutability: true,
      //         strictActionImmutability: true
      //     }
      // }),
      StoreDevtoolsModule.instrument({
          maxAge: 25
      }),
  ]
})
export class CoreModule { }
