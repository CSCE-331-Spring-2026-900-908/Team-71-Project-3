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

export async function GET(request: Request) {
  try {
    // TODO: read query params or fetch data

    return NextResponse.json(
      { message: "GET success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "GET failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: create new resource

    return NextResponse.json(
      { message: "POST success" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "POST failed" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // TODO: replace full resource

    return NextResponse.json(
      { message: "PUT success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "PUT failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // TODO: update part of resource

    return NextResponse.json(
      { message: "PATCH success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "PATCH failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // TODO: delete resource

    return NextResponse.json(
      { message: "DELETE success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "DELETE failed" },
      { status: 500 }
    );
  }
}