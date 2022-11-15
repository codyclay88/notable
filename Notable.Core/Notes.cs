namespace Notable.Core;

public static class Notes
{
    public static Note Parse(string name)
    {
        if (!TryGetNote(name, out var note))
            throw new InvalidNoteException(name);

        return note;
    }

    private static bool TryGetNote(string name, out Note note)
    {
        note = Notes.Unknown;
        name = name.ToUpper();
        var isNote = false;

        foreach (var n in NoteAlphabet.All)
        {
            if (n.Name != name) continue;
            
            note = n;
            isNote = true;
            break;
        }

        return isNote;
    }
    
    public static Note A => new("A");
    public static Note ASharp => new("A#");
    public static Note B => new("B");
    public static Note C => new("C");
    public static Note CSharp => new("C#");
    public static Note D => new("D");
    public static Note DSharp => new("D#");
    public static Note E => new("E");
    public static Note F => new("F");
    public static Note FSharp => new("F#");
    public static Note G => new("G");
    public static Note GSharp => new("G#");
    public static Note Unknown => new("--");
}