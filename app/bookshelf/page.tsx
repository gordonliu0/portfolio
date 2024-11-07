import React from "react";
import { Book, Shelf, YearBookshelf } from "types/bookshelf";

const ShelfMay2024: Shelf = {
  month: "May",
  books: [
    {
      name: "On Writing",
      author: "Stephen King",
      year: "2000",
    },
    {
      name: "The Effective Executive",
      author: "Peter Drucker",
      year: "1967",
    },
  ],
};

const ShelfJune2024: Shelf = {
  month: "June",
  books: [
    {
      name: "Albert Einstein",
      author: "Walter Isaacson",
      year: "2007",
    },
    {
      name: "Economics in One Lesson",
      author: "Henry Hazlitt",
      year: "1946",
    },
    {
      name: "Steve Jobs",
      author: "Walter Isaacson",
      year: "2011",
    },
    {
      name: "The Art of War",
      author: "Sun Tzu",
      year: "5th century BC",
    },
    {
      name: "Unlimited Memory",
      author: "Kevin Horsley",
      year: "2014",
    },
  ],
};

const ShelfJuly2024: Shelf = {
  month: "July",
  books: [
    {
      name: "Zero to One",
      author: "Peter Thiel",
      year: "2014",
    },
    {
      name: "Principles",
      author: "Ray Dalio",
      year: "2017",
    },
  ],
};

const ShelfAugust2024: Shelf = {
  month: "August",
  books: [
    {
      name: "The Lean Startup",
      author: "Eric Ries",
      year: "2011",
    },
    {
      name: "Recruiting",
      author: "Ryan Breslow",
      year: "2022",
    },
  ],
};

const Bookshelf2024: YearBookshelf = {
  year: "2024",
  shelves: [ShelfMay2024, ShelfJune2024, ShelfJuly2024, ShelfAugust2024],
};

const Bookshelves = [Bookshelf2024];
export default function Page() {
  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col items-start justify-start gap-6 mt-32">
      <div className="text-xl font-semibold">Books</div>
      <div>
        Here are all the books I've read, arranged in chronological order.
      </div>
      {Bookshelves.map((bookshelf) => {
        return (
          <div key={bookshelf.year}>
            <div className="text-xl font-semibold">{bookshelf.year}</div>
            {bookshelf.shelves.map((shelf) => {
              return (
                <div key={shelf.month} className="flex flex-row mt-3">
                  <div className="text-xs font-normal w-16">{shelf.month}</div>
                  <div>
                    {shelf.books.map((book) => {
                      return (
                        <div key={book.name} className="text-xs">
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
