export type Note = "A"| "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";

export const notes: Note[] = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
];

export const createEmptyInstrument = (): Instrument => {
  return createInstrument(
    [],
    0
  );
}

export const createGuitar = (): Instrument => {
  return createInstrument(
    ['E', 'B', 'G', 'D', 'A', 'E'],
    18
  );
}

export const createBass = (): Instrument => {
  return createInstrument(
    ['G', 'D', 'A', 'E'],
    18
  );
}

export const createInstrument = (tuning: Note[], fretCount: number): Instrument => {
  return {
    tuning,
    fretCount
  };
}


export interface Instrument {
  fretCount: number;
  tuning: Note[];
}

export const halfStep = (note: Note): Note => {
  const currentNoteIndex = notes.indexOf(note);
  if(currentNoteIndex + 1 >= notes.length)
    return notes[0];
  return notes[currentNoteIndex + 1];
}

export const wholeStep = (note: Note): Note => {
  const next = halfStep(note)
  return halfStep(next);
}

export const createScaleDegrees = (note: Note, formula: ScaleFormula) => {
  const notes: ScaleDegree[] = [];
  let currentNote = note;
  notes.push({ note: currentNote, interval: 1 });
  for(let i = 0; i < formula.length; i++)
  {
    currentNote = formula[i](currentNote);
    notes.push({ note: currentNote, interval: i + 2 });
  }
  return notes;
}

export type IntervalFunction = (note: Note) => Note;
export type ScaleFormula = IntervalFunction[];

export const getScaleDegreesForMode = (note: Note, mode: Mode) => {
  const modeFormula = getFormulaForMode(mode);
  return createScaleDegrees(note, modeFormula);
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

export const getNotesInString = (startingNote: Note, fretCount: number) => {
  let notes: Note[] = [];
  let currentNote = startingNote
  notes.push(currentNote);
  for(let i = 0; i < fretCount; i++) {
    currentNote = halfStep(currentNote);
    notes.push(currentNote)
  }
  return notes;
}

export const applyModeMask = (notes: Note[], scaleNotes: ScaleDegree[]): RenderedNote[] => {
  return notes.map(note => {
    const scaleNote = scaleNotes.find(n => n.note === note);
    if(!!scaleNote)
      return { note: scaleNote, mask: true,  };
    else return { note: { note, interval: 0}, mask: false };
  });
}

export interface ScaleDegree {
  note: Note;
  interval: number;
}

export interface RenderedNote {
  note: ScaleDegree,
  mask: boolean;
}


