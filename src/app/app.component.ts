import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {findNote, Instrument, Mode, PitchClass, pitchClasses, ScaleDegree} from "./music-stuff";
import {EditInstrumentDialogComponent} from "./instrument/edit-instrument-dialog/edit-instrument-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  instruments: Instrument[] = [];

  private defaultGuitar = { name: "Guitar", fretCount: 22, tuning: [findNote('E', 4), findNote('B', 3), findNote('G', 3), findNote('D', 3), findNote('A', 2), findNote('E', 2)] };

  private defaultInstruments: Instrument[] = [
    this.defaultGuitar,
    { name: "Ukulele", fretCount: 12, tuning: [findNote('A', 4), findNote('E', 4), findNote('C', 4), findNote('G', 4)] }
  ];

  allPitchClasses = pitchClasses;
  allModes: Mode[] = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
  scaleDegrees: {scaleDegree: ScaleDegree; selected: boolean}[] = [];

  constructor(private _dialog: MatDialog) { }

  form = new FormGroup<SelectionFormGroup>({
    key: new FormControl("C", {nonNullable: true}),
    mode: new FormControl("Ionian", { nonNullable: true })
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(formValues => {
      localStorage.setItem('mainForm', JSON.stringify(formValues));
    });

    this.instruments = JSON.parse(localStorage.getItem('instruments') ?? JSON.stringify(this.defaultInstruments));

    const initialValues = JSON.parse(localStorage.getItem('mainForm') || "{}");
    console.log(initialValues);
    this.form.patchValue({
      ...initialValues
    });
  }

  scaleDegreeSelectionsChanged(selections: { scaleDegree: ScaleDegree; selected: boolean }[]) {
    this.scaleDegrees = selections;
  }

  addInstrument() {
    const newInstrument: Instrument = {...this.defaultGuitar};

    this.instruments.push(newInstrument);

    const newIndex = this.instruments.indexOf(newInstrument);

    this.editInstrument(newIndex);
  }

  editInstrument(instrumentIndex: number) {
    const instrument = this.instruments[instrumentIndex];

    const dialogRef = this._dialog.open(EditInstrumentDialogComponent, {
      data: instrument
    });

    dialogRef.afterClosed().subscribe(newInstrument => {
      if(!newInstrument) return;

      console.log(newInstrument);
      this.instruments[instrumentIndex] = newInstrument;
      localStorage.setItem('instruments', JSON.stringify(this.instruments));
    });
  }

  deleteInstrument(i: number) {
    this.instruments.splice(i, 1);
    localStorage.setItem('instruments', JSON.stringify(this.instruments));
  }
}

interface SelectionFormGroup {
  key: FormControl<PitchClass | "NA">;
  mode: FormControl<Mode>;
}
