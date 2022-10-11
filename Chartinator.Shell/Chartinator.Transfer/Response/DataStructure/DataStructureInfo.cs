using System.Collections.Generic;

namespace Chartinator.Transfer.Response.DataStructure
{
    public class DataStructureInfo
    {
        public DataStructureInfo()
        {
            Folders = new List<Folder>();
        }
        public List<Folder> Folders { get; set; }
    }
}
