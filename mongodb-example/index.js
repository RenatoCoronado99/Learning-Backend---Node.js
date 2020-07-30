/*const Cat = mongoose.model("Cat", {name: String});

const kitty = new Cat({name: 'Garfield'});
kitty.save().then(()=>console.log('Cat has been saved!'));

Cat.find().then(console.log);*/
const mongoose = require('mongoose');
const config = require('./config');
const axios = require('axios').default;
//Acceder a los elementos del DOM desde cheerio, para poder hacer el web Scrapping
const cheerio = require('cheerio');
//Librería que nos ayuda a automatizar tareas repetitivas(similar a los crontab en linux).
const cron = require('node-cron');
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true});
const {BreakingNew}= require('./models');
//schedule recibe 2 parámetors, la primera la expresión y la segunda un callback wue se ejecutará cuandos ea el momento.
//0 */4 * * * : que se ejecute cada 4 horas. Página: crontab guru
cron.schedule("* * * * *", async ()=>
{
    console.log('CronJob executed');
    const html = await axios.get("https://cnnespanol.cnn.com/");
    const $ = cheerio.load(html.data);
    const titles = $(".news__title");
    titles.each((index, element)=>
    {
        const breakingNew = 
        {
            title: $(element).text(),
            link: $(element).children().attr("href")
        };
        BreakingNew.create([breakingNew]);
    });
});

/*(async ()=> 
{
    const html = await axios.get("https://cnnespanol.cnn.com/");
    const $ = cheerio.load(html.data);
    const titles = $(".news__title");
    //index: la posición del elemento en la página
    titles.each((index, element)=>
    {
        const breakingNew = 
        {
            title: $(element).text(),
            link: $(element).children().attr("href")
        }
        console.log(breakingNew);
    });
})();*/