namespace Notable.Core;

internal class NoteTraversal
{
    private int _currentIndex = 0;
    private const int MaxCount = 12;

    internal Note Next()
    {
        _currentIndex = _currentIndex + 1 == MaxCount ? 0 : _currentIndex + 1;
        return NoteAlphabet.All[_currentIndex];
    }

    public void SetCurrent(Note note)
    {
        for (var i = 0; i < 12; i++)
        {
            if (NoteAlphabet.All[_currentIndex] == note)
                break;
            Next();
        }
    }

    public NoteInterval GetInterval(Note firstNote, int count)
    {
        SetCurrent(firstNote);
        var notes = new Note[count];
        notes[0] = NoteAlphabet.All[_currentIndex];
        for (var i = 1; i < count; i++)
        {
            notes[i] = Next();
        }

        return new NoteInterval(notes);
    }
}