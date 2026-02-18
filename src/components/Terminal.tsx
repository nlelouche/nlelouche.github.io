import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const bootSequence = [
        "SYSTEM: Initialize Kernel...",
        "SYSTEM: Loading User Profile [LELOUCHE_DIETRICH]...",
        "NETWORK: Connection Established [SECURE]...",
        "GRAPHICS: Rendering 3D Interface...",
        "AUDIO: Audio Subsystem Online...",
        "READY: Welcome, User."
    ];

    useEffect(() => {
        let delay = 0;
        bootSequence.forEach((log) => {
            delay += Math.random() * 500 + 200;
            setTimeout(() => {
                addLog(log);
            }, delay);
        });

        // Random background logs
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const randomLogs = [
                    "MONITOR: System Stable",
                    "NETWORK: data_packet_received",
                    "SECURITY: Scan Complete - No Threats",
                    "PROCESS: Garbage Collection...",
                    "MEMORY: 32% Usage"
                ];
                addLog(`daemon: ${randomLogs[Math.floor(Math.random() * randomLogs.length)]}`);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const addLog = (log: string) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs(prev => [...prev.slice(-4), `[${timestamp}] ${log}`]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-4 right-4 z-40 w-80 font-mono text-xs hidden md:block"
        >
            <div
                className="bg-black/90 border border-primary/30 rounded-t-md overflow-hidden shadow-2xl backdrop-blur-md"
            >
                <div
                    className="bg-primary/10 px-3 py-1 flex justify-between items-center cursor-pointer border-b border-primary/20"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="text-primary font-bold">TERMINAL_OUTPUT</span>
                    <span className="text-primary">{isOpen ? '▼' : '▲'}</span>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 160 }}
                            exit={{ height: 0 }}
                            className="p-3 overflow-y-auto text-green-400/80 custom-scrollbar"
                            ref={scrollRef}
                        >
                            {logs.map((log, i) => (
                                <div key={i} className="mb-1 break-words">
                                    <span className="text-primary/50 mr-2">&gt;</span>
                                    {log}
                                </div>
                            ))}
                            <div className="animate-pulse">_</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Terminal;
