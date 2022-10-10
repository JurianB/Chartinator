using System.Collections.Generic;

namespace Chartinator.Transfer.Response.DataStructure;

public class Folder
{
    public Folder()
    {
        Files = new List<DataFile>();
    }

    public string Name { get; set; }
    public List<DataFile> Files { get; set; }
}