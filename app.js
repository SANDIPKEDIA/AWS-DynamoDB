const express = require('express');
const { getCharacters, getCharacterById, UpdateCharacter, addCharacter, deleteCharacter } = require('./dynamo');
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
  res.send("Hello")
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



app.get('/characters/:name', async (req, res) => {
  const name = req.params.name;
  console.log(id);
  try {

    const character = await getCharacterById(name);
    res.json(character)

  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }
})



app.post('/characters', async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addCharacter(character);
    res.json(newCharacter);
    res.json(character)
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }
})




app.put('/characters/:id', async (req, res) => {
  const character = req.body;
  const id = req.params.id;

  try {
    const updatedCharacter = await UpdateCharacter(id, character);
    res.json(updatedCharacter);
    res.json(character)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" })
  }

})



app.delete('/characters/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await deleteCharacter(id))
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