import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {
  maskNotes,
  getNotesForString,
  Instrument,
  Mode,
  PitchClass,
  RenderedNote, ScaleDegree, MusicNote
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
  @Input() key: PitchClass | "NA" = "NA";
  @Input() mode: Mode = "Ionian";
  @Input() scaleDegrees: { scaleDegree: ScaleDegree; selected: boolean }[] = [];

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
        this.recalculate();
      });

    this.form.patchValue({
      fretCount: this.instrument.fretCount,
    }, { emitEvent: false });
  }

  ngOnChanges(): void {
    this.recalculate();
  }

  recalculate() {
    console.log("recalculating")
    this.maskedStrings = this.applyModeToTuning(this.instrument, this.key);
    this.frets = this.createFrets(this.instrument.fretCount);
  }

  applyModeToTuning(instrument: Instrument, key: PitchClass | "NA") {
    const notesOnString = (openNote: MusicNote) => getNotesForString(openNote, instrument.fretCount);

    if(key === "NA")
      return [...instrument.tuning.map(str => maskNotes(notesOnString(str), []))];

    return [...instrument.tuning.map(str => maskNotes(notesOnString(str), this.scaleDegrees))];
  }

  createFrets(fretCount: number) {
    return [...Array(fretCount + 1).keys()];
  }
}

interface SelectionFormGroup {
  fretCount: FormControl<number>;
  tuning: FormArray<FormControl<PitchClass>>;
}
