var db = firebase.firestore();

const userData=new Vue({
    el:".userData",
    data:{
        user:{},
        mode:-1,
        hidden:true
    },
    methods:{
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
        toSetProfile(){
            window.location.href="../html/setting_profile.html";
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        db.collection("users").doc(user.uid).collection("userdata").get().then((snapshot)=>{
            var docs=snapshot.docs;
            docs.forEach((doc)=>{
                if(doc.id=="mode"){
                    userData.setMode(doc.data().mode);
                }
            });
        });
        userData.initUserData(user);
    }
});