import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Politica de cookie-uri | IMPEDEX",
  description: "Ce cookie-uri folosim și cum le poți controla.",
};

export default function CookiesPage() {
  return (
    <LegalShell title="Politica de cookie-uri" updated="iunie 2026">
      <p>
        Acest site folosește cookie-uri pentru a funcționa corect și pentru a
        înțelege cum este utilizat. Mai jos explicăm ce sunt și cum le poți
        gestiona.
      </p>

      <h2>1. Ce sunt cookie-urile</h2>
      <p>
        Cookie-urile sunt fișiere text mici stocate de browser pe dispozitivul
        tău. Ele permit site-ului să rețină anumite informații între vizite.
      </p>

      <h2>2. Ce tipuri folosim</h2>
      <ul>
        <li><strong>Strict necesare</strong> - permit funcționarea de bază a site-ului și a formularelor. Nu pot fi dezactivate.</li>
        <li><strong>De analiză</strong> - ne ajută să înțelegem cum este folosit site-ul, în mod anonim.</li>
        <li><strong>De preferință</strong> - rețin opțiuni precum consimțământul tău pentru cookie-uri.</li>
      </ul>

      <h2>3. Cookie-uri de la terți</h2>
      <p>
        Anumite funcții pot folosi servicii externe (de ex. instrumente de
        analiză sau hărți). Acestea pot seta propriile cookie-uri, conform
        politicilor lor.
      </p>

      <h2>4. Cum le controlezi</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului tău. Reține
        că dezactivarea unora poate afecta funcționarea site-ului. Instrucțiuni
        găsești în secțiunea de ajutor a fiecărui browser.
      </p>

      <h2>5. Contact</h2>
      <p>
        Întrebări despre cookie-uri? Scrie-ne la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>
    </LegalShell>
  );
}
