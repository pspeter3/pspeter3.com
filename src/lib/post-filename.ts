// Captured Eleventy URLs: its Liquid date filter used local time for these dates.
const legacyRouteDates: Record<string, string> = {
  "2012-01-10-fixing-sms-timestamp-issue-on-android-2-dot-3": "2012-01-09",
  "2012-01-17-getting-more-out-of-linkedin-for-college-students": "2012-01-16",
  "2012-01-25-piracy-is-a-problem": "2012-01-24",
  "2012-02-01-comparisons-of-task-managers": "2012-01-31",
  "2012-02-07-hello-wunderkit": "2012-02-06",
  "2020-02-19-accessible-contrast-shades": "2020-02-18",
};

export function parsePostFilename(filename: string) {
  const id = filename.replace(/\.md$/, "");
  const match = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(id);
  if (!match) throw new Error(`Invalid post filename: ${filename}`);
  const [, iso, slug] = match;
  const date = new Date(`${iso}T00:00:00.000Z`);
  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== iso
  )
    throw new Error(`Invalid publication date: ${filename}`);
  const [year, month, day] = (legacyRouteDates[id] ?? iso).split("-");
  return {
    date,
    iso,
    slug,
    params: { year, month, day, slug },
    path: `/blog/${year}/${month}/${day}/${slug}/`,
  };
}
