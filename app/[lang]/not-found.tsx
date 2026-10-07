import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-mono text-[#38bdf8]/60">404</p>
      <h1 className="text-3xl font-semibold text-white/80">Page not found · Pagina non trovata</h1>
      <Link href="/" className="text-sm text-white/40 hover:text-white/75 transition-colors duration-200">
        ← lucamimmo.dev
      </Link>
    </main>
  );
}
