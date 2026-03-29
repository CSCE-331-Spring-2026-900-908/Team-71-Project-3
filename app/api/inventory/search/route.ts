import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
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
// searches by any of the attributes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const amount = searchParams.get("amount");
    const name = searchParams.get("name");
    const supplier_name = searchParams.get("supplier_name");
    const supplier_contact = searchParams.get("supplier_contact");

    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (id) {
      values.push(Number(id));
      conditions.push(`id = $${values.length}`);
    }

    if (amount) {
      values.push(Number(amount));
      conditions.push(`amount = $${values.length}`);
    }

    if (name) {
      values.push(`%${name}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }

    if (supplier_name) {
      values.push(`%${supplier_name}%`);
      conditions.push(`supplier_name ILIKE $${values.length}`);
    }

    if (supplier_contact) {
      values.push(`%${supplier_contact}%`);
      conditions.push(`supplier_contact ILIKE $${values.length}`);
    }

    let query = "SELECT * FROM inventory";

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await pool.query(query, values);

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to search inventory" },
      { status: 500 }
    );
  }
}