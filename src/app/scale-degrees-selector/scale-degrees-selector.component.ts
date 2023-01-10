import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatChipSelectionChange} from "@angular/material/chips";
import {getScaleDegreesForMode, Mode, PitchClass, ScaleDegree} from "../music-stuff";

@Component({
  selector: 'app-scale-degrees-selector',
  templateUrl: './scale-degrees-selector.component.html',
  styleUrls: ['./scale-degrees-selector.component.css']
})
export class ScaleDegreesSelectorComponent implements OnInit, OnChanges {
  @Input() key: PitchClass | 'NA' = 'C';
  @Input() mode: Mode = 'Ionian';
  @Output() selectionsChanged = new EventEmitter<{scaleDegree: ScaleDegree; selected: boolean}[]>()

  scaleDegrees: ScaleDegree[] = [];
  checkboxes: boolean[] = [];

  ngOnInit() {
    this.checkboxes = JSON.parse(localStorage.getItem('visibleScaleDegrees') || "[]");
    this.selectionsChanged.emit()

    this.refreshScaleDegrees();

    this.pushUpdatedSelections();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshScaleDegrees();

    this.pushUpdatedSelections();
  }

  refreshScaleDegrees() {
    if(this.key === 'NA')
    {
      this.scaleDegrees = [];
      return;
    }

    this.scaleDegrees = getScaleDegreesForMode(this.key, this.mode);
    const previousCheckboxValues = [...this.checkboxes];

    this.checkboxes = [];

    for(let i = 0; i < this.scaleDegrees.length; i++)
    {
      this.checkboxes.push(previousCheckboxValues[i] ?? true);
    }
  }

  scaleDegreeChanged(index: number, changedEvent: MatChipSelectionChange) {
    this.checkboxes[index] = changedEvent.selected;
    localStorage.setItem('visibleScaleDegrees', JSON.stringify(this.checkboxes));

    if(changedEvent.isUserInput) this.pushUpdatedSelections();
  }

  pushUpdatedSelections() {
    const updatedSelections: {scaleDegree: ScaleDegree; selected: boolean}[] = [];

    for(let i = 0; i < this.scaleDegrees.length; i++)
      updatedSelections.push({scaleDegree: this.scaleDegrees[i], selected: this.checkboxes[i] ?? true})

    this.selectionsChanged.emit(updatedSelections)
  }
}
