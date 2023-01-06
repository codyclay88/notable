import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {
  applyModeMask,
  getNotesInString,
  getScaleDegreesForMode,
  Instrument,
  Mode,
  Note,
  RenderedNote
} from "../music-stuff";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {startWith} from "rxjs";

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.css']
})
export class InstrumentComponent implements OnInit, OnChanges {
  // @ts-ignore
  @Input() instrument: Instrument;
  @Input() key: Note | "NA" = "NA";
  @Input() mode: Mode = "Ionian";
  @Input() showScaleDegrees: "Yes" | "No" = "Yes";

  frets: number[] = [];

  // @ts-ignore
  maskedStrings: RenderedNote[][];

  // @ts-ignore
  form = new FormGroup<SelectionFormGroup>({
    fretCount: new FormControl(18, {nonNullable: true}),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(startWith(this.instrument))
      .subscribe(formValues => {
        const fretCount = formValues.fretCount || 0;
        this.instrument = {
          fretCount: fretCount,
          tuning: this.instrument.tuning,
        };
        this.refreshMask();
      });

    this.form.patchValue({
      fretCount: this.instrument.fretCount,
    }, { emitEvent: false });
  }

  ngOnChanges(): void {
    this.refreshMask();
  }

  refreshMask() {
    this.maskedStrings = this.applyModeToTuning(this.instrument, this.key, this.mode);
    this.frets = this.createFrets(this.instrument.fretCount);
  }

  applyModeToTuning(instrument: Instrument, key: Note | "NA", mode: Mode) {
    if(key === "NA")
      return [...instrument.tuning.map(str => applyModeMask(getNotesInString(str, instrument.fretCount), []))];

    return [...instrument.tuning.map(str => applyModeMask(getNotesInString(str, instrument.fretCount), getScaleDegreesForMode(key, mode)))];
  }

  createFrets(fretCount: number) {
    return [...Array(fretCount + 1).keys()];
  }
}

interface SelectionFormGroup {
  fretCount: FormControl<number>;
  tuning: FormArray<FormControl<Note>>;
}
