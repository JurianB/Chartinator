using System.Collections.Generic;

namespace Chartinator.Transfer.Response.DataStructure;

public class DataFile
{
    public DataFile()
    {
        Options = new List<DataFileOptions>();
    }

    public string Name { get; set; }
    public string Path { get; set; }
    public FileType Type { get; set; }
    public List<DataFileOptions> Options { get; set; }
}