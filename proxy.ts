import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isInvalidLocaleSegment } from "./i18n/locale";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const [, firstSegment, ...rest] = request.nextUrl.pathname.split("/");

  // /fr/about -> /en/about
  if (firstSegment && isInvalidLocaleSegment(firstSegment)) {
    const pathname = rest.length ? `/${rest.join("/")}` : "";

    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}${pathname}`, request.url),
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
