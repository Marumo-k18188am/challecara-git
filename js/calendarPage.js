//"カレンダー"ページ描画用
"use strict";

const calendar=new Vue({
    el:"#calendar",
    data:{
        head:"",
        weeks:[],
        td:[]
    },
    methods:{
        setHead(head){
            this.head=head;
        },

        addWeek(week){
            this.weeks.push(week);
        },

        setTd(aweek){
            this.td.push(aweek);
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
    }
});