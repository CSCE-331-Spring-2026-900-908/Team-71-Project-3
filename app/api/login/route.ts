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

// get user info
export async function GET(request: Request) {
  const session = await auth0.getSession();

  if (!session) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const auth0Id = session.user.sub;

  const result = await pool.query(
    "SELECT * FROM users WHERE auth0_user_id = $1",
    [auth0Id]
  );

  if (result.rows.length === 0) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(result.rows[0]);
}