var Album  = require('./models/album');

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

exports.getAlbums = function(req, res) {
  Album.find({}, function (err, albums) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(albums);
  }); 
};

exports.getAlbum = function(req, res) {
  Album.findOne({_id: req.params.id}, function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};

exports.updateAlbum = function(req, res) {
  Album.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};

exports.deleteAlbum = function(req, res) {
  Album.findByIdAndRemove(req.params.id, function (err, album) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(album);
  }); 
};