import Link from "next/link";
import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Politica de cookie-uri | IMPEDEX",
  description: "Ce cookie-uri folosim și cum le poți controla.",
};

export default function CookiesPage() {
  return (
    <LegalShell title="Politica de cookie-uri" updated="iulie 2026">
      <p>
        Pe scurt: nu folosim cookie-uri de publicitate, de urmărire sau de
        profilare. Dacă doar navighezi pe site fără să te autentifici, nu
        primești niciun cookie. Singurele cookie-uri pe care le setăm apar după
        ce te conectezi într-un cont și sunt strict necesare pentru a te menține
        autentificat.
      </p>

      <h2>1. Ce sunt cookie-urile</h2>
      <p>
        Cookie-urile sunt fișiere text mici pe care un site le stochează în
        browserul tău. Ele permit site-ului să rețină informații între cereri —
        de exemplu, faptul că ești deja autentificat.
      </p>

      <h2>2. Ce cookie-uri folosim</h2>
      <ul>
        <li>
          <strong>sb-…-auth-token</strong> — cookie creat de Supabase,
          furnizorul nostru de autentificare, în momentul în care te conectezi.
          Conține jetonul de sesiune care te menține autentificat. Fără el ar
          trebui să introduci parola la fiecare pagină.
        </li>
        <li>
          <strong>impedex-remember</strong> — reține dacă ai bifat „Ține-mă
          minte pe acest dispozitiv” la autentificare. Valoarea este „1” sau
          „0” și determină dacă sesiunea expiră la închiderea browserului.
        </li>
      </ul>
      <p>
        Ambele sunt cookie-uri proprii (first-party), setate de acest site și
        citite doar de acest site. Niciunul nu conține date de marketing.
      </p>

      <h2>3. Ce nu folosim</h2>
      <ul>
        <li>Cookie-uri de publicitate sau de retargetare.</li>
        <li>Cookie-uri de la rețele sociale.</li>
        <li>
          Instrumente de analiză bazate pe cookie-uri (de exemplu Google
          Analytics).
        </li>
        <li>
          Elemente încorporate de la terți — hărți, videoclipuri sau widgeturi
          de chat — care ar putea seta cookie-uri proprii.
        </li>
      </ul>

      <h2>4. Măsurarea traficului</h2>
      <p>
        Folosim Cloudflare Web Analytics pentru a vedea câte persoane vizitează
        site-ul. Acest serviciu nu folosește cookie-uri și nu creează
        identificatori persistenți pe dispozitivul tău — de aceea nu apare în
        lista de mai sus.
      </p>

      <h2>5. De ce nu îți cerem consimțământul</h2>
      <p>
        Legislația privind confidențialitatea în comunicațiile electronice cere
        consimțământ pentru cookie-urile care nu sunt strict necesare. Cele două
        cookie-uri de mai sus există exclusiv pentru a furniza o funcție pe care
        tu ai solicitat-o — autentificarea — și sunt exceptate de la această
        cerință. Nu setăm nimic care să necesite acordul tău, prin urmare nu îți
        afișăm o fereastră de consimțământ.
      </p>

      <h2>6. Cum le poți controla</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului tău. Dacă
        ștergi cookie-urile acestui site, vei fi deconectat și va trebui să te
        autentifici din nou. Restul site-ului — paginile publice și formularul
        de cerere — funcționează normal și fără niciun cookie.
      </p>

      <h2>7. Cookie-uri și date personale</h2>
      <p>
        Cookie-urile și datele personale sunt lucruri diferite. Când trimiți o
        cerere de reparație sau îți creezi un cont, colectăm date precum numele,
        adresa de email și numărul de telefon. Acestea nu sunt stocate în
        cookie-uri. Modul în care le folosim și drepturile pe care le ai asupra
        lor sunt descrise în{" "}
        <Link href="/privacy-policy">Politica de confidențialitate</Link> și în
        pagina <Link href="/gdpr">GDPR</Link>.
      </p>

      <h2>8. Contact</h2>
      <p>
        Întrebări despre cookie-uri? Scrie-ne la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>
    </LegalShell>
  );
}
