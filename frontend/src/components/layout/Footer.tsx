import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-primary/10 px-6 lg:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-primary mb-6">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            <h2 className="text-lg font-extrabold tracking-tighter uppercase">ELÉGANCE</h2>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            A global atelier dedicated to the craft of living well.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/shop" className="hover:text-primary transition-colors">
                The Archive
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                Our Makers
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Care Guide
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Connect</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <Link href="/journal" className="hover:text-primary transition-colors">
                Journal
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </li>
            <li>
              <Link href="/store" className="hover:text-primary transition-colors">
                Locations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500 italic">
              Join our list for early access and editorial insights.
            </p>
            <div className="flex gap-2 border-b border-primary/30 py-2">
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 p-0"
                placeholder="Email Address"
                type="email"
              />
              <button className="text-primary material-symbols-outlined">arrow_right_alt</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-primary/5 pt-8 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        <p>© 2024 ELÉGANCE ATELIER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
