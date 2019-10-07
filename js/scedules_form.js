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
        addScedule: function(){
            db.collection("users")
        }
    }
})

