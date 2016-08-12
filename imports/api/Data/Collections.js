import { Mongo } from 'meteor/mongo';

export const DataSets = new Mongo.Collection('datasets');

export const Surveys = new Mongo.Collection('surveys');