import { executeQuery } from "@/app/db/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql = "DELETE FROM timeattack WHERE num = ?";
    try {
      let result = await executeQuery(sql, [req.body.num]);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}