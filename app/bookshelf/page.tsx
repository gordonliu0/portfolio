import React from "react";
import { Book, Shelf, YearBookshelf } from "types/bookshelf";

const ShelfMay2024: Shelf = {
  month: "May",
  books: [
    {
      name: "The Effective Executive",
      author: "Peter Drucker",
      year: "1966",
      imageURL:
        "https://m.media-amazon.com/images/I/61zH9mWg75L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: "High Output Management",
      author: "Andrew S. Grove",
      year: "2015",
      link: "https://medium.com/@iantien/top-takeaways-from-andy-grove-s-high-output-management-2e0ecfb1ea63",
    },
  ],
};

const Bookshelf2024: YearBookshelf = {
  year: "2024",
  shelves: [ShelfMay2024],
};

const Bookshelves: YearBookshelf[] = [Bookshelf2024];

export default function Page() {
  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col items-start justify-start gap-6 p-24">
      {Bookshelves.map((bookshelf) => {
        return (
          <div>
            <div className="text-xl font-semibold">{bookshelf.year}</div>
            {bookshelf.shelves.map((shelf) => {
              return (
                <div className="flex flex-row mt-3">
                  <div className="text-xs font-normal w-16">{shelf.month}</div>
                  <div>
                    {shelf.books.map((book) => {
                      return (
                        <div className="text-xs">
                          {`${book.name} - ${book.author} (${book.year})`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
