var currDate = 1;
getUnique = function (arr) {
    var i = 0,
        current,
        length = arr.length,
        unique = [];
    for (; i < length; i++) {
        current = arr[i];
        if (!~unique.indexOf(current)) {
            unique.push(current);
        }
    }
    return unique;
};

function clearTable() {
    let element1 = document.getElementById('my-table');
    let element2 = document.getElementById('my-table2');
    let element3 = document.getElementById('my-table3');
    let element5 = document.getElementById('my-table7');
    let element6 = document.getElementById('my-table4');
    element1.parentNode.removeChild(element1);
    element2.parentNode.removeChild(element2);
    element3.parentNode.removeChild(element3);
    element5.parentNode.removeChild(element5);
    element6.parentNode.removeChild(element6);
    location.reload();
}

var allIndexes = [];
var allIndexest = [];
var allPenyas = [];
var allPenyast = [];
var vasyas = [];
var table2 = {};

function totalCalculate(ansFineSumm, threepersum, totalSum, colKt) {
    let total = (parseFloat(ansFineSumm) + parseFloat(threepersum * 100) + parseFloat(totalSum * colKt)).toFixed(2);
    ////////////////////////////////////////////console.log('penya: ' + ansFineSumm + ' 3per: ' + threepersum * 100 + ' inflation: ' + totalSum * colKt);
    return total;
}

