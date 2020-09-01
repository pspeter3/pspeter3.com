---
title: "Fixing SMS Timestamp Issue on Android 2.3"
tags:
    - sms
    - android
    - cyanogenmod
---

I recently installed CyanogenMod 7.1 onto my Samsung Captivate because I was
getting sick of using the default ROM. One of the things that I noticed was SMS
messages received while the phone was off or in flight mode had the timestamp of
when they arrived to the phone as opposed to when they were sent. If you want to
get the time that was sent, follow the directions below:

1.  Change the settings to use Sent timestamp
2.  Change the settings to use the GMT timestamp just to make sure all timestamps
    come in the same way
3.  Install [SMS Time Fix](https://market.android.com/details?id=com.mattprecious.smsfix&hl=en)
4.  Activate SMS Time Fix in the settings
5.  Set the adjustment time to be either add or subtract time zone depending where
    you are in relation to GMT

I hope this helps. As a note, if you're using CyanogenMod 7.1, the RC1 seems to
more stable than the Stable version. I've had less force closes and no boot loops
so far.
