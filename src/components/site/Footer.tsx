export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-slate-800">Little Wow Balloons</div>
            <div>Melbourne • Parties • Events • Festivals</div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="hover:text-slate-900" href="#services">Services</a>
            <a className="hover:text-slate-900" href="#bundles">Bundles</a>
            <a className="hover:text-slate-900" href="#gallery">Gallery</a>
            <a className="hover:text-slate-900" href="#faq">FAQ</a>
            <a className="hover:text-slate-900" href="#quote">Get a Quote</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Little Wow Balloons. 
        </div>
      </div>
    </footer>
  );
}
