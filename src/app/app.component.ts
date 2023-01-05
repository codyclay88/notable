import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Instrument, Mode, Note, notes} from "./music-stuff";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  instruments: Instrument[] = [
    { fretCount: 22, tuning: ["E", "B", "G", "D", "A", "E"] }
  ];

  allNotes = notes;
  allModes: Mode[] = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

  constructor() {

  }

  form = new FormGroup<SelectionFormGroup>({
    key: new FormControl("C", {nonNullable: true}),
    mode: new FormControl("Ionian", { nonNullable: true }),
    showScaleDegree: new FormControl('Yes', { nonNullable: true })
  });

  ngOnInit(): void {
    const initialValues = JSON.parse(localStorage.getItem('mainForm') || "{}");
    console.log(initialValues);
    this.form.patchValue({
      ...initialValues
    });

    this.form.valueChanges.subscribe(formValues => {
      localStorage.setItem('mainForm', JSON.stringify(formValues));
    })
  }
}

interface SelectionFormGroup {
  key: FormControl<Note>;
  mode: FormControl<Mode>;
  showScaleDegree: FormControl<'Yes' | 'No'>;
}
