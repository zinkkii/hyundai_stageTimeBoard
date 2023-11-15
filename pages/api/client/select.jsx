import { executeQuery } from "../../../src/app/db/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "SELECT * FROM timeattack ORDER BY laptime1 ASC, laptime2 ASC, laptime3 ASC";
    try {
      let result = await executeQuery(sql, []);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
