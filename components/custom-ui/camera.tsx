"use client";

import { useEffect, useRef, useState } from "react";

import jsqr from "jsqr";

export default function Camera({
  setQrcode,
}: {
  setQrcode: (qrcode: string) => void;
}) {
  const [detectedQr, setDetectedQr] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastDetectedQr = useRef<string>("");

  const lineColor = detectedQr ? "#a3e635" : "white";

  // const { setQrcode } = useCheckinContext();

  // * Start video and initiate frame decoding when component mounts
  useEffect(() => {
    const video = videoRef.current;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 250,
            height: 250,
            facingMode: { exact: "environment" },
          },
        });

        if (video) video.srcObject = stream;
      } catch (error) {
        console.error(error);
      }
    };

    startVideo();

    // Cleanup function to stop video stream when component unmounts
    return () => {
      if (video && video.srcObject) {
        const currentVideoRef = video;
        const stream = currentVideoRef.srcObject;
        if (stream && "getTracks" in stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, []);

  // * Decode video frame and send data to server
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = 250;
    canvas.height = 250;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return;

    let animationFrameId: number;

    const handleFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsqr(imageData.data, imageData.width, imageData.height);

      setDetectedQr(!!code);

      if (code && code.data !== lastDetectedQr.current) {
        lastDetectedQr.current = code.data;
        setQrcode(code.data);
      }

      animationFrameId = requestAnimationFrame(handleFrame);
    };

    handleFrame();

    // Cleanup function to cancel animation frame when component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [setQrcode]);

  return (
    <div className="flex-col items-center gap-4">
      <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl">
        <video id="video" ref={videoRef} autoPlay playsInline></video>
        <div className="absolute left-[25px] top-[25px] z-10 h-[200px] w-[200px]">
          <svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="10"
              y1="10"
              x2="50"
              y2="10"
              stroke={lineColor}
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="50"
              stroke={lineColor}
              strokeWidth="2"
            />

            <line
              x1="190"
              y1="10"
              x2="150"
              y2="10"
              stroke={lineColor}
              strokeWidth="2"
            />
            <line
              x1="190"
              y1="10"
              x2="190"
              y2="50"
              stroke={lineColor}
              strokeWidth="2"
            />

            <line
              x1="10"
              y1="190"
              x2="50"
              y2="190"
              stroke={lineColor}
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="190"
              x2="10"
              y2="150"
              stroke={lineColor}
              strokeWidth="2"
            />

            <line
              x1="190"
              y1="190"
              x2="150"
              y2="190"
              stroke={lineColor}
              strokeWidth="2"
            />
            <line
              x1="190"
              y1="190"
              x2="190"
              y2="150"
              stroke={lineColor}
              strokeWidth="2"
            />
          </svg>
        </div>
        <canvas className="hidden" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
