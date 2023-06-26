const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
const token = "###########################"
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (err) => console.log(err));
bot.onText(/(.+)/, function (msg, match) {
	const city = match[1];
	const chatId = msg.chat.id
	const query ='http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=xxxxxxxxxxxxxxxxxxxx'
	request(query, function (error, response, body) {
		if (!error && response.statusCode == 200)
		{
            {
                res = JSON.parse(body)
                const temp = Math.round((parseInt(res.main.temp_min) - 273.15), 2)
				const pressure = Math.round(parseInt(res.main.pressure) - 1013.15)
				const rise = new Date(parseInt(res.sys.sunrise) * 1000)
				const set = new Date(parseInt(res.sys.sunset) * 1000);
				bot.sendMessage(chatId, ' Weather details of ' + city + '...\n' + ' \nTemperature: ' + String(temp) + '°C\nHumidity: ' + res.main.humidity + ' %\nWeather: ' + res.weather[0].description + '\nPressure: ' + String(pressure) + ' atm\nSunrise: ' + rise.toLocaleTimeString() + ' \nSunset: ' + set.toLocaleTimeString() + '\nCountry: ' + res.sys.country)
			}
		}
	})
})
