import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InstrumentComponent } from './instrument/instrument.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { FretboardComponent } from './instrument/fretboard/fretboard.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import { ScaleDegreesSelectorComponent } from './scale-degrees-selector/scale-degrees-selector.component';
import { EditInstrumentDialogComponent } from './instrument/edit-instrument-dialog/edit-instrument-dialog.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import { TunerComponent } from './instrument/tuner/tuner.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentComponent,
    FretboardComponent,
    ScaleDegreesSelectorComponent,
    EditInstrumentDialogComponent,
    TunerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
