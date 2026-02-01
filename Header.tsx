import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export default function Header() {
  return (
    <header>
      <Link href="/" className="logo">
        <svg
          className="sun-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" fill="var(--accent-color)" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="var(--accent-color)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="logo-text-group">
          <span
            className="brand-name"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            {siteConfig.siteName}

            <svg
              width="0.85em"
              height="0.85em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "translateY(1px)" }}
            >
              <path
                d="M12 4.5 C 13 8, 11 16, 12 19.5 M4.5 12 C 8 13, 16 11, 19.5 12"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="brand-sub">
            {siteConfig.tagline}
          </span>
        </div>
      </Link>

      <nav className="desktop-nav">
        <ul>
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
