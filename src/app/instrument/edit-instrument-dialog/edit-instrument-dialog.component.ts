import {Component, Inject, OnInit} from '@angular/core';
import {Instrument, MusicNote, noteCatalog} from "../../music-stuff";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-instrument-dialog',
  templateUrl: './edit-instrument-dialog.component.html',
  styleUrls: ['./edit-instrument-dialog.component.css']
})
export class EditInstrumentDialogComponent implements OnInit {

  // @ts-ignore
  form = new FormGroup<EditInstrumentFormGroup>({
    name: new FormControl('', {nonNullable: true}),
    fretCount: new FormControl(0, {nonNullable: true}),
    tuning: new FormArray<FormControl<number>>([])
  });

  noteCatalog: MusicNote[] = noteCatalog;

  get tuningArray(): FormArray<FormControl<number>> {
    return this.form.get('tuning') as FormArray<FormControl<number>>;
  }

  constructor(private dialogRef: MatDialogRef<EditInstrumentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public instrument: Instrument) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.instrument.name,
      fretCount: this.instrument.fretCount
    });

    for(const note of this.instrument.tuning) {
      const noteIndex = noteCatalog.findIndex(n => n.pitchClass === note.pitchClass && n.octave === note.octave);
      this.tuningArray.push(new FormControl<number>(noteIndex, {nonNullable: true}))
    }
  }

  onNoClick() {
    this.dialogRef.close(this.instrument);
  }

  private getTuningFromForm(): MusicNote[] {
    return this.tuningArray.controls.map(control => {
      return noteCatalog[control.value];
    });
  }

  onSaveClick() {
    const updatedInstrument: Instrument = {
      name: this.form.get('name')?.value ?? this.instrument.name,
      fretCount: this.form.get('fretCount')?.value ?? this.instrument.fretCount,
      tuning: this.getTuningFromForm(),
    }
    this.dialogRef.close(updatedInstrument);
  }

  removeString(i: number) {
    this.tuningArray.controls.splice(i, 1);
  }

  addString() {
    const noteIndex = noteCatalog.findIndex(n => n.pitchClass === 'E' && n.octave === 2);
    this.tuningArray.push(new FormControl<number>(noteIndex, {nonNullable: true}))
  }
}

interface EditInstrumentFormGroup {
  name: FormControl<string>;
  fretCount: FormControl<number>;
  tuning: FormArray<FormControl<number>>;
}
