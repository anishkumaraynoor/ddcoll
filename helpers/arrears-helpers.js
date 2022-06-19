




module.exports = {
    arrearsWork: (data) => {

        var fieldnames = data.fieldnames.split(',');
        var fielddates = Array();
        for(k=0;k<fieldnames.length;k++){
            fielddates[k] = new Date(fieldnames[k]).getTime() - 86400000;
        }

        var hplnames = data.hplnames.split(',');
        var hpldates = Array();
        for(l=0;l<hplnames.length;l++){
            hpldates[l] = new Date(hplnames[l]).getTime() - 86400000;
        }

        var dateone = new Date(data.dateone).getTime() - 86400000;
        var datetwo = new Date(data.datetwo).getTime() - 86400000;
        var datethree = new Date(data.datethree).getTime() - 86400000;
        var datefour = new Date(data.datefour).getTime() - 86400000;
        var datefive = new Date(data.datefive).getTime() - 86400000;
        var datesix = new Date(data.datesix).getTime() - 86400000;
        var dateseven = new Date(data.dateseven).getTime() - 86400000;
        var dateeight = new Date(data.dateeight).getTime() - 86400000;
        var datenine = new Date(data.datenine).getTime() - 86400000;
        var dateten = new Date(data.dateten).getTime() - 86400000;
        var olddateone = new Date(data.dateone).getTime() - 86400000;
        var olddatetwo = new Date(data.datetwo).getTime() - 86400000;
        var olddatethree = new Date(data.datethree).getTime() - 86400000;
        var olddatefour = new Date(data.datefour).getTime() - 86400000;
        var olddatefive = new Date(data.datefive).getTime() - 86400000;
        var olddatesix = new Date(data.datesix).getTime() - 86400000;
        var olddateseven = new Date(data.dateseven).getTime() - 86400000;
        var olddateeight = new Date(data.dateeight).getTime() - 86400000;
        var olddatenine = new Date(data.datenine).getTime() - 86400000;
        var olddateten = new Date(data.dateten).getTime() - 86400000;
        var hcdateone = new Date(data.hcdateone).getTime() - 86400000;
        var hcdatetwo = new Date(data.hcdatetwo).getTime() - 86400000;
        var hcdatethree = new Date(data.hcdatethree).getTime() - 86400000;
        var hcdatefour = new Date(data.hcdatefour).getTime() - 86400000;
        var hcdatefive = new Date(data.hcdatefive).getTime() - 86400000;
        var oldhcdateone = new Date(data.oldhcdateone).getTime() - 86400000;
        var oldhcdatetwo = new Date(data.oldhcdatetwo).getTime() - 86400000;
        var oldhcdatethree = new Date(data.oldhcdatethree).getTime() - 86400000;
        var oldhcdatefour = new Date(data.oldhcdatefour).getTime() - 86400000;
        var oldhcdatefive = new Date(data.oldhcdatefive).getTime() - 86400000;
        

        var basicpay = [data.payone, data.paytwo, data.paythree, data.payfour, data.payfive, data.paysix, data.payseven, data.payeight, data.paynine, data.payten];
        var oldbasicpay = [data.oldpayone, data.oldpaytwo, data.oldpaythree, data.oldpayfour, data.oldpayfive, data.oldpaysix, data.oldpayseven, data.oldpayeight, data.oldpaynine, data.oldpayten];
        var basicagp = [data.agpone, data.agptwo, data.agpthree, data.agpfour, data.agpfive, data.agpsix, data.agpseven, data.agpeight, data.agpnine, data.agpten];
        var oldbasicagp = [data.oldagpone, data.oldagptwo, data.oldagpthree, data.oldagpfour, data.oldagpfive, data.oldagpsix, data.oldagpseven, data.oldagpeight, data.oldagpnine, data.oldagpten];
        var paydates = [dateone, datetwo, datethree, datefour, datefive, datesix, dateseven, dateeight, datenine, dateten, dateten + 31536000000];
        var oldpaydates = [olddateone, olddatetwo, olddatethree, olddatefour, olddatefive, olddatesix, olddateseven, olddateeight, olddatenine, olddateten, olddateten + 31536000000];
        var dadates = [1293753600000, 1309392000000, 1325289600000, 1341014400000, 1356912000000, 1372550400000, 1388448000000, 1404086400000, 1419984000000, 1435622400000, 1451520000000, 1467244800000, 1483142400000, 1498780800000, 1514678400000, 1530316800000, 1546214400000, 1561852800000, 1577750400000, 1593475200000, 1609372800000, 1625011200000];
        var darates = [data.daone, data.datwo, data.dathree, data.dafour, data.dafive, data.dasix, data.daseven, data.daeight, data.danine, data.daten, data.daeleven, data.datwelve, data.dathirteen, data.dafourteen, data.dafifteen, data.dasixteen, data.daseventeen, data.daeighteen, data.danineteen, data.datwenty, data.datwentyone, data.datwentytwo];
        var olddarates = [data.olddaone, data.olddatwo, data.olddathree, data.olddafour, data.olddafive, data.olddasix, data.olddaseven, data.olddaeight, data.olddanine, data.olddaten, data.olddaeleven, data.olddatwelve, data.olddathirteen, data.olddafourteen, data.olddafifteen, data.olddasixteen, data.olddaseventeen, data.olddaeighteen, data.olddanineteen, data.olddatwenty, data.olddatwentyone, data.olddatwentytwo];
        var hcdates = [hcdateone, hcdatetwo, hcdatethree, hcdatefour, hcdatefive, hcdatefive + 31536000000];
        var oldhcdates = [oldhcdateone, oldhcdatetwo, oldhcdatethree, oldhcdatefour, oldhcdatefive, oldhcdatefive + 31536000000];
        var basichra = [data.hraone, data.hratwo, data.hrathree, data.hrafour, data.hrafive];
        var basiccca = [data.ccaone, data.ccatwo, data.ccathree, data.ccafour, data.ccafive];
        var oldbasichra = [data.oldhraone, data.oldhratwo, data.oldhrathree, data.oldhrafour, data.oldhrafive];
        var oldbasiccca = [data.oldccaone, data.oldccatwo, data.oldccathree, data.oldccafour, data.oldccafive];
       
        

        var items = Array()
        var total = Array()
        var monthfrom = new Date(data.monthfrom).getMonth()+1;
        var yearfrom = new Date(data.monthfrom).getFullYear();
        var monthto = new Date(data.monthto).getMonth()+1;
        var yearto = new Date(data.monthto).getFullYear();
        var totalduepay = 0;
        var totaldueagp = 0;
        var totalduehra = 0;
        var totalduecca = 0;
        var totaldueda = 0;
        var totaldrawnpay = 0;
        var totaldrawnagp = 0;
        var totaldrawnhra = 0;
        var totaldrawncca = 0;
        var totaldrawnda = 0;
        var totalbalancepay = 0;
        var totalbalanceagp = 0;
        var totalbalancehra = 0;
        var totalbalancecca = 0;
        var totalbalanceda = 0;
        var totalbalancetotal = 0;  
        var months = (yearto-yearfrom)*12+monthto-monthfrom+1;
        var month = monthfrom;
        var year = yearfrom;
        for (j=0; j<months; j++) {
            var days = new Date(year, month, 0).getDate();
            var pay = 0;
            var agp = 0;
            var da = 0;
            var payold = 0;
            var agpold = 0;
            var daold = 0;
            var hra = 0;
            var cca = 0;
            var hraold = 0;
            var ccaold = 0;


            for (var day = 1; day <= days; day++) {
                var date = new Date(year, month - 1, day);
                var paydate = date.getTime();

                for (var i = 0; i < paydates.length; i++) {
                    if(isNaN(paydates[i+1])==true){paydates[i+1] = paydates[i]+31536000000}
                    if (paydate >= paydates[i] && paydate <= paydates[i + 1]) {
                        var daypay = basicpay[i] / days;
                        var dayagp = basicagp[i] / days;
                        var basics = basicpay[i] + basicagp[i];
                        i = paydates.length;
                    }
                }
                for (var i = 0; i < oldpaydates.length; i++) {
                    if(isNaN(oldpaydates[i+1])==true){oldpaydates[i+1] = oldpaydates[i]+31536000000}
                    if (paydate >= oldpaydates[i] && paydate <= oldpaydates[i + 1]) {
                        var dayoldpay = oldbasicpay[i] / days;
                        var dayoldagp = oldbasicagp[i] / days;
                        var oldbasics = oldbasicpay[i] + oldbasicagp[i];
                        i = oldpaydates.length;
                    }
                }

                
                for (var i = 0; i < dadates.length; i++) {
                    if(isNaN(dadates[i+1])==true){dadates[i+1] = dadates[i]+31536000000}
                    if (paydate >= dadates[i] && paydate <= dadates[i + 1]) {
                        var dayda = (daypay + dayagp) * darates[i]/100;
                        var dayoldda = (dayoldpay + dayoldagp) * olddarates[i]/100;
                        var revisiondate = new Date(data.revisiondate).getTime() - 86400000;
                        if(paydate >= revisiondate){
                            dayoldda = (dayoldpay + dayoldagp) * darates[i]/100;
                        }
                        i = dadates.length;
                    }
                }


                for (var i = 0; i < hcdates.length; i++) {
                    if(isNaN(hcdates[0])==true){hcdates[0] = 1293753600000}
                    if(isNaN(hcdates[i+1])==true){hcdates[i+1] = hcdates[i]+315360000000}
                    if (paydate >= hcdates[i] && paydate <= hcdates[i + 1]) {
                        var dayhra = basichra[i] / days;
                        var daycca = basiccca[i] / days;
                        i = hcdates.length;
                    }
                }
                for (var i = 0; i < oldhcdates.length; i++) {
                    if(isNaN(oldhcdates[0])==true){oldhcdates[0] = 1293753600000}
                    if(isNaN(oldhcdates[i+1])==true){oldhcdates[i+1] = oldhcdates[i]+315360000000}
                    if (paydate >= oldhcdates[i] && paydate <= oldhcdates[i + 1]) {
                        var dayoldhra = oldbasichra[i] / days;
                        var dayoldcca = oldbasiccca[i] / days;
                        i = oldhcdates.length;
                    }
                }

                var lwafactor = 1;
                for (var i = 0; i < fielddates.length;i=i+2) {
                    if (paydate > fielddates[i] && paydate <= fielddates[i + 1]+86400000) {
                        lwafactor = 0;
                        i = fielddates.length;
                    }  
                }
                var hplfactor = 1;
                for (var i = 0; i < hpldates.length;i=i+2) {
                    if (paydate > hpldates[i] && paydate <= hpldates[i + 1]+86400000) {
                        hplfactor = 0.5;  
                        i = hpldates.length;
                    }   
                }




                var hpldafactor = hplfactor;
                if(basics < 25200){
                    hpldafactor = 1;
                }else if(basics < 42500){
                    if(paydate-86400000 > 1404086400000){
                        hpldafactor = 1;
                    }
                }else if(basics < 50200){
                    if(paydate-86400000 > 1561852800000 && data.daeighteen == 0){
                        hpldafactor = 1;
                    }
                } 




                var oldhpldafactor = hplfactor;
                if(oldbasics < 25200){
                    oldhpldafactor = 1;
                }else if(oldbasics < 42500){
                    if(paydate-86400000 > 1404086400000){
                        oldhpldafactor = 1;
                    }
                }else if(oldbasics < 50200){
                    if(paydate-86400000 > 1561852800000 && data.olddaeighteen == 0){
                        oldhpldafactor = 1;
                    }
                } 




                pay = eval(pay + "+" + daypay + "*" + lwafactor + "*" + hplfactor);
                agp = eval(agp + "+" + dayagp + "*" + lwafactor + "*" + hplfactor);
                hra = eval(hra + "+" + dayhra);
                cca = eval(cca + "+" + daycca);
                da = eval(da + "+" + dayda + "*" + lwafactor + "*" + hpldafactor);
                payold = eval(payold + "+" + dayoldpay + "*" + lwafactor + "*" + hplfactor);
                agpold = eval(agpold + "+" + dayoldagp + "*" + lwafactor + "*" + hplfactor);
                hraold = eval(hraold + "+" + dayoldhra);
                ccaold = eval(ccaold + "+" + dayoldcca);
                daold = eval(daold + "+" + dayoldda + "*" + lwafactor + "*" + oldhpldafactor);  
            }



            


            var duepay = Math.round(pay);
            var drawnpay = Math.round(payold);
            var dueagp = Math.round(agp);
            var drawnagp = Math.round(agpold);
            var duehra = Math.round(hra);
            var drawnhra = Math.round(hraold);
            var duecca = Math.round(cca);
            var drawncca = Math.round(ccaold);
            var dueda = Math.round(da);
            var drawnda = Math.round(daold);
            var balancepay = Math.round(duepay - drawnpay);
            var balanceagp = Math.round(dueagp - drawnagp);
            var balancehra = Math.round(duehra - drawnhra);
            var balancecca = Math.round(duecca - drawncca);
            var balanceda = Math.round(dueda - drawnda);
            var balancetotal = Math.round(balancepay + balanceagp + balancehra + balancecca + balanceda);
            var monthyear = month+"/"+year;

            items [j] = 
                {
                    month: monthyear,
                    duepay: duepay,
                    dueagp: dueagp,
                    duehra: duehra,
                    duecca: duecca,
                    dueda: dueda,
                    drawnpay: drawnpay,
                    drawnagp: drawnagp,
                    drawnhra: drawnhra,
                    drawncca: drawncca,
                    drawnda: drawnda,
                    balancepay: balancepay,
                    balanceagp: balanceagp,
                    balancehra: balancehra,
                    balancecca: balancecca,
                    balanceda: balanceda,
                    balancetotal: balancetotal
                }
                if(month==12){
                    month=1;
                    year=year+1;
                }else{
                    month=month+1;
                }
                
            totalduepay = totalduepay + duepay;
            totaldueagp = totaldueagp + dueagp;
            totalduehra = totalduehra + duehra;
            totalduecca = totalduecca + duecca;
            totaldueda = totaldueda + dueda;
            totaldrawnpay = totaldrawnpay + drawnpay;
            totaldrawnagp = totaldrawnagp + drawnagp;
            totaldrawnhra = totaldrawnhra + drawnhra;
            totaldrawncca = totaldrawncca + drawncca;
            totaldrawnda = totaldrawnda + drawnda;
            totalbalancepay = totalbalancepay + balancepay;
            totalbalanceagp = totalbalanceagp + balanceagp;
            totalbalancehra = totalbalancehra + balancehra;
            totalbalancecca = totalbalancecca + balancecca;
            totalbalanceda = totalbalanceda + balanceda;
            totalbalancetotal = totalbalancetotal + balancetotal;      
        }





        total = [
            {
                totalduepay: totalduepay,
                totaldueagp: totaldueagp,
                totalduehra: totalduehra,
                totalduecca: totalduecca,
                totaldueda: totaldueda,
                totaldrawnpay: totaldrawnpay,
                totaldrawnagp: totaldrawnagp,
                totaldrawnhra: totaldrawnhra,
                totaldrawncca: totaldrawncca,
                totaldrawnda: totaldrawnda,
                totalbalancepay: totalbalancepay,
                totalbalanceagp: totalbalanceagp,
                totalbalancehra: totalbalancehra,
                totalbalancecca: totalbalancecca,
                totalbalanceda: totalbalanceda,
                totalbalancetotal: totalbalancetotal
            }
        ]


        var grand = 
            {
                items: items,
                total: total
            }
        
        
        
        return new Promise(async (resolve, reject) => {
            resolve(grand)
            
        }) 
          
        
    }
}