---
title: "Playing Minecraft With an Xbox360 Controller"
tags:
    - xbox360
    - minecraft
    - ubuntu
    - elementary
---

So I got Minecraft for my birthday, which started this whole adventure.
I have a laptop and don't own a USB mouse which makes playing slightly
difficult. I've never been a huge fan of the mouse and keyboard for games,
which I know is basically heresy, so I decided to setup my computer to use
an Xbox 360 controller. I'm running Elementary OS Jupiter which is a
derivative of Ubuntu.

## Resources

In order to make this work, you'll need a few things:

-   An official USB Xbox 360 controller. Now I'm not sure if you absolutely need
    an official Xbox 360 controller but I've had issues in the past with 3rd
    party controllers so I would highly recommend it.
-   Xboxdrv, <http://pingus.seul.org/~grumbel/xboxdrv/xboxdrv.html>
-   An Xboxdrv configuration file, conveniently displayed below

## Minecraft.xboxdrv

The following xboxdrv file will set up your Xbox controller

```bash
[xboxdrv]
ui-clear=true
trigger-as-button = true

[ui-axismap]
x1=KEY_A:KEY_D
y1=KEY_W:KEY_S
x2^dead:4000 = REL_X:750:-1
y2^dead:4000 = REL_Y:750:-1

# trigger^invert = rel-repeat:REL_WHEEL:1:50

[ui-buttonmap]
a = KEY_SPACE
b = KEY_LEFTSHIFT
x = KEY_Q
y = KEY_T
lt = BTN_RIGHT
rt = BTN_LEFT

rb = KEY_LEFTSHIFT
lb = KEY_TAB

# tl = KEY_BACKSPACE

# tr = KEY_SPACE

[ui-buttonmap]
du = rel:REL_WHEEL:-1:500
dr = rel:REL_WHEEL:-1:500
dd = rel:REL_WHEEL:1:500
dl = rel:REL_WHEEL:1:500

# lt = KEY_VOLUMEDOWN

# rt = KEY_VOLUMEUP

[ui-buttonmap]
start = KEY_E
back = KEY_ESC

# guide = KEY_ESC

# EOF
```

## The Controls

-   The left joystick is WASD
-   The right joystick is the view with normal configuration. You can created an
    inverted look by shifting the controls.
-   A is jump
-   B and Right bumper are crouch
-   X is drop
-   Y is talk
-   Right Trigger is break
-   Left Trigger is place
-   Left Bumper shows who is on the server
-   Select shows the menu
-   Start shows inventory

## Starting the controller

If you want to turn on the controller easily, place the configuration file in
the same directory as the minecraft jar launcher and name is
`minecraft.xboxrdv`. Then add this line to your `.bashrc` file:
`alias xbox='sudo rmmod xpad; sudo xboxdrv -c minecraft.xboxdrv --silent'`
