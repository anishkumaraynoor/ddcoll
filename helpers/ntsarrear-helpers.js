




module.exports = {
    arrearWork: (data) => {


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

        var revpay = data.revpay;
        var first = data.first;
        var second = data.second;
        var third = data.third;
        var fourth = data.fourth;
        var fifth = data.fifth;
        var sixth = data.sixth;

        var oldpay = data.oldpay;
        var oldfirst = data.oldfirst;
        var oldsecond = data.oldsecond;
        var oldthird = data.oldthird;
        var oldfourth = data.oldfourth;
        var oldfifth = data.oldfifth;
        var oldsixth = data.oldsixth;

        var oldagp = data.oldagp;
        var oldagpfirst = data.oldagpfirst;
        var oldagpsecond = data.oldagpsecond;
        var oldagpthird = data.oldagpthird;
        var oldagpfourth = data.oldagpfourth;
        var oldagpfifth = data.oldagpfifth;
        var oldagpsixth = data.oldagpsixth;

        var revdate = new Date(data.revdate).getTime() - 86400000;
        var firstdate = new Date(data.firstdate).getTime() - 86400000;
        var seconddate = new Date(data.seconddate).getTime() - 86400000;
        var thirddate = new Date(data.thirddate).getTime() - 86400000;
        var fourthdate = new Date(data.fourthdate).getTime() - 86400000;
        var fifthdate = new Date(data.fifthdate).getTime() - 86400000;
        var sixthdate = new Date(data.sixthdate).getTime() - 86400000;
        
        var oldrevdate = new Date(data.oldrevdate).getTime() - 86400000;
        var oldfirstdate = new Date(data.oldfirstdate).getTime() - 86400000;
        var oldseconddate = new Date(data.oldseconddate).getTime() - 86400000;
        var oldthirddate = new Date(data.oldthirddate).getTime() - 86400000;
        var oldfourthdate = new Date(data.oldfourthdate).getTime() - 86400000;
        var oldfifthdate = new Date(data.oldfifthdate).getTime() - 86400000;
        var oldsixthdate = new Date(data.oldsixthdate).getTime() - 86400000;


        var basicpay = [revpay, first, second, third, fourth, fifth, sixth];
        var oldbasicpay = [oldpay, oldfirst, oldsecond, oldthird, oldfourth, oldfifth, oldsixth]
        var oldbasicagp = [oldagp, oldagpfirst, oldagpsecond, oldagpthird, oldagpfourth, oldagpfifth, oldagpsixth]
        var paydates = [revdate, firstdate, seconddate, thirddate, fourthdate, fifthdate, sixthdate, sixthdate + 31536000000];
        var oldpaydates = [oldrevdate, oldfirstdate, oldseconddate, oldthirddate, oldfourthdate, oldfifthdate, oldsixthdate, oldsixthdate + 31536000000];
        if(data.joiningdate){
            basicpay = [0, revpay, first, second, third, fourth, fifth];
            oldbasicpay = [0, oldpay, oldfirst, oldsecond, oldthird, oldfourth, oldfifth]
            oldbasicagp = [0, oldagp, oldagpfirst, oldagpsecond, oldagpthird, oldagpfourth, oldagpfifth]
            paydates = [1451520000000, revdate, firstdate, seconddate, thirddate, fourthdate, fifthdate, sixthdate];
            oldpaydates = [1451520000000, oldrevdate, oldfirstdate, oldseconddate, oldthirddate, oldfourthdate, oldfifthdate, oldsixthdate];
        }

        var dadates = [1451520000000, 1467244800000, 1483142400000, 1498780800000, 1514678400000, 1530316800000, 1546214400000, 1561852800000, 1577750400000, 1593475200000, 1609372800000, 1614470400000, 1625011200000]
        var das = [0, 2, 4, 5, 7, 9, 12, 17, 21, 24, 28, 28]
        var olddas = [125, 132, 136, 139, 142, 148, 154, 164, 174, 182, 182, 182]
        var daclaimed = data.daclaimed;
        for(i=0;i<olddas.length-1;i++){
            if(olddas[i] > daclaimed){
                olddas[i] = daclaimed
            }  
        }

        var items = Array()
        var total = Array()
        var monthfrom = new Date(data.monthfrom).getMonth()+1;
        var yearfrom = new Date(data.monthfrom).getFullYear();
        var monthto = new Date(data.monthto).getMonth()+1;
        var yearto = new Date(data.monthto).getFullYear();
        var month = monthfrom;
        var year = yearfrom;

        var totalduepay = 0;
        var totaldueda = 0;
        var totaldrawnda = 0;
        var totaldrawnpay = 0;
        var totalbalancepay = 0;
        var totalbalanceda = 0;
        var totalbalancetotal = 0;
        
        var n = (yearto-yearfrom)*12+monthto-monthfrom+1;

        for (j=0; j<n; j++) {

            var days = new Date(year, month, 0).getDate();
            var day = 1;
            var pay = 0;
            var payold = 0;
            var agpold = 0;
            for (; day <= days;) {
                var date = new Date(year, month - 1, day);
                var paydate = date.getTime();

                for (var i = 0; i < paydates.length; i++) {
                    if (paydate >= paydates[i] && paydate < paydates[i + 1]) {
                        var daypay = basicpay[i] / days;
                    }
                }
                for (var i = 0; i < oldpaydates.length; i++) {
                    if (paydate >= oldpaydates[i] && paydate < oldpaydates[i + 1]) {
                        var dayoldpay = oldbasicpay[i] / days;
                        var dayoldagp = oldbasicagp[i] / days;
                    }
                }


                var lwafactor = 1;
                for (var i = 0; i < fielddates.length;) {
                    if (paydate >= fielddates[i] && paydate <= fielddates[i + 1]+86400000) {
                        lwafactor = 0;
                        i = fielddates.length;
                    }
                    i=i+2;
                }

                var hplfactor = 1;
                for (var i = 0; i < hpldates.length;) {
                    if (paydate >= hpldates[i] && paydate <= hpldates[i + 1]+86400000) {
                        hplfactor = 0.5;
                        i = hpldates.length;
                    }
                    i=i+2;
                }

                pay = eval(pay + "+" + daypay + "*" + lwafactor + "*" + hplfactor);
                payold = eval(payold + "+" + dayoldpay + "*" + lwafactor + "*" + hplfactor);
                agpold = eval(agpold + "+" + dayoldagp + "*" + lwafactor + "*" + hplfactor);
                day = day + 1;
            }



            var dateda = new Date(year, month - 1, 1);
            var dadate = dateda.getTime();
            for (var i = 0; i < dadates.length; i++) {
                if (dadate >= dadates[i] && dadate < dadates[i + 1]) {
                    var da = das[i];
                    var oldda = olddas[i];
                    i = dadates.length;
                }
            }

            


            var duepay = Math.round(pay);
            var drawnpay = Math.round(payold + agpold);
            var dueda = Math.round(duepay * eval(da) / 100);
            var drawnda = Math.round(drawnpay * eval(oldda) / 100);
            var balancepay = Math.round(duepay - drawnpay);
            var balanceda = Math.round(dueda - drawnda);
            var balancetotal = Math.round(balancepay + balanceda);

            var monthyear = month+"/"+year;

            items [j] = 
                {
                    month: monthyear,
                    duepay: duepay,
                    dueda: dueda,
                    drawnda: drawnda,
                    drawnpay: drawnpay,
                    balancepay: balancepay,
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
            totaldueda = totaldueda + dueda;
            totaldrawnpay = totaldrawnpay + drawnpay;
            totaldrawnda = totaldrawnda + drawnda;
            totalbalancepay = totalbalancepay + balancepay;
            totalbalanceda = totalbalanceda + balanceda;
            totalbalancetotal = totalbalancetotal + balancetotal;
            
        }

        total = [
            {
                totalduepay: totalduepay,
                totaldueda: totaldueda,
                totaldrawnda: totaldrawnda,
                totaldrawnpay: totaldrawnpay,
                totalbalancepay: totalbalancepay,
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