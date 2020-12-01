'use strict';

document.body.strTableDescr =
{
    headT:  `<table width=\"100%\" border=\"1\" cellspacing=\"0\" cellpadding=\"1\">
		<tr>
		    <th width="3%" scope="col">ID</th>
		    <th width="57%" scope="col">Наименование</th>
		    <th width="20%" scope="col">Комментарий</th>
		    <th width="12%" scope="col">Дата</th>
		    <th width="8%" scope="col">Исполнитель</th>
                </tr>`,
    footT:  '</table>',
    cellT:  '',
    dateoption:
    {
//	era: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
//	,
//	weekday: 'long',
//	timezone: 'UTC',
//	hour: 'numeric',
//	minute: 'numeric',
//	second: 'numeric'
    },
    headLS: '<table width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\">',
    bcellLS: '<tr><td bgcolor=\"#666666\" onclick=\'MakeHVACReport(',
    mcellLS: ');\'>',
    ecellLS: '</td></tr>',
    footLS: '</table>',
    cellLS: '',
    tableLR: `<table width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\">
	<tr>
	    <td bgcolor=\"#666666\" onclick=\'MakeReport(15);\'>Электрика</td>
	</tr>
	<tr>
	    <td bgcolor=\"#666666\" onclick=\'MakeReport(9);\'>Вентиляция</td>
	</tr>
	<tr>
	    <td bgcolor=\"#666666\" onclick=\'MakeReport(0);\'>Электрика и Вентиляция</td>
	</tr>
	</table>`,
    printStyle: `<style type="text/css">
	#print 
	{
	    font-family: "Times New Roman", Times, serif;
	    font-size: 10px;
	    font-weight: normal;
	}
		</style>`
};
document.body.CSVfile =
{
    Name: 'alljobjournal.json',
    Body: ''
};	
document.body.arrDATA = 
{	
    DealsNum: 0,
    DealsID: [],
    Num: 0,
    TasksID: []
};
//console.log(document.body.arrDATA);
document.body.TasksIDsemafor = 0;
document.body.timerId;
document.body.timerNumTick = 0;
document.body.timeInterval = 600;
document.body.timerId2;
document.body.sendTime;

BX24.init(function()
{
    BX24.callMethod('user.current', {}, function(res)
    {
        let cstatusvar = document.getElementById('userf');
        cstatusvar.textContent = 'Пользователь - ' + res.data().NAME + ' ' + res.data().LAST_NAME + (BX24.isAdmin() ? ' as Admin' : ' as User');
    });
    document.body.sendTime = new Date();
    GetSTasksID();
// повторить с интервалом 2 секунды
    document.body.timerId2 = setInterval(() => 
    {
	let sdate = new Date();
	if((sdate - document.body.sendTime) > (5 * document.body.timeInterval))
	{
	    clearInterval(document.body.timerId2);
	}
	else
	{
	    if(document.body.TasksIDsemafor >= document.body.arrDATA.Num && document.body.arrDATA.Num > 0)
	    {
		let listrvar = document.getElementById('listreport');
		listrvar.innerHTML = document.body.strTableDescr.tableLR;
		document.body.strTableDescr.cellLS = '';
		document.body.arrDATA.DealsID.forEach(item =>
		{
		    document.body.strTableDescr.cellLS += document.body.strTableDescr.bcellLS +
							    item.ID.toString() + 
							    document.body.strTableDescr.mcellLS + 
							    item.TITLE +
							    document.body.strTableDescr.ecellLS;
		});
		let listsvar = document.getElementById('listsyst');
		listsvar.innerHTML = document.body.strTableDescr.headLS + document.body.strTableDescr.cellLS + document.body.strTableDescr.footLS;
//console.log(listsvar, document.body.strTableDescr.cellLS);		
		let cerrvar = document.getElementById('statusf');
		cerrvar.innerHTML = 'Received: ' + document.body.TasksIDsemafor.toString() + ' answers from ' + document.body.arrDATA.Num;
		let cheadvar = document.getElementById('rtitle');
		cheadvar.innerHTML = '';
		let creportvar = document.getElementById('rlist');
		creportvar.innerHTML = '';
		document.body.arrDATA.TasksID.sort(function(a, b)
		{
		    var nameA=a.PDATE;
		    let nameB=b.PDATE;
		    if (nameA < nameB) //сортируем строки по возрастанию
			return -1;
		    if (nameA > nameB)
			return 1;
		    return 0; // Никакой сортировки
		});		
		var pdays;
		var pmonths;
		var pyears;
//		document.body.CSVfile.Body = '';
		document.body.arrDATA.TasksID.forEach(item =>
		{
		    pdays = item.PDATE.substring(8);
		    pmonths = item.PDATE.substring(5,7);
		    pyears = item.PDATE.substring(0,4);
		    item.PDATE = pdays + '.' + pmonths + '.' + pyears;
//		document.body.CSVfile.Body +=
//		item.ID.toString() + '\t' +
//		item.TITLE + '\t' +
//		item.DESCRIPTION + '\t' +
//		item.PDATE + '\t' +
//		item.GROUP_ID.toString() + '\t' +
//		String(item.UF_CRM_TASK) + '\n';
		});
		document.body.CSVfile.Body = JSON.stringify(document.body.arrDATA);
		clearInterval(document.body.timerId2);
	    }
	}
    }, 1000);
});

