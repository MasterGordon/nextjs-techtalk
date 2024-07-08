import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "\x1b[38;2;70;70;170m[Info]\x1b[0m",
    "REQUEST FOR " + request.nextUrl.pathname,
  );
}
