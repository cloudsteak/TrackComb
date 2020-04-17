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
    m: rename/remove/modify files - without it this is only shows the modifications
    r: recursive
    d: delete subdirectories. It works only r and m together


## Examples

### 1. Normalize files in a directory structure recursively, and move files to root directory. Then delete subdirectories.

* Execute JS file

        node TrackComb.js -p "c:\Users\myuser\Music\Spotify" -mnrdc


* Execute EXE file

        TrackComb.exe -p "c:\Users\myuser\Music\Spotify" -mnrdc

### 2. Normalize files on a single directory

* Execute JS file

        node TrackComb.js -p "c:\Users\myuser\Music\Spotify" -mn


* Execute EXE file

        TrackComb.exe -p "c:\Users\myuser\Music\Spotify" -mn


### 3. Test: Normalize files in a directory structure recursively.

* Execute JS file

        node TrackComb.js -p "c:\Users\myuser\Music\Spotify" -nrc


* Execute EXE file

        TrackComb.exe -p "c:\Users\myuser\Music\Spotify" -nrc


# Rebuild exe

## 1. Init npm packages

    npm init

*Provide all package related information*


## 2. Install required packages
    npm -g install minimist
    npm install nexe -D

*Check them inside package.json*

## 3. Modify package.json

Add nexen to package.json:
    
    "scripts": {
    "start": "node TrackComb.js",
    "build": "nexe"
    },

## 4. Build exe

    npm run build

*Check result*

    i nexe 3.3.2
    √ Downloading...100%
    √ Compiling result
    √ Entry: 'TrackComb.js' written to: TrackComb.exe
    √ Finished in 6.648s

# Contact

Feel free to get in touch with any questions.

I'd appreciate you visit my blog: [https://cloudsteak.com](https://cloudsteak.com)