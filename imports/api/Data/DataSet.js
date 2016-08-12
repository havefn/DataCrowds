/**
 * Created by aufa on 05/08/2016.
 */

import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { DataSets } from './Collections';

export const DataSet = Class.create({
    name:'DataSet',
    collection : DataSets,
    secured: true,
    fields : {
        title:{
            type: String,
            validators: [{
                type: 'maxLength',
                param: 200,
                message: "Title is too long"
            },{
                type:'minLength',
                param: 6,
                message: "Title is too short"
            }]
        },
        ownerId:{
            type:String
        },
        buyersId:{
            type:[String],
            optional :true
        },
        description : {
            type: String
        },
        fileLink : {
            type:String
        },
        isActive :{
            type: Boolean,
            default : true
        },

    }
})

Meteor.methods({
    'createDataSet'(title, description, fileLink,){

        if(!Meteor.userId()) throw Meteor.Error (403,"Unauthorized");

        alert(Meteor.userId());
        var dataSet = new DataSet();
        dataSet.ownerId = Meteor.userId();
        dataSet.title = title;
        dataSet.description = description;
        dataSet.fileLink =fileLink;
        dataSet.save();


    },
    'publish'({active, dSId}){
        console.log("Hi Im here !");

        if((Meteor.userId() == temp.ownerId) || Meteor.user().isAdmin ){
            const temp = DataSet.findOne(dsId);
        }else{
            throw new Meteor.Error(403,'Unauthorized to publish ' + postId );
        }

    },

    "buyDataSet"(dsId){
       const temp = DataSet.findOne(dsId);
       if(temp.buyersId.includes(Meteor.userId()) || Meteor.userId() == DataSet.ownerId){
           throw new Meteor.Error (111, "User is either an owner or already bought the DataSet");
       }else{
           //TODO Implement pembayaran
           User.findOne(temp.ownerId()).balance = User.findOne(temp.ownerId()).balance + temp.price;
           if(paymentSuccess){
               temp.buyersId.push(Meteor.userId());

               //TODO add transaction history to user
           }else{
               throw new Meteor.Error(112,"Payment failed exception");
           }
       }
    },

    "test"(param){
        console.log("Im Here !" + param + Meteor.userId());
    }

})


