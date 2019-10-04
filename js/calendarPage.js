//"カレンダー"ページ描画用
"use strict";

const thisYear=date.getFullYear();
const thisMonth=date.getMonth()+1;

var year=thisYear;
var month=thisMonth;

const calendar=new Vue({
    el:"#calendar",
    data:{
        head:"",
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
    }
});