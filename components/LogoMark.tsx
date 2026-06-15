"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
 * Logo with live PCB traces: the greenish circuit lines + Ω pads baked into
 * logo.png are detected per-pixel at runtime, recoloured and animated (soft
 * pulse + a light sweep travelling along the traces) on a canvas overlay
 * aligned with the base logo underneath.
 *
 * `light` = placed on a dark (Cyprus) surface → white logo + sand traces.
 * default = placed on a light (Sand) surface → dark logo + Cyprus traces.
 */
export default function LogoMark({
  sizes,
  priority = false,
  light = false,
}: {
  sizes: string;
  priority?: boolean;
  light?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Trace colour + sweep highlight depend on the surface underneath.
    const trace = light ? [61, 179, 149] : [0, 70, 67];
    const shadowCol = light ? "rgba(61,179,149,0.9)" : "rgba(0,70,67,0.8)";
    const sweepCol = light ? "160,230,205" : "40,150,128";

    let raf = 0;
    let traceCanvas: HTMLCanvasElement | null = null;
    let imgW = 0;
    let imgH = 0;

    const img = new window.Image();
    img.src = "/logo.png";
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;

      const off = document.createElement("canvas");
      off.width = imgW;
      off.height = imgH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, imgW, imgH);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2], a = px[i + 3];
        const isTrace = a > 30 && g > r + 14 && g >= b + 4;
        if (isTrace) {
          px[i] = trace[0];
          px[i + 1] = trace[1];
          px[i + 2] = trace[2];
        } else {
          px[i + 3] = 0;
        }
      }
      octx.putImageData(data, 0, 0);
      traceCanvas = off;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = box.clientWidth * dpr;
      canvas.height = box.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const cw = box.clientWidth;
      const ch = box.clientHeight;
      ctx.clearRect(0, 0, cw, ch);
      if (!traceCanvas || !imgW) return;

      const scale = Math.min(cw / imgW, ch / imgH);
      const dw = imgW * scale;
      const dh = imgH * scale;
      const dx = 0;
      const dy = (ch - dh) / 2;

      const t = performance.now() / 1000;

      ctx.save();
      ctx.shadowColor = shadowCol;
      ctx.shadowBlur = 3 + 4 * (0.5 + 0.5 * Math.sin(t * 2.2));
      ctx.drawImage(traceCanvas, dx, dy, dw, dh);
      ctx.drawImage(traceCanvas, dx, dy, dw, dh);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      const bandW = dw * 0.28;
      const sx = dx - bandW + ((t * dw * 0.45) % (dw + bandW * 2));
      const grad = ctx.createLinearGradient(sx, 0, sx + bandW, 0);
      grad.addColorStop(0, `rgba(${sweepCol},0)`);
      grad.addColorStop(0.5, `rgba(${sweepCol},0.85)`);
      grad.addColorStop(1, `rgba(${sweepCol},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(dx, dy, dw, dh);
      ctx.restore();
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [light]);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <Image
        src="/logo.png"
        alt="IMPEDEX"
        fill
        sizes={sizes}
        className={`object-contain object-left ${light ? "brightness-0 invert" : "brightness-0"}`}
        priority={priority}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
