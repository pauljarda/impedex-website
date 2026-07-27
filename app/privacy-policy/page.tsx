import Link from "next/link";
import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Politică de confidențialitate | IMPEDEX",
  description: "Cum colectăm, folosim și protejăm datele tale personale.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Politică de confidențialitate" updated="iulie 2026">
      <p>
        Această politică explică modul în care <strong>IMPEDEX</strong> (denumit în
        continuare &bdquo;noi&rdquo;) colectează, utilizează și protejează datele
        cu caracter personal pe care ni le furnizezi prin acest site.
      </p>

      <h2>1. Operatorul de date</h2>
      <p>
        Operatorul datelor colectate prin acest site este{" "}
        <strong>IMPEDEX</strong>, activitate de reparații electronice din
        România. Pentru orice întrebare legată de datele tale sau pentru
        exercitarea drepturilor prevăzute de GDPR, ne poți scrie la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>. Răspundem în
        termenul legal de maximum 30 de zile.
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
        Nu folosim cookie-uri de urmărire, de publicitate sau de profilare și nu
        construim profiluri de comportament. Pentru a vedea câte persoane
        vizitează site-ul folosim Cloudflare Web Analytics — un serviciu care nu
        setează cookie-uri și nu creează identificatori persistenți, deci nu
        putem urmări un vizitator individual de la o vizită la alta. Detalii în{" "}
        <Link href="/cookies">Politica de cookie-uri</Link>.
      </p>
      <p>
        Ca la orice site, furnizorul de găzduire păstrează jurnale tehnice
        standard (de exemplu adresa IP) în scop de securitate și funcționare.
      </p>

      <h2>3. Scopul prelucrării</h2>
      <ul>
        <li>Procesarea cererilor de diagnosticare și reparație;</li>
        <li>Comunicarea cu tine privind starea lucrării și organizarea curierului;</li>
        <li>Îmbunătățirea serviciilor și a site-ului.</li>
      </ul>

      <h2>4. Temeiul legal</h2>
      <ul>
        <li>
          <strong>Executarea contractului</strong> (art. 6 alin. 1 lit. b GDPR) -
          pentru cererile de diagnosticare și reparație, inclusiv pașii
          premergători solicitați de tine. Acesta este temeiul principal: fără
          aceste date nu îți putem prelua și repara echipamentul.
        </li>
        <li>
          <strong>Obligația legală</strong> (art. 6 alin. 1 lit. c GDPR) - pentru
          documentele pe care legea ne obligă să le păstrăm, de exemplu
          evidențele contabile.
        </li>
        <li>
          <strong>Interesul legitim</strong> (art. 6 alin. 1 lit. f GDPR) - pentru
          securitatea site-ului și pentru statistici agregate de trafic.
        </li>
      </ul>

      <h2>5. Cât timp păstrăm datele</h2>
      <p>
        Păstrăm cererile de reparație și datele de contact asociate{" "}
        <strong>3 ani de la finalizarea lucrării</strong>. Termenul corespunde
        perioadei generale de prescripție în care ar putea apărea o reclamație
        legată de serviciul prestat. După expirarea acestei perioade, datele sunt
        șterse.
      </p>
      <p>
        Documentele pentru care legislația prevede termene proprii - de exemplu
        evidențele contabile - sunt păstrate atât timp cât impune legea, chiar
        dacă depășesc cei 3 ani.
      </p>
      <p>
        Dacă ți-ai creat un cont, datele contului sunt păstrate până când ceri
        ștergerea lui. Poți solicita oricând ștergerea datelor tale - vezi pagina{" "}
        <Link href="/gdpr">GDPR</Link>.
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
        <Link href="/gdpr">GDPR</Link>.
      </p>

      <h2>8. Contact</h2>
      <p>
        Pentru orice solicitare privind datele tale, scrie-ne la{" "}
        <a href="mailto:contact@impedex.ro">contact@impedex.ro</a>.
      </p>
    </LegalShell>
  );
}
