const handleProfileGet = (req,res, db) =>{
	const { id } = req.params;
	let found = false;
	db.select('*').from('users').where({id})
	.then(user =>{
		console.log(user)
		if(user.length){
			res.json(user[0])
		} else {
			res.status(400).json('não encontrado')
		}
	})
	.catch(err => res.status(400).json('erro ao achar usuario'))
}

module.exports = {
	handleProfileGet
}