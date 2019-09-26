//カレンダー生成用

const weeks=["日","月","火","水","木","金","土"];
const date=new Date();
const thisYear=date.getFullYear();
const thisMonth=date.getMonth()+1;
const today=date.getDate();

var year=thisYear;
var month=thisMonth;

var startDate = new Date(year, month - 1, 1);
var endDate = new Date(year, month,  0);
var endDayCount = endDate.getDate();
var startDay = startDate.getDay();

var daycount=1;

var aweek=[];


calendar.setHead(year+" / "+month);

for(var i=0;i<weeks.length;i++){
    calendar.setWeek(i,weeks[i]);
}

for(var week=0;week<6;week++){
    aweek=[];

    for(var day=0;day<7;day++){
        if(week==0 && day<startDay){
            aweek.push("");
        }else if(daycount>endDayCount){
            aweek.push("");
        }else{
            aweek.push(daycount.toString(10));
            daycount++;
        }
    }

    calendar.setTd(aweek);
}