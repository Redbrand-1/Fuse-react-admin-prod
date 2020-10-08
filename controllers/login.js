const request = require('request')

module.exports.auth = (req, res) => {

  
  const { login, password } = req.body

  let data = null
  try {
    request.post(
      {
        url: 'http://api.corp.chaynik48.ru/api/companies/chaynik/login',
        form: {
          email: login,
          password: password
        }
      },
      (err, httpResponse, body) => {
        if (err) throw new Error(err);
        const data = JSON.parse(body)
        if(data.success !== false) {
        const token = data.data.access_token
        const options = {
          'method': 'GET',
          'url': 'http://api.corp.chaynik48.ru/api/companies/chaynik/profile',
          'headers': {
            'Authorization': `Bearer ${token}`,
          },
          formData: {
            'Bearer Token:': `${token}`
          }
        }

        request(options, function (error, response) {
          if (error) throw new Error(error);
          const body = JSON.parse(response.body)
          console.log(body)
          if(body.success !== false) {
            const user = {
              id: body.data.id,
              name: body.data.name,
              email: body.data.email,
              photo: body.data.photo,
              role: body.data.role,
              role_name: body.data.role_name
            }
  
            res.status(200).json({user, token})
          } else {
            res.status(200).json({user: [], token})
          }

        })
      } else {
        res.status(400).json({error: true})
      }
      
    }

    );
  } catch (e) {
    res.status(400).json({error: true})
  }
}

module.exports.re = (req, res) => {
  const token = req.body.token

  const options = {
    'method': 'GET',
    'url': 'http://api.corp.chaynik48.ru/api/companies/chaynik/profile',
    'headers': {
      'Authorization': `Bearer ${token}`,
    },
    formData: {
      'Bearer Token:': `${token}`
    }
  } 

  request(options, function (error, response) {
    if (error) throw new Error(error);
    const body = JSON.parse(response.body)

    if(body.success !== false) {
      const user = {
        id: body.data.id,
        name: body.data.name,
        email: body.data.email,
        photo: body.data.photo,
        role: body.data.role,
        role_name: body.data.role_name
      }
      res.status(200).json({user})
    } else {
      res.status(400).json({user: []})
    }
    

    })


}