"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ImageSon1 from "../images/cover-1.webp";
import ImageSon2 from "../images/cover-2.webp";
import Card from "./_components/Card";
import { IconPause } from "./_components/IconPause";
import { IconPlay } from "./_components/IconPlay";

export default function MusicPlayerPage() {
  const songs = useMemo(
    () => [
      {
        id: 1,
        title: "Lost in the City Lights",
        author: "Cosmo Sheldrake",
        src: "./music/lost-in-city-lights-145038.mp3",
        image: ImageSon1,
      },
      {
        id: 2,
        title: "Forest Lullaby",
        author: "Lesfm",
        src: "./music/forest-lullaby-110624.mp3",
        image: ImageSon2,
      },
    ],
    []
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(songs[currentSongIndex].src);
    audioRef.current = audio;

    const updateMetaData = () => {
      setDuration(audio.duration);
    };
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      setPlaying(true);
    };
    const handlePause = () => {
      setPlaying(false);
    };
    audio.addEventListener("loadedmetadata", updateMetaData);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", goNext);
    return () => {
      audio.removeEventListener("loadedmetadata", updateMetaData);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", goNext);
    };
  }, []);

  const playPause = useCallback(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [playing]);
  const goNext = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src;
      audioRef.current.play();
      setPlaying(false);
      setCurrentTime(0);
    }
  }, [currentSongIndex, songs]);
  const goPrev = useCallback(() => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src;
      audioRef.current.play();
      setPlaying(true);
      setCurrentTime(0);
    }
  }, []);
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  return (
    <div className="w-screen min-h-screen bg-music-player font-inter flex items-center justify-center">
      <Card>
        <Image
          className="w-full h-full object-cover object-center rounded-xl transition"
          src={songs[currentSongIndex].image}
          alt="Lost in the City Lights"
          height={280}
          width={songs[currentSongIndex].image.width}
          priority
        />
        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-base text-[#E5E7EB] font-bold">
            {songs[currentSongIndex].title}
          </h1>
          <p className="text-[#4D5562] text-[12px]">
            {songs[currentSongIndex].author}
          </p>
        </div>
        <div className="">
          <audio className="hidden" ref={audioRef} />
          <div className="flex justify-between text-xs pb-1 text-white">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
            <div
              className="bg-[#C93B76] h-1 rounded-full shadow-sm shadow-[#C93B76]"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-9 flex items-center justify-center gap-5">
          <button className="rotate-180 text-[#4D5562]" onClick={goPrev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 14 14"
              className="size-6"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 2.5v9m-3-9v9m-10-1.21a.7.7 0 0 0 .37.62a.71.71 0 0 0 .73 0l5.08-3.3a.7.7 0 0 0 0-1.18L1.6 3.11a.71.71 0 0 0-.73 0a.7.7 0 0 0-.37.62Z"
              />
            </svg>
          </button>
          <button
            className="size-[50px] bg-[#C93B76] rounded-full flex items-center justify-center"
            onClick={playPause}
          >
            {playing ? (
              <IconPause className="size-6 text-white" />
            ) : (
              <IconPlay className="size-6 text-white" />
            )}
          </button>
          <button className="text-[#4D5562] " onClick={goNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 14 14"
              className="size-6"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 2.5v9m-3-9v9m-10-1.21a.7.7 0 0 0 .37.62a.71.71 0 0 0 .73 0l5.08-3.3a.7.7 0 0 0 0-1.18L1.6 3.11a.71.71 0 0 0-.73 0a.7.7 0 0 0-.37.62Z"
              />
            </svg>
          </button>
        </div>
      </Card>
    </div>
  );
}
