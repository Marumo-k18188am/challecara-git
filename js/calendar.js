"use strict";
const date=new Date();

const thisYear=date.getFullYear();
const thisMonth=date.getMonth()+1;

const weeks=["日","月","火","水","木","金","土"];
const today=date.getDate();

var year=thisYear;
var month=thisMonth;

//ページ描画&ユーザーデータ取得
const userData=new Vue({
    el:".userData",
    data:{
        user:{},
        hidden:true
    },
    methods:{
        initUserData(user){
            this.user=user;
            this.hidden=false;
        },
        getPhotoURL(){
            return this.user.photoURL;
        },
        getDisplayName(){
            return this.user.displayName;
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userData.initUserData(user);
        createCalendar(year,month);
        createTimeSchedule(year,month,today);
    }
});

//カレンダー生成
const calendar=new Vue({
    el:"#calendar",
    data:{
        head:"",
        date:{},
        weeks:[],
        td:[]
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
        },

        setHead(head){
            this.head=head;
        },

        tdClicked(year,month,day){
            createTimeSchedule(year,month,day);
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
                aweek.push({daynum:"",date:{year:null,month:null,day:null},class:["weekday"]});
            }else if(daycount>endDayCount){
                if(day===0) break;
                else aweek.push({daynum:"",date:null,class:["weekday"]});
            }else{
                classes=[];
                if(year===thisYear&&month===thisMonth&&daycount===today)classes.push("today");

                if(day===0)classes.push("sunday");
                else if(day===6) classes.push("saturday");
                else classes.push("weekday");
                
                aweek.push({daynum:daycount,date:{year:year,month:month,day:daycount},class:classes});
                daycount++;
            }
        }
        calendar.addTd(aweek);
    }
}

//タイムスケジュール生成
const timeschedule=new Vue({
        el:"#timeschedule",
        data:{
            head:"",
            date:"",
            schedules:[],
            found:false,
            notFoundMessage:"予定が見つかりませんでした。"
        },
        methods:{
            init(){
                this.head="";
                this.date="";
                this.schedules=[];
                this.found=false;
            },
            isEmpty(){
                return this.empty;
            },
            setDate(date){
                this.date=date;
            },
            setHead(head){
                this.head=head;
            },
            toSchedulesForm(){
                window.location.href="../html/schedules_form.html?date="+this.date;
            }
        }
    });

function createTimeSchedule(year,month,day){
    timeschedule.init();
    timeschedule.setDate(("0000"+year).slice(-4)+("00"+month).slice(-2)+("00"+day).slice(-2));
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
  