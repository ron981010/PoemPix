const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all poems from database
const getAllpoems = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
    //   .db('insert the mongodb main folder name in the database')
    //   .collection('name of the poem folder in the main folder in the database')
      .find();
    result.toArray().then((poems) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(poems);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single poem from database
const getpoemById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid poem id to find a poem.');
    }
    const poemId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
    //   .db('insert the mongodb main folder name in the database')
    //   .collection('name of the poem folder in the main folder in the database')
      .find({ _id: poemId,Id });
    result.toArray().then((poems) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(poems[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new poem
const createpoem = async (req, res) => {
  try {
    const poem = {
    //   insert their values and content of the poem
    };

    const response = await mongodb
      .getDb()
    //   .db('insert the mongodb main folder name in the database')
    //   .collection('name of the poem folder in the main folder in the database')
      .insertOne(car);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while creating the poem!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update poem by id in the database
const updatepoem = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid poem id to update a poem.');
    }
    const poemId = new ObjectId(req.params.id);
    const poem = {
     //   insert their values and content of the poem
    };
    const response = await mongodb
      .getDb()
    //   .db('insert the mongodb main folder name in the database')
    //   .collection('name of the poem folder in the main folder in the database')
      .replaceOne({ _id: poemId }, poem);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while updating the poem!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete poem by id in the database
const deletepoem = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid poem id to delete a poem.');
    }
    const poemId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
    //   .db('insert the mongodb main folder name in the database')
    //   .collection('name of the poem folder in the main folder in the database')
      .deleteOne({ _id: poemId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while deleting the poem!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllpoems,
  getpoemById,
  createpoem,
  updatepoem,
  deletepoem
};