function drawPdf(infltext, doc, table, penyatext, fin, percent, total, totalIndex, date3, radio1, radio2, keys2, term, stop) {
    //  var doc1 = new jsPPF();

    let info1 = document.getElementById("info").value;
    let info2 = document.getElementById("info2").value;
    var newTable = document.createElement('table');
    var textNewTable = "";
    let totalDt = 0;
    let texts = [];
    let totalKT = 0;
    let totalS = 0;
    const keys = Object.keys(table);
    let size = keys.length;
    let countert = 0;
    //doc.addFont('NotoSansCJKjp-Regular', 'NotoSansCJKjp', 'normal');
    // zapfdingbats


    for (let i = 0; i < size; i++) {
        if (i == 0) {
            textNewTable = "<table>" +
                "<tr>\n" +
                "    <th>операцiя</th>\n" +
                "    <th>дата</th>\n" +
                "    <th>дебiт</th>\n" +
                "    <th>кредит</th>\n" +
                "    <th>с-до</th>\n" +
                "   </tr>";
        }
        let currArray = table[keys[i]];
        let currstr = keys[i];
        currstr = currstr.split('-')
        //////////////////////////////console.log(currstr[0]);
        let cDate = new Date(currstr[0]);
        let currarray2 = currstr[0];
        currarray2 = currarray2.split(',');
        //////////////////////////////console.log(cDate);
        let month = currarray2[1];
        //////////////////////////////console.log('date: ' + cDate.getDay());
        let day = currarray2[0];
        //////////////////////////////console.log('day: ' + day)
        // if(i == 0){
        //     day = cDate.getDay()+4;
        // }

        let year = currarray2[2];
        //////////////////////////////console.log('day: ' + day + ' month: ' + month + ' year: ' + year);
        let str = day + '.' + month + '.' + year;
        ////////////////////////////////console.log('date: ' + cDate + ' str: ' + str);
        let doc = currArray[0];
        let colKt = currArray[1];
        let colDt = currArray[2];
        let saldo = colKt - colDt;
        totalDt += parseInt(colDt);
        totalKT += parseInt(colKt);
        totalS += parseInt(saldo);
        textNewTable += "<tr>\n" +
            "    <th>" + doc + "</th>\n" +
            "    <th>" + str + "</th>\n" +
            "    <th>" + colDt + "</th>\n" +
            "    <th>" + colKt + "</th>\n" +
            "    <th>" + saldo + "</th>\n" +
            "   </tr>"


        if (i + 1 == size) {
            textNewTable += "</table>";
        }
        countert += 12;
    }
    textNewTable += "<tr>\n" +
        "    <th>всього</th>\n" +
        "    <th></th>\n" +
        "    <th>" + totalDt + "</th>\n" +
        "    <th>" + totalKT + "</th>\n" +
        "    <th>" + totalS + "</th>\n" +
        "   </tr>"
    countert += 12;
    newTable.innerHTML = (textNewTable);
    newTable.id = 'my-table';
    document.getElementById('table-div').appendChild(newTable);
    //doc.setFont('NotoSansCJKjp-Regular');
    doc.autoTable({html: '#my-table', styles: {cellPadding: 0.5, font: "NotoSansCJKjp-Regular"},});


    var newTable3 = document.createElement('table');
    let table3t = "";
    for (let i = 0; i < allIndexes.length; i++) {
        if (i == 0) {
            table3t = "<table>" +
                "<tr>\n" +
                "    <th>мiсяць</th>\n" +
                "    <th>iндекс</th>\n" +
                "   </tr>";
        }
        ////////////////////console.log('t: ' + allIndexest[i] + ' v: ' + allIndexes[i])
        table3t += "<tr>\n" +
            "    <th>" + allIndexest[i] + "</th>\n" +
            "    <th>" + allIndexes[i] + "</th>\n" +
            "   </tr>";
        countert += 12;
    }
    newTable3.innerHTML = (table3t);
    newTable3.id = 'my-table3';
    document.getElementById('table-div').appendChild(newTable3);
    doc.autoTable({html: '#my-table3', styles: {cellPadding: 0.5, font: "NotoSansCJKjp-Regular"},});

    var newTable2 = document.createElement('table');
    let newTable2T = "";
    //doc.text('Inflation', 70, 43);
    let totalsum = 0;
    let countf = 0;
    var totalI = 0.0;
    for (let i = 0; i < keys.length; i++) {
        if (i == 0) {
            newTable2T = "<table>" +
                "<tr>\n" +
                "    <th>перiод</th>\n" +
                "    <th>iндекси iнфляцiї, що премножуються</th>\n" +
                "    <th>пiдсумковий iндекс</th>\n" +
                "    <th>Сума боргу</th>\n" +
                "    <th>Сума боргу з урахуванням iнфляцiї</th>\n" +
                "    <th>Iнфляцiйнi нарахування</th>\n" +
                "   </tr>";
        }
        let currArray = table[keys[i]];
        // if (keys.length <= 1) {
        //     totalsum = currArray[1] - currArray[2];
        // }
        let sum = currArray[1];
        let msum = currArray[2]
        // totalsum = 0;
        totalsum += parseInt(sum);
        totalsum -= parseInt(msum);
        let currstr = keys[i];
        currstr = currstr.split('-');
        let date1 = new Date(currstr[0]);
        let date2 = new Date(date3);
        let nextstr = keys[i + 1];
        if (i + 1 < keys.length) {

            nextstr = nextstr.split('-')
            date2 = new Date(nextstr[0]);
        } else {
            nextstr = date3.getDay() + 1 + '.' + (date3.getMonth() + 1) + '.' + date3.getFullYear();
            //////////////////////////////console.log('nextstrdsfsdf: ' + nextstr)
        }
        let currstr2 = currstr[0];
        currstr2 = currstr2.split(',');
        let nextstr2 = nextstr[0];
        if (i + 1 == keys.length) {
            nextstr2 = nextstr;
            nextstr2 = nextstr2.split('.');
        } else {
            nextstr2 = nextstr2.split(',');
        }

        //////////////////////////////console.log(currstr2 + ' next ' + nextstr2)
        let cmonth = currstr2[1];
        let cyear = currstr2[2];
        let cday = currstr2[0];
        let nmonth = nextstr2[1];
        let nyear = nextstr2[2];
        let nday = nextstr2[0];
        //////////////////////////////console.log('cday: ' + cday + ' cmonth: ' + cmonth + ' year: ' + cyear);
        //////////////////////////////console.log('nday: ' + nday + ' nmonth: ' + nmonth + ' nyear: ' + nyear);
        let diff = findDifferenceM(date1, date2);
        let infla = drawInflation(date1, diff).array;
        totalIndex = findTotalIndex(infla);
        let inflStr = drawInflation(date1, diff).string;
        let t = (totalsum * totalIndex)
        let cresult = parseFloat(t) - parseFloat(totalsum);
        totalI += parseFloat(cresult);
        newTable2T += "<tr>\n" +
            "    <th>" + cday + "." + cmonth + "." + cyear + "-" + nday + "." + nmonth + "." + nyear + "</th>\n" +
            "    <th>" + inflStr + "</th>\n" +
            "    <th>" + totalIndex.toFixed(2) + "</th>\n" +
            "    <th>" + totalsum.toFixed(2) + "</th>\n" +
            "    <th>" + t.toFixed(2) + "</th>\n" +
            "    <th>" + cresult.toFixed(2) + "</th>\n" +
            "   </tr>";
        if (i + 1 == keys.length) {
            newTable2T += "<tr>\n" +
                "    <th>всього</th>\n" +
                "    <th></th>\n" +
                "    <th></th>\n" +
                "    <th></th>\n" +
                "    <th></th>\n" +
                "    <th>" + (totalI).toFixed(2) + "</th>\n" +
                "   </tr>";
            newTable2T += "</table>"
        }
        countf++;
        countert += 12;
    }
    newTable2.innerHTML = (newTable2T);
    newTable2.id = 'my-table2';
    document.getElementById('table-div').appendChild(newTable2);
    //doc.setFont('NotoSansCJKjp-Regular');
    doc.autoTable({html: '#my-table2', styles: {cellPadding: 0.5, font: "NotoSansCJKjp-Regular"},});


    let penyaTable = document.createElement('table');
    let penyatableText = "";
    let penyaTable2 = document.createElement('table');
    let penya2text = "";
    let tvasya = 0.0;
    var ns = 0;

    for (let g = 0; g < keys.length; g++) {
        let cc = 0;
        let needstr = '';
        let nextstr = '';
        let penyato = 0;
        let dateo = new Date();
        let daten = new Date();
        let flag1 = false;
        let needvar = ns + 1;
        let last = '2050,10,10';
        let lastD = new Date(last);
        let totals2 = keys[g].split('-');
        totals2 = totals2[0].split(',');
        console.log('year: '+parseInt(totals2[2]));
        let year = parseInt(totals2[2]);
        let totalD = new Date(parseInt(totals2[2]), parseInt(totals2[1]) + stop, parseInt(totals2[0])+29);
        if(parseInt(totals2[0]) > 1){
            totalD = '';
            totalD = new Date(year, parseInt(totals2[1]) + stop+1, parseInt(totals2[0]));
            console.log('here: '+ totalD.getFullYear() + ' date: '+year)
        }
        console.log('dateyear: '+ totalD.getFullYear())
        //пеня
        //TODO: пеня

        // for (let i = 0; i < keys2.length ; i++) {
        //
        //     if (i == 0 && cc == 0) {
        //         penya2text += "<table>" +
        //             "<tr>\n" +
        //             "    <th>Дата початку</th>\n" +
        //             "    <th>кiнцева дата</th>\n" +
        //             "    <th>кiлькiсть днiв</th>\n" +
        //             "    <th>сума боргу</th>\n" +
        //             "    <th>облiкова ставка НБУ</th>\n" +
        //             "    <th>розрахункова ставка</th>\n" +
        //             "    <th>пеня</th>\n" +
        //             "   </tr>";
        //     }
        //     penyato = 0;
        //     let currArray = table[keys[g]];
        //     let n = parseInt(ns) + parseInt(i);
        //     let currstr = keys2[n];
        //     let currBet = table2[keys2[i]];
        //     if (i > 0) {
        //         last = keys2[n - 1].split('-');
        //         last = last[0].split('.')
        //     }
        //
        //     if (g == 1) {
        //         ////console.log('value: ' + keys2[n] + ' n: ' + n + ' i: ' + i);
        //     }
        //     let nBet = table2[keys2[i + 1]];
        //     if (flag1) {
        //         nBet = table2[keys2[needvar + 1]];
        //         currBet = table2[keys2[needvar]];
        //     }
        //
        //     if (i == 0 && cc == 0) {
        //         currBet = table2[keys2[ns]];
        //         currBet = table2[keys2[ns + 1]];
        //     }
        //     // needvar = i;
        //     if (currBet == '`') {
        //         ns = i + 2;
        //         break;
        //     }//
        //     currstr = currstr.split('.');
        //     if (flag1) {
        //         currstr = needstr;
        //         if (g == 1) {
        //             ////console.log('here: ' + currstr + ' i: ' + i + ' g: ' + g);
        //         }
        //     }
        //     if (nBet == '~') {
        //         ns = i + 2;
        //         break;
        //     }//
        //     if (nBet == '`') {
        //         ns = i + 2;
        //         break;
        //     }
        //     ///
        //     ///
        //
        //     let nstr2 = keys2[n + 1];
        //     if (flag1) {
        //         nstr2 = keys2[n + 2];
        //         flag1 = false;
        //     }
        //     if (i + 2 == keys2.length) {
        //         nstr2 = keys2[ns + 1];
        //     }
        //     if (i == 0 & cc == 0) {
        //         currstr = keys[g];
        //         nstr2 = keys2[ns + i];
        //         let c2 = currstr.split('-');
        //         currstr = c2[0].split(',');
        //
        //         //////////console.log('cstr: ' + parseInt(currstr[2]), parseInt(currstr[1]), parseInt(currstr[0]) + 1)
        //
        //     }
        //     dateo = new Date(parseInt(currstr[2]), parseInt(currstr[1]), parseInt(currstr[0]) + 1);
        //     nstr2 = nstr2.split('.');
        //     if (g == 1) {
        //         ////console.log('curr: ' + currstr + ' next: ' + nstr2);
        //     }
        //     daten = new Date(nstr2[2], nstr2[1], nstr2[0]);
        //     if (dateo > daten) {
        //
        //
        //         for (let j = 0; j < keys2.length; j++) {
        //             let knob = keys2[j].split('.');
        //             //////////console.log('knob: ' + knob);
        //             let ndaten = new Date(knob[2], knob[1], knob[0]);
        //             if (dateo < ndaten) {
        //                 needstr = knob;
        //                 needvar = j;
        //                 nextstr = keys2[j + 1].split('.');
        //                 // ////console.log('var: ' + needvar + ' str: ' + needstr + ' value: ' + table2[keys2[j]]);
        //                 break;
        //             }
        //         }
        //         nstr2 = needstr;
        //         // nstr2 = nstr2.split('.');
        //         flag1 = true;
        //     }
        //     let date4 = new Date(currstr[2], currstr[1], parseInt(currstr[0]) + 1);
        //     let date5 = new Date(nstr2[2], nstr2[1], nstr2[0]);
        //     lastD = new Date(parseInt(last[2]), parseInt(last[1]), parseInt(last[0]) + 1);
        //     if (dateo > date4) {
        //         date4 = dateo;
        //     }
        //     if (i == 0 & cc == 0) {
        //         date4 = new Date(currstr[2], currstr[1], currstr[0]);
        //         date5 = new Date(nstr2[2], nstr2[1], nstr2[0]);
        //     }
        //     if (g == 1) {
        //         //console.log(date5);
        //         //console.log(totalD);
        //         //console.log(date5 > totalD)
        //         //console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz');
        //     }
        //     if (date5 > totalD) {
        //         //console.log('i\'m here');
        //         nstr2 = (totals2[0]+29)+ '.'+ (parseInt(totals2[1]) + stop)+ '.'+ parseInt(totals2[2]);
        //         nstr2 = nstr2.split('.')
        //         //console.log('nstr2: '+ nstr2)
        //         date5 = new Date(parseInt(totals2[2]), (parseInt(totals2[1]) + stop), parseInt(totals2[0])+29);
        //         if(parseInt(totals2[0])>1){
        //             nstr2 = (parseInt(totals2[0])+29)+ '.'+ (parseInt(totals2[1]) + stop)+ '.'+ totals2[2]
        //             date5 = new Date(parseInt(totals2[2]), (parseInt(totals2[1]) + stop+1), parseInt(totals2[0]));
        //         }
        //         // //console.log('here: '+date5);
        //         i = keys2.length - 1;
        //     }
        //     let nnBet = table2[keys2[needvar + 2]];
        //     // console.log(nnBet);
        //     console.log(date5);
        //     console.log(totalD);
        //     console.log(date5 < totalD);
        //     console.log( ' bet: '+nnBet);
        //     console.log('igor igor igor igor igor igor igor igor igor igor igor igor igor igor igor igor igor ')
        //     if(date5 < totalD && nnBet == '~'){
        //         //console.log('i\'m here');
        //         let istop = parseInt(totals2[1]) + parseInt(stop);
        //         let iday = parseInt(totals2[0])+29;
        //         nstr2 = (iday)+ '.'+ istop + '.'+ (parseInt(totals2[2]));
        //         nstr2 = nstr2.split('.');
        //         console.log('nstr2: '+ nstr2);
        //         console.log('iday: ' + iday+ ' istop: '+ (istop)+ ' year: '+totals2[2]);
        //         date5 = new Date(parseInt(totals2[2]), (istop), parseInt(totals2[0])+29);
        //         if(parseInt(totals2[0])>1){
        //             nstr2 = iday+ '.'+ (istop)+ '.'+ totals2[2];
        //             date5 = new Date(iday, (istop+1), parseInt(totals2[0]));
        //         }
        //         // //console.log('here: '+date5);
        //         i = keys2.length - 1;
        //     }
        //     var totalsumm = 0;
        //     //////////////////////////console.log('penyato: ' + penyato)
        //     // ////console.log('cur: '+currstr + ' next: ' + nextstr + ' i: '+i)
        //     let cstr = keys2[ns + i];
        //     let nstr = "";
        //     let currc = currBet * 2;
        //     if (!radio2) {
        //         currc = currBet
        //     }
        //     let diff = findDaysLag(date5, date4);
        //     if (i > 0) {
        //         diff += 1;
        //     }
        //     penyato += parseInt(currArray[1]);
        //     penyato -= parseInt(currArray[2]);
        //     let penya = penyato * currc / 100 / 365 * diff;
        //     tvasya += penya;
        //     if (i == 0 && cc == 0) {
        //         i = -1;
        //
        //     }
        //     if (currstr[1] >= 7) {
        //         i = keys2.length - 1;
        //     }
        //     if (nstr2[1] == undefined) {
        //         break;
        //     }
        //     cc++;
        //     // ////console.log('-----------------------')
        //     // ////console.log('nstr: '+ nstr);
        //     // ////console.log(nstr2[0] + "." + (nstr2[1]) + "." + nstr2[2] );
        //     // ////console.log('////////////////////////')
        //     if (g == 1) {
        //         ////console.log(lastD);
        //         ////console.log(date4);
        //         ////console.log('``````````````````````````');
        //     }
        //     if (lastD == date4) {
        //
        //     } else {
        //         penya2text += "<table>" +
        //             "<tr>\n" +
        //             "    <th>" + (parseInt(currstr[0]) + 1) + "." + (currstr[1]) + "." + currstr[2] + " </th>\n" +
        //             "    <th>" + nstr2[0] + "." + (nstr2[1]) + "." + nstr2[2] + " </th>\n" +
        //             "    <th>" + diff + "</th>\n" +
        //             "    <th>" + penyato + "</th>\n" +
        //             "    <th>" + currBet + "</th>\n" +
        //             "    <th>" + currc + "</th>\n" +
        //             "    <th>" + penya.toFixed(2) + "</th>\n" +
        //             "   </tr>";
        //     }
        //     if (i + 1 == keys2.length) {
        //         penya2text += "<tr>\n" +
        //             "    <th>всього</th>\n" +
        //             "    <th>" + tvasya.toFixed(2) + "</th>\n" +
        //             "   </tr>";
        //     }
        //     countert += 12;
        // }
    }
    penyaTable2.innerHTML = (penya2text);
    penyaTable2.id = 'my-table7';
    document.getElementById('table-div').appendChild(penyaTable2);
    doc.autoTable({html: '#my-table7', styles: {cellPadding: 0.5, font: "NotoSansCJKjp-Regular"},});
    //doc.setFont('NotoSansCJKjp-Regular');

    // for(let i =0; i < )
    var perTable = document.createElement('table');
    let pertabletext = "";
    var totalper = 0.0;
    let tsum = 0.0;
    for (var i = 0; i < keys.length; i++) {
        if (i == 0) {
            pertabletext = "<table>" +
                "<tr>\n" +
                "    <th>Початкова дата</th>\n" +
                "    <th>кiнцева дата</th>\n" +
                "    <th>кiлькiсть днiв</th>\n" +
                "    <th>процентна ставка</th>\n" +
                "    <th>сума боргу</th>\n" +
                "    <th>проценти</th>\n" +
                "   </tr>";
        }
        let currArray2 = table[keys[i]];
        // if (keys.length <= 1) {
        //     totalsum = currArray[1] - currArray[2];
        // }

        let sum2 = parseInt(currArray2[1]);
        let msum2 = parseInt(currArray2[2]);
        sum2 += parseInt(tsum);
        //////////////////////////console.log('sum: ' + sum2 + ' msum: ' + msum2);
        sum2 -= msum2;
        //////////////////////////console.log('sum2: ' + sum2 + ' msum2: ' + msum2);
        //////////////////////////console.log('///////////////////////////');
        // totalsum = 0;
        let currstr = keys[i];
        currstr = currstr.split('-');
        let date1 = new Date(currstr[0]);
        let date2 = new Date(date3);
        let nextstr = keys[i + 1];
        if (i + 1 < keys.length) {

            nextstr = nextstr.split('-')
            date2 = new Date(nextstr[0]);
        } else {
            nextstr = date3.getDay() - 1 + '.' + (date3.getMonth() + 1) + '.' + date3.getFullYear();
            //////////////////////////////console.log('nextstrdsfsdf: ' + nextstr)
        }
        let currstr2 = currstr[0];
        currstr2 = currstr2.split(',');
        let nextstr2 = nextstr[0];
        if (i + 1 == keys.length) {
            nextstr2 = nextstr;
            nextstr2 = nextstr2.split('.');
        } else {
            nextstr2 = nextstr2.split(',');
        }

        //////////////////////////////console.log(currstr2 + ' next ' + nextstr2)
        let cmonth = currstr2[1];
        let cyear = currstr2[2];
        let cday = currstr2[0];
        let nmonth = nextstr2[1];
        let nyear = nextstr2[2];
        let nday = nextstr2[0];
        let currArray = table[keys[i]];
        let cDate = new Date(keys[i]);
        let str = cday + '.' + cmonth + '.' + cyear;
        ////////////////////////////////////////////console.log('sum: ' + isNaN(sum));
        ////////////////////////////////////////////console.log('threeper: ' + isNaN(threeper[i]))
        let answer = threeper[i];
        totalper += answer;
        let differenceDays = findDaysLag(date2, date1);
        let str2 = nday + '.' + nmonth + '.' + nyear;
        tsum += parseInt(currArray2[1]);
        if (differenceDays == 0) {
            differenceDays++;
        }
        pertabletext += "<tr>\n" +
            "    <th>" + str + "</th>\n" +
            "    <th>" + str2 + "</th>\n" +
            "    <th>" + differenceDays + "</th>\n" +
            "    <th>" + percent + "%</th>\n" +
            "    <th>" + sum2 + "</th>\n" +
            "    <th>" + answer.toFixed(2) + "</th>\n" +
            "   </tr>"


        if (i + 1 == size) {
            pertabletext += "</table>";
        }
        countert += 12;
    }
    pertabletext += "<tr>\n" +
        "    <th>всього</th>\n" +
        "    <th></th>\n" +
        "    <th></th>\n" +
        "    <th></th>\n" +
        "    <th></th>\n" +
        "    <th>" + totalper.toFixed(2) + "</th>\n" +
        "   </tr>"
    countert += 12;

    perTable.innerHTML = (pertabletext);
    perTable.id = 'my-table4';
    document.getElementById('table-div').appendChild(perTable);
    //doc.setFont('NotoSansCJKjp-Regular');
    doc.setFont('NotoSansCJKjp-Regular');
    doc.autoTable({html: '#my-table4', styles: {cellPadding: 0.5, font: "NotoSansCJKjp-Regular"},});
    doc.text('iнфляцiя: ' + totalI.toFixed(2), 15, countert - 10);
    doc.text('вiдсотки рiчних: ' + totalper.toFixed(2), 15, countert - 10 + 10);
    doc.text('пеня: ' + tvasya.toFixed(2), 15, countert - 10 + 20);
    ////////////////////////////////////////console.log(countert);
    let ckey = keys[0];
    ckey = ckey.split('-');
    let date = new Date(ckey[0])
    //////////////////////console.log(ckey[0])
    //////////////////////console.log(date3);
    //////////////////////console.log(date);
    //////////////////////console.log(term);
    total = 0;
    total += totalper + tvasya + totalI + totalS;
    doc.setFont('NotoSansCJKjp-Regular');
    doc.text(70, 10, 'итого: ' + total.toFixed(2));
    if (deadlineCheck(date3, term, date)) {
        alert('На жаль, срок позовної давності за зобов’язанням сплинув')
    } else {
        doc.save('table.pdf')
    }
}

