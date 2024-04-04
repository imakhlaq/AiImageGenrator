"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();

  return (
    <header
      className={cn(
        "p-3 grid grid-cols-2 text-md md:text-lg font-semibold bg-neutral-600 ",
      )}
    >
      <h1>AiImageGenerator</h1>
      <nav className={cn("flex gap-4")}>
        <Link
          className={`${path === "/" ? "border-b-2 border-yellow-300" : null}`}
          href="/"
        >
          Generate
        </Link>
        <Link
          className={`${
            path === "/collection" ? "border-b-2 border-yellow-300" : null
          }`}
          href="/collection"
        >
          Collection
        </Link>
      </nav>
    </header>
  );
};
export default NavBar;
