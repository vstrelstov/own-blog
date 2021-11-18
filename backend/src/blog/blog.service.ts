import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts.reverse();
    }

    async getPost(postId): Promise<Post> {
        const post = await this.postModel
            .findById(postId)
            .exec();

        return post;
    }

    async addPost(createPostDto: CreatePostDto): Promise<Post> {
        const newPost = await new this.postModel(createPostDto);
        return newPost.save();
    }

    async editPost(postId, createPostDto: CreatePostDto): Promise<Post> {
        const editedPost = await this.postModel.findByIdAndUpdate(postId, createPostDto, { new: true });
        return editedPost;
    }

    async deletePost(postId): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postId);
        return deletedPost;
    }
}