function penyaDeadLinecalc(date1, deadline) {
    let penyadeadline = date1.getMonth() + stop + '.' + date1.getDay() + date1.getFullYear() + deadline;
    return penyadeadline;
}

function deadlineCheck(date2, term, date1) {
    let termDate = new Date(date2.getFullYear() - term, date2.getMonth(), date2.getDay() - 1);
    let ansFineSumm = 0;
    // if (date2 > penyadeadline) {
    //     ansFineSumm = 0;
    // }
    if (date1 < termDate) {
        return true;
    } else {
        return false;
    }

}

function penyaCalc(summPenya, daysForCalc, colKt, radio1, radio2) {
    let commonPenya = (Number(summPenya) / Number(daysForCalc + 2)).toFixed(2);
    let vasya = ((Number(colKt) * Number(commonPenya) * 2 / 100 / 365 * Number(daysForCalc))).toFixed(2);
    if (radio1.checked) {
        vasya = ((Number(colKt) * Number(commonPenya) / 100 / 365 * Number(daysForCalc))).toFixed(2);
    }
    vasyas.push(vasya);
    return vasya;
}

function findInflTerm(date1, date2, inflTerm) {
    let inflTermD = date1;
    let inflTermDn = date1;
    if (inflTerm != 0) {
        inflTermDn = new Date(date2.getFullYear() - inflTerm, date2.getMonth(), date2.getDay() - 1);
    }
    if (inflTermD > inflTermDn) {
        inflTermDn = inflTermD;
    }
    return inflTermDn;
}

