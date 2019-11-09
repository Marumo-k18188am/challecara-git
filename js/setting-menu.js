"use strict";

const setmenu=new Vue({
    el:"#main-menu",
    data:{

    },
    methods:{
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