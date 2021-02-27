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
            className="h-12 w-12 rounded-2xl text-gray-400 hover:text-blue-400 flex items-center justify-center focus:outline-none focus:ring focus:ring-blue-400"
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
