const Clarifai = require ('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '3e62b806486c4ef8a30311ea3fbc92a1'
});

const handleApiCall = (req,res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('incapaz de usar api'))
}


const handleImage = (req, res, db)=>{
	const { id } = req.body;
	db('users').where('id','=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('sem entradas'))
}

module.exports = {
	handleImage,
	handleApiCall
}