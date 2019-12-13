"use strict";

var db = firebase.firestore();

var userdata={
    name:"", 
    email:"", 
    photoUrl:"",
    emailVerified:"",
    uid:""
};

const form = new Vue({
    el: '#form',
    data: {
        mode: "add",
        id: "",
        date: "",
        title: "",
        startTime: "",
        endTime: "",
        place: "",
        participants: "",
        comment: "",
        importance: "1",
        importanceMark: "◯",
    },
    methods: {
        addSchedule(){
            db.collection("users").doc(userdata.uid).collection("schedules").doc().set({
                title: this.title,
                date: this.date.substr(0,4) + this.date.substr(5,2) + this.date.substr(8,2),
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.place,
                participants: this.participants,
                comment: this.comment,
                importance: this.importance,
            }).then(()=>{
                window.location.href="../html/calendar.html"
            });
        },
        editSchedule(){
            db.collection("users").doc(userdata.uid).collection("schedules").doc(this.id).set({
                title: this.title,
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.place,
                participants: this.participants,
                comment: this.comment,
                importance: this.importance,
            }).then(()=>{
                window.location.href="../html/calendar.html"
            });
        },
        setMode(mode){
            this.mode=mode;
            if(this.mode == "add"){
                this.setDate();
            }
            else if(this.mode == "edit"){
                db.collection("users").doc(userdata.uid).collection("schedules").doc(getQueries().id).get().then(
                    function(doc){
                        form.id=doc.data().id;
                        form.date=doc.data().date;
                        form.title=doc.data().title;
                        form.startTime=doc.data().startTime;
                        form.endTime=doc.data().endTime;
                        form.place=doc.data().place;
                        form.participants=doc.data().participants;
                        form.comment=doc.data().comment;
                        form.importance=doc.data().importance;
                        showImportanceMark();
                    }
                )
            }
        },
        showImportanceMark(){
            if(this.importance == 0){
                this.importanceMark = "△";
            }else if(this.importance == 1){
                this.importanceMark = "◯";
            }else if(this.importance == 2){
                this.importanceMark = "◎";
            }
        },
        setDate(){
            var a = getQueries().date;
            this.date = a.substr(0,4) + "/" + a.substr(4,2) + "/" + a.substr(6,2);
        },
    }
})

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userdata.name = user.displayName;
        userdata.email = user.email;
        userdata.photoUrl = user.photoURL;
        userdata.emailVerified = user.emailVerified;
        userdata.uid = user.uid;

        form.setMode(getQueries().mode);
    }
});

function getQueries(){
    var dataObject={};
    
    var parametors=location.search.replace("?","");
    var dataStrings=parametors.split("&");
    dataStrings.forEach((dataString)=>{
        var data=dataString.split("=");
        dataObject[data[0]]=data[1]
    });
    return dataObject;
}
