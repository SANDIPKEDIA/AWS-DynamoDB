const express = require('express');
const { getCharacters, getCharacterById, addorUpdateCharacter, deleteCharacter } = require('./dynamo');
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
  res.send("Server is Running")
})




app.get('/characters', async (req, res) => {
  try {
    const character = await getCharacters();
    res.json(character)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" })
  }
})



app.get('/characters/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {

    const character = await getCharacterById(id);
    res.json(character)

  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }
})



app.post('/characters', async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addorUpdateCharacter(character);
    // res.json(newCharacter);
    res.status(200).json({ messagee: "Create successfully" })
    res.send(character)


  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }
})




app.put('/characters/:id', async (req, res) => {
  const character = req.body;
  // const {id} = req.params;
  // character.id = id
  character.id = req.params.id
  try {
    const updatedCharacter = await addorUpdateCharacter(character);
    res.status(200).json({ message: "Updated successfully" })
    res.json(updatedCharacter)

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }

})

app.delete('/characters/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCharacters = await deleteCharacter(id);

    res.status(200).json({ message: "Deleted successfully" })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }
})





const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`server running on ${port}`);
})