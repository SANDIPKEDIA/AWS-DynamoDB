const AWS = require('aws-sdk');
require('dotenv').config();



AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accesskeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'crud-api';//add


//get all data
const getCharacters = async()=>{
    const params = {
            TableName: TABLE_NAME 
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
}


//get data by id
const getCharacterById = async(name) =>{
    const params = {
        TableName:TABLE_NAME,
        key:{
         name
        }
    }
    return await dynamoClient.get(params).promise();
}


//add or update
const addCharacter = async (character) =>{
    const params ={
        TableName:TABLE_NAME,
        Item:character
    };
    await dynamoClient.put(params).promise();
}


const UpdateCharacter = async (character,id) =>{
    const params ={
        TableName:TABLE_NAME,
        Item:character,
        key:{
            id
        }
    };
    await dynamoClient.put(params).promise();
}


//delete data
const deleteCharacter = async (id) =>{
    const params ={
        TableName:TABLE_NAME,
        key:{
            id
        }
    };
    await dynamoClient.delete(params).promise();
}

module.exports = {
    // dynamoClient,
    getCharacters,
    getCharacterById,
    addCharacter,
    UpdateCharacter,
    deleteCharacter
}