using Notable.Console.Printing;
using Notable.Core;
using Notable.Core.Guitar;
using Spectre.Console;

var standardTuning = FrettedInstrument.GuitarWithStandardTuning;

var notePrinter = new FrettedInstrumentNeckPrinter(standardTuning);

AnsiConsole.WriteLine("Welcome to Notable!!");

while(true)
{
    var menuSelection = PromptForViewSelection();

    if (menuSelection == "Quit")
        break;
    
    AnsiConsole.WriteLine($"You selected '{menuSelection}'...");

    if (menuSelection == "View All Notes")
    {
        notePrinter.PrintAllNotes();
        continue;
    }

    var note = PromptForNote();

    AnsiConsole.WriteLine($"You selected {note.Name}...");

    switch (menuSelection)
    {
        case "View Major Scale":
            notePrinter.PrintFor(MajorScale.For(note));
            break;
        case "View Major Triad":
            notePrinter.PrintFor(MajorTriadChord.For(note));
            break;
    }
}

AnsiConsole.WriteLine("Buh-bye now!");

string PromptForViewSelection()
{
    return AnsiConsole.Prompt(
        new SelectionPrompt<string>()
            .Title("What would you like to see?")
            .PageSize(6)
            .AddChoices(new[] {
                "Quit",
                "View All Notes",
                "View Major Scale",
                "View Major Triad"
            }));
}

Note PromptForNote()
{
    var noteStr = AnsiConsole.Prompt(
        new SelectionPrompt<string>()
            .Title("What note are you interested in?")
            .PageSize(12)
            .AddChoices(new[] {
                Notes.A.Name,
                Notes.ASharp.Name,
                Notes.B.Name,
                Notes.C.Name,
                Notes.CSharp.Name,
                Notes.D.Name,
                Notes.DSharp.Name,
                Notes.E.Name,
                Notes.F.Name,
                Notes.FSharp.Name,
                Notes.G.Name,
                Notes.GSharp.Name
            }));

    return Notes.Parse(noteStr);
}