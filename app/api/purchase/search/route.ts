import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; //to connect  to out db
import { auth0 } from "@/lib/auth0";

/*
HTTP Status Codes

200 - OK (success)
201 - Created (new resource created)
400 - Bad Request (invalid input)
401 - Unauthorized (not logged in)
403 - Forbidden (no permission)
404 - Not Found (resource doesn’t exist)
500 - Server Error (something broke)
*/

/*
HTTP Methods

GET    - Read data
POST   - Create new data
PUT    - Replace entire resource
PATCH  - Update part of resource
DELETE - Remove data
*/

// search funtion to retunall matching rows in 
// purchase table for any of the attributes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return Response.json([]);
    }

    const result = await pool.query(
      `
      SELECT * FROM purchase
      WHERE
        CAST(id AS TEXT) ILIKE $1
        OR CAST(item_id AS TEXT) ILIKE $1
        OR CAST(amount AS TEXT) ILIKE $1
        OR CAST(supplier_price AS TEXT) ILIKE $1
        OR supplier_name ILIKE $1
        OR supplier_contact ILIKE $1
        OR CAST(buy_date AS TEXT) ILIKE $1
      `,
      [`%${q}%`]
    );

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to search purchase" },
      { status: 500 }
    );
  }
}