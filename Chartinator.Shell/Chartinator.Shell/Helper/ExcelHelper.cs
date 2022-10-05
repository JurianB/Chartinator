using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Chartinator.Shell.Core.Request;
using Chartinator.Shell.Core.Response;

namespace Chartinator.Shell.Helper
{
    public static class ExcelHelper
    {

        private static readonly string Desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        private static readonly string DataFolder = Path.Combine(Desktop, "Data");


        public static async Task<List<string>> ReadExcelFileNames()
        {

            var files = Directory.GetFiles(DataFolder);

            var excels = new List<string>();

            foreach (var file in files)
            {
                var fileName = Path.GetFileNameWithoutExtension(file);

                excels.Add(fileName);
            }

            return excels;
        }

        public static async Task<List<ChartDataPoint>> ReadExcels(ExcelFileData file)
        {
            var result = new List<ChartDataPoint>();

            var path = Path.Combine(DataFolder, file.FileName + ".xls");

            string excelData;
            using (var reader = new StreamReader(path))
            {
                excelData = await reader.ReadToEndAsync();
            }

            var excelLines = excelData.Split("\n");

            var dataPointsAsString = excelLines.Skip(3).ToList();

            foreach (var dataPointAsString in dataPointsAsString)
            {
                var tempData = dataPointAsString.Replace("\r", "");

                var tempResult = new ChartDataPoint();

                var lineSplitted = tempData.Split(",").ToList();

                try
                {
                    tempResult.X = float.Parse(lineSplitted[0], CultureInfo.InvariantCulture);
                    tempResult.Y = float.Parse(lineSplitted[1], CultureInfo.InvariantCulture);

                    result.Add(tempResult);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                
            }

            return result;
        }
    }
}