function findTotalIndex(indexes) {
    let totalSum = 1.0;
    for (let v = 0; v < indexes.length; v++) {
        totalSum = indexes[v] / 100 * totalSum;
    }
    totalSum = totalSum;
    return totalSum;
}

var c3 = 1;

function drawInflation(date1, difference) {
    let indexesDraw = '';
    let indexesDrawa = [];
    date1 = new Date(date1);
    let futureYear = date1.getFullYear();
    let futureMonth = date1.getMonth() + 1;
    //////////////////////////console.log(futureMonth);
    for (let i = 0; i <= difference; i++) {
        if (futureMonth == 13) {
            futureYear++;
            futureMonth = 1;
        }
        let str = ('0' + futureMonth + '-' + futureYear);

        if (futureMonth >= 10) {
            str = (futureMonth + '-' + futureYear);
        }
        ////////////////////////////////////////////console.log('str: ' + str);
        ////////////////////////////////////////////console.log()
        try {

            indexesDraw += ((ShowIndexInflation(str).index) + '% ');
            indexesDrawa.push((ShowIndexInflation(str).index));

        } catch (e) {

            let str2 = (('0' + (futureMonth - c3) + '-' + futureYear));

            if (futureMonth >= 10) {
                str2 = ((futureMonth - c3 + '-' + futureYear));
            }
            //////////////////////////console.log('futureMonth: ' + futureMonth + ' c3: ' + c3);
            if (futureMonth == c3 || futureMonth < c3) {
                //////////////////////////console.log('here')
                futureMonth += c3;
                futureYear -= 1;
                str2 = (('0' + (futureMonth - c3) + '-' + futureYear));

                if (futureMonth >= 10) {
                    str2 = ((futureMonth - c3 + '-' + futureYear));
                }
            }
            //////////////////////////console.log('hi: ' + str2);
            indexesDraw += ((ShowIndexInflation(str2).index) + '% ');
            indexesDrawa.push((ShowIndexInflation(str2).index));
            c3++;
        }
        futureMonth++;

    }
    return {
        string: indexesDraw,
        array: indexesDrawa
    };
}

