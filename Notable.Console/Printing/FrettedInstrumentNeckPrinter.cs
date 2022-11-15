using Notable.Core;
using Notable.Core.Guitar;
using Spectre.Console;

namespace Notable.Console.Printing;

public class FrettedInstrumentNeckPrinter
{
    private readonly FrettedInstrument _frettedInstrument;

    public FrettedInstrumentNeckPrinter(FrettedInstrument frettedInstrument)
    {
        _frettedInstrument = frettedInstrument;
    }

    public void PrintFor(MajorTriadChord chord)
    {
        var maskedNotes = MaskNotes(chord.Notes);
        PrintNeck($"{chord.Name} Major Triad", maskedNotes);
    }

    public void PrintFor(MajorScale scale)
    {
        var maskedNotes = MaskNotes(scale.Notes);
        PrintNeck($"{scale.Name} Major Scale", maskedNotes);
    }

    private IEnumerable<PrintableNote[]> MaskNotes(IReadOnlyCollection<Note> notes)
    {
        return _frettedInstrument.Strings.Select(str =>
        {
            return str.Notes.Select(n =>
                    notes.Contains(n)
                        ? new PrintableNote(n, "green")
                        : new PrintableNote(n))
                .ToArray();
        });
    }
    
    public void PrintAllNotes()
    {
        var notes = _frettedInstrument.Strings.Select(str =>
        {
            return str.Notes.Select(n => new PrintableNote(n))
                .ToArray();
        });
        
        PrintNeck("All Notes", notes);
    }

    private void PrintNeck(string title, IEnumerable<PrintableNote[]> notes)
    {
        var table = new Table();

        // Add Empty column for nut
        table.AddColumn("");
        
        for (var i = 1; i < 19; i++)
        {
            table.AddColumn(new TableColumn(i.ToString()).Centered());
        }
        
        foreach (var noteRow in notes.Reverse())
        {
            var rowElements = noteRow.Select(r => new Markup(r.ToString())).ToArray();
            table.AddRow(rowElements);
        }
        
        AnsiConsole.Write(new Rule(title).Alignment(Justify.Left));
        AnsiConsole.Write(table);
    }
}

