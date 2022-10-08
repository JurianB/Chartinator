using System.Collections.Generic;
using System.Threading.Tasks;
using Chartinator.Transfer.Response.DataStructure;

namespace Chartinator.Service
{
    public class DataStructureService
    {
        public async Task<DataStructureInfo> GetDataStructure()
        {
            var result = new DataStructureInfo();

            result.FileCount = 13;
            result.Folders = new List<Folder>
            {
                new()
                {
                    Name = "Folder 1",
                    Files = new List<File>
                    {
                        new()
                        {
                            Type = FileType.CSV,
                            Name = "File 1",
                            Size = 13
                        },
                        new()
                        {
                            Type = FileType.Txt,
                            Name = "File 2",
                            Size = 13
                        },
                    }
                },
                new()
                {
                    Name = "Folder 2",
                    Files = new List<File>
                    {
                        new()
                        {
                            Type = FileType.CSV,
                            Name = "File 3",
                            Size = 13
                        },
                        new()
                        {
                            Type = FileType.Txt,
                            Name = "File 4",
                            Size = 13
                        },
                    }
                },
            };

            return result;
        }
    }
}
