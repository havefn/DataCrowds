import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';
import { Surveys } from './Collections';



export const Question = Class.create({
    name:'Question',
    secured: true,
    fields : {
        question:{
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
        description: String
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
        text: String,
        asnwerType : String,
    }
})


export const Response = Class.create({
    name:'Response',
    secured: true,
    fields : {
        surveyId: String,
        question: String,
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
        ownerId: String,
        description : String,
        isActive :{
            type: Boolean,
            default : true
        },
        questions: [Question],
        responses : [Response]
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    },
    methods : {
        generateResponse(userId) {
            let response = new Response ();
            response.surveyId = this._id;
            for(let i =0; i<this.questions.length;i++){
                let temp = new Answers();
                temp.answerType = this.questions[i].type;
                temp.question = this.questions[i].question;

            }
            this.responses.push(response);
            this.save();

            return response;
        }
    }

    }
)




Meteor.methods({
    'createNewResponse'(surveyId,answers){
        if(!Meteor.userId()) throw new Meteor.Error(403,"You must be logged in to anwer response");
        let survey = Survey.findOne(surveyId)
        let response = survey.generateResponse(Meteor.userId());

        //TODO put following answers into response answers

        survey.save();
    }

});
