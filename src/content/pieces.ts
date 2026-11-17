/**
 * The collection. Order here is the catalogue order: the first entry is No. 01
 * and is the piece shown at the entrance.
 *
 * To add a piece: put its image in /public/pieces and add an entry below.
 * To add a making-of film: put the file in /public/films and set `film`.
 * Optional fields (film, steps, balloons, time, level) only show once filled.
 */

export type Piece = {
  slug: string;
  name: string;
  /** Small secondary name shown beside the title. */
  nameZh?: string;
  form: string;
  palette: { name: string; swatches: string[] };
  /** One or two sentences describing what is in the photograph. */
  note: string;
  image: { src: string; width: number; height: number; alt: string };
  /** Set false for pieces that do not stand on the plinth (e.g. worn on a wrist). */
  reflect?: boolean;
  film?: { src: string; poster?: string };
  steps?: string[];
  balloons?: string;
  time?: string;
  level?: string;
};

export const pieces: Piece[] = [
  {
    slug: "dog",
    name: "The Dog",
    nameZh: "小狗",
    form: "Animal",
    palette: { name: "Rose pink, lemon", swatches: ["#F99FBC", "#F5D83B"] },
    note: "The one everybody knows: four legs, two ears and a tail in soft pink, finished with a yellow collar.",
    image: {
      src: "/pieces/dog.webp",
      width: 822,
      height: 728,
      alt: "The Dog, a pink balloon dog with a yellow collar",
    },
  },
  {
    slug: "bear",
    name: "The Bear",
    nameZh: "小熊",
    form: "Animal",
    palette: { name: "Rose pink", swatches: ["#FB9CB7"] },
    note: "A seated bear in soft pink, round ears up and paws tucked in.",
    image: {
      src: "/pieces/bear.webp",
      width: 607,
      height: 839,
      alt: "The Bear, a seated pink balloon bear",
    },
  },
  {
    slug: "sword",
    name: "The Sword",
    nameZh: "宝剑",
    form: "Prop",
    palette: { name: "Lemon yellow", swatches: ["#F7D808"] },
    note: "A long yellow blade with a looped guard and a beaded grip.",
    image: {
      src: "/pieces/sword.webp",
      width: 308,
      height: 975,
      alt: "The Sword, a yellow balloon sword with a beaded grip",
    },
  },
  {
    slug: "four-petal-flower",
    name: "Four-Petal Flower",
    nameZh: "四瓣花",
    form: "Flower",
    palette: {
      name: "Blue, red, orange, pink, green",
      swatches: ["#1877E0", "#E53C2E", "#F47B20", "#F896A4", "#84C132"],
    },
    note: "Four double petals in blue, red, orange and pink around a green heart, on a tall green stem.",
    image: {
      src: "/pieces/four-petal-flower.webp",
      width: 670,
      height: 928,
      alt: "Four-Petal Flower, a balloon flower with blue, red, orange and pink petals",
    },
  },
  {
    slug: "dinosaur",
    name: "The Dinosaur",
    nameZh: "恐龙",
    form: "Animal",
    palette: { name: "Emerald, moss", swatches: ["#1C780B", "#579F10"] },
    note: "A long neck, a ridged back and four sturdy legs, all in deep green.",
    image: {
      src: "/pieces/dinosaur.webp",
      width: 952,
      height: 745,
      alt: "The Dinosaur, a green balloon dinosaur with a ridged back",
    },
  },
  {
    slug: "fish",
    name: "The Fish",
    nameZh: "小鱼",
    form: "Animal",
    palette: { name: "Sapphire, lemon, sky", swatches: ["#067EDA", "#F4D21F", "#7CC4EA"] },
    note: "A blue reef fish with sweeping fins and a bright yellow eye.",
    image: {
      src: "/pieces/fish.webp",
      width: 713,
      height: 917,
      alt: "The Fish, a blue balloon fish with a yellow eye",
    },
  },
  {
    slug: "rose",
    name: "The Rose",
    nameZh: "玫瑰",
    form: "Flower",
    palette: { name: "Red, leaf green", swatches: ["#F90902", "#42A20B"] },
    note: "A red rosebud, tightly folded, with two green leaves on a long stem.",
    image: {
      src: "/pieces/rose.webp",
      width: 319,
      height: 809,
      alt: "The Rose, a red balloon rose on a green stem",
    },
  },
  {
    slug: "rainbow-lollipop",
    name: "Rainbow Lollipop",
    nameZh: "彩虹棒棒糖",
    form: "Sweet",
    palette: { name: "Peach, lemon, sky blue", swatches: ["#F3C9B5", "#FBDA0C", "#AAD2DF"] },
    note: "Rings of sky blue, yellow and peach, coiled into a lollipop on a pale blue stick.",
    image: {
      src: "/pieces/rainbow-lollipop.webp",
      width: 430,
      height: 912,
      alt: "Rainbow Lollipop, coiled rings of peach, yellow and blue balloons on a stick",
    },
  },
  {
    slug: "sceptre",
    name: "The Sceptre",
    nameZh: "权杖",
    form: "Wand",
    palette: { name: "Violet, peach, lime", swatches: ["#8C74F3", "#FFBE8D", "#BACB46"] },
    note: "A violet orb set in a collar of peach and lime, raised on a long peach handle.",
    image: {
      src: "/pieces/sceptre.webp",
      width: 267,
      height: 864,
      alt: "The Sceptre, a balloon wand topped with a violet orb",
    },
  },
  {
    slug: "bow-wand",
    name: "Bow Wand",
    nameZh: "蝴蝶结魔法棒",
    form: "Wand",
    palette: { name: "Blush pink, sky blue", swatches: ["#FAC1D5", "#8AD4F2"] },
    note: "A pale pink orb tied with a sky-blue bow, on a slender blue wand.",
    image: {
      src: "/pieces/bow-wand.webp",
      width: 246,
      height: 839,
      alt: "Bow Wand, a pink balloon orb with a blue bow on a blue wand",
    },
  },
  {
    slug: "wrist-corsage",
    name: "Wrist Corsage",
    nameZh: "手腕花",
    form: "Wearable",
    palette: { name: "Red, yellow, pink", swatches: ["#F70104", "#F4C21C", "#F59BB5"] },
    note: "A red flower with a yellow centre, worn at the wrist on a pink band.",
    reflect: false,
    image: {
      src: "/pieces/wrist-corsage.webp",
      width: 645,
      height: 524,
      alt: "Wrist Corsage, a red balloon flower worn on a wrist",
    },
  },
  {
    slug: "octopus",
    name: "The Octopus",
    nameZh: "章鱼",
    form: "Animal",
    palette: {
      name: "Blush, blue, orange, yellow",
      swatches: ["#F7D0D9", "#039CEA", "#F47B20", "#F1C232"],
    },
    note: "A pale pink head, two wide eyes and long arms in blue, orange and yellow.",
    image: {
      src: "/pieces/octopus.webp",
      width: 877,
      height: 538,
      alt: "The Octopus, a balloon octopus with a pink head and colourful arms",
    },
  },
  {
    slug: "sphere-in-a-cube",
    name: "Sphere in a Cube",
    nameZh: "笼中球",
    form: "Structure",
    palette: { name: "Lemon yellow, turquoise", swatches: ["#FEE90B", "#1E9FB4"] },
    note: "A turquoise sphere held inside a cube of twelve yellow edges.",
    image: {
      src: "/pieces/sphere-in-a-cube.webp",
      width: 803,
      height: 807,
      alt: "Sphere in a Cube, a turquoise balloon held inside a yellow balloon cube",
    },
  },
  {
    slug: "lantern",
    name: "The Lantern",
    nameZh: "灯笼",
    form: "Festival piece",
    palette: { name: "Deep red, gold", swatches: ["#C30417", "#F2B705"] },
    note: "A round lantern in deep red, ribbed like a cut stone and finished with gold at the crown and the tassel.",
    image: {
      src: "/pieces/lantern.webp",
      width: 629,
      height: 1100,
      alt: "The Lantern, a ribbed red balloon lantern with gold crown and tassel",
    },
  },
  {
    slug: "spring",
    name: "Spring",
    nameZh: "春",
    form: "Character",
    palette: { name: "Red, yellow", swatches: ["#CF010C", "#F2C21B"] },
    note: "The character 春, spring, written in red balloons with a small yellow flower set inside.",
    image: {
      src: "/pieces/spring.webp",
      width: 1100,
      height: 817,
      alt: "Spring, the character 春 made from red balloons",
    },
  },
];

export const pieceNumber = (index: number) => String(index + 1).padStart(2, "0");

export function findPiece(slug: string) {
  const index = pieces.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const count = pieces.length;
  return {
    piece: pieces[index],
    index,
    previous: { piece: pieces[(index - 1 + count) % count], index: (index - 1 + count) % count },
    next: { piece: pieces[(index + 1) % count], index: (index + 1) % count },
  };
}

const NUMBER_WORDS = [
  "No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
  "Nineteen", "Twenty",
];

/** "Fifteen" for 15; falls back to digits beyond twenty. */
export const countInWords = (n: number) => NUMBER_WORDS[n] ?? String(n);