//TODO: decomment........

// document.addEventListener("DOMContentLoaded", ready);
// function ready() {
//     // alert('DOM готов');//
//     let d = new Date();
//     let day = d.getDate();
//     let month = d.getMonth() + 1;
//     let year = d.getFullYear();
//     let name_input = document.getElementById('finishDate');
//     let name_input2 = document.getElementById('startDate');
//     name_input.value = month + "." + day + "." + year;
//     if (day < 10 && month > 9) {
//         name_input.value = '0' + month + "." + day + "." + year;
//     }
//     if (day < 10 && month < 10) {
//         name_input.value = '0' + month + "." + '0' + day + "." + year;
//     }
//     name_input2.value = month + "." + day + "." + year;
//     if (day < 10 && month > 9) {
//         name_input2.value = '0' + month + "." + day + "." + year;
//     }
//     if (day < 10 && month < 10) {
//         name_input2.value = '0' + month + "." + '0' + day + "." + year;
//     }
//     // изображение ещё не загружено (если не было закешировано), так что размер будет 0x0
//     // alert(`Размер изображения: большой`);
// }
function findDaysLag(date2, date1) {
    let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    ////////////////////////console.log(daysLag)
    return daysLag;
}

function findDaysForCalculate(daysLag, stop) {
    let daysForCalc = 0;

    if (daysLag >= stop) {
        daysForCalc = stop;
    } else {
        daysForCalc = daysLag;
    }
    return daysForCalc;
}

