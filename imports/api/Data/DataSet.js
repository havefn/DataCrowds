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
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    }
})

Meteor.methods({
    'createDataSet'(title, description, fileLink,){

        if(!Meteor.userId()) throw new Meteor.Error (403,"Unauthorized");
        else{
        console.log(Meteor.userId());
        var dataSet = new DataSet();
        dataSet.ownerId = Meteor.userId();
        dataSet.title = title;
        dataSet.description = description;
        dataSet.fileLink =fileLink;
        dataSet.save()
        }

    },
    'publishDataSet'({active, dSId}){
        if((Meteor.userId() == temp.ownerId) || Meteor.user().isAdmin ){
            const temp = DataSet.findOne(dsId);
            temp.isActive = active;
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
            let paymentSucess = false;
           if(paymentSuccess){
               User.findOne(temp.ownerId()).balance = User.findOne(temp.ownerId()).balance + temp.price;
               temp.buyersId.push(Meteor.userId());

               //TODO add transaction history to user

           }else{
               throw new Meteor.Error(112,"Payment failed exception");
           }
       }
    },
    'updateDataSet'(dsId,doc){

        if((Meteor.userId() == temp.ownerId) || Meteor.user().isAdmin ){
            const temp = DataSet.findOne(dsId);
            if(doc.description != null){
                temp.description = doc.description ;
            }
            if(doc.title != null){
                temp.title = doc.title ;
            }
            if(doc.description != null){
                temp.description = doc.description ;
            }

            if(doc.isActive != null){
                temp.isActive = doc.isActive;
            }
        }else{
            throw new Meteor.Error(403,'Unauthorized to publish ' + postId );
        }

    },"deleteDataSet" (dsId){
        //TODO Implement soft remove on dsId doc.
        // use SoftRemove -> implement manually or add astronomy soft remove behaviours.
        // Temporary ways on making sure buyers wont lose link to data set they bought.
    }

})


