const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  //the encrypt function has two parameter private password and private key
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASS,
    process.env.PRIVATE_KEY
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./encryptKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
