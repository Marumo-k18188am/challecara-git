"use strict";

var db = firebase.firestore();

const hobbyChooser=new Vue({
    el:"#hobbyChooser",
    data:{
        tags:{
            art:[],
            sport:[],
            subc:[],
            leisure:[],
            cook:[],
            handyc:[],
            else:[]
        },
        searchedTags:[],
        contents:{
            art:"音楽・芸術",
            sport:"スポーツ",
            subc:"アニメ・ゲーム",
            leisure:"行楽・レジャー",
            cook:"料理",
            handyc:"ものづくり",
            else:"その他"
        },
        editingTag:{
            genre:"",
            name:""
        },
        isShown:false,
        editingNewContent:false,
        mode:0,
        searchValue:"",
        searchId:""
    },
    methods:{
        showHobbyChooser(){
            getTag();
            this.mode=0;
            this.isShown=true;
        },
        closeHobbyChooser(){
            this.isShown=false;
        },
        search(searchVal,searchMode){
            this.searchValue=searchVal;
            if(searchMode==1){
                var result = Object.keys(this.contents).filter((key)=>{
                    return this.contents[key]==searchVal;
                });
                this.searchedTags=this.tags[result];
                this.searchedTags.sort();
            }
            this.mode=1;
        },
        inputChanged(){
            if(this.searchValue==""){
                this.mode=0;
            }else{
                this.mode=1;
            }
        },
        editNewContent(){
            this.editingTag.genre="art";
            this.editingTag.name="";
            this.editingNewContent=true;
        },
        addContent(){
            this.tags[this.editingTag.genre].push(this.editingTag.name);
            db.collection("public").doc("tags").set({
                tags:this.tags
            }).then(()=>{
                getTag();
                this.editingNewContent=false;
            });
        },
        closeEditContent(){
            this.editingNewContent=false;
        },
        setTags(tags){
            this.tags=tags;
        }
    }
});

function getTag(){
    db.collection("public").get().then((snapshot)=>{
        var docs=snapshot.docs;
        docs.forEach((doc)=>{
            if(doc.id=="tags"){
                hobbyChooser.setTags(doc.data().tags); 
            }
        });
    });
}