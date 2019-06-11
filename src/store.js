import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

vue.use(vuex, axios)

export default new vuex.Store({
    state: {
        users: [],
        latestResponse: ''
    },
    actions: {
        loadUsers({commit}) {
            // Only load one time
            if(this.state.users.length === 0)
                axios
                    .get('https://reqres.in/api/users?per_page=12')
                    .then(response => {
                        let users = response.data.data;
                        commit('setUsers', users);
                    })
        },
        newUser: ({commit}, formData) => {
            axios
                .post('https://reqres.in/api/users', {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    avatar: formData.avatar
                })
                .then(response => {
                    let user = response.data;
                    console.log(user);
                    commit('addUser', user);
                })
        },
        updateUser: ({commit}, formData) => {
            console.log('formData', formData);
            axios
                .put('https://reqres.in/api/users', {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    avatar: formData.avatar
                })
                .then(response => {
                    commit('editUser', formData);
                });
        },
        
    },
    mutations: {
        addUser (state, user) {
            user.name = {'first': user.first_name, 'last': user.last_name};
            state.users.push(user);
        },
        editUser (state, userData) {
            state.users = state.users.filter(user => (userData.id != user.id));
            let user = [];
            user = {
                'id': userData.id, 
                'first_name': userData.first_name, 
                'last_name': userData.last_name, 
                'avatar': userData.avatar,
                'name': {'first': userData.first_name, 'last': userData.last_name}
            };

            state.users.push(user);
        },
        setUsers (state, users) {
            users.forEach(u => {
                u.name = {'first': u.first_name, 'last': u.last_name}
            });
            state.users = users;
        }
    }
})