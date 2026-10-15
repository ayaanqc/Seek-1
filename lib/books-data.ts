import type { Book } from "./types";
import {
  MEDITATIONS,
  WALDEN,
  LEAVES_OF_GRASS,
  SOULS_OF_BLACK_FOLK,
  THE_PROPHET,
  EXCERPT_CREDITS,
} from "./excerpts";

/**
 * A curated shelf of real books.
 *
 * Cover art is vendored under public/covers/ from the Open Library Covers
 * API (same verified editions as before, now pinned as files). Serving them
 * locally means the shelf no longer depends on the OL/archive.org redirect
 * chain at request time — no image-proxy latency, no flaky 500s, and
 * immutable caching. ISBNs below still identify the real print editions.
 * Prices, stock and the shop itself are fictional.
 *
 * `reading.kind` is "excerpt" only where the text is verifiably in the public
 * domain and the passage is reproduced verbatim from Project Gutenberg. For
 * everything still in copyright we write our own note instead of inventing a
 * quotation, and the UI says which is which.
 */
export const BOOKS: Book[] = [
  {
    id: "orbital",
    slug: "orbital",
    title: "Orbital",
    author: "Samantha Harvey",
    year: 2023,
    price: 27,
    coverUrl: "/covers/orbital.jpg",
    category: "Fiction",
    isbn: "9781529922936",
    pages: 144,
    format: "Hardcover",
    publisher: "Vintage",
    synopsis:
      "Sixteen sunrises in a single day, seen from low orbit. Harvey's Booker-winning novel keeps the earth small and the attention enormous \u2014 a book about looking, written at the scale of a breath.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Harvey makes a formal bet: an entire novel inside one orbit, with almost no plot and no antagonist beyond distance. What replaces plot is attention \u2014 to weather systems, to a bowl of fruit, to the sound a station makes at night. The result reads closer to a long poem than to a novel of ideas.",
        "It is short, and it is a good antidote to reading quickly. The book asks you to stay in your seat while sixteen sunrises happen overhead, and to notice how many of them you actually saw.",
      ],
    },
    marginalia: [
      { page: 33, note: "Somebody on staff read this in one sitting and then immediately started it again.", author: "Marginalia desk" },
      { page: 92, note: "The earth-from-above passages do what the best architecture books do: they re-scale the room you are sitting in.", author: "M. Lindqvist, staff" },
    ],
    featured: true,
  },
  {
    id: "all-fours",
    slug: "all-fours",
    title: "All Fours",
    author: "Miranda July",
    year: 2024,
    price: 29,
    coverUrl: "/covers/all-fours.jpg",
    category: "Fiction",
    isbn: "9781838853488",
    pages: 400,
    format: "Hardcover",
    publisher: "Canongate Books",
    synopsis:
      "An artist checks into a motel an hour from home and does not reach her destination. July's novel is funny, exact and unembarrassed about desire, marriage and the second half of a life.",
    reading: {
      kind: "notes",
      paragraphs: [
        "July writes the interior monologue of a woman who has decided to take herself seriously and is appalled by what that produces. The novel is very funny about bodies, money and artistic ambition, and it refuses the tidy version of a midlife reckoning at every turn.",
        "Structurally it is looser than it looks: the drive, the motel, the room, the return. It is not a cautionary tale and not a manifesto \u2014 it is a report from someone thinking out loud at length, and the length is the point.",
      ],
    },
    marginalia: [
      { page: 58, note: "Our most divided staff read of the year. Three of us loved it; one could not finish it.", author: "Marginalia desk" },
      { page: 233, note: "The tone swings hard between comedy and dread, sometimes inside one paragraph. Trust it.", author: "S. Ferrante, staff" },
    ],
    featured: true,
  },
  {
    id: "the-creative-act",
    slug: "the-creative-act",
    title: "The Creative Act",
    author: "Rick Rubin",
    year: 2023,
    price: 32,
    coverUrl: "/covers/the-creative-act.jpg",
    category: "Design",
    isbn: "9780593653425",
    pages: 432,
    format: "Hardcover",
    publisher: "Penguin Press",
    synopsis:
      "A working artist's notes on where work actually comes from \u2014 attention, patience, and the discipline of getting out of your own way. Less a method than a weather report for making things.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Rubin's book is a set of short meditations on where work comes from: attention, patience, and the willingness to be a vessel rather than an author. It is deliberately untechnical \u2014 there is no method here, only a way of standing in relation to the work.",
        "It is built for dipping rather than for reading straight through, and it rewards being kept near whatever you are making. Take what is useful and leave the rest; the book would probably prefer that.",
      ],
    },
    marginalia: [
      { page: 41, note: "Pairs well with a blank notebook and a closed door.", author: "R. Castellanos, staff" },
      { page: 168, note: "Skip the chapters that do not apply to you. The book invites exactly that.", author: "Marginalia desk" },
    ],
    featured: true,
  },
  {
    id: "the-architecture-of-the-city",
    slug: "the-architecture-of-the-city",
    title: "The Architecture of the City",
    author: "Aldo Rossi",
    year: 1966,
    price: 42,
    coverUrl: "/covers/the-architecture-of-the-city.jpg",
    category: "Architecture",
    isbn: "9780262181013",
    pages: 205,
    format: "Paperback",
    publisher: "The MIT Press",
    synopsis:
      "Rossi's argument that the city is something we remember before we plan it \u2014 still the shortest route into thinking about permanence, type, and the parts of a city that refuse to change.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Rossi treats the city as a work of collective memory before he treats it as a problem to be solved. Monuments, districts and dwelling types are not decoration laid on top of a plan; they are the plan's slow accumulation over centuries, and they answer to habits of living rather than to any single designer's intention.",
        "It is a difficult, rewarding book \u2014 part typology, part autobiography, part long argument with the modern movement. Read it the way Rossi wrote it: slowly, with a pencil, and with a map of a town you actually know open beside you.",
      ],
    },
    marginalia: [
      { page: 22, note: "Read chapter one with any walk through an old quarter. The \u2018urban artefact\u2019 idea lands outdoors.", author: "M. Lindqvist, staff" },
      { page: 103, note: "Rossi is not nostalgic for old cities. He is interested in why they hold.", author: "Marginalia desk" },
    ],
    featured: true,
  },
  {
    id: "meditations",
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    price: 18,
    coverUrl: "/covers/meditations.jpg",
    category: "Philosophy",
    isbn: "9780140449334",
    pages: 254,
    format: "Paperback",
    publisher: "Penguin Classics",
    synopsis:
      "The private notebook of a Roman emperor, never meant for publication. Marcus Aurelius rehearses the same few disciplines \u2014 attention, mortality, the useful day \u2014 until they wear into habit.",
    reading: {
      kind: "excerpt",
      credit: EXCERPT_CREDITS.MEDITATIONS,
      paragraphs: MEDITATIONS,
    },
    marginalia: [
      { page: 12, note: "Book One is a list of debts to teachers. Read it as an acknowledgements page for a whole life.", author: "J. Okafor, staff" },
      { page: 88, note: "He never asks to feel better. He asks to see clearly. That distinction is the entire book.", author: "Marginalia desk" },
      { page: 214, note: "Our most-annotated volume. Customers keep underlining the same three passages.", author: "R. Castellanos, staff" },
    ],
  },
  {
    id: "mrs-dalloway",
    slug: "mrs-dalloway",
    title: "Mrs Dalloway",
    author: "Virginia Woolf",
    year: 1925,
    price: 19,
    coverUrl: "/covers/mrs-dalloway.jpg",
    category: "Fiction",
    isbn: "9780156628709",
    pages: 240,
    format: "Paperback",
    publisher: "Harvest",
    synopsis:
      "One June day in London, told from inside the heads of everyone who passes through it. Woolf's clock keeps striking while her sentences wander \u2014 the novel that taught a century to write a single day.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Woolf builds the novel out of an ordinary civic day: a florist, a party, a car backfiring in Bond Street. The prose moves by association rather than by event, which is why the book rewards a second reading more than a first \u2014 its structure is legible from the end, not the beginning.",
        "It is usually shelved as a modernist experiment and undersold as a book about being alive on a Tuesday. Read it for the rhythm first; the argument about time will arrive on its own.",
      ],
    },
    marginalia: [
      { page: 9, note: "Watch how fast the narrator slides between heads. There is never an announcement.", author: "S. Ferrante, staff" },
      { page: 145, note: "The clocks recur like a metronome. Read a chapter aloud and try to keep their beat.", author: "T. Whitlock, staff" },
      { page: 214, note: "Readers tell us they put it down at page thirty and come back a year later. Both are correct.", author: "Marginalia desk" },
    ],
  },
  {
    id: "martyr",
    slug: "martyr",
    title: "Martyr!",
    author: "Kaveh Akbar",
    year: 2024,
    price: 28,
    coverUrl: "/covers/martyr.jpg",
    category: "Fiction",
    isbn: "9780593537619",
    pages: 352,
    format: "Hardcover",
    publisher: "Knopf",
    synopsis:
      "A young poet decides his death ought to mean something and sets out to research the martyrs who came before him. Akbar's debut is funny, tender and unafraid of the largest questions.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Akbar follows a young Iranian-American poet who has decided his own death should mean something, and who researches martyrs the way other people research family trees. The book is funny in a way that keeps catching you off guard, and it takes its grief seriously without ever becoming solemn.",
        "It is a novel about inheritance, addiction and the uses of art, told with the ear of a poet. Read it for the sentences; stay for the argument about what a life is for.",
      ],
    },
    marginalia: [
      { page: 74, note: "Akbar is a poet first, and you can hear it in the line breaks he refuses to use.", author: "A. Deshmukh, staff" },
      { page: 301, note: "The ending re-frames the whole book. Do not read the last chapter first, whatever you are told.", author: "Marginalia desk" },
    ],
  },
  {
    id: "in-praise-of-shadows",
    slug: "in-praise-of-shadows",
    title: "In Praise of Shadows",
    author: "Jun'ichir\u014d Tanizaki",
    year: 1933,
    price: 17,
    coverUrl: "/covers/in-praise-of-shadows.jpg",
    category: "Architecture",
    isbn: "9780099283577",
    pages: 100,
    format: "Paperback",
    publisher: "Vintage Classics",
    synopsis:
      "A short, sharp essay on Japanese aesthetics \u2014 lacquer, paper, dimness \u2014 written as a lament and read as a manifesto for restraint in the built world.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Tanizaki never argues for beauty in the abstract. He argues from materials \u2014 the way lacquer needs a dim room to become legible, the way a paper screen holds light at its edge, the way a single clear bulb can ruin an entire room. The essay is short enough to finish in an evening and specific enough to keep for years.",
        "It sits naturally beside any book about proportion. Where an architect measures a wall, Tanizaki measures the inch between the shadow of a shelf and the page beneath it, and finds both worth defending.",
      ],
    },
    marginalia: [
      { page: 18, note: "Our most-gifted short book. Nobody has ever bought just one copy.", author: "Marginalia desk" },
      { page: 46, note: "If you read one passage, read the one about the temple toilet. I am entirely serious.", author: "J. Okafor, staff" },
    ],
  },
  {
    id: "the-serviceberry",
    slug: "the-serviceberry",
    title: "The Serviceberry",
    author: "Robin Wall Kimmerer",
    year: 2024,
    price: 24,
    coverUrl: "/covers/the-serviceberry.jpg",
    category: "Essays",
    isbn: "9781668072257",
    pages: 128,
    format: "Hardcover",
    publisher: "Scribner",
    synopsis:
      "Kimmerer takes one autumn berry and uses it to think about reciprocity: what it would mean to treat a harvest as a gift rather than a transaction.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Kimmerer takes a single autumn berry and uses it to think about reciprocity \u2014 what it would mean to treat a harvest as a gift rather than a transaction. The book is short, plain and quietly radical about the economy it describes.",
        "It reads best in one sitting, outdoors if possible. Bring it to any argument about land, gifts or gratitude and it will hold its ground.",
      ],
    },
    marginalia: [
      { page: 27, note: "Read the reciprocity chapter, then go outside. The order matters.", author: "T. Whitlock, staff" },
      { page: 88, note: "A gift economy explained without a single slogan. Rare.", author: "Marginalia desk" },
    ],
  },
  {
    id: "leaves-of-grass",
    slug: "leaves-of-grass",
    title: "Leaves of Grass",
    author: "Walt Whitman",
    year: 1855,
    price: 15,
    coverUrl: "/covers/leaves-of-grass.jpg",
    category: "Poetry",
    isbn: "9780451524850",
    pages: 384,
    format: "Paperback",
    publisher: "Signet Classics",
    synopsis:
      "Whitman's self-published first edition, the book he rewrote for the rest of his life. Its catalogues, its body and its democratic sprawl gave American poetry a new register.",
    reading: {
      kind: "excerpt",
      credit: EXCERPT_CREDITS.LEAVES_OF_GRASS,
      paragraphs: LEAVES_OF_GRASS,
    },
    marginalia: [
      { page: 29, note: "Read the long lines aloud and the line breaks suddenly make sense. Silently, they flatten.", author: "T. Whitlock, staff" },
      { page: 62, note: "The catalogues exhaust some readers and convert others. There is no third response.", author: "Marginalia desk" },
    ],
  },
  {
    id: "a-swim-in-a-pond-in-the-rain",
    slug: "a-swim-in-a-pond-in-the-rain",
    title: "A Swim in a Pond in the Rain",
    author: "George Saunders",
    year: 2021,
    price: 20,
    coverUrl: "/covers/a-swim-in-a-pond-in-the-rain.jpg",
    category: "Essays",
    isbn: "9781984856029",
    pages: 417,
    format: "Hardcover",
    publisher: "Random House",
    synopsis:
      "Seven Russian short stories, taken apart and put back together by a master teacher. A craft book that never feels like one, because the teaching happens inside the reading.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Saunders takes seven Russian short stories and walks through them the way a mechanic walks through an engine, showing you where each one gets its power. It is a writing manual that never feels like one, because the teaching happens inside the reading.",
        "You can read it as a craft book or simply as an anthology with a very good host. Either way the effect is the same: the stories you thought you knew get longer, stranger and better.",
      ],
    },
    marginalia: [
      { page: 15, note: "Saunders teaches by showing you where his own attention snags. It is a generous method.", author: "S. Ferrante, staff" },
      { page: 204, note: "Keep a pencil out. You will want to mark the paragraphs about escalation.", author: "Marginalia desk" },
    ],
  },
  {
    id: "the-souls-of-black-folk",
    slug: "the-souls-of-black-folk",
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    year: 1903,
    price: 14,
    coverUrl: "/covers/the-souls-of-black-folk.jpg",
    category: "Essays",
    isbn: "9780140189988",
    pages: 206,
    format: "Paperback",
    publisher: "Penguin Classics",
    synopsis:
      "Du Bois's landmark study of Black life in America after Emancipation \u2014 history, memoir, music and sociology braided into a single argument about the colour line.",
    reading: {
      kind: "excerpt",
      credit: EXCERPT_CREDITS.SOULS_OF_BLACK_FOLK,
      paragraphs: SOULS_OF_BLACK_FOLK,
    },
    marginalia: [
      { page: 7, note: "Read the forethought twice. It states the whole argument in two pages.", author: "J. Okafor, staff" },
      { page: 151, note: "The chapter on the sorrow songs is the one people quote from memory.", author: "Marginalia desk" },
    ],
  },
  {
    id: "the-elements-of-typographic-style",
    slug: "the-elements-of-typographic-style",
    title: "The Elements of Typographic Style",
    author: "Robert Bringhurst",
    year: 1992,
    price: 38,
    coverUrl: "/covers/the-elements-of-typographic-style.jpg",
    category: "Design",
    isbn: "9780881792126",
    pages: 398,
    format: "Hardcover",
    publisher: "Hartley & Marks",
    synopsis:
      "Bringhurst's manual on type: opinions, measurements and a long memory for precedent. Still the book to hand a designer on their first day.",
    reading: {
      kind: "notes",
      paragraphs: [
        "Bringhurst writes about type the way a good architect writes about rooms: with opinions, measurements and a long memory for precedent. This is a manual, a history and an argument at once, and it is still the book to hand a designer on their first day.",
        "The later editions expand the inventory of typefaces and the sections on rhythm and proportion. Keep it within reach rather than on a shelf \u2014 it is a reference you will actually open.",
      ],
    },
    marginalia: [
      { page: 22, note: "Own a copy you are willing to write in. The margins are the point.", author: "R. Castellanos, staff" },
      { page: 187, note: "The chapter on rhythm is worth the price of the book on its own.", author: "M. Lindqvist, staff" },
    ],
  },
  {
    id: "walden",
    slug: "walden",
    title: "Walden",
    author: "Henry David Thoreau",
    year: 1854,
    price: 16,
    coverUrl: "/covers/walden.jpg",
    category: "Philosophy",
    isbn: "9780486284958",
    pages: 224,
    format: "Paperback",
    publisher: "Dover Publications",
    synopsis:
      "Two years, two months and two days in a cabin by a pond, and the ledger of attention that came out of it. Less an escape from society than an accounting of what a life costs.",
    reading: {
      kind: "excerpt",
      credit: EXCERPT_CREDITS.WALDEN,
      paragraphs: WALDEN,
    },
    marginalia: [
      { page: 4, note: "Notice that he starts by answering his neighbours' questions. The book is a reply, not a sermon.", author: "T. Whitlock, staff" },
      { page: 178, note: "By the pond chapters the prose goes quiet and observational. This is where readers slow down.", author: "A. Deshmukh, staff" },
    ],
  },
  {
    id: "the-prophet",
    slug: "the-prophet",
    title: "The Prophet",
    author: "Kahlil Gibran",
    year: 1923,
    price: 13,
    coverUrl: "/covers/the-prophet.jpg",
    category: "Poetry",
    isbn: "9798432076724",
    pages: 112,
    format: "Paperback",
    publisher: "Knopf",
    synopsis:
      "Gibran's sequence of poetic sermons on love, work, freedom and death, spoken by a departing sage. A small book that has been read at weddings and funerals for a century.",
    reading: {
      kind: "excerpt",
      credit: EXCERPT_CREDITS.THE_PROPHET,
      paragraphs: THE_PROPHET,
    },
    marginalia: [
      { page: 11, note: "Read \u2018On Work\u2019 at the start of a Monday. It has ruined several of ours.", author: "Marginalia desk" },
      { page: 89, note: "A book people give away and then buy again. We restock it every month.", author: "J. Okafor, staff" },
    ],
  },
];

export const CATEGORIES: string[] = [
  "All",
  "Philosophy",
  "Architecture",
  "Fiction",
  "Poetry",
  "Essays",
  "Design",
];

const BY_ID = new Map(BOOKS.map((b) => [b.id, b]));
const BY_SLUG = new Map(BOOKS.map((b) => [b.slug, b]));

/** Resolve by id or slug — the API accepts either. */
export function getBook(idOrSlug?: string | null): Book | undefined {
  if (!idOrSlug) return undefined;
  return BY_ID.get(idOrSlug) ?? BY_SLUG.get(idOrSlug);
}
