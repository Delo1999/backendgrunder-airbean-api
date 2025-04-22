//skapar db av meny
import DataStore from 'nedb-promises';
const menuDb = DataStore.create({ filename: './data/menu.db', autoload: true });

const menu = [
    {
        id: "coffee-vxig26my4y",
        title: "Bryggkaffe",
        desc: "Bryggd på månadens bönor.",
        price: 39,
      },
      {
        id: "coffee-220dodpzmg",
        title: "Caffè Doppio",
        desc: "Bryggd på månadens bönor.",
        price: 49,
      },
      {
        id: "coffee-4pdksmrkfa",
        title: "Cappuccino",
        desc: "Bryggd på månadens bönor.",
        price: 49,
      },
      {
        id: "coffee-m2h37k2mnh",
        title: "Latte Macchiato",
        desc: "Bryggd på månadens bönor.",
        price: 49,
      },
      {
        id: "coffee-0lp6ter3bh",
        title: "Kaffe Latte",
        desc: "Bryggd på månadens bönor.",
        price: 54,
      },
      {
        id: "coffee-e8hz0lk7q5",
        title: "Cortado",
        desc: "Bryggd på månadens bönor.",
        price: 39,
      },
      {
        id: "pastry-db3gfsuqpr",
        title: "Gustav Adolfsbakelse",
        desc: "En kunglig bakelse.",
        price: 50,
      },
      {
        id: "pastry-vkzh17ct2r",
        title: "Semla",
        desc: "En fastlagsbulle i sin rätta form.",
        price: 50,
      },
];

(async () => {
  try {
    await menuDb.remove({}, { multi: true });
    await menuDb.insertMany(menu);
    console.log('Menu database initialized!');
  } catch (err) {
    console.error('Error:', err);
  }
})();