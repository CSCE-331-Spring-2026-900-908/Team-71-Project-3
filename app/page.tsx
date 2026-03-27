// Almost all of this code was just copied from the setup guide for auth0

import Image from "next/image";
import { auth0 } from "@/lib/auth0";

/*
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
*/

export default async function Home() {
  // Check if user is authenticated
  const session = await auth0.getSession();

  if (!session) {
    return (
      <>
        {/* Redirects to Auth0 to sign up */}
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <br />
        {/* Redirects to Auth0 to log in */}
        <a href="/auth/login">Login</a>
      </>
    );
  }

  return (
    <>
      <p>Logged in as {session.user.email}</p>

    {/* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Herro</h1>
    </div> */}

      {/* Display user info (name, email, etc.) */}
      <h1>User Profile</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      {/* Ends the session and redirects to Auth0 to log out */}
      <a href="/auth/logout">Logout</a>
    </>
  );
}

/*
  const user = session.user;

  const result = await pool.query(
    `SELECT role
     FROM users
     WHERE auth0_user_id = $1`,
    [user.sub]
  );

  if (result.rows.length === 0) {
    redirect("/unauthorized");
  }

  const role = result.rows[0].role;

  if (role === "manager") {
    redirect("/manager");
  }

  if (role === "cashier") {
    redirect("/cashier");
  }

  if (role === "customer") {
    redirect("/customer");
  }

  redirect("/unauthorized");
}
*/

