namespace Notable.Core;

internal class ScaleBuilder
{
    private readonly List<Note> _notes = new();
    private readonly NoteTraversal _noteTraversal = new();

    public ScaleBuilder(Note startingNote)
    {
        _noteTraversal.SetCurrent(startingNote);
        AddNote(startingNote);
    }

    public ScaleBuilder WholeStep()
    {
        _noteTraversal.Next();
        AddNote(_noteTraversal.Next());
        return this;
    }
    
    public ScaleBuilder HalfStep()
    {
        AddNote(_noteTraversal.Next());
        return this;
    }

    private void AddNote(Note note)
    {
        _notes.Add(note);
    }

    public IReadOnlyCollection<Note> Build()
    {
        return _notes.AsReadOnly();
    }
}