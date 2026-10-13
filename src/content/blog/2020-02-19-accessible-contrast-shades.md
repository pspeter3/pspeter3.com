---
title: Accessible Contrast Shades
---

Over the past two years, I have spent a lot of time thinking about how to design accessible color palettes. I first became hooked when I discovered the [IBM V1 Color Library](https://www.ibm.com/design/v1/language/resources/color-library/). They defined the color palette by hue (red) and had 10 shades (1, 10, 20,...90). The absolute value of the difference between two shades had a special value. If that value was greater than or equal to 50, those colors had a contrast ratio of 4.5 or greater. That meant the color pair was AA accessible.

I wanted to know how they achieved that property. I spent a lot of time trying to analyze the relationships between the colors in RGB and HSL space. I did not find any pattern because that was the wrong space to analyze. I needed to think in contrast space. I came to think of color as the ratio of the white contrast to black contrast. I even made a tool to help find colors in the "[Hue Saturation Ratio](https://codepen.io/pspeter3/full/BOPOBR)" space. However, the tool was not as useful as I had hoped.

Almost a year later, I discovered the United States Web Design System. They also defined their color palette by hue and shades which had special values. Unlike the IBM Color Library, they supported even more special values. A value of 40+ had a contrast ratio of 3+, 50+ had a contrast ratio of 4.5+, and 70+ had a contrast ratio of 7+. Those contrast ratios are the common ones defined by the WCAG for accessibility. As a developer, knowing the accessibility of a color pair is invaluable. I wanted to know how they achieved that property.

I remembered that you compute contrast ratio from luminance. The contrast ratio of two colors is `(MAX(L1, L2) + 0.05) / (MIN(L1, L2) + 0.05)`. The luminance for white is 1 and the luminance for black is 0 for a max contrast ratio of 21. Using that information, I started to think of the problem as a set of constraints. Each shade must be within a bounds of luminance. Working from both white and black, I started to discover the bounds of shades. Eventually I discovered the following tables.

## Luminance Bounds

| **Shade** | **Upper Bound** | **Lower Bound** |
| :-------- | --------------: | --------------: |
| 0         |          1.0000 |          1.0000 |
| 10        |          1.0000 |          0.6500 |
| 20        |          0.6500 |          0.4750 |
| 30        |          0.4750 |          0.4000 |
| 40        |          0.3000 |          0.2875 |
| 50        |          0.1833 |          0.1750 |
| 60        |          0.1056 |          0.1000 |
| 70        |          0.0667 |          0.0500 |
| 80        |          0.0500 |          0.0250 |
| 90        |          0.0250 |          0.0000 |
| 100       |          0.0000 |          0.0000 |

## Average Contrast Ratio

| **Shade** | **White** | **Black** |
| :-------- | --------: | --------: |
| 0         |      1.00 |     21.00 |
| 10        |      1.25 |     17.50 |
| 20        |      1.75 |     12.25 |
| 30        |      2.17 |      9.75 |
| 40        |      3.06 |      6.88 |
| 50        |      4.58 |      4.58 |
| 60        |      6.88 |      3.06 |
| 70        |      9.75 |      2.17 |
| 80        |     12.25 |      1.75 |
| 90        |     17.50 |      1.25 |
| 100       |     21.00 |      1.00 |
