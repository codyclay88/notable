export type PitchClass = "A"| "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";

export const pitchClasses: PitchClass[] = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
];

const a0: MusicNote = {
  pitchClass: 'A', octave: 0, frequency: 27.500
};

const nextPitchClass = (note: PitchClass): PitchClass => {
  const currentNoteIndex = pitchClasses.indexOf(note);
  if(currentNoteIndex + 1 >= pitchClasses.length)
    return pitchClasses[0];
  return pitchClasses[currentNoteIndex + 1];
}

export const nextNote = (currentNote: MusicNote): MusicNote => {
  const nextFrequency = currentNote.frequency * 1.059463;
  const nextPitch = nextPitchClass(currentNote.pitchClass);
  const nextOctave = nextPitch === 'C' ? currentNote.octave + 1 : currentNote.octave;
  return {
    pitchClass: nextPitch,
    octave: nextOctave,
    frequency: nextFrequency,
  };
};

const createNotes = (firstNote: MusicNote, numberOfNotes: number) => {
  const notes = [firstNote];
  let currentNote = firstNote;
  for (let i of [...Array(numberOfNotes - 1).keys()]) {
    currentNote = nextNote(currentNote);
    notes.push(currentNote);
  }

  return notes;
};

export const noteCatalog: MusicNote[] = createNotes(a0, 88);

export const findNote = (pitchClass: PitchClass, octave: number): MusicNote => {
  return noteCatalog.find(n => n.pitchClass === pitchClass && n.octave === octave)
    || a0;
}

export interface MusicNote {
  pitchClass: PitchClass;
  octave: number;
  frequency: number;
}

export interface Instrument {
  fretCount: number;
  tuning: MusicNote[];
}

export const halfStep = (pitchClass: PitchClass): PitchClass => {
  return nextPitchClass(pitchClass);
}

export const wholeStep = (pitchClass: PitchClass): PitchClass => {
  const next = halfStep(pitchClass)
  return halfStep(next);
}

export const createScaleDegrees = (pitchClass: PitchClass, formula: ScaleFormula) => {
  const notes: ScaleDegree[] = [];
  let currentPitchClass = pitchClass;
  notes.push({ pitchClass: currentPitchClass, interval: 1 });
  for(let i = 0; i < formula.length; i++)
  {
    currentPitchClass = formula[i](currentPitchClass);
    notes.push({ pitchClass: currentPitchClass, interval: i + 2 });
  }
  return notes;
}

export type IntervalFunction = (pitchClass: PitchClass) => PitchClass;
export type ScaleFormula = IntervalFunction[];

export const getScaleDegreesForMode = (key: PitchClass, mode: Mode) => {
  const modeFormula = getFormulaForMode(mode);
  return createScaleDegrees(key, modeFormula);
}

export type Mode = "Ionian" | "Dorian" | "Phrygian" | "Lydian" | "Mixolydian" | "Aeolian" | "Locrian";

export const getFormulaForMode = (mode: Mode): ScaleFormula => {
  const modeMap = new Map<Mode, ScaleFormula>()
  modeMap.set('Ionian', ionianModeFormula);
  modeMap.set('Dorian', dorianModeFormula);
  modeMap.set('Phrygian', phrygianModeFormula);
  modeMap.set('Lydian', lydianModeFormula);
  modeMap.set('Mixolydian', mixolydianModeFormula);
  modeMap.set('Aeolian', aeolianModeFormula);
  modeMap.set('Locrian', locrianModeFormula);

  return modeMap.get(mode) || ionianModeFormula;
}

export const ionianModeFormula: ScaleFormula = [wholeStep, wholeStep, halfStep, wholeStep, wholeStep, wholeStep];
export const dorianModeFormula: ScaleFormula = [wholeStep, halfStep, wholeStep, wholeStep, wholeStep, halfStep];
export const phrygianModeFormula: ScaleFormula = [halfStep, wholeStep, wholeStep, wholeStep, halfStep, wholeStep];
export const lydianModeFormula: ScaleFormula = [wholeStep, wholeStep, wholeStep, halfStep, wholeStep, wholeStep];
export const mixolydianModeFormula: ScaleFormula = [wholeStep, wholeStep, halfStep, wholeStep, wholeStep, halfStep];
export const aeolianModeFormula: ScaleFormula = [wholeStep, halfStep, wholeStep, wholeStep, halfStep, wholeStep];
export const locrianModeFormula: ScaleFormula = [halfStep, wholeStep, wholeStep, halfStep, wholeStep, wholeStep];

export const getNotesForString = (startingNote: MusicNote, fretCount: number): MusicNote[] => {
  const startingNoteIndex = noteCatalog.findIndex(n => n.pitchClass === startingNote.pitchClass && n.octave === startingNote.octave);

  if(!startingNoteIndex)
    return [];

  return [...noteCatalog.slice(startingNoteIndex, fretCount + startingNoteIndex + 1)];
}

export const maskNotes = (notes: MusicNote[], scaleNotes: { scaleDegree: ScaleDegree; selected: boolean }[]): RenderedNote[] => {
  return notes.map(note => {
    const scaleNote = scaleNotes.find(n => n.scaleDegree.pitchClass === note.pitchClass);
    if(!!scaleNote)
      return { scaleDegree: scaleNote.scaleDegree, highlighted: scaleNote.selected, octave: note.octave, frequency: note.frequency };
    else return { scaleDegree: { pitchClass: note.pitchClass, interval: 0}, highlighted: false, octave: note.octave, frequency: note.frequency };
  });
}

export interface ScaleDegree {
  pitchClass: PitchClass;
  interval: number;
}

export interface RenderedNote {
  scaleDegree: ScaleDegree;
  octave: number;
  frequency: number;
  highlighted: boolean;
}


