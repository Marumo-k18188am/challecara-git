"use strict";

const setmenu=new Vue({
    el:"#main-menu",
    data:{

    },
    methods:{
        toSetProfile(){
            window.location.href="../html/setting_profile.html";
        },

        logout(){
            var result=window.confirm("本当にログアウトしますか?");
            if(result){
                firebase.auth().signOut().then(()=>{
                    window.location.href="../index.html";
                });
            }
        }
    }
});