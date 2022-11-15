using System.Text;

namespace Notable.Core.Guitar;

public class FrettedInstrument
{
    private FrettedInstrument(string tuning, int numberFrets) : this(tuning.Split(" "), numberFrets) { }

    private FrettedInstrument(IReadOnlyList<string> tuning, int numberFrets)
    {
        Strings = new FrettedString[tuning.Count];
        for (var i = 0; i < Strings.Length; i++)
        {
            var note = Notes.Parse(tuning[i]);
            Strings[i] = new FrettedString(note, numberFrets);
        }
    }

    public FrettedString[] Strings { get; }

    public static FrettedInstrument GuitarWithStandardTuning => new("E A D G B E", 19);
}