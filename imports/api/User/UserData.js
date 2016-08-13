import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';


const UserData = Class.create({
    name: 'UserProfile',
    secured : true,
    fields: {
        nickname: String,
        occupation : String,
        profilePicture : String,
        isAdmin : Boolean,
        ownedDataId : [String],
        boughtDataId : [String],
        ownedSurveyId : [String],

        //CAUTION : MAKE SURE THE FOLLOWING FIELD V IS NOT PUBLISHED
        boughtDataFileLink : [String],

        //TODO check wether it is safe to implement it here?
        /* Any other fields you want to be published to the client */
    }
});

const Transaction = Class.create({
    name: 'Transaction',
    secured:true,
    fields:{

    }
});


export const User = Class.create({
    name: 'User',
    collection: Meteor.users,
    secured : true,
    fields: {
        createdAt: Date,
        emails: {
            type: [Object],
            default: function() {
                return [];
            }
        },
        UserProfile: {
            type: UserData,
            default: function() {
                return {};
            }
        }
    },
    methods : {

    }
});



if (Meteor.isServer) {
    User.extend({
        fields: {
            services: Object
        }
    });
}



