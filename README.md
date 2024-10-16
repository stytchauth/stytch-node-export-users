# Stytch Consumer User data export utility

## Overview

This script allows you to retrieve a full export of your Stytch Consumer User data in either JSON or CSV format.

## Warning

Your User export will contain sensitive PII (Personally Identifying Information), so be sure to store and transfer it securely. 

## Setup

1. Retrieve your Stytch project's `project_id` and `secret` on the [Project details page](https://stytch.com/dashboard/project-settings) in the Stytch Dashboard.
2. In your terminal, clone this repository and install dependencies:

```
git clone https://github.com/stytchauth/stytch-node-export-users.git
cd stytch-node-export-users
# Install dependencies using npm
npm i
```

3. Next, copy the contents of `.env.template` to a new file called `.env.local`:

```
cp .env.template .env.local
```

4. Open `.env.local` in the text editor of your choice, and set the `project_id` and `secret` values from __Step 1__.

## JSON export

If you'd like to output your User data in JSON format, run the following:

```
npm run export-json
```

The JSON export file, called `users.json`, will appear in the `stytch-node-export-users` folder.

## CSV export

If you'd like to output your User data in CSV format, run the following:

```
npm run export-csv
```

The CSV export file, called `users.csv`, will appear in the `stytch-node-export-users` folder.

You can choose which fields will be included in the CSV by modifying the `fields` array on line 32 in `export-users.js`.