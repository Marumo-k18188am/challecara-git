"use strict";
const date=new Date();

const thisYear=date.getFullYear();
const thisMonth=date.getMonth()+1;

const weeks=["日","月","火","水","木","金","土"];
const today=date.getDate();


var year=thisYear;
var month=thisMonth;

//ページ描画
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        createCalendar(year,month);
    }
});

//カレンダー生成
const calendar=new Vue({
    el:"#calendar",
    data:{
        head:"",
        date:{},
        weeks:[],
        td:[],
        selectedDay:-1
    },
    methods:{

        addWeek(week){
            this.weeks.push(week);
        },

        addTd(aweek){
            this.td.push(aweek);
        },

        init(){
            this.head="";
            this.weeks=[];
            this.td=[];
            this.selectedDay=-1;
        },

        setHead(head){
            this.head=head;
        },

        tdClicked(year,month,day,disabled,schedules){
            if(year&&month&&day){
                this.selectedDay=day;
                createTimeSchedule(year,month,day,disabled,schedules);
            }
        },
        
        toNextMonth(){
            month++;
            if(month>12){
                year++;
                month=1;
            }
            createCalendar(year,month);
        },
        
        toLastMonth(){
            month--;
            if(month<1){
                year--;
                month=12;
            }
            createCalendar(year,month);
        },

        toThisMonth(){
            year=thisYear;
            month=thisMonth;
            createCalendar(year,month);
        }
    }
});

function createCalendar(year,month){

    var startDate = new Date(year, month - 1, 1);
    var endDate = new Date(year, month,  0);
    var endDayCount = endDate.getDate();
    var startDay = startDate.getDay();

    var daycount=1;

    var aweek=[];
    var classes=[];
    var schedules=[];


    calendar.init();
    calendar.setHead(year+" / "+("00"+month).slice(-2));

    db.collection("users").doc(userData.getUserId()).collection("schedules").get().then(function(querySnapshot) {
        var docs=querySnapshot.docs;
        docs.forEach((doc)=>{
            schedules.push({id:doc.id,data:doc.data()});
        });

        for(var i=0;i<weeks.length;i++){
            if(i===0)calendar.addWeek({weekname:weeks[i],class:["sunday"]});
            else if(i===6)calendar.addWeek({weekname:weeks[i],class:["saturday"]});
            else calendar.addWeek({weekname:weeks[i],class:["weekday"]});
        }
    
        for(var week=0;week<6;week++){
            aweek=[];
    
            for(var day=0;day<7;day++){
                if(week===0 && day<startDay){
                    aweek.push({daynum:"",schedules:[],date:{year:null,month:null,day:null},disabled:false,class:["weekday"]});
                }else if(daycount>endDayCount){
                    if(day===0) break;
                    else aweek.push({daynum:"",schedules:[],date:{year:null,month:null,day:null},disabled:false,class:["weekday"]});
                }else{
                    classes=[];
                    
                    if(day===0)classes.push("sunday");
                    else if(day===6) classes.push("saturday");
                    else classes.push("weekday");
                    
                    var schedule=[];
                    var dateData=("0000"+year).slice(-4)+("00"+(month)).slice(-2)+("00"+(daycount)).slice(-2);
                    for(var i=0;i<schedules.length;i++){
                        if(schedules[i].data.date===dateData){
                            schedule.push(schedules[i]);       
                        }
                    }
                    if(year===thisYear&&month===thisMonth&&daycount===today+1&&schedule.length>0){
                        var count=schedule.length;
                        Notification.requestPermission(function(result) {
                            if (result === 'denied') {
                                alert("明日は"+count+"件の用事があります.");
                            } else if (result === 'default') {
                                alert("明日は"+count+"件の用事があります.");
                            } else if (result === 'granted') {
                               var n=new Notification("明日は"+count+"件の用事があります.");
                            }
                          });
                    }
                    if(year===thisYear&&month===thisMonth&&daycount===today){
                        classes.push("today");
                        createTimeSchedule(year,month,daycount,false,schedule);
                    };
                    if(daycount<today)aweek.push({daynum:daycount,schedules:schedule,date:{year:year,month:month,day:daycount},disabled:false,class:classes});
                    else aweek.push({daynum:daycount,schedules:schedule,date:{year:year,month:month,day:daycount},disabled:true,class:classes});
                    daycount++;
                }
            }
            calendar.addTd(aweek);
        }
    });
}

//タイムスケジュール生成
const timeschedule=new Vue({
        el:"#timeschedule",
        data:{
            head:"",
            date:"",
            found:false,
            schedules:[],
            notFoundMessage:"予定が見つかりませんでした。",
            canAddEvent:false,
            times:[],
        },
        methods:{
            init(){
                this.schedules=[];
                this.head="";
                this.date="";
                this.found=false;
                this.canAddEvent=false;

                this.times=[]
                for(var i=0;i<24;i++){
                    this.times.push(i+":00");
                }
            },
            isEmpty(){
                return this.empty;
            },
            setDate(date){
                this.date=date;
            },
            setCanAddEvent(canAddEvent){
                this.canAddEvent=canAddEvent;
            },
            setHead(head){
                this.head=head;
            },
            setSchedules(schedules){
                if(schedules){
                    if(schedules.length>0){
                    this.schedules=schedules;
                    this.found=true;
                    }
                }
            },
            toSchedulesForm(){
                window.location.href="../html/schedules_form.html?mode=add&date="+this.date;
            }
        }
    });

function createTimeSchedule(year,month,day,canAddEvent,schedules){
    timeschedule.init();
    timeschedule.setCanAddEvent(canAddEvent);
    timeschedule.setDate(("0000"+year).slice(-4)+("00"+month).slice(-2)+("00"+day).slice(-2));
    timeschedule.setSchedules(schedules);
    timeschedule.setHead(year+" / "+month+" / "+day+" の予定");
}

//汎用メソッド

function getTime(){
    var date = new Date();
    var year=("0000"+date.getFullYear()).slice(-4);
    var month=("00"+(date.getMonth()+1)).slice(-2);
    var day=("00"+date.getDate()).slice(-2);
    var hh=("00"+date.getHours()).slice(-2);
    var min=("00"+date.getMinutes()).slice(-2);
    var sec=("00"+date.getSeconds()).slice(-2);
  
    var time=year+"/"+month+"/"+day+" "+hh+":"+min+":"+sec;
    return time;
}
