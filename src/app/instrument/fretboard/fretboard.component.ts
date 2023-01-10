import {Component, Input, OnInit} from '@angular/core';
import {noteCatalog, RenderedNote} from "../../music-stuff";
import * as Tone from 'tone'

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.css']
})
export class FretboardComponent implements OnInit {
  @Input() maskedStrings: RenderedNote[][] = [];
  @Input() frets: number[] = [];

  private synth = new Tone.Synth().toDestination();

  playTone(note: RenderedNote) {
    this.synth.triggerAttackRelease(`${note.scaleDegree.pitchClass}${note.octave}`, "8n");
  }

  ngOnInit(): void {
    console.log(noteCatalog);
  }

}