function DivPrint(strTitle)
{
    var creportvar = document.getElementById('rlist');
    var pwindow = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    pwindow.document.write('<html><head><title>' + strTitle + '</title>');
    /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    pwindow.document.write(document.body.strTableDescr.printStyle);
    pwindow.document.write('</head><body >');
    pwindow.document.write('<div id="print">');
    pwindow.document.write(creportvar.innerHTML);
    pwindow.document.write('</div>');
    pwindow.document.write('</body></html>');
    pwindow.document.close(); // necessary for IE >= 10
    pwindow.focus(); // necessary for IE >= 10
//    pwindow.print();
//    pwindow.close();
}
	
function MakeHVACReport(syst)
{
    var dealidx = document.body.arrDATA.DealsID.findIndex(element => element.ID == syst);
    if(dealidx >= 0)
    {
	var cheadvar = document.getElementById('rtitle');
	var creportvar = document.getElementById('rlist');
	var IterNum = 0;
	cheadvar.innerHTML = 'Журнал выполненных работ по системе ' + document.body.arrDATA.DealsID[dealidx].TITLE;
	document.body.strTableDescr.cellT = '';
	document.body.arrDATA.TasksID.forEach(function(item)
	{
	    if(item.UF_CRM_TASK.includes(syst))
	    {
		document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID.toString() + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + item.PDATE + '</td>' +
						 '<td>' + '' + '</td>' +
								'</tr>';
		++IterNum;
	    }
	});
	document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td><b>' + IterNum + '</b></td>' + 
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
					    '</tr>';
	creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
	var rlinkvar = document.getElementById('rlink');
	rlinkvar.innerHTML = '<a onClick=\"DivPrint(\'' + document.body.arrDATA.DealsID[dealidx].TITLE + '\')\" class=\"menustyle\" href=\"#\">Печать</a>';
    }
}

