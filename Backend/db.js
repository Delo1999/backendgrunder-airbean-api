import Datastore from "nedb-promises";

export const db = Datastore.create({ filename: "data.db", autoload: true });
