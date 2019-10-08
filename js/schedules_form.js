"use strict";

var db = firebase.firestore();

var name, email, photoUrl, emailVerified, uid;
var date

firebase.auth().onAuthStateChanged(function(user){
    if(user){
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
    console.log(uid);
    }
});

const vm = new Vue({
    el: '#form',
    data: {
        date: '',
        title: '',
        time: '',
        place: '',
        participants: '',
        comment: '',
    },

    methods: {
        addSchedule: function(){
            db.collection("users").doc(uid).collection("schedules").doc(this.date).set({
                title: this.title,
                time: this.time,
                place: this.place,
                participants: this.participants,
                comment: this.comment,
            })
            // .then(function(docRef) {
            //     console.log("Document written with ID: ", Ref.id);
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
        },
    }
})
