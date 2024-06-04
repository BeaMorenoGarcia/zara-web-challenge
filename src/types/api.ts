export type Character = {
  id: number;
  name: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Url[];
  thumbnail: Image;
  comics?: ComicList;
  stories?: StoryList;
  events?: EventList;
  series?: SeriesList;
};

type Url = {
  type?: string;
  url?: string;
};
type Image = {
  path: string;
  extension: string;
};
type ComicList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: ComicSummary[];
};
type ComicSummary = {
  resourceURI?: string;
  name?: string;
};
type StoryList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
};
type StorySummary = {
  resourceURI?: string;
  name?: string;
  type?: string;
};
type EventList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: EventSummary[];
};
type EventSummary = {
  resourceURI?: string;
  name?: string;
};
type SeriesList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: SeriesSummary[];
};
type SeriesSummary = {
  resourceURI?: string;
  name?: string;
};

export type Comic = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: SeriesSummary;
  variants: ComicSummary[];
  collections: ComicSummary[];
  collectedIssues: ComicSummary[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: Image;
  images: Image[];
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList;
  events: EventList;
};

type ComicDate = {
  type: string;
  date: Date;
};

type TextObject = {
  type: string;
  language: string;
  text: string;
};

type ComicPrice = {
  type: string;
  price: number;
};

type CreatorList = {
  available: number;
  returned: number;
  collectionURI: string;
  items: CreatorSummary[];
};

type CharacterList = {
  available: number;
  returned: number;
  collectionURI: string;
  items: CharacterSummary[];
};

type CharacterSummary = {
  resourceURI: string;
  name: string;
  role: string;
};

type CreatorSummary = {
  resourceURI: string;
  name: string;
  role: string;
};
