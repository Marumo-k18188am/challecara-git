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
        capacity: "",
        comment: "",
        selectedTags: [], 
    },
    methods: {
        addSchedule(){
            db.collection("users").doc(userdata.uid).collection("schedules").doc().set({
                title: this.title,
                date: this.date.substr(0,4) + this.date.substr(5,2) + this.date.substr(8,2),
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.place,
                capacity: this.capacity,
                comment: this.comment,
                tags: this.selectedTags,
            }).then(()=>{
                window.location.href="../html/calendar.html"
            });
        },
        editSchedule(){
            db.collection("users").doc(userdata.uid).collection("schedules").doc(this.id).set({
                title: this.title,
                date: this.date.substr(0,4) + this.date.substr(5,2) + this.date.substr(8,2),
                startTime: this.startTime,
                endTime: this.endTime,
                place: this.place,
                capacity: this.capacity,
                comment: this.comment,
                tags: this.selectedTags,
            }).then(()=>{
                window.location.href="../html/calendar.html"
            });
        },
        changeMode() {
            this.mode = "edit";
        },
        back() {
            history.back();
        },
        setDate(a) {
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
                        form.capacity=doc.data().capacity;
                        form.comment=doc.data().comment;
                        form.selectedTags=doc.data().tags;
                    }
                )
            }
        },
        setTags(){
            this.tags=getTag()
        },
        setSelectedTags(selectedTags){
            this.selectedTags=selectedTags;
            this.selectedTags.sort();
        },
        showHobbyChooser(){
            hobbyChooser.showHobbyChooser(this.setSelectedTags,this.selectedTags);
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
