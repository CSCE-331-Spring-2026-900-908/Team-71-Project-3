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
// Uses Query parameter
// For use, please indicate the desired drink id in the url using key value. (ex: .../drinks/?id=12)
// If you would like all of the drink names, set allDrinks to true. (ex: .../drinks/?allDrinks=true)
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const allDrinks = url.searchParams.get("allDrinks");

    if (allDrinks == "true") {
      // Request and return all names of drinks
      const result = await pool.query("SELECT name, price FROM drink");

      return NextResponse.json(
        { message: "GET success", data: result.rows },
        { status: 200 },
      );
    }

    // id is given. 
    const drinkId = url.searchParams.get("id");

    // return full row of drink data for specified drink id
    const result = await pool.query("SELECT * FROM drink WHERE id = $1", [
      drinkId,
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

// This function adds a new drink to the drink table in the database,
// Uses request body
// Include key values pairs for id, name, ice, sweetness, milk, boba, popping_boba, price
export async function POST(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "INSERT INTO drink VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        body.id,
        body.name,
        body.ice,
        body.sweetness,
        body.milk,
        body.boba,
        body.popping_boba,
        body.price,
      ],
    );

    return NextResponse.json({ message: "POST success" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "POST failed" }, { status: 500 });
  }
}

// This function replaces a drink with a new drink in the database.
// Note that this destroys the original drink.
// Uses request body
// Include key values pairs for oldId, newId, name, ice, sweetness, milk, boba, popping_boba, price
// replaces drink with provided oldId.
export async function PUT(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "UPDATE drink SET id = $1, name = $2, ice = $3, sweetness = $4, milk = $5, boba = $6, popping_boba = $7, price = $8 WHERE id = $9",
      [
        body.newId,
        body.name,
        body.ice,
        body.sweetness,
        body.milk,
        body.boba,
        body.popping_boba,
        body.price,
        body.oldId,
      ],
    );

    return NextResponse.json({ message: "PUT success" }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "PUT failed" }, { status: 500 });
  }
}

// This function modifies the properties of a drink in the database.
// Uses request body
// Include key values pairs for id, name, ice, sweetness, milk, boba, popping_boba, price
// updates drink with provided id. Cannot update id itself
export async function PATCH(request: Request) {
  try {
    // TODO: test

    const body = await request.json();

    await pool.query(
      "UPDATE drink SET name = $1, ice = $2, sweetness = $3, milk = $4, boba = $5, popping_boba = $6, price = $7 WHERE id = $8",
      [
        body.name,
        body.ice,
        body.sweetness,
        body.milk,
        body.boba,
        body.popping_boba,
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

// This function deletes a single specified drink from the drink table,
// Uses Query parameter
// For use, please indicate the desired drink id to be deleted (ex: .../drinks/?id=12)
export async function DELETE(request: Request) {
  try {

    // TODO: test

    const url = new URL(request.url);
    const drinkId = url.searchParams.get("id");

    await pool.query("DELETE FROM drink WHERE id = $1", [drinkId]);

    return NextResponse.json({ message: "DELETE success" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "DELETE failed" }, { status: 500 });
  }
}
