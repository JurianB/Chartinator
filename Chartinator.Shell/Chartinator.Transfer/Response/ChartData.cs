using System.Collections.Generic;

namespace Chartinator.Shell.Core.Response;

public class ChartData
{
    public ChartData()
    {
        DataPoints = new List<ChartDataPoint>();
    }
    public string Type { get; set; }
    public string AxisYType { get; set; }
    public string Name { get; set; }
    public bool ShowInLegend { get; set; }
    public int MarkerSize { get; set; }
    public string YValueFormatString { get; set; }
    public List<ChartDataPoint> DataPoints { get; set; }
}