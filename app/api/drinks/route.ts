// This work is dedicated to the Holy Family. Jesus, I trust in You

import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; //to connect  to out db

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

// This function queries the database for single specified drink with its information,
// or returns all the names of the drinks.
// For use, please indicate the desired drink id in the request body. If you would like all of the drink names,
// leave the request body blank
export async function GET(request: Request) {
  try {
    // TODO: read query params or fetch data

    const body = await request.json();

    if (!body.id) {
      // no drink id input. request and return all names of drinks
      const result = await pool.query("SELECT name FROM drink");

      return NextResponse.json(
        { message: "GET success", data: result.rows },
        { status: 200 },
      );
    }

    // return full row of drink data for specified drink id
    const result = await pool.query("SELECT * FROM drink WHERE id = $1", [
      body.id,
    ]);

    return NextResponse.json(
      { message: "GET success", data: result.rows[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "GET failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: create new resource

    return NextResponse.json({ message: "POST success" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "POST failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // TODO: replace full resource

    return NextResponse.json({ message: "PUT success" }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "PUT failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // TODO: update part of resource

    return NextResponse.json({ message: "PATCH success" }, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "PATCH failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // TODO: delete resource

    return NextResponse.json({ message: "DELETE success" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "DELETE failed" }, { status: 500 });
  }
}
