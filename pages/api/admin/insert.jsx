import { executeQuery } from "../../../src/app/db/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "INSERT INTO TimeAttack(name, email, laptime1, laptime2, laptime3) VALUES(?,?,?,?,?)";
    try {
      for (var i = 0; i < req.body.arr.length; i++) {
        let result = await executeQuery(sql, [
          req.body.arr[i].name,
          req.body.arr[i].email,
          req.body.arr[i].laptime1,
          req.body.arr[i].laptime2,
          req.body.arr[i].laptime3,
        ]);
      }
      return res.redirect(302, "/admin");
    } catch (error) {
      console.log(error);
    }
  }
}
