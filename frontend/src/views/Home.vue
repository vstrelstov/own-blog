<template>
    <div>

      <div class="text-center">
        <h1>Nest Blog</h1>
       <p> This is the description of my own blog built with Nest.js, Vue.js and MongoDB</p>

       <div v-if="posts.length === 0">
            <h2> No posts found at the moment </h2>
        </div>
      </div>

        <div class="row">
           <div class="col-md-4" v-for="post in posts" :key="post._id">
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                   <h2 class="card-img-top">{{ post.title }}</h2>
                  <p class="card-text">{{ post.body.length > maxPostPreviewLength ? post.body.substring(0, maxPostPreviewLength) + '...' : post.body }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin-bottom: 20px;">
                      <router-link :to="{name: 'Post', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">View Post</router-link>
                      <router-link v-if="isAuthorized" :to="{name: 'Edit', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                      <button v-if="isAuthorized" class="btn btn-sm btn-del btn-outline-secondary" v-on:click="deletePost(post._id)">Delete</button>
                    </div>
                  </div>

                  <div class="card-footer">
                    <small class="text-muted">Posted on: {{ post.postDate}}</small><br/>
                    <small class="text-muted">by: {{ post.author}}</small>
                  </div>

                </div>
              </div>
            </div>
      </div>
    </div>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";
import { authHelper } from '../utils/authHelper';

export default {
  data() {
    return {
      maxPostPreviewLength: 75,
      posts: [],
      isAuthorized: sessionStorage.getItem(authHelper.tokenStorageKey)?.length > 0,
      username: sessionStorage.getItem(authHelper.usernameStorageKey)
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(`${server.baseURL}/blog/posts`)
        .then(data => (this.posts = data.data));
    },
    deletePost(id) {
      const authConfig = authHelper.createAuthHeader();
      axios.delete(`${server.baseURL}/blog/delete?postID=${id}`, authConfig).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
};
</script>
