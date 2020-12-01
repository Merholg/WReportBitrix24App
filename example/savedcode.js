    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ и ВЕНТИЛЯЦИИ';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'GetSTasksID Ready';

//function clickVS1(){alert('П1В1');}
//function clickVS2(){alert('П2В2');}
//function clickVS3(){alert('П3В3');}
//function clickVS4(){alert('П4В4');}
//function clickVS5(){alert('П5В5');}
//function clickVS6(){alert('П6В18');}
//function clickVS7(){alert('П7В19');}
//function clickVS8(){alert('П8В16');}
//function clickVSA(){alert('ЩУВ1');}
//function clickVSB(){alert('ЩУВ2');}
//function clickK1(){alert('К1');}
//function clickK2(){alert('К2');}
//function clickK3(){alert('К3');}
//function clickK4(){alert('К4');}
//function clickK5(){alert('К5');}
//function clickK8(){alert('К8');}
//function clickK9(){alert('К9');}
//function clickK12(){alert('К12');}
//function clickK13(){alert('К13');}
//function clickK14(){alert('К14');}
//function clickK15(){alert('К15');}
//function clickK161(){alert('К161');}
//function clickK162(){alert('К162');}
function ElectroRep()
{
    document.body.Num = 0;
    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ЭЛЕКТРИКЕ';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'ELECTRO Ready';
    document.body.strTableDescr.cellT = '';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = '';
    document.body.CSVfile.Body = '';
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка по ID — по убыванию.
        {GROUP_ID: 15, STATUS: 5, ALLOW_TIME_TRACKING: 'N'}//,	// Фильтр
//        {	
//            NAV_PARAMS: { // постраничка
//                nPageSize : 50,	// по 2 элемента на странице.
//                iNumPage  : 0	// страница номер 2        
//            }
//        },
//	{SELECT: [ID, TITLE, DESCRIPTION, CLOSED_DATE, END_DATE_PLAN]}
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
		    var cldate = new Date(item.CLOSED_DATE);
		    document.body.strTableDescr.cellT += '<tr>' +
                                                 '<td>' + item.ID + '</td>' + 
                                                 '<td>' + item.TITLE + '</td>' +
						 '<td>' + item.DESCRIPTION + '</td>' +
						 '<td>' + cldate.toLocaleString("ru", document.body.strTableDescr.dateoption) + '</td>' +
						 '<td>' +  '' + '</td>' +
							'</tr>';
		    ++(document.body.Num);
		});
		if(res.more())
		{
		    res.next();
		}
		else
		{
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
	    }
	});
}

function HVACRep()
{
    document.body.Num = 0;
    let cheadvar = document.getElementById('rtitle');
    cheadvar.innerHTML = 'Журнал выполненных работ по ВЕНТИЛЯЦИИ и КОНДИЦИОНИРОВАНИЮ';
    let cerrvar = document.getElementById('statusf');
    cerrvar.innerHTML = 'HVAC Ready';
    document.body.strTableDescr.cellT = '';
    let creportvar = document.getElementById('rlist');
    creportvar.innerHTML = '';
    document.body.CSVfile.Body = '';
    BX24.callMethod('task.item.list', 
    [
        {CLOSED_DATE : 'asc'},		// Сортировка по ID — по убыванию.
        {GROUP_ID: 9, STATUS: 5, ALLOW_TIME_TRACKING: 'N'}//,	// Фильтр
//        {	
//            NAV_PARAMS: { // постраничка
//                nPageSize : 50,	// по 2 элемента на странице.
//                iNumPage  : 0	// страница номер 2        
//            }
//        },
//	{SELECT: [ID, TITLE, DESCRIPTION, CLOSED_DATE, END_DATE_PLAN]}
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
								'</tr>';
			    ++(document.body.Num);
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
							    '</tr>';
			++(document.body.Num);
		    }
		});
		if(res.more())
		{
		    res.next();
		}
		else
		{
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
	    }
	});
}

function Out2file()
{
    document.body.CSVfile.Body = '';
    document.body.TasksID.forEach(function(element)
    {
	document.body.CSVfile.Body +=
	element.ID.toString() + '\t' +
	element.TITLE + '\t' +
	element.DESCRIPTION + '\t' +
	element.PDATE + '\t' +
	element.GROUP_ID.toString() + '\t' +
	String(element.UF_CRM_TASK) + '\n';
    });
}

