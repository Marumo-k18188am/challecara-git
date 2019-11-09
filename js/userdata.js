const userData=new Vue({
    el:".userData",
    data:{
        user:{},
        hidden:true
    },
    methods:{
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
        }
    }
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        userData.initUserData(user);
    }
});