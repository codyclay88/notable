import {createScaleDegrees, halfStep, ionianModeFormula, ScaleDegree, wholeStep} from "./music-stuff";

describe('Music Stuff', () => {
  it('Can go up a half-step', () => {
    expect(halfStep('C')).toBe('C#');
  });

  it('Can go up a whole-step', () => {
    expect(wholeStep('C')).toBe('D');
  });

  it('Can create a major scale', () => {
    const scaleDegrees = createScaleDegrees('C', ionianModeFormula);
    expect(scaleDegrees.length).toBe(7);
    const expectedScaleDegrees: ScaleDegree[] = [
      { pitchClass: 'C', interval: 1 },
      { pitchClass: 'D', interval: 2 },
      { pitchClass: 'E', interval: 3 },
      { pitchClass: 'F', interval: 4 },
      { pitchClass: 'G', interval: 5 },
      { pitchClass: 'A', interval: 6 },
      { pitchClass: 'B', interval: 7 },
    ]
    for(let i = 0; i < scaleDegrees.length; i++)
      expect(scaleDegrees[i]).toEqual(expectedScaleDegrees[i]);
  });
});
