import { Card } from "antd";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// Video.js: https://videojs.com/getting-started
// https://videojs.com/html5-video-support/
export default function Video() {
  const playerRef = useRef(null);

  const videoJSOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "auto",
    poster: "https://pic1.zhimg.com/v2-76521be6ca1314445f2d8ef12fc24950_r.jpg",
    sources: [{ src: "https://placehold.co/1920x1080.mp4", type: "video/mp4" }]
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("==== Video waiting ===");
    });

    player.on("disponse", () => {
      console.log("==== Video disponse ===");
    });
  };

  return (
    <>
      <Card>
        <div style={{ width: 900 }}>
          <VideoJS options={videoJSOptions} onReady={handlePlayerReady} />
        </div>
      </Card>
    </>
  );
}

function VideoJS(props: any): any {
  const { options, onReady } = props;
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      // console.log(videoElement); // <video-js></video-js>
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      console.log("player not first load");
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    // 功能组件卸载时处理Video.js播放器
    return () => {
      if (player && !player.isDisposed()) {
        console.log("player disponse");
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
