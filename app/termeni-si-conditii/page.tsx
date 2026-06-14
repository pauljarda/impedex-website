import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Termeni și condiții | IMPEDEX",
  description: "Termenii și condițiile de utilizare a serviciilor IMPEDEX.",
};

export default function TermeniPage() {
  return (
    <LegalShell title="Termeni și condiții" updated="iunie 2026">
      <p>
        Prin utilizarea acestui site și a serviciilor IMPEDEX, ești de acord cu
        termenii de mai jos. Te rugăm să îi citești cu atenție.
      </p>

      <h2>1. Serviciile oferite</h2>
      <p>
        Oferim servicii de diagnosticare și reparație pentru electronice de uz
        casnic, telefoane, laptopuri, surse, plăci electronice, echipamente
        industriale și sisteme fotovoltaice.
      </p>

      <h2>2. Cererea de diagnosticare</h2>
      <ul>
        <li>Trimiterea unei cereri nu garantează acceptarea reparației.</li>
        <li>Analizăm fiecare solicitare și revenim cu un verdict, de regulă în 1-2 zile lucrătoare.</li>
        <li>Informațiile furnizate trebuie să fie corecte și complete.</li>
      </ul>

      <h2>3. Costuri și aprobare</h2>
      <p>
        Costul reparației și, dacă e cazul, al transportului sunt comunicate
        înainte de începerea lucrării. Nicio reparație nu se efectuează fără
        acordul tău prealabil.
      </p>

      <h2>4. Transport prin curier</h2>
      <p>
        După aprobare, putem organiza ridicarea și returul echipamentului prin
        curier din toată țara. Responsabilitatea pentru ambalarea corespunzătoare
        la expediere îți revine, conform indicațiilor primite.
      </p>

      <h2>5. Garanție</h2>
      <p>
        Lucrările efectuate sunt testate înainte de retur și beneficiază de{" "}
        <strong>6 luni garanție</strong> asupra reparației realizate. Garanția nu
        acoperă defecte noi, neaferente lucrării, sau intervenții ulterioare ale
        unor terți.
      </p>

      <h2>6. Limitarea răspunderii</h2>
      <p>
        Nu ne asumăm răspunderea pentru pierderi de date de pe dispozitive. Te
        sfătuim să faci o copie de siguranță înainte de a trimite echipamentul.
      </p>

      <h2>7. Modificări</h2>
      <p>
        Putem actualiza acești termeni periodic. Versiunea aplicabilă este cea
        publicată pe site la momentul utilizării.
      </p>

      <h2>8. Contact</h2>
      <p>
        Pentru întrebări despre acești termeni, scrie-ne la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>
    </LegalShell>
  );
}
