# Dig Yourself Out
Webapp to help players, server admins, and modpack developers troubleshoot Minecraft issues. Data-driven rule detection to find the most common problems.

Try it out at https://digyourselfout.app

## Installation
```
# clone the repo
$ git clone https://github.com/tlannigan/dig-yourself-out.git

# change the working directory to the project
$ cd dig-yourself-out

# install the node modules
$ npm i

# run the app locally
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contribute

### Adding rules
If you want to add new rules to be detected in files, add them in the appropriate file in `/src/app/rules`. Here is an example rule:

```ts
enum Equality = { EQ, NOT, GTE, GT, LTE, LT, RANGE }

const rule: Rule = {
    level: "error|warning|info",
    title: "Rule title",
    description: "Describe the issue and/or solution",
    candidates: [
      "String you want to find in a file 1",
      "String you want to find in a file 2",
    ],
    onlyAppearsOnce: boolean, // If this rule should only find the first match
    versionChecks: [
        // Greater than or equal to version check
        {
            "type": "mcVersion|java|forgeVersion|fabricVersion|neoForgeVersion",
            "equality": Equality.GTE,
            "version": "1.0.0"
        },
        // Range version check (inclusive start, exclusive end)
        {
            "type": "mcVersion",
            "equality": Equality.RANGE,
            "version": "1.7.10...1.12.2"
        }
    ]
}
```

## Usage
Drag your Minecraft logs, crash reports, and Java crash dumps into the site to have them analyzed.

### Currently supported files are:
- /logs/latest.log
- /logs/debug.log
- /crash-reports/crash-XXX.txt
- launcher_log.txt
- hs_err_pidXXX.log
- server.properties

### Currently caught issues:
- Missing dependencies
- Mixin errors
- Wrong Java version
- Corrupted config files
- Duplicate mods
- Mod loading errors
- Server port binding failure
- AMD graphics driver crashes
- Intel graphics driver crashes
- Storing client/server in a cloud folder (OneDrive, Dropbox, Apple CloudDocs, etc)
- Cut off log from logging past midnight
- OptiFine
