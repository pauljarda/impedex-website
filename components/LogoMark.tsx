"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
 * Logo with live PCB traces: the greenish circuit lines + Ω pads baked into
 * logo.png are detected per-pixel at runtime, recoloured emerald and animated
 * (soft pulse + a light sweep travelling along the traces) on a canvas overlay
 * aligned with the white base logo underneath.
 */
export default function LogoMark({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let traceCanvas: HTMLCanvasElement | null = null;
    let imgW = 0;
    let imgH = 0;

    const img = new window.Image();
    img.src = "/logo.png";
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;

      /* extract the greenish trace pixels and recolour them emerald */
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
          px[i] = 52; px[i + 1] = 211; px[i + 2] = 153;
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

      /* replicate object-contain object-left positioning of the base image */
      const scale = Math.min(cw / imgW, ch / imgH);
      const dw = imgW * scale;
      const dh = imgH * scale;
      const dx = 0;
      const dy = (ch - dh) / 2;

      const t = performance.now() / 1000;

      /* full-opacity emerald traces with a breathing glow (keeps colour vivid
         over the white base logo instead of washing it out) */
      ctx.save();
      ctx.shadowColor = "rgba(52,211,153,0.9)";
      ctx.shadowBlur = 3 + 4 * (0.5 + 0.5 * Math.sin(t * 2.2));
      ctx.drawImage(traceCanvas, dx, dy, dw, dh);
      ctx.drawImage(traceCanvas, dx, dy, dw, dh);
      ctx.restore();

      /* light sweep travelling along the traces */
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      const bandW = dw * 0.28;
      const sx = dx - bandW + ((t * dw * 0.45) % (dw + bandW * 2));
      const grad = ctx.createLinearGradient(sx, 0, sx + bandW, 0);
      grad.addColorStop(0, "rgba(214,255,239,0)");
      grad.addColorStop(0.5, "rgba(214,255,239,0.9)");
      grad.addColorStop(1, "rgba(214,255,239,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(dx, dy, dw, dh);
      ctx.restore();
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <Image
        src="/logo.png"
        alt="IMPEDEX"
        fill
        sizes={sizes}
        className="object-contain object-left brightness-0 invert"
        priority={priority}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
