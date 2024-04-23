# Dig Yourself Out
Webapp to help players, server admins, and modpack developers troubleshoot Minecraft issues. Data-driven rule detection to find the most common problems.

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
If you want to add new rules to be detected in files, add them in the appropriate file in `/src/rules`. Here is an example rule:

```json
{
    "level": "error|warning|info",
    "title": "Rule title",
    "description": "Describe the issue and/or solution",
    "candidates": [
      "String you want to find in a file 1",
      "String you want to find in a file 2",
    ],
    "onlyAppearsOnce": true,
    "versionChecks": [
        {
            "type": "mcVersion|java|forgeVersion|fabricVersion|neoForgeVersion",
            "equality": "eq|not|gte|gt|lte|lt",
            "version": "1.0.0"
        },
        {
            "type": "mcVersion",
            "equality": "range",
            "version": "1.7.10...1.12.2"
        }
    ]
}
```

## Usage
Drag your Minecraft logs, crash reports, and Java crash dumps into the site to have them analyzed.

Currently supported files are:
- `latest` and `debug` logs from `/logs`
- crash reports from `/crash-reports`
- `hs_err_pidXXX.log` Java HotSpot crash dumps