var threeper = [];

function findThreePer(colKt, percent, date2, inflTermD) {
    let threepersum = 1;
    let smth = findDaysLag(date2, inflTermD);

    threepersum = colKt * (parseInt(percent) / 100) / 365 * (smth + 1);

    threeper.push(threepersum);
    ////////////////////console.log('colKt: ' + colKt + ' per: ' + percent + 'date: ' + ((date2 - inflTermD) / 60 / 60 / 24 / 1000));
    return threepersum;
}


var penyaV = [];
var ccc = 0;

function findPenalty(daysForCalc, futureYear, futureMonth, futureDay) {
    let summPenya = 0.0;
    let penyatext = [];
    //////////////console.log(futureDay+'.'+futureMonth+'.'+futureYear + '\n' + '/////////////////////////////');

    for (let i = daysForCalc; i >= 0; i--) {
        let penyadate = new Date(futureYear, futureMonth, futureDay);
        if (i % 365 == 0) {
            futureYear++;
            futureMonth = 1;

        }
        if (i % 31 == 0) {
            futureMonth++;
            futureDay = 1;

        }
        if (document.getElementById('penya-count').value == 0) {
            summPenya += ShowPenyPercent(penyadate).percent;
            penyatext[i] = (ShowPenyPercent(penyadate).percent);
            allPenyas.push(ShowPenyPercent(penyadate).percent);
            allPenyast.push(ShowPenyPercent(penyadate).data);
        } else {
            summPenya += parseFloat(document.getElementById('penya-count').value);
        }

        futureDay++;
        if (i - 1 < 0) {
            //////////////console.log('i: '+ i + ' i-1: '+ (i-1) + ' text: ' + allPenyast[i + allPenyast.length-1]);
            allPenyas.push('~');
            allPenyast.push('-' + ccc);
            //////////////console.log('i: '+ i + ' i-1: '+ (i-1) + ' text: ' + allPenyast[i + allPenyast.length-1]);
        }

    }
    ccc++;
    return {
        date: penyatext,
        percent: summPenya
    };
}

