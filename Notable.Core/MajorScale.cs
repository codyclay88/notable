namespace Notable.Core;

public class MajorScale
{
    public IReadOnlyCollection<Note> Notes { get; }
    public string Name => Notes.First().Name;

    private MajorScale(IReadOnlyCollection<Note> notes)
    {
        Notes = notes;
    }
    
    public Note this[int index] => Notes.ElementAt(index);
    
    public static MajorScale For(Note note)
    {
        var notes = new ScaleBuilder(note)
            .WholeStep()
            .WholeStep()
            .HalfStep()
            .WholeStep()
            .WholeStep()
            .WholeStep()
            .Build();

        return new MajorScale(notes);
    }
}