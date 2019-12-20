"use strict";

var db = firebase.firestore();

const info=new Vue({
    el:"#main",
    data:{
        schedules:[],
        events:[],
        selectedEvent:{},
        dataShown:false
    },
    methods:{
        addToSchedule(){
            this.selectedEvent.title+="[イベント通知より追加]";
            this.selectedEvent.importance=2;
            db.collection("users").doc(userData.user.uid).collection("schedules").doc().set(this.selectedEvent).then(()=>{
                window.location.href="../html/calendar.html"
            });
        },
        addEvent(event){
            this.events.push(event);
        },
        addSchedule(schedule){
            this.schedules.push(schedule);
        },
        searchImpportantDays(date){
            return this.schedules.indexOf(date);
        },
        showData(selectedEvent){
            this.selectedEvent=selectedEvent;
            this.dataShown=true;
        },
        close(){
            this.dataShown=false;
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        db.collection("users").doc(userData.getUserId()).collection("schedules").get().then(function(querySnapshot) {
            var docs=querySnapshot.docs;
            docs.forEach((doc)=>{
                if(doc.data().importance>=2)info.addSchedule(doc.data().date);
            });
            var date=new Date();
            db.collection("public").get().then(
                function(snapshot){
                    var docs=snapshot.docs;
                    docs.forEach((doc)=>{
                        if(parseInt(doc.data().date,10)%parseInt(("0000"+date.getFullYear()).slice(-4)+("00"+(date.getMonth()+1)).slice(-2)+("00"+date.getDate()).slice(-2))<7){
                            if(info.searchImpportantDays(doc.data().date)==-1)info.addEvent(doc.data());
                        }
                    });
                });
            });
        
    }
});