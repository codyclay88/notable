using System.Text;

namespace Notable.Core.Guitar;

public class FrettedString
{
    private const int DefaultNumberOfFrets = 19;
    public NoteInterval Notes { get; }
    
    public FrettedString(Note firstNote, int numberFrets = DefaultNumberOfFrets + 1)
    {
        Notes = NoteInterval.From(firstNote, numberFrets);
    }
    
    public override string ToString()
    {
        var stringBuilder = new StringBuilder();
        
        stringBuilder.Append($"{Notes[0],-2} | ");
        foreach (var note in Notes.Skip(1))
        {
            stringBuilder.Append($"{note,-4}");
        }

        return stringBuilder.ToString();
    }
}