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
        title: "",
        date: "",
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
                id: this.id,
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
        chaengeMode(){
            this.mode = "edit";
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
        setDate(a){
            this.date = a.substr(0,4) + "/" + a.substr(4,2) + "/" + a.substr(6,2);
        },
        setMode(mode){
            this.mode=mode;
            if(this.mode == "add"){
                this.setDate(getQueries().date);
            }
            else if(this.mode == "view"){
                db.collection("users").doc(userdata.uid).collection("schedules").doc(getQueries().id).get().then(
                    function(doc){
                        form.id=getQueries().id;
                        form.setDate(doc.data().date);
                        form.title=doc.data().title;
                        form.startTime=doc.data().startTime;
                        form.endTime=doc.data().endTime;
                        form.place=doc.data().place;
                        form.participants=doc.data().participants;
                        form.comment=doc.data().comment;
                        form.importance=doc.data().importance;
                        form.showImportanceMark();
                    }
                )
            }
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
