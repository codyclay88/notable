using System.Collections;
using System.Text;

namespace Notable.Core;

public class NoteInterval : IEnumerable<Note>
{
    public IReadOnlyCollection<Note> Notes { get; }

    public static NoteInterval From(Note firstNote, int count)
    {
        var notes = new NoteTraversal();
        return notes.GetInterval(firstNote, count);
    }

    internal NoteInterval(IReadOnlyCollection<Note> notes)
    {
        Notes = notes;
    }
    
    public Note this[int index] => Notes.ElementAt(index);

    public IEnumerator<Note> GetEnumerator()
    {
        return Notes.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }

    public override string ToString()
    {
        var stringBuilder = new StringBuilder();
        foreach (var note in this)
        {
            stringBuilder.Append($"{note,-4}");
        }

        return stringBuilder.ToString();
    }
}