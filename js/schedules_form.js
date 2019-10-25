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
        date: "",
        title: "",
        startTime: "",
        endTime: "",
        place: "",
        participants: "",
        comment: "",
        importance: "0",
        importanceMark: "×",
    },
    methods: {
        showImportanceMark: function(){
            if(this.importance == 0){
                this.importanceMark = "×";
            }else if(this.importance == 1){
                this.importanceMark = "△";
            }else if(this.importance == 2){
                this.importanceMark = "〇";
            }
        },
        addSchedule: function(){
            db.collection("users").doc(userdata.uid).collection("schedules").doc().set({
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
            // .then(function(docRef) {
            //     console.log("Document written with ID: ", Ref.id);
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
            //});
        },
        setDate(date){
            this.date=date;
        }
    }
})


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userdata.name = user.displayName;
        userdata.email = user.email;
        userdata.photoUrl = user.photoURL;
        userdata.emailVerified = user.emailVerified;
        userdata.uid = user.uid;

        form.setDate(getQueries().date);
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