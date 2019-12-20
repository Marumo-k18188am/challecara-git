"use strict";



const main=new Vue({
    el:"#main",
    data:{
        user:{},
        mode:-1,
        selectedTags:[]
    },
    methods:{
        back(){
            var result=confirm("変更は破棄されます。よろしいですか?");
            if(result)window.location.href="../html/calendar.html";
        },

        save(){
            var userdata=this.user;
            db.collection("users").doc(userdata.uid).collection("userdata").doc("hobbies").set({
                hobbies:this.selectedTags
            }).then(()=>{
                window.location.href="../html/calendar.html";
            });
        },

        switchMode(){
            var userdata=this.user;
            var result=confirm("ユーザータイプを切り替えると登録された予定がすべて消去されます。\nよろしいですか?");

            if(result){
                db.collection("users").doc(userdata.uid).collection("schedules").get().then((snapshot)=>{
                    var docs=snapshot.docs;
                    docs.forEach((doc)=>{
                        db.collection("users").doc(userdata.uid).collection("schedules").doc(doc.id).delete();
                    });
                    db.collection("users").doc(userdata.uid).collection("userdata").doc("mode").set({
                        mode:this.mode
                    }).then(()=>{
                        window.location.href="../html/calendar.html";
                    });
                });
            }else{
                this.mode=Math.abs(this.mode-1);
            }
        },

        switchAcc(){
            firebase.auth().signOut().then(()=>{
                window.location.href="../html/login.html";
            });
        },
        initUserData(user){
            this.user=user;
            this.hidden=false;
        },
        getPhotoURL(){
            return this.user.photoURL;
        },
        getDisplayName(){
            return this.user.displayName;
        },
        getUserId(){
            return this.user.uid;
        },
        setMode(mode){
            this.mode=mode;
        },
        setSelectedTags(selectedTags){
            this.selectedTags=selectedTags;
            this.selectedTags.sort();
        },
        showHobbyChooser(){
            hobbyChooser.showHobbyChooser(this.setSelectedTags,this.selectedTags);
        },
        
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        db.collection("users").doc(user.uid).collection("userdata").get().then((snapshot)=>{
            var docs=snapshot.docs;
            docs.forEach((doc)=>{
                if(doc.id=="mode"){
                    main.setMode(doc.data().mode);
                }else if(doc.id=="hobbies"){
                    main.setSelectedTags(doc.data().hobbies);
                }
            });
        });
        main.initUserData(user);
    }
});