import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[72vh] max-w-[1560px] flex-col justify-center px-6 md:px-12">
      <p className="t-label text-bronze">Sheet not found</p>
      <h1 className="t-display t-d1 mt-6 max-w-[14ch] text-ink">
        This address is off-market
      </h1>
      <p className="t-lead mt-8 max-w-[42ch] text-ink-soft">
        The page you are looking for is not part of the portfolio. The register
        is a short document — everything in it is one click away.
      </p>
      <Link
        href="/"
        className="t-label group mt-10 inline-flex w-fit items-center gap-3 border-b border-bronze pb-2 text-bronze"
      >
        Return to the register
        <IconArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
