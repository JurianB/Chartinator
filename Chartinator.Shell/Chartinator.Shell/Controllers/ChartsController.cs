using System;
using System.Collections.Generic;
using Chartinator.Shell.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Chartinator.Service;
using Chartinator.Shell.Core;

namespace Chartinator.Shell.Controllers
{
    public class ChartsController : BaseApiController
    {
        private readonly ChartsService _chartsService;

        public ChartsController(ChartsService chartsService)
        {
            _chartsService = chartsService;
        }

        [HttpPost]
        public async Task<IActionResult> GetChartData([FromBody] List<string> filePaths)
        {
            try
            {
                var data = await _chartsService.ReadData(filePaths);
               
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
