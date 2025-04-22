import Datastore from "nedb-promises";

// Skapa två separata databaser
export const menuDB = Datastore.create({ filename: "menu.db", autoload: true });
export const db = Datastore.create({ filename: "data.db", autoload: true });

console.log("Menu- och Order-databaserna är laddade.");

// Logga innehållet i båda databaserna
async function logDatabases() {
try {
    const menuData = await menuDB.find({});
    const dbData= await db.find({});

    console.log("📋 Menydata:");
    console.log(JSON.stringify(menuData, null, 2));

    console.log("🧾 Orderdata:");
    console.log(JSON.stringify(dbData, null, 2));
} catch (error) {
    console.error("Fel vid hämtning från databaserna:", error);
}
}

logDatabases();
