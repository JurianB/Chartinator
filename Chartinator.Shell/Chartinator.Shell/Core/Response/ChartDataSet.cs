using System.Collections.Generic;

namespace Chartinator.Shell.Core.Response;

public class ChartDataSet
{
    public ChartDataSet()
    {
        Data = new List<float>();
    }

    public string Label { get; set; }
    public List<float> Data { get; set; }
    public string BorderColor { get; set; }
    public string BackgroundColor { get; set; }
}