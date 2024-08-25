import Express from "express";
import Cors from "cors"
import configuration from "config"
import axios from "axios"
import { connectDb } from "./utils/MongodbConector.js";
import { adminRoute } from "./routes/adminRoute.js";
import { clientRoute } from "./routes/clientRoute.js";

//server initializing
const server = Express()

//connect to database
connectDb()

//middlewares
server.use(Cors()) //cross origin communication
server.use(Express.json({limit:"100mb"})) // json body parsing
server.use(Express.urlencoded({ extended: false }))

//routes

//admin route
server.use('/admin', adminRoute)
//client route
server.use('/user', clientRoute)

//static endpoints
server.use('/public',Express.static('public'))


const recommendations = {
    hot: ['Iced Lemonade', 'Caesar Salad', 'Ice Cream'],
    cold: ['Tomato Soup', 'Hot Chocolate', 'Mac and Cheese'],
    rainy: ['Spicy Ramen', 'Hot Brownie', 'Chili'],
    cloudy: ['Grilled Sandwich', 'Latte', 'Pasta'],
  };
  
  // Function to fetch real-time weather data
  const getWeatherData = async (city) => {
    const apiKey = "891c567805c27fd03d65bda8cb36dbe3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  
  // Function to make a recommendation based on the weather
  const makeWeatherBasedRecommendation = async (city) => {
    const weatherData = await getWeatherData(city);
  
    if (weatherData) {
      const temp = weatherData.main.temp;
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
  
      if (temp > 30) {
        return recommendations.hot;
      } else if (temp < 15) {
        return recommendations.cold;
      } else if (weatherCondition.includes('rain')) {
        return recommendations.rainy;
      } else {
        return recommendations.cloudy;
      }
    } else {
      // Fallback if weather data is unavailable
      return recommendations.cloudy;
    }
  };
  
  // API Endpoint to get recommendations
  server.get('/api/recommendations/:city', async (req, res) => {
   try {
    const { city } = req.params;
    const recommendedItems = await makeWeatherBasedRecommendation(city);
  
    res.json({
      city,
      recommendations: recommendedItems,
    })} catch(err) {
        console.log(err)
        return res.status(500).json({message:"internal error"})
    } ;
  });
  

const port = process.env.PORT || configuration.host.port
server.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})

export {server}
