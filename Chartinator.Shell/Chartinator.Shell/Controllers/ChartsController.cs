using System;
using System.Collections.Generic;
using Chartinator.Shell.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Chartinator.Shell.Core;
using Chartinator.Shell.Core.Request;
using Chartinator.Shell.Core.Response;
using Chartinator.Shell.Services;

namespace Chartinator.Shell.Controllers
{
    public class ChartsController : BaseApiController
    {
        private readonly ChartsService _chartsService;

        public ChartsController(ChartsService chartsService)
        {
            _chartsService = chartsService;
        }

        [HttpGet("excel")]
        public async Task<IActionResult> GetExcels()
        {
            try
            {
                var excels = await _chartsService.ReadExcelFilesNames();

                return HandleResult(new OperationResult(HttpStatusCode.OK, excels));
            }
            catch (Exception e)
            {
                var errorInfo = new ErrorInfo("Failed to retrieve the excels.", $"{GetType().Name}::GetExcels", e);

                return InternalServerError(errorInfo);
            }
        }

        [HttpPost("execute")]
        public async Task<IActionResult> ExecuteExcels([FromBody] List<ExcelFileData> files)
        {
            try
            {
                var data = await _chartsService.ReadFiles(files);
               
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
