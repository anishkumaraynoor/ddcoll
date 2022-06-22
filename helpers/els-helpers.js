




module.exports = {
    elsWork: (data) => {

       
        
        var obfulllist = Array()
        obfulllist = data.obfulllist.split(',');
        var eventlist = Array()
        eventlist = data.eventlist.split(',');
        var leavefromlist = Array()
        leavefromlist = data.leavefromlist.split(',');
        var leavetolist = Array()
        leavetolist = data.leavetolist.split(',');
        
       
        

        var elsdata = Array()
        
        for (j=0; j<obfulllist.length; j++) {

            elsdata [j] = 
                {
                    obfull: obfulllist[j],
                    event: eventlist[j],
                    leavefrom: leavefromlist[j],
                    leaveto: leavetolist[j],
                   
                }
                    
        }

        
        return new Promise(async (resolve, reject) => {
           
            resolve(elsdata)
            
        }) 
          
        
    }
}