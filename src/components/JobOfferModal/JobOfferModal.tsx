import React from 'react';
import styles from './JobOfferModal.module.scss';
import companyLogo from '../../assets/images/companyLogo.jpg';
import { XMark } from '../../assets/icons/XMark';
import JobDetailsList from './JobDetailsList/JobDetailsList';

interface JobOfferModalProps {
   onClick: () => void;
}
export const JobOfferModal = ({ onClick }: JobOfferModalProps) => {
   return (
      <div className={styles.container}>
         <div className={styles.xmark} onClick={onClick}>
            <XMark />
         </div>
         <div className={styles.job_title_wrapper}>
            <img className={styles.company_logo_desktop} src={companyLogo} alt="company logo" />
            <div className={styles.header_wrapper}>
               <span className={styles.job_title}>Java Developer | Greenfield, Microservices</span>
               <p className={styles.tech_stack}>JAVASCRIPT・NEST・TYPESCRIPT・REACT </p>
            </div>
         </div>
         <section className={styles.content_container}>
            <div className={styles.description_wrapper}>
               <span className={styles.description_title}>
                  Transportation System Support IT Specialist (Core IT Team)
               </span>
               <p className={styles.description_text}>
                  Miejsce pracy: Robakowo (pow. poznański)Nasi specjaliści wspierają pracę zespołów
                  operacyjnych tworząc narzędzia i aplikacje dla całej organizacji z poziomu
                  centrali Grupy Raben. Odpowiadają za utrzymanie ciągłości pracy i rozwój systemów
                  magazynowych, transportowych i finansowych. Dodatkowo inicjują i zapewniają
                  stabilność pracy wszystkich naszych rozwiązań teleinformatycznych. Pracujemy w
                  międzynarodowym środowisku w 15 krajach, a języka angielskiego używamy na co
                  dzień. Podczas realizacji projektów stawiamy na jakość realizowanych zadań,
                  proaktywne podejście do pojawiających się wyzwań oraz współpracę.Posiadasz dobrą
                  znajomość baz danych? Cechuje Cię wysoka kultura osobista w kontaktach z
                  użytkownikami? Chciałbyś być częścią zespołu odpowiedzialnego za utrzymanie
                  ciągłości pracy transportowych Grupy Raben? Jeżeli na wszystkie z powyższych pytań
                  odpowiedziałeś/łaś twierdząco weź udział w rekrutacji i dołącz do naszego zespołu
                  ekspertów IT! Razem będziemy inicjować i wdrażać projekty oraz świętować wspólne
                  sukcesy. Obiecujemy swobodę w działaniu oraz zapewniamy, że ani przez chwilę nie
                  będziesz się z Nami nudził/ła. Jeśli, tak jak my, uważasz że praca zespołowa nie
                  jest tylko hasłem, serdecznie zapraszamy.To oferujemy: Stabilne zatrudnienie
                  (umowa o pracę na czas nieokreślony po okresie próbnym) w centralnym departamencie
                  IT Grupy Raben zlokalizowanym w Robakowie k/Poznania Zadania ukierunkowane na
                  tworzenie rozwiązań dedykowanych dla Klienta wewnętrznego Codzienny kontakt z j.
                  angielskim (praca w międzynarodowym środowisku) Możliwość realizacji zadań w
                  trybie hybrydowym (50% stacjonarnie w Robakowie k. Poznania, 50% telepraca) oraz
                  elastyczne godziny rozpoczęcia pracy Wynagrodzenie podstawowe (negocjowane
                  okresowo) oraz bonus kwartalny uzależniony od poziomu realizacji zleconych zadań
                  Rozwój w wybranym kierunku specjalizacji w ramach Grupy Raben dzięki m.in.
                  ścieżkom rozwoju, szkoleniom oraz awansom i promocji między działowej Dostęp do
                  platformy edukacyjnej UDEMY z możliwością otrzymania certyfikatów potwierdzających
                  ukończenie kursów Dofinansowanie do nauki języka angielskiego i/lub niemieckiego
                  (nauka za pośrednictwem platformy eTutor) Pakiet benefitów pozapłacowych (prywatna
                  opieka medyczna, dofinansowanie do karty sportowej, ubezpieczenie grupowe,
                  ubezpieczenie na życie dla pracowników i ich rodzin, promocje związane z turystyką
                  i sportem na platformie MyBenefit, zniżki na zakup paliwa na wybranych stacjach
                  benzynowych) Wysoką kulturę organizacyjną: możliwość uczestnictwa w akcjach
                  charytatywnych, cykliczne imprezy i eventy firmowe, okresowe konkursy dla
                  pracowników i wiele innych. Twój zakres obowiązków: Zapewnienie stabilności i
                  ciągłości pracy systemów transportowych we wszystkich krajach Grupy Raben
                  Diagnostyka oraz zdalne wsparcie użytkowników Grupy Raben w zakresie rozwiązywania
                  problemów IT (aplikacje transportowe oraz systemy wymiany danych z klientami
                  zewnętrznymi) Udział w pracach projektowych i współpraca z dostawcami
                  oprogramowania Analiza efektywności procesów oraz systematyczne wprowadzanie
                  usprawnień do systemu Nasze wymagania: min. 3 lata doświadczenie w obszarze
                  rozwoju systemów informatycznych Znajomość języka angielskiego na poziomie
                  komunikatywnym (praca w międzynarodowym środowisku) Znajomość PL/SQL na poziomie
                  podstawowym Znajomość Linux lub AIX na poziomie podstawowym Dobra organizacja
                  pracy i umiejętność realizacji kilku zadań w jednym czasie, nastawienie na
                  współpracę oraz zespołową realizację zadań. Mamy DRIVE do rozwoju!I dlatego jako
                  Raben Management Services wypracowujemy optymalne i nowoczesne rozwiązania
                  wspierające wszystkie spółki Grupy Raben. Jesteśmy po to, aby rozwijać i
                  doskonalić nasz biznes.Tworzymy zgrany zespół złożony z najlepszych ekspertów
                  wielu specjalizacji. Są wśród nas mistrzowie logistyki, pasjonaci transportu,
                  cyfrowi magicy w dziale IT, specjaliści do spraw finansów, eksperci w zakresie
                  audytu wewnętrznego, łowcy talentów w dziale HR i wirtuozi sprzedaży.A czego u nas
                  nie ma? Nudy! Każdy dzień to dla nas nowa przygoda i możliwości.Dla Ciebie też?
                  Fantastycznie! W takim razie czekamy właśnie na Ciebie!
               </p>
            </div>
            <div className={styles.data_wrapper}>
               <div className={styles.button_wrapper}>
               <a href={'https://example.com/job/software-engineer'}><button className={styles.visit_offer_button}>Visit offer ➔</button></a>
               </div>
               <JobDetailsList />
            </div>
         </section>
      </div>
   );
};

export default JobOfferModal;
