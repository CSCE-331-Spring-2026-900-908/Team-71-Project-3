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

// return whole purchases table
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM purchase");

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to fetch purchase" },
      { status: 500 }
    );
  }
}

// insert a new line into purchases table
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      item_id,
      buy_date,
      supplier_name,
      supplier_contact,
      amount,
      supplier_price
    } = body;

    // basic validation
    if (!item_id || amount == null || supplier_price == null) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO purchase (
        item_id,
        buy_date,
        supplier_name,
        supplier_contact,
        amount,
        supplier_price
      )
      VALUES ($1, COALESCE($2, CURRENT_TIMESTAMP), $3, $4, $5, $6)
      RETURNING *
      `,
      [
        item_id,
        buy_date ?? null,
        supplier_name ?? null,
        supplier_contact ?? null,
        amount,
        supplier_price
      ]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to insert purchase" },
      { status: 500 }
    );
  }
}