namespace Notable.Core;

public class InvalidNoteException : Exception
{
    public InvalidNoteException(string note) : base($"The note '{note}' does not exist!")
    {
        
    }
}