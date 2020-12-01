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
    Num:    0,
    TaskIndex: [],
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
    document.body.strTableDescr.TaskIndex.length = 0;
    document.body.strTableDescr.Num = 0;
    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ';
    document.body.strTableDescr.cellT = '';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = '';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'ELECTRO Ready';
//    BX24.callMethod('tasks.task.list', 
//    {
//	filter:{GROUP_ID: 15, STATUS: 5, ALLOW_TIME_TRACKING: 'N'}, 
//	select: ['ID', 'TITLE'], 
//	order:{CLOSED_DATE : 'asc'}
//    }, 
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка
        {GROUP_ID: 15, STATUS: 5, ALLOW_TIME_TRACKING: 'N'}//,	// Фильтр
//        {	
//            NAV_PARAMS: { // постраничка
//                nPageSize : 50 //,	// по 2 элемента на странице.
//                iNumPage  : 2	// страница номер 2        
//            }
//        },
//	{SELECT: [ID, TITLE, GROUP_ID]}
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
		document.body.strTableDescr.TaskIndex.push(Number(item.ID));
		++(document.body.strTableDescr.Num);
	    });
	    if(res.more())
	    {
		res.next();
	    }
	}
    });
    document.body.strTableDescr.TaskIndex.forEach(function(item, index, array)
    {
	document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID + '</td>' + 
                                                 '<td>' + ' ' +/*res.data().TITLE + */'</td>' +
						 '<td>' + ' ' +/*res.data().DESCRIPTION + */'</td>' +
						 '<td>' + ' ' +/*tedate.toLocaleString("ru", document.body.strTableDescr.dateoption) + */'</td>' +
						 '<td>' + ' ' + '</td>' +
					    '</tr>';
	
    });
    ReleaseDivContent();
}

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
	    cerrvar.innerHTML = 'HVAC Tasks Error';
	}
	else
	{
	    cerrvar.innerHTML = 'HVAC Tasks Ready';
	    var rdata = res.data();
	    rdata.forEach(function(item, index, array)
	    {
	        if(item.END_DATE_PLAN.length > 0)
	        {
		    var epdate = new Date(item.END_DATE_PLAN);
		    if(epdate <= cdate)
		    {
		        document.body.strTableDescr.TaskEndDate = item.END_DATE_PLAN;
			document.body.strTableDescr.currentTaskIndex = Number(item.ID);
			GetTaskData();
		        ++(document.body.strTableDescr.Num);
		    }
		}
		else
		{
		    document.body.strTableDescr.TaskEndDate = item.CLOSED_DATE;
		    document.body.strTableDescr.currentTaskIndex = Number(item.ID);
		    GetTaskData();
		    ++(document.body.strTableDescr.Num);
		}
	    });
	    if(res.more())
	    {
	        res.next();
	    }
	    else
	    {
		ReleaseDivContent();
	    }
	}
    });
}
function GetTaskData()
{
    BX24.callMethod('task.item.getdata',
    [document.body.strTableDescr.currentTaskIndex],
    function(res)
    {
	var cerrvar = document.getElementById('statusf');
	if(res.error())
	{
	    cerrvar.innerHTML = 'GetTask Error';
	}
	else
	{
	    cerrvar.innerHTML = 'GetTask Ready ' + document.body.strTableDescr.Num.toString();
	    var tedate = new Date(document.body.strTableDescr.TaskEndDate);
	    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + res.data().ID + '</td>' + 
                                                 '<td>' + res.data().TITLE + '</td>' +
						 '<td>' + res.data().DESCRIPTION + '</td>' +
						 '<td>' + tedate.toLocaleString("ru", document.body.strTableDescr.dateoption) + '</td>' +
//						 '<td>' + '' + '</td>' +
						 '<td>' + res.data().TAGS + '</td>' +
//						 '<td>' + res.data().UF_CRM_TASK + '</td>' +
							'</tr>';
	}
    });
}
function ReleaseDivContent()
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
