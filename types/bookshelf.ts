export type Book = {
  name: string;
  author: string;
  year: string;
  imageURL?: string;
  link?: string;
}
export type Shelf = {
  month: string;
  books: Book[];
}
export type YearBookshelf = {
  year: string;
  shelves: Shelf[];
}
