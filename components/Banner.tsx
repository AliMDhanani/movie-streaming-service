import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { Movie } from "../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]); // gets a random number every time state of netflix originals changes

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl lg:text-7xl md:text-4xl text-white font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-white">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="button__banner bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="button__banner bg-[gray]/50">
          <HiInformationCircle
            className="h-5 w-5 md:h-8 md:w-8"
            onClick={() => {
              setCurrentMovie(movie);
              setShowModal(true);
            }}
          />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
