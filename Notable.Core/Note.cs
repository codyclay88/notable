namespace Notable.Core;

public record Note
{
    internal Note(string name)
    {
        Name = name.ToUpper();
    }

    public string Name { get; }

    public override string ToString()
    {
        return Name;
    }
}