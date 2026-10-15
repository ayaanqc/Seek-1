import type { Book } from "./types";

export const BOOKS: Book[] = [
  {
    id: "architecture-of-silence",
    slug: "architecture-of-silence",
    title: "The Architecture of Silence",
    author: "Elena Marchetti",
    year: 2023,
    price: 34,
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&auto=format&fit=crop",
    category: "Architecture",
    isbn: "978-1-64729-041-2",
    pages: 312,
    format: "Hardcover",
    publisher: "Marginalia Press",
    synopsis: "A meditative survey of quiet rooms, cloisters, and reading chambers — how built stillness shapes thought. Marchetti pairs measured drawings with field notes from fourteen cities.",
    excerpt: [
      "We entered the chapel at noon, when the light stands directly overhead and refuses to perform. There was no spectacle to photograph, only a proportion to inhabit. The walls did not ask to be admired. They asked to be kept company.",
      "Silence, in architecture, is not the absence of sound. It is the presence of room. A corridor that does not hurry you. A stair that lands a half-beat later than you expect, so that your body must listen.",
      "The masons who laid these stones left no signature. Their argument was structural: that a room, honestly proportioned, will outlast every theory written inside it. I have come to believe them."
    ],
    marginalia: [
      { page: 12, note: "Read alongside Tanizaki on shadow. Same insistence that dimness is a material.", author: "J. Okafor, staff" },
      { page: 87, note: "The stair passage — marginal sketch of the Laurentian Library. Compare riser heights.", author: "M. Lindqvist, staff" },
      { page: 201, note: "Underlined in three reader copies this month. Our most annotated chapter.", author: "Marginalia desk" }
    ],
    featured: true
  },
  {
    id: "dialectics-of-dust",
    slug: "dialectics-of-dust",
    title: "Dialectics of Dust: Selected Prose",
    author: "Theodor Vane",
    year: 2021,
    price: 22,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80&auto=format&fit=crop",
    category: "Philosophy",
    isbn: "978-0-24139-882-1",
    pages: 284,
    format: "Paperback",
    publisher: "Vane Estate / Marginalia",
    synopsis: "Volume IV of the essential prose: twelve essays on attention, ruin, and repair. Vane writes with a bricklayer's patience and a poet's refusal to hurry.",
    excerpt: [
      "To attend to a thing is to let it interrupt you. Most of what we call thinking is merely rehearsal. Attention begins where rehearsal fails.",
      "The ruin is not the opposite of the building. It is the building, finally telling the truth about time. Dust is the archive that no institution thought to keep."
    ],
    marginalia: [
      { page: 44, note: "Pair with Weil on attention. Vane is terser, less consoling.", author: "S. Adeyemi, staff" },
      { page: 132, note: "Reader margin: 'copied this paragraph into my commonplace book twice.'", author: "Marginalia desk" }
    ],
    featured: true
  },
  {
    id: "field-guide-to-leaving",
    slug: "field-guide-to-leaving",
    title: "A Field Guide to Leaving",
    author: "June Park",
    year: 2024,
    price: 27,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80&auto=format&fit=crop",
    category: "Fiction",
    isbn: "978-1-83971-204-7",
    pages: 336,
    format: "Hardcover",
    publisher: "Marginalia Press",
    synopsis: "Nine linked stories of departures — night trains, borrowed apartments, last keys. Park's sentences are plain and exact until they quietly break your heart.",
    excerpt: [
      "She kept the apartment key for a month after she moved out, turning it over in her coat pocket like a coin. It no longer opened anything. That was precisely why she kept it.",
      "Every leavetaking, her mother said, should include a meal, a map, and a lie about when you will return. June took the meal. She left the map on the table."
    ],
    marginalia: [
      { page: 18, note: "First-story rule: teach new readers the collection's rhythm. This one does it.", author: "R. Calloway, staff" },
      { page: 209, note: "Book-club favorite. Bring tissues and a pencil.", author: "Marginalia desk" }
    ],
    featured: true
  },
  {
    id: "on-typography-and-hunger",
    slug: "on-typography-and-hunger",
    title: "On Typography & Hunger",
    author: "Aldo Serrano",
    year: 2022,
    price: 42,
    coverUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop",
    category: "Design",
    isbn: "978-3-72120-556-9",
    pages: 248,
    format: "Hardcover",
    publisher: "Studio Serrano",
    synopsis: "An essay-manual on editorial design: grids that breathe, type that feeds. 180 illustrations, paper samples, and a ruthless chapter on restraint.",
    excerpt: [
      "A page, like a table, should offer more than it displays. White space is not emptiness. It is hospitality. The margin says: there is room for you here.",
      "Set the headline smaller than your courage wants. Then make the text larger than your client expects. Legibility is generosity made measurable."
    ],
    marginalia: [
      { page: 56, note: "The hospitality line is quoted back to us weekly at the counter.", author: "Design desk" },
      { page: 140, note: "Paper stock note: this edition uses 120gsm Munken. Holds pencil beautifully.", author: "M. Lindqvist, staff" }
    ]
  },
  {
    id: "winter-herbarium",
    slug: "winter-herbarium",
    title: "Winter Herbarium",
    author: "Ingrid Solberg",
    year: 2020,
    price: 19,
    coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80&auto=format&fit=crop",
    category: "Poetry",
    isbn: "978-0-52557-113-4",
    pages: 96,
    format: "Paperback",
    publisher: "North Light",
    synopsis: "Forty-two spare poems pressed like specimens between November and March. Solberg writes winter as a discipline of noticing.",
    excerpt: [
      "First frost — / the garden gives back / every stake and string, / keeps only / what can stand / without us.",
      "I catalogued the cold the way others keep accounts: / debit of light, / credit of stars."
    ],
    marginalia: [
      { page: 22, note: "Read aloud at our December salon. Room went completely still.", author: "Marginalia desk" }
    ]
  },
  {
    id: "marginal-thinking",
    slug: "marginal-thinking",
    title: "Marginal Thinking: Notes Toward an Essayistic Life",
    author: "Priya Natarajan",
    year: 2023,
    price: 24,
    coverUrl: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80&auto=format&fit=crop",
    category: "Essays",
    isbn: "978-1-40889-301-5",
    pages: 272,
    format: "Paperback",
    publisher: "Marginalia Press",
    synopsis: "Fourteen essays on annotation, commonplacing, and reading with a pencil. A gentle polemic against frictionless reading.",
    excerpt: [
      "The margin is the reader's first draft of courage. To write there is to admit you were present. The book remembers what you were brave enough to answer.",
      "I do not trust a library without pencil marks. Pristine shelves suggest titles that were shelved, not read."
    ],
    marginalia: [
      { page: 7, note: "Our house philosophy in one paragraph. Staff unanimous.", author: "Marginalia desk" },
      { page: 118, note: "Commonplace template on p.118 — photocopied most at our shop.", author: "S. Adeyemi, staff" }
    ]
  },
  {
    id: "concrete-poems",
    slug: "concrete-poems",
    title: "Concrete Poems for Soft Cities",
    author: "Marco Reyes",
    year: 2019,
    price: 29,
    coverUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80&auto=format&fit=crop",
    category: "Architecture",
    isbn: "978-84-37608-42-0",
    pages: 208,
    format: "Paperback",
    publisher: "Hypostyle",
    synopsis: "Housing blocks, bus stops, and market halls read as verse. Reyes photographs and annotates the vernacular city with affection and rigor.",
    excerpt: [
      "The bus shelter on Calle 8 is not designed, it is decided — a roof, two benches, a timetable bleached to rumor. And yet at 7 a.m. it holds twenty strangers in perfect, unrehearsed order.",
      "Brutalism was never brutal. Concrete only asks for rain to show its age honestly."
    ],
    marginalia: [
      { page: 63, note: "Pairs beautifully with Architecture of Silence for a city weekend syllabus.", author: "J. Okafor, staff" }
    ]
  },
  {
    id: "the-passion-according",
    slug: "the-passion-according",
    title: "The Passion According to the Archivist",
    author: "Helena Duarte",
    year: 2024,
    price: 28,
    coverUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80&auto=format&fit=crop",
    category: "Fiction",
    isbn: "978-0-37428-119-8",
    pages: 384,
    format: "Hardcover",
    publisher: "Marginalia Press",
    synopsis: "A Lisbon archivist cataloguing a vanished poet's papers begins forging the missing letters. A novel about custody, forgery, and love of the unfinished.",
    excerpt: [
      "The box was labeled EPHEMERA, which in an archive means: we did not know where else to put our tenderness. Ticket stubs, a pressed violet, a grocery list in two hands.",
      "She told herself she was completing the record. Every archivist knows this is the first lie. The second is that completion is possible."
    ],
    marginalia: [
      { page: 91, note: "The EPHEMERA line stopped three customers mid-browse this week.", author: "R. Calloway, staff" },
      { page: 277, note: "No spoilers: the violet returns. That is all we will say.", author: "Marginalia desk" }
    ]
  },
  {
    id: "letters-to-a-young-observer",
    slug: "letters-to-a-young-observer",
    title: "Letters to a Young Observer",
    author: "Simone Hall",
    year: 2022,
    price: 21,
    coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80&auto=format&fit=crop",
    category: "Essays",
    isbn: "978-0-06-293-441-9",
    pages: 192,
    format: "Paperback",
    publisher: "Field Notes",
    synopsis: "Twenty short letters on looking: museums, streets, notebooks. Hall teaches attention as a portable practice.",
    excerpt: [
      "Stand in front of one painting for twenty minutes. You will be bored for seven. Restless for six. Then, if you stay, the painting will begin to look back.",
      "Carry a small notebook and a large willingness to be wrong about what you saw."
    ],
    marginalia: [
      { page: 33, note: "We run a 20-minute exercise from this chapter in every workshop.", author: "S. Adeyemi, staff" }
    ]
  },
  {
    id: "stone-and-song",
    slug: "stone-and-song",
    title: "Stone and Song",
    author: "Tomas Berg",
    year: 2021,
    price: 18,
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&q=80&auto=format&fit=crop",
    category: "Poetry",
    isbn: "978-1-78269-330-2",
    pages: 112,
    format: "Paperback",
    publisher: "North Light",
    synopsis: "Quarry poems and hymns. Berg listens for the music inside labor — hammer, choir, tide.",
    excerpt: [
      "The quarrymen sang to measure the cut — / one verse per stone, / one silence / for the one that broke wrong.",
      "Granite remembers the sea / the way we remember childhood: / exactly, and not at all."
    ],
    marginalia: [
      { page: 48, note: "Translation note: Swedish originals face the English. Both sing.", author: "M. Lindqvist, staff" }
    ]
  },
  {
    id: "the-grid-and-the-garden",
    slug: "the-grid-and-the-garden",
    title: "The Grid and the Garden",
    author: "Yuki Tanaka",
    year: 2023,
    price: 38,
    coverUrl: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&q=80&auto=format&fit=crop",
    category: "Design",
    isbn: "978-4-87311-902-6",
    pages: 296,
    format: "Hardcover",
    publisher: "Studio Serrano",
    synopsis: "Kyoto gardens through a designer's eye: constraint as generosity. Includes fold-out plans and seasonal maintenance diaries.",
    excerpt: [
      "The garden does not hide the grid. It teaches the grid manners. Stones are placed where the eye would otherwise hurry.",
      "Maintenance is authorship continued by other hands. To rake gravel is to reprint the page each morning."
    ],
    marginalia: [
      { page: 102, note: "Fold-out plan of Ryoan-ji rewards slow unfolding. Do not rush it.", author: "Design desk" }
    ]
  },
  {
    id: "on-walking-and-knowing",
    slug: "on-walking-and-knowing",
    title: "On Walking and Knowing",
    author: "Robert Illich",
    year: 2020,
    price: 23,
    coverUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&q=80&auto=format&fit=crop",
    category: "Philosophy",
    isbn: "978-0-24140-112-5",
    pages: 256,
    format: "Paperback",
    publisher: "Vane Estate / Marginalia",
    synopsis: "A philosophy of the footpath: pace, digression, and arrival. Illich walks six historic routes and thinks at three miles per hour.",
    excerpt: [
      "Thought walks at the speed of the body. Faster, and it becomes logistics. Slower, and it becomes sleep. Three miles per hour is the mind's native gait.",
      "A digression is not a departure from the path. Properly understood, the path is what digressions have in common."
    ],
    marginalia: [
      { page: 77, note: "Margin sketch: pace diagram. Staff walk favorite.", author: "J. Okafor, staff" }
    ]
  },
  {
    id: "small-hours",
    slug: "small-hours",
    title: "Small Hours",
    author: "Ada Osei",
    year: 2024,
    price: 26,
    coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80&auto=format&fit=crop",
    category: "Fiction",
    isbn: "978-0-52555-987-2",
    pages: 304,
    format: "Hardcover",
    publisher: "Marginalia Press",
    synopsis: "A night-shift nurse, a lighthouse keeper, and a baker trade the same city after dark. Osei's interwoven novellas glow quietly.",
    excerpt: [
      "At 3 a.m. the hospital corridor is a long held breath. Ada moved through it the way you move through a library — as if noise were a form of rudeness.",
      "The lighthouse log for October 14 reads, in full: 'Fog. Fog. Bread from town. Fog lifted long enough to miss it.'"
    ],
    marginalia: [
      { page: 141, note: "The lighthouse log — two sentences, perfect story. Workshop prompt gold.", author: "R. Calloway, staff" }
    ]
  },
  {
    id: "essays-against-haste",
    slug: "essays-against-haste",
    title: "Essays Against Haste",
    author: "Leonard Moss",
    year: 2018,
    price: 20,
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop",
    category: "Essays",
    isbn: "978-1-91039-552-3",
    pages: 224,
    format: "Paperback",
    publisher: "Field Notes",
    synopsis: "In praise of slow reading, long letters, and second drafts. Moss is wry, humane, and quietly radical about time.",
    excerpt: [
      "Haste is not speed. Speed can be beautiful — the sprinter, the swallow. Haste is speed without destination, a hurry that has forgotten what it hurries toward.",
      "Write the letter by hand. You will say less, and mean more. The postage is the price of having meant it."
    ],
    marginalia: [
      { page: 15, note: "Pairs with Marginal Thinking for a slow-reading starter shelf.", author: "Marginalia desk" }
    ]
  }
];

export const CATEGORIES = ["All", "Philosophy", "Architecture", "Fiction", "Poetry", "Essays", "Design"] as const;

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id || b.slug === id);
}
