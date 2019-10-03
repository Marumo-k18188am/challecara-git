//カレンダー生成用

const date=new Date();

const weeks=["日","月","火","水","木","金","土"];
const today=date.getDate();


function createCalendar(year,month){

    var startDate = new Date(year, month - 1, 1);
    var endDate = new Date(year, month,  0);
    var endDayCount = endDate.getDate();
    var startDay = startDate.getDay();

    var daycount=1;

    var aweek=[];
    var classes=[];

    calendar.init();
    calendar.setHead(year+" / "+("00"+month).slice(-2));

    for(var i=0;i<weeks.length;i++){
        if(i===0)calendar.addWeek({weekname:weeks[i],class:["sunday"]});
        else if(i===6)calendar.addWeek({weekname:weeks[i],class:["saturday"]});
        else calendar.addWeek({weekname:weeks[i],class:["weekday"]});
    }

    for(var week=0;week<6;week++){
        aweek=[];

        for(var day=0;day<7;day++){
            if(week===0 && day<startDay){
                aweek.push({daynum:"",class:["weekday"]});
            }else if(daycount>endDayCount){
                if(day===0) break;
                else aweek.push({daynum:"",class:["weekday"]});
            }else{
                classes=[];
                if(year===thisYear&&month===thisMonth&&daycount===today)classes.push("today");

                if(day===0)classes.push("sunday");
                else if(day===6) classes.push("saturday");
                else classes.push("weekday");
                
                aweek.push({daynum:daycount,class:classes});
                daycount++;
            }
        }

        calendar.addTd(aweek);
    }
}

