using System.Net;

namespace Chartinator.Shell.Core;

public class OperationResult
{
    public OperationResult( HttpStatusCode status, object data )
    {
        Data = data;
        Code = (int) status;
        CodeText = TranslateCode( status );
    }

    public int Code { get; }

    public string CodeText { get; }

    public object Data { get; }

    private string TranslateCode( HttpStatusCode status )
    {
        return status switch
        {
            HttpStatusCode.OK => "200 - Ok",
            HttpStatusCode.BadRequest => "400 - Bad Request",
            HttpStatusCode.Conflict => "409 - Conflict",
            HttpStatusCode.Forbidden => "403 - Forbidden",
            HttpStatusCode.NotFound => "404 - Not Found",
            HttpStatusCode.Unauthorized => "401 - Unauthorized",
            _ => $"Not translated: {status.ToString()}"
        };
    }
}