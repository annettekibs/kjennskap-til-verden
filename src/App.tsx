import { useState } from 'react'
import type { ReactNode } from 'react'
import styles from './App.module.css'

type Page = 'home' | 'topic' | 'tasks' | 'resources'

type NavItem = {
  id: Page
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Forside' },
  { id: 'topic', label: 'Temaer' },
  { id: 'tasks', label: 'Oppgaver' },
  { id: 'resources', label: 'Ressurser' },
]

const themes = [
  {
    title: 'Mennesker og steder',
    text: 'Utforsk hvordan geografi, kultur og samfunn former hverdagsliv.',
  },
  {
    title: 'Norge i verden',
    text: 'Se sammenhenger mellom norsk identitet, globale spørsmål og lokalt liv.',
  },
  {
    title: 'Demokrati og deltakelse',
    text: 'Arbeid med medborgerskap, rettigheter og ulike perspektiver.',
  },
]

const resources = [
  {
    type: 'Artikkel',
    title: 'Bakgrunnstekst om kulturforståelse',
    use: 'Kan brukes til forarbeid for temaet og som støtte til refleksjon.',
  },
  {
    type: 'Video',
    title: 'Kort fagvideo om demokrati og deltakelse',
    use: 'Kan brukes som felles inngang til samtale i klassen.',
  },
  {
    type: 'Kilde',
    title: 'Statistikk og kartressurser',
    use: 'Kan brukes når elevene skal sammenligne land, regioner og levekår.',
  },
]

function App() {
  const [activePage, setActivePage] = useState<Page>('home')

  return (
    <div className={styles.appShell}>
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className={styles.main}>
        {activePage === 'home' && <HomePage onNavigate={setActivePage} />}
        {activePage === 'topic' && <TopicPage onNavigate={setActivePage} />}
        {activePage === 'tasks' && <TasksPage onNavigate={setActivePage} />}
        {activePage === 'resources' && <ResourcesPage onNavigate={setActivePage} />}
      </main>
    </div>
  )
}

function Header({
  activePage,
  onNavigate,
}: {
  activePage: Page
  onNavigate: (page: Page) => void
}) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarInner}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>Kjennskap til verden</p>
          <span className={styles.brandMeta}>Low-fidelity prototype</span>
        </div>
        <nav className={styles.nav} aria-label="Hovedmeny">
          {navItems.map((item) => (
            <button
              className={`${styles.navButton} ${
                activePage === item.id ? styles.navButtonActive : ''
              }`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className={styles.pageGrid}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Digital læringsressurs</p>
          <h1 className={styles.title}>Kjennskap til verden</h1>
          <p className={styles.lead}>
            En strukturert ressurs for elever i videregående opplæring som følger norsk
            undervisning i utlandet. Prototypen viser innholdsflyt, navigasjon,
            refleksjon og oppgaver.
          </p>
          <div className={styles.buttonRow}>
            <button className={styles.button} onClick={() => onNavigate('topic')} type="button">
              Start med tema
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => onNavigate('resources')}
              type="button"
            >
              Se ressurser
            </button>
          </div>
        </div>
        <WireframePlaceholder label="Plassholder for oversiktsbilde eller introduksjonsvideo" />
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Hva eleven skal lære</p>
        <h2>Faglig oversikt og refleksjon</h2>
        <p>
          Elevene skal få oversikt over sentrale temaer i faget, arbeide med korte
          fagtekster, undersøke ulike perspektiver og formulere egne refleksjoner knyttet
          til verden, Norge og egen hverdag.
        </p>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Temaoversikt</p>
        <div className={styles.cardGrid}>
          {themes.map((theme) => (
            <ThemeCard key={theme.title} {...theme} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Slik bruker du ressursen</p>
        <div className={styles.steps}>
          <Step number="1" text="Les kort fagtekst og se eventuelle medier." />
          <Step number="2" text="Sjekk læringsmålene for temaet." />
          <Step number="3" text="Svar på refleksjonsspørsmål og oppgaver." />
          <Step number="4" text="Bruk ressurser til fordypning og egenvurdering." />
        </div>
      </section>
    </div>
  )
}

function TopicPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className={styles.pageGrid}>
      <section className={styles.section}>
        <p className={styles.eyebrow}>Temaside</p>
        <h1 className={styles.pageTitle}>Norge i verden</h1>
        <p>
          Dette temaet handler om hvordan Norge inngår i globale sammenhenger. Elevene
          arbeider med kultur, migrasjon, demokrati og hvordan norske perspektiver kan
          forstås fra ulike steder i verden.
        </p>
      </section>

      <div className={styles.twoColumn}>
        <section className={styles.section}>
          <WireframePlaceholder label="Plassholder for bilde, illustrasjon eller video" />
          <div className={styles.buttonRow}>
            <button className={styles.button} onClick={() => onNavigate('tasks')} type="button">
              Gå videre til oppgaver
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => onNavigate('home')}
              type="button"
            >
              Tilbake til oversikt
            </button>
          </div>
        </section>

        <aside className={styles.section}>
          <h2>Læringsmål</h2>
          <ul className={styles.objectiveList}>
            <li>Forklare hvordan Norge påvirkes av globale prosesser.</li>
            <li>Sammenligne ulike perspektiver på kultur og identitet.</li>
            <li>Bruke fagbegreper i muntlig og skriftlig refleksjon.</li>
          </ul>
        </aside>
      </div>

      <section className={styles.section}>
        <h2>Refleksjonsspørsmål</h2>
        <ul className={styles.questionList}>
          <li>Hva betyr det å ha tilknytning til Norge når man bor i utlandet?</li>
          <li>Hvilke globale saker merker du i hverdagen din?</li>
          <li>Hvordan kan samme hendelse forstas ulikt i ulike land?</li>
        </ul>
      </section>
    </div>
  )
}

function TasksPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className={styles.pageGrid}>
      <section className={styles.section}>
        <p className={styles.eyebrow}>Oppgaveside</p>
        <h1 className={styles.pageTitle}>Oppgaver: Norge i verden</h1>
        <Progress />
      </section>

      <div className={styles.taskStack}>
        <TaskCard title="1. Flervalg">
          <p>Hvilket eksempel viser en global sammenheng?</p>
          <ul className={styles.optionList}>
            <li>A. En lokal skoleferie</li>
            <li>B. Handel, klima og migrasjon på tvers av landegrenser</li>
            <li>C. En personlig timeplan</li>
          </ul>
        </TaskCard>

        <TaskCard title="2. Kort refleksjon">
          <p>
            Skriv tre setninger om hvordan stedet du bor på kan påvirke hvordan du ser på
            Norge.
          </p>
          <div className={styles.textareaMock}>Tekstfelt for elevsvar</div>
        </TaskCard>

        <TaskCard title="3. Skriveoppgave">
          <p>
            Velg en aktuell sak og forklar hvordan den kan oppleves ulikt i Norge og i
            landet du bor i.
          </p>
          <div className={styles.textareaMock}>Lengre skrivefelt for utkast</div>
        </TaskCard>

        <TaskCard title="Egenvurdering: Hva har jeg lært?">
          <p>
            Oppsummer ett fagbegrep du forstar bedre, ett sporsmal du fortsatt har, og
            ett eksempel du kan bruke videre.
          </p>
          <div className={styles.textareaMock}>Egenvurdering</div>
        </TaskCard>
      </div>

      <section className={styles.section}>
        <div className={styles.buttonRow}>
          <button
            className={styles.secondaryButton}
            onClick={() => onNavigate('topic')}
            type="button"
          >
            Tilbake til tema
          </button>
          <button
            className={styles.button}
            onClick={() => onNavigate('resources')}
            type="button"
          >
            Videre til ressurser
          </button>
        </div>
      </section>
    </div>
  )
}

function ResourcesPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className={styles.pageGrid}>
      <section className={styles.section}>
        <p className={styles.eyebrow}>Ressursside</p>
        <h1 className={styles.pageTitle}>Kilder og videre ressurser</h1>
        <p>
          Denne siden samler eksempelressurser som kan stotte fagtekst, samtale,
          fordypning og kildearbeid. Lenker er vist som plassholdere i wireframen.
        </p>
      </section>

      <section className={styles.section}>
        <ul className={styles.resourceList}>
          {resources.map((resource) => (
            <ResourceItem key={resource.title} {...resource} />
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Bruk i undervisningen</h2>
        <p>
          Ressursene kan brukes for å aktivere forkunnskaper, gi flere perspektiver,
          stotte elevens selvstendige arbeid og bygge bro mellom fagstoff og elevenes
          egne erfaringer fra norsk opplæring i utlandet.
        </p>
        <div className={styles.buttonRow}>
          <button
            className={styles.secondaryButton}
            onClick={() => onNavigate('tasks')}
            type="button"
          >
            Tilbake til oppgaver
          </button>
          <button className={styles.button} onClick={() => onNavigate('home')} type="button">
            Til forsiden
          </button>
        </div>
      </section>
    </div>
  )
}

function ThemeCard({
  title,
  text,
  onNavigate,
}: {
  title: string
  text: string
  onNavigate: (page: Page) => void
}) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className={styles.cardBars} aria-hidden="true">
        <span className={styles.bar} />
        <span className={`${styles.bar} ${styles.barShort}`} />
      </div>
      <button className={styles.secondaryButton} onClick={() => onNavigate('topic')} type="button">
            Åpne tema
      </button>
    </article>
  )
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <article className={styles.step}>
      <strong>Steg {number}</strong>
      <p>{text}</p>
    </article>
  )
}

function WireframePlaceholder({ label }: { label: string }) {
  return <div className={styles.placeholder}>{label}</div>
}

function Progress() {
  return (
    <div className={styles.progress}>
      <strong>Progresjon: 3 av 5 deler</strong>
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} />
      </div>
    </div>
  )
}

function TaskCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className={styles.taskCard}>
      <h3>{title}</h3>
      {children}
    </article>
  )
}

function ResourceItem({
  type,
  title,
  use,
}: {
  type: string
  title: string
  use: string
}) {
  return (
    <li className={styles.resourceItem}>
      <div className={styles.resourceType}>{type}</div>
      <div>
        <h3>{title}</h3>
        <p>{use}</p>
        <a className={styles.linkMock} href="#resources" onClick={(event) => event.preventDefault()}>
          Eksempellenke til fagstoff
        </a>
      </div>
    </li>
  )
}

export default App
