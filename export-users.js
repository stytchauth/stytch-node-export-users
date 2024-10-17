const fs = require("fs");
const { Parser } = require("@json2csv/plainjs");
const process = require("process");

const stytch = require("stytch");

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
});

async function retrieveUsers() {
  const params = {
    limit: 1000,
  };

  const iter = stytchClient.users.searchAll(params);

  if (process.argv[2] == "json") {
    fs.writeFileSync("users.json", ""); // Clear the users.json file if it exists

    const jsonStream = fs.createWriteStream("users.json", { flags: "a" }); // Open JSON file in append mode
    jsonStream.write("["); // Start JSON array
    let firstBatch = true;

    let pageNumber = 1;
    for await (const users of iter) {
      console.log("Page: " + pageNumber);
      pageNumber++;

      if (!firstBatch) {
        jsonStream.write(","); // Add a comma between batches
      }
      jsonStream.write(JSON.stringify(users, null, 2).slice(1, -1)); // Remove outer array brackets from each batch
      firstBatch = false;
    }

    jsonStream.write("]"); // Close JSON array
    jsonStream.end();
    console.log("User data has been successfully exported to users.json");

  } else if (process.argv[2] == "csv") {
    fs.writeFileSync("users.csv", ""); // Clear the existing users.csv file if it exists

    // Customize these fields as desired
    const fields = [
      "user_id",
      "status",
      "created_at",
      "name",
      "emails",
      "phone_numbers",
      "trusted_metadata",
      "untrusted_metadata",
      "providers",
      "webauthn_registrations",
      "biometric_registrations",
      "totps",
      "crypto_wallets",
      "password",
    ];
    const jsonParser = new Parser({ fields });

    const csvStream = fs.createWriteStream("users.csv", { flags: "a" }); // Open CSV file in append mode

    let pageNumber = 1;
    for await (const users of iter) {
      console.log("Page: " + pageNumber);
      pageNumber++;

      const csv = jsonParser.parse(users);
      csvStream.write(csv + "\n"); // Append each batch to the CSV file
    }

    csvStream.end();
    console.log("User data has been successfully exported to users.csv");
  }
}

retrieveUsers().catch((err) => {
  console.log(err);
});