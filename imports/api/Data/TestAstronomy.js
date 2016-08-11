import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

const Posts = new Mongo.Collection("Posts");

const Post = Class.create({
    name: 'Post',
    Collection : 'Posts',
    secured: true,
    fields: {
        title: String,
        published: Boolean,
        /* ... */
    },
    methods: {
        rename(title) {
            // Check if a given user can rename this post.
            if (this.ownerId !== Meteor.userId()) {
                throw new Meteor.Error(403, 'You are not an owner');
            }
            this.title = this;
            this.save();
        },
        publish() {
            // Check if a given user can publish this post.
            if (this.ownerId !== Meteor.userId()) {
                throw new Meteor.Error(403, 'You are not an owner');
            }
            if (this.published) {
                throw new Meteor.Error(403, 'Post is already published');
            }
            this.published = true;
            this.save();
        }
    }
});

Meteor.methods({
    "newPost"(){
        const post = new Post();
        post.title = "test";
        post.save();
    },
    "renamePost"(postId, title) {
        const post = Post.findOne(postId);
        post.rename(title);
    },
    "publishPost"(postId) {
        const post = Post.findOne(postId);
        post.publish();
    }
});