function findDifferenceM(date1, date2) {
    let differenceMonths;
    differenceMonths = date2.getMonth() - date1.getMonth() + (12 * (date2.getFullYear() - date1.getFullYear()));
    return differenceMonths;
}

var c2 = 0;

function inflArrayt(difference, futureMonth, futureYear) {
    let infltext = [];

    for (let i = 0; i <= difference; i++) {
        if (futureMonth == 13) {
            futureYear++;
            futureMonth = 1;
        }
        let str = ('0' + futureMonth + '-' + futureYear);

        if (futureMonth >= 10) {
            str = (futureMonth + '-' + futureYear);
        }


        futureMonth++;
        try {

            infltext.push((ShowIndexInflation(str).index));
            allIndexest.push((ShowIndexInflation(str).month));

        } catch (e) {

            let str2 = (('0' + (futureMonth - 2 - c2) + '-' + futureYear));
            ////////////////////////////console.log('0' + (futureMonth-2-c2) + '-' + futureYear);
            if (futureMonth >= 10) {
                str2 = ((futureMonth - 1 - c2 + '-' + futureYear));
            }
            ////////////////////////////console.log('hi: ' + str2);
            infltext.push((ShowIndexInflation(str2).index));
            allIndexest.push((ShowIndexInflation(str2).month));
            c2++;
        }
    }

    return infltext;
}

var c = 0;

function inflArrayv(difference, futureMonth, futureYear) {

    let indexes = [];

    for (let i = 0; i <= difference; i++) {
        if (futureMonth == 13) {
            futureYear++;
            futureMonth = 1;
        }
        let str = ('0' + futureMonth + '-' + futureYear);

        if (futureMonth >= 10) {
            str = (futureMonth + '-' + futureYear);
        }
        ////////////////////////////////////////////console.log('str: ' + str);
        ////////////////////////////////////////////console.log()
        // if(ShowIndexInflation(str) == undefined){
        //
        // }
        try {

            indexes.push((ShowIndexInflation(str).index));
            allIndexes.push((ShowIndexInflation(str).index));

        } catch (e) {

            let str2 = (('0' + (futureMonth - 1 - c) + '-' + futureYear));
            ////////////////////////////console.log('0' + (futureMonth-1-c) + '-' + futureYear);
            if (futureMonth >= 10) {
                str2 = ((futureMonth - 1 - c + '-' + futureYear));
            }
            ////////////////////////////console.log('hi: ' + str2);
            indexes.push((ShowIndexInflation(str2).index));
            allIndexes.push((ShowIndexInflation(str2).index));
            c++;
        }

        futureMonth++;

    }

    return indexes;
}

function addInput() {

    var newdiv = document.createElement('div');
    newdiv.innerHTML = " <input  class=\"main-input input-border col-lg-3\" id=\"col-doc" + currDate + "\" type=\"text\"  placeholder=\"Документ\"\n" +
        "                           data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\" title=\"\"\n" +
        "                           data-original-title=\"Назва та реквізити первинного документу у довільній формі\">\n" +
        "                    <input class=\"main-input input-border col-lg-3\" id=\"col-date" + currDate + "\" type=\"text\"\n" +
        "                           placeholder=\"Дата (ДД.ММ.РРРР)\" value=\"01.01.2016\" data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\"\n" +
        "                           title=\"\"\n" +
        "                           data-original-title=\"Дата <b>початку прострочення</b>, або дата фатичної оплати. В форматі: <b>ДД.ММ.РРРР</b>.<br><p class='text-warning'><b>УВАГА!!!</b> Дата початку прострочення не завжди співпадає з датою документа</p>\">\n" +
        "                    <input class=\"main-input input-border col-lg-3\" id=\"col-kt" + currDate + "\" type=\"text\"\n" +
        "                           placeholder=\"До cплати (грн.)\" value=\"1200\"  data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\"\n" +
        "                           title=\"\" data-original-title=\"Сума збільшення зобов'язання\">\n" +
        "                    <input class=\"main-input input-border col-lg-3\" id=\"col-dt" + currDate + "\" value='0' type=\"number\" placeholder=\"Сплата (грн.)\"\n" +
        "                           data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\" title=\"\"\n" +
        "                           data-original-title=\"Сума зменшення зобов'язання\"> <br>";
    document.getElementById('row').appendChild(newdiv);
    //////////////////////////////////////////////////console.log(document.querySelectorAll("[id^=col-date]"));
    currDate++;
}

var counterM = 0;
var table = {};

function todaySet() {

    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let name_input = document.getElementById('finishDate');
    name_input.value = day + "." + month + "." + year;
    if (day < 10 && month > 9) {
        name_input.value = '0' + day + "." + month + "." + year;
    }
    if (day < 10 && month < 10) {
        name_input.value = '0' + day + "." + '0' + month + "." + year;
    }

}

