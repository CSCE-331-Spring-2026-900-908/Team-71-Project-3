import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const LinkStyle =
    "flex gap-2 text-white m-auto bg-(--primary) h-fit w-fit px-6 py-3 rounded-full";
  return (
    <nav className="w-full p-3 bg-transparent">
      <div className="w-full max-w-250 mx-auto bg-white flex justify-between gap-3 p-3 rounded-full">
        <Link
          href="/"
          className="my-auto h-fit w-fit hover:scale-105 active:scale-95"
        >
          <Image
            className="h-12"
            src="/Logo.svg"
            alt=""
            width={70}
            height={105}
          />
        </Link>
        <div className="w-fit flex gap-4">
          <Link className={LinkStyle} href="/Login">
            <Image
              className="h-5 w-auto"
              src="/Login.svg"
              alt=""
              width={18}
              height={18}
            />
            Login
          </Link>
          <Link className={LinkStyle} href="/Order">
            <Image
              className="h-5 w-auto"
              src="/Cart.svg"
              alt=""
              width={22}
              height={21}
            />
            Order
          </Link>
          <Link className={LinkStyle} href="/Manager">
            <Image
              className="h-5 w-auto"
              src="/Suitcase.svg"
              alt=""
              width={20}
              height={18}
            />
            Manager
          </Link>
        </div>
      </div>
    </nav>
  );
}
