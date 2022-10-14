namespace Chartinator.Transfer.Response.DataStructure;

public class DataFileOptions
{
    public string Id { get; set; }

    public string Label { get; set; }

    public DataFileOptionsType Type { get; set; }
    public bool Checked { get; set; }
}