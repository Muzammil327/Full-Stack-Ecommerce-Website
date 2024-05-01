"use client";
import React, { useState } from "react";

const UserAction = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const handleLikeClick = () => {
    if (!likeActive) {
      setLikes(likes + 1);
      setLikeActive(true);
      if (dislikeActive) {
        setDislikes(dislikes - 1);
        setDislikeActive(false);
      }
    } else {
      setLikes(likes - 1);
      setLikeActive(false);
    }
  };

  const handleDislikeClick = () => {
    if (!dislikeActive) {
      setDislikes(dislikes + 1);
      setDislikeActive(true);
      if (likeActive) {
        setLikes(likes - 1);
        setLikeActive(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDislikeActive(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className={`p-2 flex items-center gap-3 focus:outline-none py-3 px-6 rounded-md border-2 border-solid border-red-400 `}
        onClick={handleLikeClick}
      >
        <svg
          fill="#000000"
          height="20px"
          width="20px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          enable-background="new 0 0 512 512"
        >
          <path
            d="M2.5,209.1C1,221.1,0,233.3,0,245.7c0,109,59.7,203.9,148.1,254.2l16.5-34.8V227.4l-18.3-18.3H2.5z M512,227.4
	c0-18.3-18.3-36.6-36.6-36.6H329.1c9.1-36.6,18.3-73.1,18.3-91.4c0-36.6-18.3-73.1-27.4-82.3c-0.2-0.2-9.1-9.1-27.4-9.1
	c-27.4,0-27.4,27.4-27.4,27.4c0,0.5-9.1,45.7-9.1,64s-36.6,91.4-54.9,109.7l-18.3,9.1v256l18.3,9.1h201.1
	c36.6,0,54.9-18.3,54.9-36.6s-18.3-36.6-36.6-36.6c36.6,0,54.9-18.3,54.9-36.6c0-18.3-18.3-36.6-36.6-36.6
	c36.6,0,54.9-18.3,54.9-36.6c0-18.3-18.3-36.6-36.6-36.6C493.7,264,512,245.7,512,227.4z"
          />
        </svg>
        <span className="text-gray-600">{likes}</span>
      </button>
      <button
        className={`p-2 flex items-center gap-3 focus:outline-none py-3 px-6 rounded-md border-2 border-solid border-red-400 `}
        onClick={handleDislikeClick}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z"
            fill="#000000"
          />
        </svg>
        <span className="text-gray-600">{dislikes}</span>
      </button>
    </div>
  );
};

export default UserAction;
