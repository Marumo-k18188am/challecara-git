"use strict";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href="html/calendar.html";
    }
});

new Vue({
    el:"#main",
    methods:{
        login(){
            window.location.href="html/login.html";
        }
    }
});