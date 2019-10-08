"use strict";

var db = firebase.firestore();
var user = firebase.auth().currentUser;

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

const vm = new Vue({
    el: '#form',
    data: {
        title: '',
        time: '',
        place: '',
        participants: '',
        comment: '',
    },

    methods: {
        addSchedule: function(){
            db.collection("users").add({
                title: this.title,
                time: this.time,
                place: this.place,
                participants: this.participants,
                comment: this.comment,
                })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },
    }
})
