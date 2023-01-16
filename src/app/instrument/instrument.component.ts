import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {
  maskNotes,
  getNotesForString,
  Instrument,
  Mode,
  PitchClass,
  RenderedNote, ScaleDegree, MusicNote
} from "../music-stuff";

@Component({
  selector: 'app-instrument',
  template: `
    <app-fretboard [maskedStrings]="maskedStrings" [frets]="frets"></app-fretboard>
  `
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

  constructor() {}

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.recalculate();
  }

  recalculate() {
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
