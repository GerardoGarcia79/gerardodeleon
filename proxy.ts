import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isInvalidLocaleSegment } from "./i18n/locale";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const [, firstSegment] = request.nextUrl.pathname.split("/");

  // e.g. /fr → 404 at /fr (layout), not redirect to /en/fr
  if (firstSegment && isInvalidLocaleSegment(firstSegment)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
