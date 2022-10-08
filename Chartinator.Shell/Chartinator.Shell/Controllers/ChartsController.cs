using System;
using System.Collections.Generic;
using Chartinator.Shell.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Chartinator.Service;
using Chartinator.Shell.Core;
using Chartinator.Shell.Core.Request;

namespace Chartinator.Shell.Controllers
{
    public class ChartsController : BaseApiController
    {
        private readonly ChartsService _chartsService;

        public ChartsController(ChartsService chartsService)
        {
            _chartsService = chartsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetChartData([FromBody] List<ExcelFileData> files)
        {
            try
            {
                var data = await _chartsService.ReadData(files);
               
                return HandleResult(new OperationResult(HttpStatusCode.OK, data));
            }
            catch (Exception e)
            {
                var errorInfo = new ErrorInfo("Failed to execute the excels.", $"{GetType().Name}::ExecuteExcels", e);

                return InternalServerError(errorInfo);
            }
        }
    }
}
