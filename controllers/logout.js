const request = require('request')


module.exports.logout = (req, res) => {

  const token =  req.body.token

    try {
    const options = {
      'method': 'POST',
      'url': `http://api.corp.chaynik48.ru/api/companies/chaynik/logout?\'auth\'=s${token}`,
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Cookie': 'laravel_session=sAF1MtWYJZUpteJO3G3SBc1LTh060NSXuYsoGfcj'
      },
      formData: {
        'Bearer Token:': `${token}`
      }
    }
    
    request(options, function (error, response) {

      if (error) throw new Error(error.code);
      const body = response.body

      res.status(200).json({mes: true})
    })
  }
    catch (e) {
      res.status(200).json({mes: false})
    }
}