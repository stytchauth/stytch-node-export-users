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

  let allUsers = [];
  for await (const users of iter) {
    allUsers = allUsers.concat(users);
  }
  return allUsers;
}

retrieveUsers()
  .then((resp) => {
    if (process.argv[2] == "json") {
      fs.writeFileSync("users.json", JSON.stringify(resp, null, 2), "utf8");
      console.log("User data has been written to users.json");
    } else if (process.argv[2] == "csv") {
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
      const csv = jsonParser.parse(resp);

      fs.writeFileSync("users.csv", csv, "utf8");
      console.log("User data has been written to users.csv");
    }
  })
  .catch((err) => {
    console.log(err);
  });
