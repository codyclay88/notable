namespace Notable.Core;

public class MajorTriadChord
{
    public IReadOnlyCollection<Note> Notes { get; }
    public string Name => Notes.First().Name;

    private MajorTriadChord(IReadOnlyCollection<Note> notes)
    {
        Notes = notes;
    }
    
    public static MajorTriadChord For(Note note)
    {
        var majorScale = MajorScale.For(note);

        var notes = new[]
        {
            majorScale[0],
            majorScale[2],
            majorScale[4],
        };

        return new MajorTriadChord(notes);
    }
}