"use strict";

var db = firebase.firestore();
var user = firebase.auth().currentUser;

const vm = new Vue({
    el: '#form',
    data: {
        uid: 'user.email',
        title: '',
        time: '',
        place: '',
        participants: '',
        comment: '',
    },

    methods: {
        addScedule: function(){
            db.collection("users").add({
                title: 'this.title',
                time: 'this.time',
                place: 'this.palce',
                participants: 'this.participants',
                comment: 'this.comment',
            })
        },
    }
})
