import { useEffect, useRef } from 'react';

const CyberBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        // Matrix Rain Columns
        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        const drops: number[] = new Array(columns).fill(1);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Distance from mouse affects color
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                const dist = Math.hypot(x - mouseX, y - mouseY);
                const maxDist = 300;

                // Color based on mouse proximity (Teal to Green)
                if (dist < maxDist) {
                    const intensity = 1 - dist / maxDist;
                    ctx.fillStyle = `rgba(0, 240, 255, ${intensity})`; // Cyan highlight
                } else {
                    ctx.fillStyle = '#0F0'; // Classic Matrix Green
                    ctx.fillStyle = 'rgba(20, 184, 166, 0.2)'; // Teal muted
                }

                ctx.fillText(text, x, y);

                // Reset drop to top randomly
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Mouse interaction: push drops away or speed them up?
                // Let's just draw standard rain for now, maybe accelerate if mouse is near?
                drops[i]++;
            }

            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        />
    );
};

export default CyberBackground;
