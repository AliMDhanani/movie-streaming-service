import { Movie } from "../typings";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface Props {
  title: string;
  movies: Movie[];
  //   movie: Movie | DocumentData;
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      
      rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"}) // registering scroll behaviour => scrolls one entire size of screen
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2
        className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition
      duration-200 hover:text-white md:text-2xl" 
      >
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <HiChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 text-white 
          transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")} //until ismoved is true left chevron arrow stays hidden => for carousel funciton
        />

        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-0.5 md:space-x-2.5 md:p-2 overflow-x-scroll"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} /> //mapping through the movie data from  tmdb => addressed in typings.
          ))}
        </div>

        <HiChevronRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 text-white 
          transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
