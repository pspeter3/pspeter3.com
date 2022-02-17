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
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-gray-400 hover:text-sky-400 focus:outline-none focus:ring focus:ring-sky-400 dark:text-gray-500 dark:hover:text-sky-500 dark:focus:ring-sky-500"
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
