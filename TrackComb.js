/*jshint esversion: 8 */
//Node.js

var externalParameters = require('minimist')(process.argv.slice(2));
//console.log(externalParameters);
/*
Live Parameters:
Required:
    -p: path

Optional:
    c: concatenate files with parent directory name (useful for Spotify downloads)    
    n: normalize filenames - all first letter is capital
    m: rename/remove files - without it this is only shows the modifications
    r: recursive
    d: delete subdirectories. It works only r and m together

Usage:
    node TrackComb.js -p <path> -cnmrd
*/

const fs = require("fs");
const path = require("path");

function titleCase(str) {
    str = str.split(" - ").join("-");
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        let currentWord = splitStr[i];

        currentWord = currentWord.charAt(0).toUpperCase() + currentWord.substring(1);
        if (currentWord.includes('-')) {
            let currentPart = currentWord.toLowerCase().split('-');
            for (let j = 0; j < currentPart.length; j++) {
                currentPart[j] = currentPart[j].charAt(0).toUpperCase() + currentPart[j].substring(1);
            }
            currentWord = currentPart.join('-');

        }
        if (currentWord.includes('(')) {
            let currentPart = currentWord.toLowerCase().split('(');
            for (let j = 0; j < currentPart.length; j++) {
                currentPart[j] = currentPart[j].charAt(0).toUpperCase() + currentPart[j].substring(1);
            }
            currentWord = currentPart.join('(');

        }
        if (currentWord.includes("'")) {
            let currentPart = currentWord.toLowerCase().split("'");
            for (let j = 0; j < currentPart.length; j++) {
                currentPart[j] = currentPart[j].charAt(0).toUpperCase() + currentPart[j].substring(1);
            }
            currentWord = currentPart.join("'");

        }
        if (currentWord == "Dj") {
            currentWord = "DJ";
        }
        splitStr[i] = currentWord;

    }
    // Directly return the joined string
    console.log(splitStr.join(' '));
    return splitStr.join(' ');
}

const removeDir = function(path) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);
   
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fs.statSync(path + "/" + filename).isDirectory()) {
            removeDir(path + "/" + filename);
          } else {
            fs.unlinkSync(path + "/" + filename);
          }
        });
        fs.rmdirSync(path);
      } else {
        fs.rmdirSync(path);
      }
    } else {
      console.log("Directory path not found.");
    }
  };

let inputDirectory;
let userHome = process.env.USERPROFILE;
try {
    inputDirectory = externalParameters.p;
} catch (getError) {
    //console.error(getError);
    inputDirectory =  userHome + "\\Music\\_import";
}
if (inputDirectory === undefined) {
    inputDirectory = userHome + "\\Music\\_import";
}


try {
    const arrayOfFiles = fs.readdirSync(inputDirectory);
    if (arrayOfFiles.length === 0) {
        console.warn('"' + inputDirectory + '" is empty.');
    } else {
        console.log('Seek on "' + inputDirectory + '"...');
    }
    arrayOfFiles.forEach(element => {
        const artistName = element;
        let currentDirectory = path.join(inputDirectory, element);
        if (fs.lstatSync(currentDirectory).isDirectory()) {
            if (externalParameters.r) {
                console.log(currentDirectory);
                const arrayOfWav = fs.readdirSync(currentDirectory);
                if (arrayOfWav.length === 0) {
                    console.warn('--- "' + currentDirectory + '" is empty.');
                } else {
                    console.log('--- Find files in "' + currentDirectory + '"...');
                }
                arrayOfWav.forEach(file => {
                    if (path.extname(file).toLowerCase() === '.wav' || path.extname(file).toLowerCase() === '.mp3') {
                        let oldFileName = path.join(currentDirectory, file);
                        let newFileName = file;
                        if (externalParameters.c === true) {
                            newFileName = (artistName + '-' + file);
                        } else {
                            console.log('"' + file + '" - Rename skip: due to mising c external parameter. New location: ' + newFileName);
                        }
                        if (externalParameters.n === true) {
                            newFileName = titleCase(newFileName);
                        }
                        let newFileNameWithPath = path.join(inputDirectory, newFileName);
                        if (externalParameters.m === true) {
                            console.log('"' + file + '" - Move to "' + newFileNameWithPath + '"');
                            fs.rename(oldFileName, newFileNameWithPath, function (err) {
                                if (err) console.log('------ ERROR: ' + err);
                            });
                        } else {
                            console.log('m parameter missing. With m the "' + file + '" would be modified to "' + newFileNameWithPath + '"');
                        }

                    }
                });
            }
            //else {
            //    console.log('r parameter missing. With m the "' + oldFileName + '" would be modified to "' + newFileNameWithPath + '"');
            //}
        } else {

            let oldFileName = artistName;
            if (path.extname(oldFileName).toLowerCase() === '.wav' || path.extname(oldFileName).toLowerCase() === '.mp3') {
                let newFileName = oldFileName;
                if (externalParameters.n === true) {
                    newFileName = titleCase(oldFileName);
                }
                let oldFileNameWithPath = path.join(inputDirectory, oldFileName);
                let newFileNameWithPath = path.join(inputDirectory, newFileName);
                if (externalParameters.m === true) {
                    console.log('"' + oldFileName + '" - Rename to "' + newFileNameWithPath + '"');
                    fs.rename(oldFileNameWithPath, newFileNameWithPath, function (err) {
                        if (err) console.log('------ ERROR: ' + err);
                    });
                } else {
                    console.log('m parameter missing. "' + currentDirectory + '" is skipped');
                }
            }
        }

    });
} catch (e) {
    console.log(e);
}

if (externalParameters.d === true && externalParameters.m === true && externalParameters.r === true) {

    try {
        const arrayOfFiles = fs.readdirSync(inputDirectory);
        if (arrayOfFiles.length === 0) {
            console.warn('"' + inputDirectory + '" is empty.');
        } else {
            console.log('Start to delete directories under "' + inputDirectory + '":');
        }
        arrayOfFiles.forEach(element => {
            const artistName = element;
            let currentDirectory = path.join(inputDirectory, element);
            if (fs.lstatSync(currentDirectory).isDirectory()) {
                console.log('- Delete "' + currentDirectory + '"');
                removeDir(currentDirectory);
                //fs.rmdirSync(currentDirectory);
            }

        });
    } catch (e) {
        console.log(e);
    }

}

console.log('\n\nPress any key to continue.');
process.stdin.once('data', function () {
    process.exit();
});