function MakeReport(direct)
{
    var cheadvar = document.getElementById('rtitle');
    var creportvar = document.getElementById('rlist');
    var rlinkvar = document.getElementById('rlink');
    var IterNum = 0;
    switch(direct)
    {
	case 15:
	    IterNum = 0;
	    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ';
	    document.body.strTableDescr.cellT = '';
	    document.body.arrDATA.TasksID.forEach(function(item)
	    {
		if(15 == item.GROUP_ID)
		{
		    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID.toString() + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + item.PDATE + '</td>' +
						 '<td>' + '' + '</td>' +
								'</tr>';
		    ++IterNum;
		}
	    });
	    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td><b>' + IterNum + '</b></td>' + 
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
							'</tr>';
	    creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
	    var rlinkvar = document.getElementById('rlink');
	    rlinkvar.innerHTML = '<a onClick=\"DivPrint(\'ЭЛЕКТРИКА\')\" class=\"menustyle\" href=\"#\">Печать</a>';
	    break;
	case 9:
	    IterNum = 0;
	    cheadvar.innerHTML = 'Журнал выполненных работ по ВЕНТИЛЯЦИИ';
	    document.body.strTableDescr.cellT = '';
	    document.body.arrDATA.TasksID.forEach(function(item)
	    {
		if(9 == item.GROUP_ID)
		{
		    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID.toString() + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + item.PDATE + '</td>' +
						 '<td>' + '' + '</td>' +
								'</tr>';
		    ++IterNum;
		}
	    });
	    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td><b>' + IterNum + '</b></td>' + 
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
							'</tr>';
	    creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
	    var rlinkvar = document.getElementById('rlink');
	    rlinkvar.innerHTML = '<a onClick=\"DivPrint(\'ВЕНТИЛЯЦИЯ\')\" class=\"menustyle\" href=\"#\">Печать</a>';
	    break;
	default:
	    IterNum = 0;
	    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ и ВЕНТИЛЯЦИИ';
	    document.body.strTableDescr.cellT = '';
	    document.body.arrDATA.TasksID.forEach(function(item)
	    {
		document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID.toString() + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + item.PDATE + '</td>' +
						 '<td>' + '' + '</td>' +
								'</tr>';
		++IterNum;
	    });
	    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td><b>' + IterNum + '</b></td>' + 
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
							'</tr>';
	    creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
	    
	    rlinkvar.innerHTML = '<a id=\"hrefsavefile\" class=\"menustyle\" href=\"#\">Запись в файл ' + document.body.CSVfile.Name + '</a>';
	    document.getElementById('hrefsavefile').onclick = function()
	    {
		let csvData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(document.body.CSVfile.Body);
		this.href = csvData;
		this.target = '_blank';
		this.download = document.body.CSVfile.Name;
	    };
	    break;
    }
}

function GetSTasksID()
{
    document.body.arrDATA.Num = 0;
    document.body.arrDATA.TasksID.length = 0;
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка по ID — по убыванию.
        {GROUP_ID: [9, 15], STATUS: 5, ALLOW_TIME_TRACKING: 'N'}//,	// Фильтр
//        {	
//            NAV_PARAMS: { // постраничка
//                nPageSize : 50,	// по 2 элемента на странице.
//                iNumPage  : 0	// страница номер 2        
//            }
//        },
//	{SELECT: [ID, TITLE, DESCRIPTION, CLOSED_DATE, END_DATE_PLAN, GROUP_ID, TAGS]}
    ],
    function(res)
    {
	var cdate = new Date();
	var cerrvar = document.getElementById('statusf');
	if(res.error())
	{
	    cerrvar.innerHTML = 'GetSTasksID Error';
	}
	else
	{
	    var rdata = res.data();
	    rdata.forEach(function(item)
	    {
		if(item.END_DATE_PLAN.length > 0)
		{
		    var epdate = new Date(item.END_DATE_PLAN);
		    if(epdate <= cdate)
		    {
			document.body.arrDATA.TasksID.push(
			{
			    ID: Number(item.ID), 
			    TITLE: item.TITLE.replace(/[\x00-\x1F\x7F-\x9F]/g, ''), 
			    DESCRIPTION: item.DESCRIPTION.replace(/[\x00-\x1F\x7F-\x9F]/g, ''),
			    PDATE: item.END_DATE_PLAN.substring(0,10),//epdate.toLocaleString("ru", document.body.strTableDescr.dateoption),
			    GROUP_ID: Number(item.GROUP_ID),
			    UF_CRM_TASK: []
			});
			++(document.body.arrDATA.Num);
		    }
		}
		else
		{
		    var cldate = new Date(item.CLOSED_DATE);
		    document.body.arrDATA.TasksID.push(
		    {
			ID: Number(item.ID), 
			TITLE: item.TITLE.replace(/[\x00-\x1F\x7F-\x9F]/g, ''), 
			DESCRIPTION: item.DESCRIPTION.replace(/[\x00-\x1F\x7F-\x9F]/g, ''),
			PDATE: item.CLOSED_DATE.substring(0,10),//cldate.toLocaleString("ru", document.body.strTableDescr.dateoption),
			GROUP_ID: Number(item.GROUP_ID),
			UF_CRM_TASK: []
		    });
		    ++(document.body.arrDATA.Num);
		}
	    });
	    if(res.more())
	    {
		res.next();
	    }
	    else
	    {
		GetSDealsID();
	    }
	}
    });
}