function parsingAllLines() {
    let rcounter = 0;
    for (let i = 0; i < currDate; i++) {

        let str = document.getElementById('col-date' + String(i)).value + '-' + rcounter;
        str = str.split('.');
        ////////////////////////////////console.log(str);
        let temp = str[0];
        str[0] = str[1];
        str[1] = temp;
        let date = new Date(str[2], str[1], str[0]);
        let kredit = document.getElementById('col-kt' + String(i)).value;
        let debit = document.getElementById('col-dt' + String(i)).value;
        let doc = document.getElementById('col-doc' + String(i)).value;
        table[str] = [doc, kredit, debit];
        rcounter++;
    }
}


function calculate() {
    let totaltotal = 0.0;
    var doc = new jsPDF();
    let inflTerm = document.getElementById('infl-term').value;
    let date4 = new Date(document.getElementById("startDate").value);
    let date3 = new Date(document.getElementById("finishDate").value);
    let term = document.getElementById("term").value;
    let percent = document.getElementById("percent").value;
    let deadline = document.getElementById("deadline").value;
    let deadlineStop = document.getElementById("deadline-stop").value;
    let totalpenya = 0.0;
    let penyaSumm = 0.0;
    let daysLag = 0;
    var indexes = [];
    let penyatext = [];
    let totals = [];
    let docs = [];
    let threePer = 0.0;
    let inflTermD = 0;
    let radio1 = document.getElementById("n1");
    let radio2 = document.getElementById("n2");
    // let radio3 = document.getElementById("n3");
    ////////////////////////////////////////console.log('1: ' + radio1.checked + ' 2: ' + radio2.checked);
    parsingAllLines();
    let differenceMonth = 0;
    let totalIndex = 0;
    let stop = deadlineStop / 2 * 61;
    // console.log('stop: ' + stop);
    let unique = [];
    const keys = Object.keys(table);

    for (let i = 0; i < keys.length; i++) {
        let currArray = table[keys[i]];
        let nextArray = table[keys[i + 1]];
        let colKt = currArray[1];
        let colDt = currArray[2];
        let daysForCalculate = 0;
        var infltext = [];
        docs.push(currArray[0]);
        let currstr = keys[i];
        currstr = currstr.split('-');

        let date1 = new Date(currstr[0]);

        let date2 = new Date(document.getElementById("finishDate").value);
        let inflDate = new Date();
        let futureMonth = date1.getMonth() + 1;
        let futureYear = date1.getFullYear();
        let futureDay = date1.getDay();
        if (i + 1 < keys.length) {
            let nextstring = keys[i + 1];
            nextstring = nextstring.split('-');
            date2 = new Date(nextstring[0]);
        }
        ////////////////////////////////////////////console.log('date1: ' + date1);
        ////////////////////////////////////////////console.log('date2: ' + date2);
        if (i > 0) {
            colKt = 0;
            for (let v = keys.length; v > 0; v--) {
                let fcurrarr = table[keys[v - 1]];
                colKt += parseInt(fcurrarr[1]);
                colKt = colKt - parseInt(fcurrarr[2]);
            }
        }
        ////////////////////////////////////////////console.log('colKt: ' + colKt);
        inflDate = findInflTerm(date1, date2, inflTerm);
        ////////////////////////////////////////////console.log('infldate: ' + inflDate);
        differenceMonth = findDifferenceM(inflDate, date2); //сли что-то не так findDifferenceM(inflDate, date2);
        ////////////////////////////////////////////console.log(differenceMonth);
        indexes = inflArrayv(differenceMonth, futureMonth, futureYear);
        infltext = inflArrayt(differenceMonth, futureMonth, futureYear);
        totalIndex = findTotalIndex(indexes);
        daysLag = findDaysLag(date2, date1);
        daysForCalculate = findDaysForCalculate(daysLag, stop);
        ////////////////console.log('days4calc: '+daysForCalculate);

        let table3 = {};
        table3 = findPenalty(daysForCalculate, futureYear, futureMonth, futureDay);
        penyaSumm = table3.percent;
        penyatext = table3.date;
        penyatext = getUnique(penyatext);
        totalpenya = penyaCalc(penyaSumm, daysForCalculate, colKt, radio1, radio2);
        threePer = findThreePer(colKt, percent, date2, inflDate);
        penyaV = getUnique(penyaV);
        var currTotal = totalCalculate(totalpenya, threePer, totalIndex, colKt);

        let penyadeadline = 0;
        penyadeadline = penyaDeadLinecalc(date1, deadline);

    }
    let total = 0.0;
    for (let i = 0; i < totals.length; i++) {
        total += parseFloat(totals[i]);
        ////////////////////////////////////////////console.log('total: ' + total);
    }
    if (deadlineCheck(date3, term, date4)) {
        total = "srok davnosti splinuv";
    }

    for (let i = 0; i < allPenyast.length; i++) {
        table2[allPenyast[i]] = allPenyas[i];
        if (i + 1 == allPenyas.length) {
            table2['`'] = '`';
        }
        ////////////console.log('text: '+allPenyast[i] + ' value: '+ allPenyas[i] + ' i: '+i);
    }
    //////////////console.log('----------------------------------------');
    var keys2 = Object.keys(table2);
    for (let i = 0; i < keys2.length; i++) {
        ////////////console.log('text: '+ keys2[i] + ' v: '+ table[keys2[i]] + ' i: '+ i);
    }
    drawPdf(infltext, doc, table, penyatext, date3, percent, currTotal, totalIndex, date3, radio1, radio2, keys2, term, deadlineStop);

    counterM++;
}