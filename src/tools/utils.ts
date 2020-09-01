import { BlogPost } from "./blog";

export const toISODate = (date: Date): string =>
    date.toISOString().split("T")[0];

export const parseBasename = (
    basename: string,
): [date: Date, title: string] => {
    const match = basename.match(/^(\d{4}-\d{2}-\d{2})-([\w-]+)/);
    if (match === null) {
        throw new Error(`Invalid basename ${basename}`);
    }
    return [new Date(match[1]), match[2]];
};

export const parseDate = (basename: string): Date => parseBasename(basename)[0];

export const toSlug = (basename: string): string => {
    const [date, title] = parseBasename(basename);
    return `${toISODate(date).replace(/-/g, "/")}/${title}`;
};

export const reverseChronological = (a: BlogPost, b: BlogPost): number =>
    parseDate(b.basename).getTime() - parseDate(a.basename).getTime();
