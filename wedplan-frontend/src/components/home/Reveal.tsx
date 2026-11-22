"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Reveal({ children }: { children: ReactNode }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
