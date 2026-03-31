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

// return h=]the whole invenotry table
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM inventory");

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

//alter a line in inventory idenofied by name attribute, 
//only changes the fields given, not whole line
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { name, amount, supplier_name, supplier_contact } = body;

    const result = await pool.query(
    `
    UPDATE inventory
    SET
        amount = COALESCE($1, amount),
        supplier_name = COALESCE($2, supplier_name),
        supplier_contact = COALESCE($3, supplier_contact)
    WHERE name = $4
    RETURNING *
    `,
    [amount ?? null, supplier_name ?? null, supplier_contact ?? null, name]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}

// add a new line into the invenorty table
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, amount, supplier_name, supplier_contact } = body;

    // can tbe null so fails the attempt
    if (!name) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO inventory (name, amount, supplier_name, supplier_contact)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, amount ?? null, supplier_name ?? null, supplier_contact ?? null]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to add inventory item" },
      { status: 500 }
    );
  }
}