function GetSTasksCRM()
{
    document.body.TasksIDsemafor = 0;
    document.body.timerNumTick = 0;
    document.body.timerId = setInterval(() => 
    {
	if(document.body.timerNumTick < document.body.arrDATA.Num)
	{
	    var CRMtask = [];
	    var CRMtaskNum = 0;
	    while(document.body.timerNumTick < document.body.arrDATA.Num && CRMtaskNum < 50)
	    {
		CRMtask.push(
		{
		    method: 'tasks.task.get',
		    params: 
		    {
			taskId: document.body.arrDATA.TasksID[document.body.timerNumTick].ID,
			select: 'UF_CRM_TASK'
		    }
		});
		++CRMtaskNum;
		++document.body.timerNumTick;
	    }
	    BX24.callBatch(CRMtask, 
	    function(res)
	    {
//console.log(res);
		res.forEach(function(element)
		{
		    if (typeof(element.answer.result.task.ufCrmTask) == "object")
		    {
			var taskid = Number(element.answer.result.task.id);
			var taskidx = document.body.arrDATA.TasksID.findIndex(item => item.ID == taskid);
			if(taskidx >= 0)
			{
			    element.answer.result.task.ufCrmTask.forEach(CRMelement =>
				document.body.arrDATA.TasksID[taskidx].UF_CRM_TASK.push(Number(CRMelement.substring(2))));
			}
		    }
		    ++document.body.TasksIDsemafor;
		});
	    });
	    let cerrvar = document.getElementById('statusf');
	    cerrvar.innerHTML = 'Send: ' + document.body.timerNumTick.toString() + ' from ' + document.body.arrDATA.Num.toString() + ' requests';
	    let sdate = new Date();
	    if(document.body.sendTime < sdate) document.body.sendTime = sdate;
	}
	else
	{
	    clearInterval(document.body.timerId);
	}
    }, document.body.timeInterval);
}

function GetSDealsID()
{
    document.body.arrDATA.DealsNum = 0;
    document.body.arrDATA.DealsID.length = 0;
    BX24.callMethod("crm.deal.list", 
    { 
	order: {"ID": "ASC"},
	filter: {},
	select: ["ID", "TITLE"]
    }, 
    function(res)
    {
	var cerrvar = document.getElementById('statusf');
	if(res.error())
	{
	    cerrvar.innerHTML = 'GetSDealsID Error';
	}
	else
	{
	    var rdata = res.data();
	    rdata.forEach(function(item)
	    {
		document.body.arrDATA.DealsID.push(
		{
		    ID: Number(item.ID), 
		    TITLE: item.TITLE.replace(/[\x00-\x1F\x7F-\x9F]/g, '') 
		});
		++(document.body.arrDATA.DealsNum);
	    });
	    if(res.more())
	    {
		res.next();
	    }
	    else
	    {
		GetSTasksCRM();
	    }
	}
    });
}
