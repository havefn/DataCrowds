import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';
import { Surveys } from './Collections';



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
    }
})

const BlankEnum = Enum.create({
    name: 'BlankEnum',
    identifiers:[]
})

export const RadioButtonQuestion = Question.inherit({
    name: 'RadioButtonQuestion',
    fields: {
        choices: BlankEnum
    }

})

export const Answer = Class.create({
    name:'Answers',
    secured: true,
    fields : {
    
        text: String

    }
})


export const Response = Class.create({
    name:'Response',
    secured: true,
    fields : {
        surveyId: String
        ,
        answers : [Answer]

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
        ownerId: String
        ,
        description : String
        ,
        isActive :{
            type: Boolean,
            default : true
        },
        Questions: [Question]


    }
})




Meteor.methods({

});
