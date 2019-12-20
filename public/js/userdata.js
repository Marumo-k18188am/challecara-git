var db = firebase.firestore();

const userData=new Vue({
    el:".userData",
    data:{
        user:{},
        mode:-1,
        hobbies:[],
        schedules:[],
        hidden:true,
        notificationSrc:"../images/notification.png",
        ringing:false
    },
    methods:{
        addSchedule(schedule){
            this.schedules.push(schedule);
        },
        searchImpportantDays(date){
            return this.schedules.indexOf(date);
        },
        initUserData(user){
            this.user=user;
            this.hidden=false;
        },
        getModeText(){
            if(this.mode==0)return "個人";
            else return "法人";
        },
        getPhotoURL(){
            return this.user.photoURL;
        },
        getDisplayName(){
            return this.user.displayName;
        },
        getMode(){
            return this.mode;
        },
        getUserId(){
            return this.user.uid;
        },
        setMode(mode){
            this.mode=mode;
        },
        setHobbies(hobbies){
            this.hobbies=hobbies;
        },
        setNotificationSrc(src){
            this.notificationSrc=src;
        },
        setRinging(bool){
            this.ringing=bool;
        },
        toSetProfile(){
            window.location.href="../html/setting_profile.html";
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var date=new Date();

        db.collection("users").doc(user.uid).collection("userdata").get().then((snapshot)=>{
            var docs=snapshot.docs;
            docs.forEach((doc)=>{
                if(doc.id=="mode"){
                    userData.setMode(doc.data().mode);
                }else if(doc.id=="hobbies"){
                    userData.setHobbies(doc.data().hobbies);
                }
            });
        });

        db.collection("users").doc(user.uid).collection("schedules").get().then(function(querySnapshot) {
            var docs=querySnapshot.docs;
            docs.forEach((doc)=>{
                if(doc.data().importance>=2)userData.addSchedule(doc.data().date);
            });
            var date=new Date();
            db.collection("public").get().then(
                function(snapshot){
                    var docs=snapshot.docs;
                    docs.forEach((doc)=>{
                        if(parseInt(doc.data().date,10)%parseInt(("0000"+date.getFullYear()).slice(-4)+("00"+(date.getMonth()+1)).slice(-2)+("00"+date.getDate()).slice(-2))<7){
                            if(userData.searchImpportantDays(doc.data().date)==-1){
                                userData.setNotificationSrc("../images/notification_ring.png");
                                userData.setRinging(true);
                            }
                        }
                    });
                });
            });
        userData.initUserData(user);
    }
});