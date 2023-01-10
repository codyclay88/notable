import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {findNote, Instrument, Mode, PitchClass, pitchClasses, ScaleDegree} from "./music-stuff";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  instruments: Instrument[] = [
    { fretCount: 22, tuning: [findNote('E', 4), findNote('B', 3), findNote('G', 3), findNote('D', 3), findNote('A', 2), findNote('E', 2)] }
  ];

  allPitchClasses = pitchClasses;
  allModes: Mode[] = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
  scaleDegrees: {scaleDegree: ScaleDegree; selected: boolean}[] = [];

  constructor() {

  }

  form = new FormGroup<SelectionFormGroup>({
    key: new FormControl("C", {nonNullable: true}),
    mode: new FormControl("Ionian", { nonNullable: true })
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(formValues => {
      localStorage.setItem('mainForm', JSON.stringify(formValues));
    })

    const initialValues = JSON.parse(localStorage.getItem('mainForm') || "{}");
    console.log(initialValues);
    this.form.patchValue({
      ...initialValues
    });
  }

  scaleDegreeSelectionsChanged(selections: { scaleDegree: ScaleDegree; selected: boolean }[]) {
    this.scaleDegrees = selections;
  }
}

interface SelectionFormGroup {
  key: FormControl<PitchClass | "NA">;
  mode: FormControl<Mode>;
}
