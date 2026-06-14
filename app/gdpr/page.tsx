import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "GDPR - Drepturile tale | IMPEDEX",
  description: "Drepturile tale privind datele cu caracter personal conform GDPR.",
};

export default function GdprPage() {
  return (
    <LegalShell title="GDPR - Protecția datelor" updated="iunie 2026">
      <p>
        Respectăm Regulamentul (UE) 2016/679 (GDPR). Mai jos găsești drepturile
        tale privind datele cu caracter personal și cum le poți exercita.
      </p>

      <h2>Drepturile tale</h2>
      <ul>
        <li><strong>Dreptul de acces</strong> - poți afla ce date deținem despre tine.</li>
        <li><strong>Dreptul la rectificare</strong> - poți cere corectarea datelor inexacte.</li>
        <li><strong>Dreptul la ștergere</strong> - poți cere ștergerea datelor (&bdquo;dreptul de a fi uitat&rdquo;).</li>
        <li><strong>Dreptul la restricționare</strong> - poți cere limitarea prelucrării în anumite situații.</li>
        <li><strong>Dreptul la portabilitate</strong> - poți primi datele într-un format structurat.</li>
        <li><strong>Dreptul la opoziție</strong> - te poți opune prelucrării bazate pe interes legitim.</li>
        <li><strong>Retragerea consimțământului</strong> - îți poți retrage oricând acordul, fără a afecta prelucrarea anterioară.</li>
      </ul>

      <h2>Cum îți exerciți drepturile</h2>
      <p>
        Trimite o solicitare la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>. Răspundem în
        termenul legal de maximum 30 de zile. Putem solicita confirmarea
        identității pentru a-ți proteja datele.
      </p>

      <h2>Plângeri</h2>
      <p>
        Dacă apreciezi că drepturile ți-au fost încălcate, te poți adresa
        Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter
        Personal (ANSPDCP),{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">
          dataprotection.ro
        </a>
        .
      </p>

      <h2>Securitatea datelor</h2>
      <p>
        Aplicăm măsuri tehnice și organizatorice rezonabile pentru a proteja
        datele împotriva accesului neautorizat, pierderii sau divulgării.
      </p>
    </LegalShell>
  );
}
