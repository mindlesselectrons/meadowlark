var custom_fortune = require('./custom_library/fortune.js');

var express = require('express')

var app = express();

//set up handlebars view engine
var handlebars = require("express3-handlebars").create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
})
//note we specified the default layout (defaultLayout:'main').
//That means that unless you specify otherwise, this is the layout that will be used for any view
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

var fortunes = ["Conquer your fears or they will conquer you.","Rivers need springs.","Do not fear what you don't know.","You will have a pleasant surprise.","Whenever possible, keep it simple.", "Apples!"];


//dummy weather data middleware
app.use(function(req,res, next){
  if(!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weather = getWeatherData();
  next();
})


app.get('/nursery-rhyme', function(req, res){
  res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
  res.json({animal: 'squirrel',bodyPart: 'tail',adjective: 'bushy',noun: 'heck',});
});







//app.get is the method by which we're adding routes
app.get('/', function(req, res){
  res.render('home')
})

//the  route  for  the  About  page  will  work for /about, /About, /about/, /about?foo=bar, /about/?foo=bar, etc.
app.get('/about', function(req, res){
  //var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  //res.render('about', { fortune: randomFortune})
  res.render('about', { fortune: custom_fortune.getFortune() })
})

//secret apple page
app.get('/apples', function(req, res){
  res.render('aj3')
})





// 404 catch-all handler (middleware)
app.use(function(req, res){
  res.status(404)
  res.render('404')
})

//500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), function(){
  console.log("express started on localhost:" + app.get('port') + "\nPress ctrl + c to terminate")
})

//dummy weather data
function getWeatherData(){
  return {
    locations: [
      {
        name: 'Portland',
        forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Overcast',
        temp: '54.1 F (12.3 C)', //should there be a comma there?
      },
      {
        name: 'Bend',
        forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Partly Cloudy',
        temp: '55.0 F (12.8 C)',
      },
      {
        name: 'Manzanita',
        forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Light Rain',
        temp: '55.0 F (12.8 C)',
      },
    ],
  };//end of return
}//end of getWeatherData()
