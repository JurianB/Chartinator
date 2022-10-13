using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Transfer.Response.DataStructure;

namespace Chartinator.Service;

public class DataStructureService
{
    private static readonly string Desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
    private static readonly string DataFolder = Path.Combine(Desktop, "Data");
    
    public async Task<DataStructureInfo> GetDataStructure()
    {
        var result = new DataStructureInfo();

        var folders = Directory.GetDirectories(DataFolder);

        foreach (var folder in folders)
        {
            var tempFolder = new Folder();

            var files = Directory.GetFiles(folder);

            foreach (var filePath in files)
            {
                var fileName = Path.GetFileNameWithoutExtension(filePath);
                var fileInfo = new FileInfo(filePath);

                var dataFile = new DataFile
                {
                    Name = fileName,
                    Path = filePath,
                    Type = GetFileExtension(fileInfo)
                };

                if (filePath.Contains("GCMS"))
                {
                    dataFile.Options.Add(new DataFileOptions
                    {
                        Id = $"{filePath}",
                        Type = DataFileOptionsType.Checkbox,
                        Label = "Section 1",
                    });

                    dataFile.Options.Add(new DataFileOptions
                    {
                        Id = filePath,
                        Type = DataFileOptionsType.Checkbox,
                        Label = "Section 2",
                    });
                }

                if (filePath.Contains("GPC"))
                {
                    dataFile.Options.Add(new DataFileOptions
                    {
                        Id = $"{filePath}",
                        Type = DataFileOptionsType.Checkbox,
                        Label = "Molar mass",
                    });

                    dataFile.Options.Add(new DataFileOptions
                    {
                        Id = filePath,
                        Type = DataFileOptionsType.Checkbox,
                        Label = "rid1A/MMD",
                    });

                    dataFile.Options.Add(new DataFileOptions
                    {
                        Id = filePath,
                        Type = DataFileOptionsType.Checkbox,
                        Label = "vwd1A/MMD",
                    });
                }

                tempFolder.Files.Add(dataFile);
            }

            tempFolder.Name = folder.Split("\\").LastOrDefault() + $" ({tempFolder.Files.Count})";

            result.Folders.Add(tempFolder);
        }

        return result;
    }

    private static FileType GetFileExtension(FileInfo fileInfo)
    {
        switch (fileInfo.Extension)
        {
            case ".xls":
                return FileType.CSV;
            case ".txt":
                return FileType.Txt;
            default:
                return FileType.Unknown;
        }
    }
}