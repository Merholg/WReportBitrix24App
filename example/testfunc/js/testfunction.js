BX24.init(function()
{
    BX24.callMethod('user.current', {}, function(res)
    {
        let cstatusvar = document.getElementById('userf');
    });
//    getFieldscallMethod();
    getcallMethod();
});

function getFieldscallMethod()
{
    BX24.callMethod(
    'tasks.task.getFields',
    {},
    function(result)
    {
        console.info(result.data());
        console.log(result);
    });
}

function getcallMethod()
{
    BX24.callMethod(
    'tasks.task.get', 
    {taskId: 57, select:'UF_CRM_TASK'}, 
    function(res)
    {
	console.log(res);}
    );
}

//function GetSTasksTAG()
//{
//    BX24.callMethod('tasks.task.get', 
//    {taskId:57, select: 'UF_CRM_TASK'}, 
//    function(res)
//    {
//	let cerrvar = document.getElementById('statusf');
//	cerrvar.innerHTML = 'CB GetSTasksTAG Ready - ' + res.answer.result.task.ufCrmTask[0];
//
//    });
//}

//    document.body.CSVfile.Body = '';
//    document.body.TasksID.forEach(element => document.body.CSVfile.Body += element.toString() + '\n');

//function GetSTasksTAG()
//{
//    let cerrvar = document.getElementById('statusf');
//    cerrvar.innerHTML = 'GetSTasksTAG Ready';
//    document.body.CSVfile.Body = '';
//    document.body.TasksID.forEach(element => document.body.CSVfile.Body += element.toString() + '\n');
//    document.body.TasksID.forEach(function(element)
//    {
//	BX24.callMethod('task.item.getdata', 
//	[element],
//	function(res)
//	{
//	    var cerrvar = document.getElementById('statusf');
//	    if(res.error())
//	    {
//		cerrvar.innerHTML = 'CB GetSTasksTAG Error';
//	    }
//	    else
//	    {
//		var cdate = new Date();
//		if(res.data().END_DATE_PLAN.length > 0)
//	        {
//		    var epdate = new Date(res.data().END_DATE_PLAN);
//		    var pdate = '';
//		    addflag = false;
//		    if(epdate <= cdate)
//		    {
//			pdate = epdate.toLocaleString("ru", document.body.strTableDescr.dateoption);
//			addflag = true;
//		    }
//	        }
//	        else
//	        {
//		    let cldate = new Date(res.data().CLOSED_DATE);
//		    pdate = cldate.toLocaleString("ru", document.body.strTableDescr.dateoption);
//		    addflag = true;
//		}
//		if(addflag)
//		{
//		    document.body.CSVfile.Body +=
//		    res.data().ID + '\t' + 
//		    res.data().TITLE.replace(/[\x00-\x1F\x7F-\x9F]/g, '') + '\t' +
//		    res.data().DESCRIPTION.replace(/[\x00-\x1F\x7F-\x9F]/g, '') + '\t' +
//		    pdate + '\t' +
//		    res.data().GROUP_ID + '\t' +
//		    res.data().TAGS + '\n';
//		}
//		cerrvar.innerHTML = 'CB GetSTasksTAG Ready - ' + res.data().ID;
//	    }
//	});
//    });
//}
