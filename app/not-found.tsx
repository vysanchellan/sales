import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <span className="font-display text-8xl text-gold/30">404</span>
      <h1 className="mt-4 font-display text-3xl text-cloud">This address is off-market</h1>
      <p className="mt-3 max-w-sm text-mist">
        The page you're looking for isn't part of the portfolio. Let's get you back to something
        worth viewing.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink"
      >
        Return home
      </Link>
    </div>
  );
}
