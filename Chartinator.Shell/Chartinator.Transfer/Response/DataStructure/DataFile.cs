namespace Chartinator.Transfer.Response.DataStructure;

public class DataFile
{
    public string Name { get; set; }
    public string Path { get; set; }
    public string Size { get; set; }
    public FileType Type { get; set; }
}