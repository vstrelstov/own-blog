<template>
    <div>
        <div class="col-md-12 form-wrapper">
            <h2> Log in </h2>
            <form id="log-in-form" @submit.prevent="login">
                <div class="form-group col-md-12">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" name="username" class="form-control" placeholder="Username" />
                </div>
                <div class="form-group col-md-12">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" name="password" class="form-control" />
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
</script>
