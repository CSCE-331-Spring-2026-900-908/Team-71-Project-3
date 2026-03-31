// This work is dedicated to the Holy Family. Jesus, I trust in You

import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; //to connect to out db

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

// This function queries the database for the expenses per month from sales given a time frame,
// Uses Query parameter
// For use, please indicate the desired time frame using key value pairs for startDate, and endDate
// startDate (YYYY-MM-DD) endDate (YYYY-MM-DD). (ex: .../expenses/?startYear=2026-03-01&endDate=2026-04-23)
// If want all time data, set allTime to true (ex: .../expenses/?allTime=true)
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);

    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const allTime = url.searchParams.get("allTime");

    if (allTime == "true") {
      // Request and return expenses per month for all time
      const result = await pool.query(
        `
        SELECT SUM(expense) AS expense, month, year 
        FROM ( 
          SELECT 
              supplier_price AS expense, 
              DATE_PART('month', buy_date) AS month, 
              DATE_PART('day', buy_date) AS day, 
              DATE_PART('year', buy_date) AS year 
          FROM purchase 
        ) 
        GROUP BY year, month 
        ORDER BY year, month ASC
        `,
      );

      return NextResponse.json(
        { message: "GET success", data: result.rows },
        { status: 200 },
      );
    }

    // Request and return expenses per month in given time frame
    const result = await pool.query(
        `
        SELECT SUM(expense) AS expense, month, year 
        FROM ( 
          SELECT 
              supplier_price AS expense, 
              DATE_PART('month', buy_date) AS month, 
              DATE_PART('day', buy_date) AS day, 
              DATE_PART('year', buy_date) AS year 
          FROM purchase 
          WHERE purchase.buy_date BETWEEN $1 AND $2 
        ) 
        GROUP BY year, month 
        ORDER BY year, month ASC
        `,
        [startDate, endDate],
      );

    return NextResponse.json(
      { message: "GET success", data: result.rows },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "GET failed" }, { status: 500 });
  }
}
