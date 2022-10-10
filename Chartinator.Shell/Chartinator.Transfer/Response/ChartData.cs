using System.Collections.Generic;

namespace Chartinator.Transfer.Response;

public class ChartData
{
    public ChartData()
    {
        DataPoints = new List<ChartDataPoint>();
    }
    public string Type { get; set; }
    public List<ChartDataPoint> DataPoints { get; set; }
}