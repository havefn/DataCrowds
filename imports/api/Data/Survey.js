import {Meteor} from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { Surveys } from './Collections'

export const Question = Class.create({
    name:'Question',
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
        description : {
            type: String
        },
        answer : {
            type: String
        },
        isActive :{
            type: Boolean,
            default : true
        },


    }
})


export const Survey = Class.create({
    name:'Survey',
    collection : Surveys,
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
        description : {
            type: String
        },
        isActive :{
            type: Boolean,
            default : true
        },
        Questions :{
            type: [Question]
        }


    }
})




Meteor.methods({

});
