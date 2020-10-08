const request = require('request')

module.exports.deleterem = (req, res) => {

  const token =  req.body.token
  const id =  String(req.body._id)

  var options = {
    'method': 'DELETE',
    'url': `http://api.corp.chaynik48.ru/api/companies/chaynik/notifications/${id}`,
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain'
    },
    body: id
  
  };
  try {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
    const body = JSON.parse(response.body)
    if(body.success === false) {
      res.status(400).json({status: false})
    } else {
      res.status(200).json({status: true})
    }

  })
  } catch (e) {
    res.status(400).json({status: false})
  } 
}