var app = new Vue({
    el : "#root",
    data:{
        addUser : false,
        editUser: false,
        alertWarning : '',
        alertSuccess : '',
        users : [],
        newUser : {username:"", email:"", mobile:""},
        editUser : {}

    },
    mounted: function(){
        console.log("mounted");
        this.getAllUsers();
    },
    methods: {
        getAllUsers: function(){
            axios.get("http://localhost/vuephpcrud/api.php?action=read").then(function(response){
                 //console.log(response);
                if(response.data.error){
                    app.alertWarning = response.data.message;
                }else {
                    app.users = response.data.users;
                }
            });
        },
        saveUser: function(){
            //console.log(app.newUsers);
            var formData = app.toFormData(app.newUser);
            axios.post("http://localhost/vuephpcrud/api.php?action=create", formData).then(function(response){
                 console.log(response);
                 app.newUser = { username: "", email:"", mobile:""};
                if(response.data.error){
                    app.alertWarning = response.data.message;
                }else {
                    //app.users = response.data.users;
                    app.alertSuccess = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        updateUser: function(){
            //console.log(app.newUsers);
            var formData = app.toFormData(app.editUser);
            axios.post("http://localhost/vuephpcrud/api.php?action=update", formData).then(function(response){
                 //console.log(response);
                 app.editUser = {};
                if(response.data.error){
                    app.alertWarning = response.data.message;
                }else {
                    //app.users = response.data.users;
                    app.alertSuccess = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        deleteUser: function(){
            //console.log(app.newUsers);
            var formData = app.toFormData(app.editUser);
            axios.post("http://localhost/vuephpcrud/api.php?action=delete", formData).then(function(response){
                 //console.log(response);
                 app.editUser = {};
                if(response.data.error){
                    app.alertWarning = response.data.message;
                }else {
                    //app.users = response.data.users;
                    app.alertSuccess = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        selectUser(user){
            app.editUser = user;
        },
        toFormData : function(obj){
            var form_data = new FormData();
            for(var key in obj){
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMessage: function(){
            app.alertWarning = "";
            app.alertSuccess = "";
        }
    }
})