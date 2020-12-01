/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
//            let age = prompt("Сколько Вам лет?", 18);
//            document.body.innerHTML = 'Новый BODY!';

document.body.strTableDescr =
{
    headT:  `<table width=\"100%\" border=\"1\" cellspacing=\"0\" cellpadding=\"1\">
		<tr>
		    <th scope="col">ID</th>
		    <th scope="col">Наименование</th>
		    <th scope="col">Комментарий</th>
		    <th scope="col">Дата</th>
		    <th scope="col">Исполнитель</th>
                </tr>`,
//		    <th>END_DATE_PLAN</th>
//		    <th>RESPONSIBLE_ID</th>
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
    }
};
document.body.Num = 0;
document.body.TaskIndex = 0;
document.body.arrTasks = [];
  
function clickVS1(){alert('П1В1');};
function clickVS2(){alert('П2В2');};
function clickVS3(){alert('П3В3');};
function clickVS4(){alert('П4В4');};
function clickVS5(){alert('П5В5');};
function clickVS6(){alert('П6В18');};
function clickVS7(){alert('П7В19');};
function clickVS8(){alert('П8В16');};
function clickVSA(){alert('ЩУВ1');};
function clickVSB(){alert('ЩУВ2');};
BX24.init(function()
{
    BX24.callMethod('user.current', {}, function(res)
    {
        let cstatusvar = document.getElementById('userf');
        cstatusvar.textContent = 'Пользователь - ' + res.data().NAME + ' ' + res.data().LAST_NAME + (BX24.isAdmin() ? ' as Admin' : ' as User');
    });
});

function ElectroRep()
{
    document.body.Num = 0;
    document.body.TaskIndex = 0;
    document.body.arrTasks.length = 0;
    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'ELECTRO Ready';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = '';
//    BX24.callMethod('tasks.task.list', 
//	{
//	filter:{REAL_STATUS: STATE_COMPLETED}, 
//	select: ['ID','TITLE','GROUP_ID'], 
//	order:{ID:'asc'}
//	}, 
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка по ID — по убыванию.
        {GROUP_ID: 15, STATUS: 5, ALLOW_TIME_TRACKING: 'N'},	// Фильтр
        {	
            NAV_PARAMS: { // постраничка
                nPageSize : 50,	// по 2 элемента на странице.
                iNumPage  : 0	// страница номер 2        
            }
        }//,
//	{SELECT: ['ID', 'TITLE', 'DESCRIPTION', 'CLOSED_DATE', 'END_DATE_PLAN']}
    ],
    function(res)
    {
	var cerrvar = document.getElementById('statusf');
	if(res.error())
	{
	    cerrvar.innerHTML = 'ELECTRO Task Error';
	}
	else
	{
	    cerrvar.innerHTML = 'ELECTRO Task Ready';
	    var rdata = res.data();
	    rdata.forEach(function(item, index, array)
	    {
		let itemID = Number(item.ID);
		let itemTITLE = item.TITLE;
		let itemDESCRIPTION = item.DESCRIPTION;
		let itemTAGS = document.body.Num.toString();
		let cldate = new Date(item.CLOSED_DATE);
		let itemDATE = cldate.toLocaleString("ru", document.body.strTableDescr.dateoption);
		document.body.arrTasks.push({'itemID': itemID,  'itemTITLE': itemTITLE, 'itemDESCRIPTION': itemDESCRIPTION, 'itemDATE': itemDATE, 'itemTAGS': itemTAGS});
		++(document.body.Num);
	    });
	    if(res.more())
	    {
		res.next();
	    }
	    else
	    {
//		GetTaskProperty();	
		OutReport();
	    }
	}
    });
}

