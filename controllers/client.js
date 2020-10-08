const  request = require('request')

module.exports.clients = (req, res) => {
  const token = req.body.token

  const options = {
    'method': 'GET',
    'url': 'http://api.corp.chaynik48.ru/api/companies/chaynik/notifications',
    'headers': {
      'Authorization': `Bearer ${token}`
    },
    formData: {
      '': '',
      '': ''
    }
  }
  try {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const Data = JSON.parse(response.body)

    let users = Data.data
    let user = []
    if(Data.message === 'Unauthenticated.') {
      res.status(400).json({user:[]})
    } else {
      if(Data.success === false) {
        res.status(200).json({error: true})
      } else {
      users.forEach(val => {
        user.push({
          id: val.id,
          name: val.name,
          phone: val.phone,
          action: val.action,
          type: val.type,
          date: val.created_at,
          status: val.done,
          order: val.order,
          description: val.description
        })
      });
      }
      res.status(200).json({user})
    }
  })
  
  } catch(e) {
    res.status(200).json({user:[]})
  }
}
module.exports.remainderid = (req, res) => {
  try{
  const id = req.body.id
  const token = req.body.token
  const encoded = encodeURI(`http://api.corp.chaynik48.ru/api/companies/chaynik/notifications/${id}`)
  const options = {
    'method': 'GET',
    'url': `http://api.corp.chaynik48.ru/api/companies/chaynik/notifications/${id}` ,
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain'
    },
    body: id
  }

  request(options, function (error, response) {
    if (error) throw new Error(error);
    const body = JSON.parse(response.body)
   
    if(body.message === 'Unauthenticated.') {
      res.status(400).json({user:[]})

    } else {
    if(body.success === false) {
      res.status(200).json({user:[]})
    } else {
      const user = body.data
      res.status(200).json({user})
    }
  }
  });
  } catch (e) {
    res.status(200).json({user:[]})
  }
}

module.exports.remainder = (req, res) => {
  try{
  const id = req.body.id
  const token = req.body.token

  const encoded = encodeURI(`http://api.corp.chaynik48.ru/api/companies/chaynik/orders/?phone=${id}`)
  var options = {
    'method': 'GET',
    'url': encoded,
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain'
    },
    body: id
  }

  request(options, function (error, response) {
    if (error) throw new Error(error);
    const body = JSON.parse(response.body)
    console.log(body)
    if(body.message === 'Unauthenticated.') {
      res.status(400).json({user:[]})
    } else {
      if(body.success === false) {
        res.status(200).json({user:[]})
      } else {
        const user = body.data
            
         res.status(200).json({user})
      }
    }
  });
  } catch (e) {
    res.status(200).json({user:[]})
  }

}