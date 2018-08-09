//加密

const crypto = require('crypto');

// const hash = crypto.createHash('sha256');


// const hmac = crypto.createHmac('sha512', 'a secret');//添加一个加密的'a secret'

// hmac.update('test');


// console.log(hash.digest('hex'))

// console.log(hmac.digest('hex'))

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha512', 'zhu');//添加一个加密的'a secret'	
	hmac.update(str);
	return hmac.digest('hex')
}

