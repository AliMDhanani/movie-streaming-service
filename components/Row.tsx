import { Movie } from "../typings";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
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
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 text-white 
        transition hover:scale-125 group-hover:opacity-100"
        />

        <HiChevronRight
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 text-white 
        transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default Row;
