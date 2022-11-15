using Notable.Core;

namespace Notable.Console.Printing;

public class PrintableNote
{
    public PrintableNote(Note note, string color)
    {
        StuffToPrint = $"[{color}]{note.Name}[/]";
    }
    
    public PrintableNote(Note note)
    {
        StuffToPrint = $"{note.Name}";
    }

    private string StuffToPrint { get; }

    public override string ToString()
    {
        return StuffToPrint;
    }
}