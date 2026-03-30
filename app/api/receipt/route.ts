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

// display all of the receipt table
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM receipt");

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to fetch receipts" },
      { status: 500 }
    );
  }
}

// add a new recipt entry
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer_id,
      cashier_id,
      purchase_date,
      tax,
      discount,
      payment_method,
      z_closed
    } = body;

    // basic validation
    if (!cashier_id || !payment_method) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO receipt (
        customer_id,
        cashier_id,
        purchase_date,
        tax,
        discount,
        payment_method,
        z_closed
      )
      VALUES (
        $1,
        $2,
        COALESCE($3, CURRENT_TIMESTAMP),
        $4,
        $5,
        $6,
        COALESCE($7, false)
      )
      RETURNING *
      `,
      [
        customer_id ?? null,
        cashier_id,
        purchase_date ?? null,
        tax ?? 0,
        discount ?? 0,
        payment_method,
        z_closed ?? null
      ]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to insert receipt" },
      { status: 500 }
    );
  }
}