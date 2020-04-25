//my foldr album controller has in js the methods to 
// develop the crud functionality. Adapted from the code in class

var Album  = require('./models/album');

// function to create album, updated from class code
exports.createAlbum = function(req, res) {
    console.log(req) 
    console.log(req.body)
    console.log(req.json)

    var newAlbum = new Album(req.body);

    console.log(newAlbum)
    newAlbum.save(function (err, album) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(album); 
    });
};
// function to get albums, from class
exports.getAlbums = function(req, res) {
  Album.find({}, function (err, albums) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(albums);
  }); 
};

//function to return one album with given id, adapted from class
exports.getAlbum = function(req, res) {
  Album.findOne({_id: req.params.id}, function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};

//this is the function to update an album
exports.updateAlbum = function(req, res) {
  Album.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};

//function to delete album, with a given id
exports.deleteAlbum = function(req, res) {
    console.log(req.params)
  Album.findByIdAndRemove(req.params.id, function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};