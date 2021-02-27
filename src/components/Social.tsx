import React, { FC } from "react";
import Link from "next/link";
import { FileText, GitHub, Twitter, Linkedin } from "react-feather";

const SocialIcon: FC<{ href: string; label: string }> = ({
    href,
    label,
    children,
}) => (
    <Link href={href}>
        <a
            className="flex items-center justify-center w-12 h-12 hover:text-blue-400 text-gray-400 rounded-2xl focus:outline-none focus:ring-blue-400 focus:ring"
            aria-label={label}
        >
            {children}
        </a>
    </Link>
);

export const Social: FC<{ hide?: true }> = ({ hide }) => (
    <nav
        className={`justify-center space-x-2 ${
            hide ? "hidden sm:flex" : "flex"
        }`}
    >
        <SocialIcon href="/blog" label="Blog">
            <FileText />
        </SocialIcon>
        <SocialIcon href="https://github.com/pspeter3" label="Github">
            <GitHub />
        </SocialIcon>
        <SocialIcon href="https://twitter.com/pspeter3" label="Twitter">
            <Twitter />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com/in/pspeter3" label="LinkedIn">
            <Linkedin />
        </SocialIcon>
    </nav>
);