function GetTaskProperty()
{
		var rdata = document.body.arrTasks;
		rdata.forEach(function(item, index, array)
		{
		    document.body.TaskIndex = index;
		    item.itemTAGS = index.toString();
//		    BX24.callMethod('tasks.task.get', 
//		    {
//			taskId: document.body.strTableDescr.TaskID[document.body.strTableDescr.TaskIDIndex], 
//			select: ['ID', 'TITLE', 'DESCRIPTION']
//		    }, 
//		    function(res)
//		    {
//			var cerrvar = document.getElementById('statusf');
//			if(res.error())
//			{
//			    cerrvar.innerHTML = 'Out Task Error';
//			}
//			else
//			{
//			    cerrvar.innerHTML = 'Out Task Ready';
//			}
//		    });
		});
}  
function OutReport()
{
    document.body.strTableDescr.cellT = '';
    var rdata = document.body.arrTasks;
    rdata.forEach(function(item, index, array)
    {
//	document.body.strTableDescr.cellT += '<tr>' +
//			'<td>' + item.itemID.toString() + '</td>' + 
//			'<td>' +  '' + '</td>' +
//			'<td>' +  '' + '</td>' +
//			'<td>' +  '' + '</td>' +
//			'<td>' +  '' + '</td>' +
//		    '</tr>';
	document.body.strTableDescr.cellT += '<tr>' +
	    '<td>' + item.itemID.toString() + '</td>' + 
	    '<td>' + item.itemTITLE + '</td>' +
	    '<td>' + item.itemDESCRIPTION + '</td>' +
	    '<td>' + item.itemDATE + '</td>' +
	    '<td>' + item.itemTAGS + '</td>' +
					     '</tr>';
    });
		    
    document.body.strTableDescr.cellT += '<tr>' +
	'<td><b>' + document.body.Num + '</b></td>' + 
	'<td>' + '' + '</td>' +
	'<td>' + '' + '</td>' +
	'<td>' + '' + '</td>' +
	'<td>' + '' + '</td>' +
					 '</tr>';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
}
//function getCurrentUser() 
//{
//    const currentUserPromise = new Promise((resolve, reject) => 
//    {
//        BX24.init(function()
//        {
//            BX24.callMethod("user.current", {}, function(res) 
//            {
//                document.body.strTableDescr.cellT += '<tr>' +
//                                                    '<td>' + res.data().NAME + '</td>' + 
//                                                    '<td>' + res.data().LAST_NAME + '</td>' +
//                                                '</tr>';
//            });
//        });
//    });
//    return currentUserPromise;
//}
function HVACRep()
{
    document.body.strTableDescr.Num = 0;
    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ВЕНТИЛЯЦИИ и КОНДИЦИОНИРОВАНИЮ';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'HVAC Ready';
    document.body.strTableDescr.cellT = '';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = '';
//    BX24.callMethod('tasks.task.list', 
//	{
//	filter:{REAL_STATUS: STATE_COMPLETED}, 
//	select: ['ID','TITLE','GROUP_ID'], 
//	order:{ID:'asc'}
//	}, 
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка по ID — по убыванию.
        {GROUP_ID: 9, STATUS: 5, ALLOW_TIME_TRACKING: 'N'}
//	,	// Фильтр
//        {	
//            NAV_PARAMS: { // постраничка
//                nPageSize : 2,	// по 2 элемента на странице.
//                iNumPage  : 2	// страница номер 2        
//            }
//        },
//	{SELECT: [ID, TITLE, GROUP_ID]}
    ],
    function(res)
	{
	    var cdate = new Date();
	    var cerrvar = document.getElementById('statusf');
	    if(res.error())
	    {
		cerrvar.innerHTML = 'HVAC Task Error';
	    }
	    else
	    {
		cerrvar.innerHTML = 'HVAC Task Ready';
		var rdata = res.data();
		rdata.forEach(function(item, index, array)
		{
		    if(item.END_DATE_PLAN.length > 0)
		    {
			var epdate = new Date(item.END_DATE_PLAN);
			if(epdate <= cdate)
			{
			    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + epdate.toLocaleString("ru", document.body.strTableDescr.dateoption) + '</td>' +
						 '<td>' + '' + '</td>' +
//						 '<td>' + item.UF_CRM_TASK[0] + '</td>' +
//						 '<td>' + item.CLOSED_DATE.substr(0,10) + '</td>' +
//                                                 '<td>' + item.END_DATE_PLAN + '</td>' + 
//                                                 '<td>' + item.RESPONSIBLE_ID + '</td>' +
								'</tr>';
			    ++(document.body.strTableDescr.Num);
			}
		    }
		    else
		    {
			var cldate = new Date(item.CLOSED_DATE);
			document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + cldate.toLocaleString("ru", document.body.strTableDescr.dateoption) + '</td>' +
						 '<td>' + '' + '</td>' +
//						 '<td>' + item.UF_CRM_TASK[0] + '</td>' +
//                                                 '<td>' + item.END_DATE_PLAN + '</td>' + 
//                                                 '<td>' + item.RESPONSIBLE_ID + '</td>' +
							    '</tr>';
			++(document.body.strTableDescr.Num);
		    }
		});
		if(res.more())
		{
		    res.next();
		}
		else
		{
		    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td><b>' + document.body.strTableDescr.Num + '</b></td>' + 
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
                                                 '<td>' + '' + '</td>' +
						 '<td>' + '' + '</td>' +
							'</tr>';
		    let creportvar = document.getElementById('rlist');
		    creportvar.innerHTML = document.body.strTableDescr.headT + document.body.strTableDescr.cellT + document.body.strTableDescr.footT;
		}
	    }
	});
}

