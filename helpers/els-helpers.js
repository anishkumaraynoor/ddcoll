




module.exports = {
    elsWork: (data) => {

        var oblist = Array();
        var creditfromlist = Array();
        var credittolist = Array();
        var creditdayslist = Array();
        var creditlist = Array();
        var totallist = Array();
        var eventlist = Array();
        var leavefromlist = Array();
        var leavetolist = Array();
        var leavedayslist = Array();
        var cblist = Array();
        var cbdatelist = Array();
        oblist = data.oblist.split(',');
        creditfromlist = data.creditfromlist.split(',');
        credittolist = data.credittolist.split(',');
        creditdayslist = data.creditdayslist.split(',');
        creditlist = data.creditlist.split(',');
        totallist = data.totallist.split(',');
        eventlist = data.eventlist.split(',');
        leavefromlist = data.leavefromlist.split(',');
        leavetolist = data.leavetolist.split(',');
        leavedayslist = data.leavedayslist.split(',');
        cblist = data.cblist.split(',');
        cbdatelist = data.cbdatelist.split(',');
        
       
        

        var elsdata = Array()
        
        for (j=0; j<oblist.length; j++) {

            elsdata [j] = 
                {
                    ob: oblist[j],
                    creditfrom: creditfromlist[j],
                    creditto: credittolist[j],
                    creditdays: creditdayslist[j],
                    credit: creditlist[j],
                    total: totallist[j],
                    event: eventlist[j],
                    leavefrom: leavefromlist[j],
                    leaveto: leavetolist[j],
                    leavedays: leavedayslist[j],
                    cb: cblist[j],
                    cbdate: cbdatelist[j]
                }
                    
        }

        
        return new Promise(async (resolve, reject) => {
           
            resolve(elsdata)
            
        }) 
          
        
    }
}