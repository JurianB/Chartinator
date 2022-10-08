using System.Collections.Generic;

namespace Chartinator.Transfer.Response.DataStructure;

public class Folder
{
    public string Name { get; set; }
    public List<File> Files { get; set; }
}