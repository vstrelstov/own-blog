<template>
    <div>
        <div class="col-md-12 form-wrapper">
            <h2> Log in </h2>
            <form id="log-in-form" @submit.prevent="createLoginModel">
                <div class="form-group col-md-12">
                    <label for="username">Username</label>
                    <input required type="text" id="username" v-model="username" name="username" class="form-control" placeholder="Username" />
                </div>
                <div class="form-group col-md-12">
                    <label for="password">Password</label>
                    <input required type="password" id="password" v-model="password" name="password" class="form-control" placeholder="Password" />
                </div>

                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Log in </button>
                </div>
            </form>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
import { server } from '../../utils/helper';
import router from '../../router';
import { authHelper } from '../../utils/authHelper';

export default {
    methods: {
        createLoginModel() {
            let user = {
                username: this.username,
                password: this.password
            };

            this.__submitToServer(user);
        },
        __submitToServer(user) {
            axios.post(`${server.baseURL}/auth/login`, user).then((response) => {
                sessionStorage.setItem(authHelper.tokenStorageKey, response.data.access_token);
                sessionStorage.setItem(authHelper.usernameStorageKey, this.username);
                router.push({ name: "home" });
            })
        }
    }
}
</script>
