const handleSignin = (req, res, db, bcrypt)=>{
	const { email, name, password } = req.body;
	if(!email || !password){
		return res.status(400).json('dados inválidos!')
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash)
			if (isValid){
				return db.select('*').from('users')
				  .where('email', '=', email)
				  .then(user => {
				  	res.json(user[0])
				  })
				  .catch(err => res.status(400).json('incapaz de achar usuario'))
			} else {
				res.status(400).json('credenciais erradas')
			}
			
		})
		.catch(err => res.status(400).json('credenciais erradas'))
}

module.exports = {
	handleSignin: handleSignin
}