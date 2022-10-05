using System;

namespace Chartinator.Shell.Core;

public class ErrorInfo
{
    public ErrorInfo( string description, string caller )
    {
        Description = description;
        Caller = caller;
    }

    public ErrorInfo( string description, string caller, Exception theException )
    {
        Description = description;
        Caller = caller;
        Exception = theException.GetBaseException().Message;
    }

    public string Description { get; }
    public string Caller { get; }
    public string Exception { get; }
}