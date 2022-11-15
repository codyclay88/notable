using System.Collections;

namespace Notable.Core.UnitTests;

public class NoteTests
{
    [Fact]
    public void Notes_Use_Structural_Equality()
    {
        Assert.Equal(Notes.Parse("A"), Notes.Parse("A"));
        Assert.Equal(Notes.Parse("A"), Notes.Parse("a"));
        Assert.Equal(Notes.Parse("A#"), Notes.Parse("A#"));
        Assert.NotEqual(Notes.Parse("A"), Notes.Parse("A#"));
    }
    
    [Fact]
    public void Lowercase_Notes_Are_Converted_To_Uppercase()
    {
        Assert.Equal("A", Notes.Parse("a").Name);
        Assert.Equal("A#", Notes.Parse("a#").Name);
    }
    
    [Fact]
    public void Can_Get_Major_Scales()
    {
        var expected = new[] { "G", "A", "B", "C", "D", "E", "F#" };
        var actual = MajorScale.For(Notes.Parse("G")).Notes.Select(n => n.Name).ToArray();
        Assert.Equal(expected, actual);
    }
    
    [Fact]
    public void Can_Get_Major_Triad_Chord()
    {
        var expected = new[] { "G", "B", "D" };
        var actual = MajorTriadChord.For(Notes.Parse("G")).Notes.Select(n => n.Name).ToArray();
        Assert.Equal(expected, actual);
    }
}