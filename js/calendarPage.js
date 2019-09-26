//"カレンダー"ページ描画用
"use strict";

const calendar=new Vue({
    el:"#calendar",
    data:{
        head:"",
        weeks:[""],
        td:[0]
    },
    methods:{
        setHead(head){
            this.head=head;
        },

        setWeek(num,week){
            this.weeks[num]=week;
        },

        setTd(aweek){
            this.td.push(aweek);
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log(user);//デバッグ用、後で消すこと!!
    }
});