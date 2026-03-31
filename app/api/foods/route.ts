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

// This function queries the database for single specified food with its information,
// or returns all the names of the foods.
// Uses Query parameter
// For use, please indicate the desired food id in the url using key value. (ex: .../foods/?id=3)
// If you would like all of the food names, set allFoods to true. (ex: .../foods/?allFoods=false)
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const allFoods = url.searchParams.get("allFoods");

    if (allFoods == "true") {
      // Request and return all names of foods
      const result = await pool.query("SELECT name, price FROM food");

      return NextResponse.json(
        { message: "GET success", data: result.rows },
        { status: 200 },
      );
    }

    // food id given 
    const foodId = url.searchParams.get("id");

    // return full row of food data for specified food id
    const result = await pool.query("SELECT * FROM food WHERE id = $1", [
      foodId,
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

// This function adds a new food to the food table in the database,
// Uses request body
// Include key values pairs for id, name, price
export async function POST(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "INSERT INTO food VALUES ($1, $2, $3)",
      [
        body.id,
        body.name,
        body.price,
      ],
    );

    return NextResponse.json({ message: "POST success" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "POST failed" }, { status: 500 });
  }
}

// This function replaces a food with a new food in the database.
// Note that this destroys the original food.
// Uses request body
// Include key values pairs for oldId, newId, name, price
// replaces food with provided oldId.
export async function PUT(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "UPDATE food SET id = $1, name = $2, price = $8 WHERE id = $9",
      [
        body.newId,
        body.name,
        body.ice,
        body.oldId,
      ],
    );

    return NextResponse.json({ message: "PUT success" }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "PUT failed" }, { status: 500 });
  }
}

// This function modifies the properties of a food in the database.
// Uses request body
// Include key values pairs for id, name, price
// updates food with provided id. Cannot update id itself
export async function PATCH(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "UPDATE food SET name = $1, price = $2 WHERE id = $3",
      [
        body.name,
        body.price,
        body.id,
      ],
    );

    return NextResponse.json({ message: "PATCH success" }, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "PATCH failed" }, { status: 500 });
  }
}

// This function deletes a single specified food from the food table,
// Uses Query parameter
// For use, please indicate the desired food id to be deleted (ex: .../foods/?id=3)
export async function DELETE(request: Request) {
  try {

    // TODO: test

    const url = new URL(request.url);
    const foodId = url.searchParams.get("id");

    await pool.query("DELETE FROM food WHERE id = $1", [foodId]);

    return NextResponse.json({ message: "DELETE success" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "DELETE failed" }, { status: 500 });
  }
}
