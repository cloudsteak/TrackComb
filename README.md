# TrackComb

- You can manage your WAV and MP3 files.
- You can rename and remove to a common place your files you downloaded from Spotify

# Program language

NodeJs

# Usage

To execute the tool you can execute the **.js** and **.exe** file on same way.

## Parameters

Here you can dinf the parameter list for usage.

### Required

    -p: <path>


### Optional

    c: concatenate files with parent directory name (useful for Spotify downloads)
    n: normalize filenames - all first letter is capital
    m: rename/remove files - without it this is only shows the modifications
    r: recursive
    d: delete subdirectories. It works only r and m together


## Examples

### Normalize files in a directory structure recursively, and move files to root directory. Then delete subdirectories.

* Execute JS file

    node TrackComb.js -p "c:\Users\myuser\Music\Spotify" -mnrdc


* Execute EXE file

    TrackComb.exe -p <path> -<optional parameters>
    TrackComb.exe -p "c:\Users\myuser\Music\Spotify" -mnrdc
