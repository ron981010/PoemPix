const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get the list of all favorite poems for the users.
const getAllFavoritePoems = async (req, res) => {
  const result = await mongodb.getDb().db().collection('favorites').find();
  result.toArray().then((favorites) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(favorites);
  });
};

//Get the favorite poem for the user.
const getFavoritePoem = async (req, res) => {
  const poemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('favorite').find({ _id: poemId });
  result.toArray().then((favorite) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(favorite[0]);
  });
};

//Remove the user favorite poem.
const deleteFavorite = async (req, res) => {
  const poemId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('favorite').remove({ _id: poemId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the poem from the user favorite list.');
  }
};

//Update the favorite poem for the authenticated user.
const updateFavorite = async (req, res) => {
  const poemId = new ObjectId(req.params.id);
  const poem = {
    poem_id: req.body.poem_id,
    date_added: req.body.date_added
  };
  const response = await mongodb.getDb().db().collection('favorite').replaceOne({ _id: poemId }, poem);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the favorite poem.');
  }
};

module.exports = {
  getAllFavoritePoems,
  getFavoritePoem,
  deleteFavorite,
  updateFavorite
};