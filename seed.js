const axios =  require('axios');
const {addCharacter} = require('./dynamo');

const seedData = async ()=>{
const url ='http://hp-api.herokuapp.com/api/characters';
try{

    const {data:characters} = await axios.get(url);


    const characterPromises = characters.map((character,i)=>
        addCharacter({...character,id: i+ ''})
    )
    await Promise.all(characterPromises);

}catch(error){
    console.error(err);

}


}
seedData();