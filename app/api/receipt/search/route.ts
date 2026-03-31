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

// will return all table lines the match the parameter enetered, 
// searches by any of the attributes of the receipt table
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return Response.json([]);
    }

    const result = await pool.query(
      `
      SELECT * FROM receipt
      WHERE
        CAST(id AS TEXT) ILIKE $1
        OR CAST(customer_id AS TEXT) ILIKE $1
        OR CAST(cashier_id AS TEXT) ILIKE $1
        OR CAST(purchase_date AS TEXT) ILIKE $1
        OR CAST(tax AS TEXT) ILIKE $1
        OR CAST(discount AS TEXT) ILIKE $1
        OR payment_method ILIKE $1
        OR CAST(z_closed AS TEXT) ILIKE $1
      `,
      [`%${q}%`]
    );

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to search receipt table" },
      { status: 500 }
    );
  }
}