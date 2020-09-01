import React, { FC } from "react";
import Link from "next/link";
import { FileText, GitHub, Twitter, Linkedin } from "react-feather";

export const Social: FC = () => (
    <nav className="social">
        <Link href="/blog/">
            <a
                className="social__icon social__icon--optional"
                aria-label="Blog"
            >
                <FileText />
            </a>
        </Link>
        <a
            href="https://github.com/pspeter3"
            className="social__icon"
            aria-label="Github"
        >
            <GitHub />
        </a>
        <a
            href="https://twitter.com/pspeter3"
            className="social__icon"
            aria-label="Twitter"
        >
            <Twitter />
        </a>
        <a
            href="https://linkedin.com/in/pspeter3"
            className="social__icon"
            aria-label="LinkedIn"
        >
            <Linkedin />
        </a>
    </nav>
);
