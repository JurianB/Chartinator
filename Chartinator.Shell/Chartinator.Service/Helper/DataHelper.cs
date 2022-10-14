using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Transfer.Response;
using Chartinator.Transfer.Response.DataStructure;

namespace Chartinator.Service.Helper;

public class DataHelper
{
    public async Task<string> ReadRawData(string filePath)
    {
        var data = string.Empty;

        using (var reader = new StreamReader(filePath))
        {
            data = await reader.ReadToEndAsync();
        }

        return data;
    }

    public async Task<List<ChartDataPoint>> ParseExcelData(string rawData, IEnumerable<DataFileOptions> fileOptions)
    {
        var result = new List<ChartDataPoint>();

        var excelLines = rawData.Split("\n");

        var section1 = fileOptions.SingleOrDefault(x => x.Label.Equals("Section 1")).Checked;
        var section2 = fileOptions.SingleOrDefault(x => x.Label.Equals("Section 2")).Checked;


        var dataPointsAsString = new List<string>();
        if (section1 && !section2)
        {
            dataPointsAsString = excelLines.Skip(0).Take(17488).ToList();
        }
        else if (!section1 && section2)
        {
            dataPointsAsString = excelLines.Skip(17488).ToList();
        }
        else if (section1 && section2)
        {
            dataPointsAsString = excelLines.ToList();
        }

        foreach (var dataPointAsString in dataPointsAsString)
        {
            var tempData = dataPointAsString.Replace("\r", "");

            var tempResult = new ChartDataPoint();

            var lineSplitted = tempData.Split(",").ToList();

            try
            {
                tempResult.X = float.Parse(lineSplitted[0], CultureInfo.InvariantCulture);
                tempResult.Y = float.Parse(lineSplitted[1], CultureInfo.InvariantCulture);
            }
            catch
            {

            }

            result.Add(tempResult);
        }

        return result;
    }

    public List<float> ParseTextFileColumnData(IEnumerable<string> dataLines, int index)
    {
        var result = new List<float>();

        foreach (var dataLine in dataLines)
        {
            var dataLineValues = dataLine.Split("\t");

            string value;
            try
            {
                value = dataLineValues[index].TrimStart().TrimEnd();
            }
            catch
            {
                continue;
            }
            
            try
            {
                var dataPoint = float.Parse(value, CultureInfo.CurrentUICulture);


                result.Add(dataPoint);
            }
            catch
            {
                continue;
            }



        }

        return result;
    }
}