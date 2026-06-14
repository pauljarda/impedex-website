import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Politică de confidențialitate | IMPEDEX",
  description: "Cum colectăm, folosim și protejăm datele tale personale.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Politică de confidențialitate" updated="iunie 2026">
      <p>
        Această politică explică modul în care <strong>IMPEDEX</strong> (denumit în
        continuare &bdquo;noi&rdquo;) colectează, utilizează și protejează datele
        cu caracter personal pe care ni le furnizezi prin acest site.
      </p>

      <h2>1. Operatorul de date</h2>
      <p>
        Datele sunt prelucrate de [Denumire firmă], cu sediul în [adresă],
        înregistrată la Registrul Comerțului sub nr. [nr.], CUI [CUI]. Pentru
        orice întrebare legată de datele tale, ne poți scrie la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>

      <h2>2. Ce date colectăm</h2>
      <p>
        Colectăm doar datele pe care ni le furnizezi direct prin formularele de
        pe site:
      </p>
      <ul>
        <li>Date de identificare și contact: nume, telefon, adresă de email;</li>
        <li>Detalii despre echipamentul tău și defectul descris în cererea de diagnosticare.</li>
      </ul>
      <p>
        Nu folosim instrumente de urmărire (analytics) și nu colectăm date
        despre comportamentul tău de navigare. Ca la orice site, furnizorul de
        găzduire poate păstra jurnale tehnice standard (de ex. adresa IP) în scop
        de securitate și funcționare.
      </p>

      <h2>3. Scopul prelucrării</h2>
      <ul>
        <li>Procesarea cererilor de diagnosticare și reparație;</li>
        <li>Comunicarea cu tine privind starea lucrării și organizarea curierului;</li>
        <li>Îmbunătățirea serviciilor și a site-ului.</li>
      </ul>

      <h2>4. Temeiul legal</h2>
      <p>
        Prelucrăm datele în baza consimțământului tău (la trimiterea formularului),
        a executării contractului de prestări servicii și a interesului nostru
        legitim de a oferi și îmbunătăți serviciile.
      </p>

      <h2>5. Cât timp păstrăm datele</h2>
      <p>
        Păstrăm datele doar atât timp cât este necesar scopurilor de mai sus și
        conform obligațiilor legale (de ex. evidențe contabile). După această
        perioadă, datele sunt șterse sau anonimizate.
      </p>

      <h2>6. Cui le divulgăm</h2>
      <p>
        Nu vindem datele tale. Le putem împărtăși doar cu furnizori care ne ajută
        să operăm (de ex. firma de curierat pentru ridicare/retur, furnizorul de
        găzduire și baza de date), strict în limita necesară.
      </p>

      <h2>7. Drepturile tale</h2>
      <p>
        Ai dreptul de acces, rectificare, ștergere, restricționare, opoziție și
        portabilitate a datelor. Detalii și modul de exercitare găsești în pagina{" "}
        <a href="/gdpr">GDPR</a>.
      </p>

      <h2>8. Contact</h2>
      <p>
        Pentru orice solicitare privind datele tale, scrie-ne la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>
    </LegalShell>
  );
}
