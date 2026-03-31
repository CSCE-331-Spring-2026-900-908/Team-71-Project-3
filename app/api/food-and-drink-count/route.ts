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

// This function queries the database for the amount of each food and drink sold given a time frame,
// Uses Query parameter
// For use, please indicate the desired time frame using key value pairs for startDate and endDate
// startDate (YYYY-MM-DD) endDate (YYYY-MM-DD). (ex: .../food-and-drink-count/?startYear=2026-03-01&endDate=2026-04-23)
// If want all time data, set allTime to true (ex: .../food-and-drink-count/?allTime=true)
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);

    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const allTime = url.searchParams.get("allTime");

    if (allTime == "true") {
      // Request and return all count of foods and drinks sold for all time
      const result = await pool.query(
        `
        SELECT COUNT(drink_id) AS number_of_orders, name 
        FROM ( 
            SELECT 
                drink_to_receipt.drink_id, 
                drink.name, 
                DATE_PART('month', receipt.purchase_date) AS month, 
                DATE_PART('day', receipt.purchase_date) AS day, 
                DATE_PART('year', receipt.purchase_date) AS year 
            FROM drink 
            INNER JOIN drink_to_receipt ON drink.id = drink_to_receipt.drink_id 
            INNER JOIN receipt ON receipt.id = drink_to_receipt.receipt_id 
        ) 
        GROUP BY name 
        UNION 
        SELECT COUNT(food_id) AS number_of_orders, name 
        FROM ( 
            SELECT 
                food_to_receipt.food_id, 
                food.name, 
                DATE_PART('month', receipt.purchase_date) AS month, 
                DATE_PART('day', receipt.purchase_date) AS day, 
                DATE_PART('year', receipt.purchase_date) AS year 
            FROM food 
            INNER JOIN food_to_receipt ON food.id = food_to_receipt.food_id 
            INNER JOIN receipt ON receipt.id = food_to_receipt.receipt_id 
        ) 
        GROUP BY name`,
      );

      return NextResponse.json(
        { message: "GET success", data: result.rows },
        { status: 200 },
      );
    }

    // Request and return all count of foods and drinks sold in given time frame
    const result = await pool.query(
      `
        SELECT COUNT(drink_id) AS number_of_orders, name 
        FROM ( 
            SELECT 
                drink_to_receipt.drink_id, 
                drink.name, 
                DATE_PART('month', receipt.purchase_date) AS month, 
                DATE_PART('day', receipt.purchase_date) AS day, 
                DATE_PART('year', receipt.purchase_date) AS year 
            FROM drink 
            INNER JOIN drink_to_receipt ON drink.id = drink_to_receipt.drink_id 
            INNER JOIN receipt ON receipt.id = drink_to_receipt.receipt_id 
            WHERE receipt.purchase_date BETWEEN $1 AND $2 
        ) 
        GROUP BY name 
        UNION 
        SELECT COUNT(food_id) AS number_of_orders, name 
        FROM ( 
            SELECT 
                food_to_receipt.food_id, 
                food.name, 
                DATE_PART('month', receipt.purchase_date) AS month, 
                DATE_PART('day', receipt.purchase_date) AS day, 
                DATE_PART('year', receipt.purchase_date) AS year 
            FROM food 
            INNER JOIN food_to_receipt ON food.id = food_to_receipt.food_id 
            INNER JOIN receipt ON receipt.id = food_to_receipt.receipt_id 
            WHERE receipt.purchase_date BETWEEN $1 AND $2 
        ) 
        GROUP BY name`,
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
