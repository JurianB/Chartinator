using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Chartinator.Shell.Core.Request;
using Chartinator.Shell.Core.Response;
using Chartinator.Shell.Helper;

namespace Chartinator.Shell.Services
{
    public class ChartsService
    {
        public async Task<List<ExcelListInfo>> ReadExcelFilesNames()
        {
            var data = await ExcelHelper.ReadExcelFileNames();

            var result = new List<ExcelListInfo>();

            foreach (var file in data)
            {
                result.Add(new ExcelListInfo
                {
                    FileName = file
                });
            }

            return result;
        }

        public async Task<ChartDataInfo> ReadFiles(List<ExcelFileData> files)
        {
            var result = new ChartDataInfo();

            var labels = new HashSet<float>();
           

            foreach (var file in files)
            {
                var fileContents = await ExcelHelper.ReadExcels(file);

                fileContents = fileContents.ToList();

                var xValues = fileContents.Select(x => x.X).ToList();

                foreach (var xValue in xValues)
                {
                    labels.Add(xValue);
                }
                
                var dataSet = new ChartDataSet();
                dataSet.Label = file.FileName;
                dataSet.BackgroundColor = GetRandomColor();
                dataSet.BorderColor = GetRandomColor();

                foreach (var dataPoints in fileContents)
                {
                    dataSet.Data.Add(dataPoints.Y);
                }

                result.DataSets.Add(dataSet);

                result.Title += $"{file.FileName} ";
            }

            foreach (var label in labels)
            {
                result.Labels.Add(label);
            }
            
            return result;
        }

        private static string GetRandomColor()
        {
            var random = new Random();

            var randomR = random.Next(0, 155);
            var randomG = random.Next(0, 155);
            var randomB = random.Next(0, 155);

            var result = $"rgb({randomR},{randomG},{randomB})";

            return result;
        }
    }
}
