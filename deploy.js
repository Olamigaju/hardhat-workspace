const ethers = require("ethers");
// to read abi and bin file we use
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // TO DDEPLOY WE FIIRST MAKE AN API CALL to connect to the block chain
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_SERVER);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedKeyJson = fs.readFileSync("./encryptKey.json", "utf8");
  // // i use let cos i have to connect the wallet to provider
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedKeyJson,
  //   process.env.PRIVATE_KEY_PASS
  // );

  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_simpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_simpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying please wait....");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  // get the initial number
  const currentFnumber = await contract.retrieve();
  console.log(` currentFnumber: ${currentFnumber.toString()}`);
  const storeFnumber = await contract.store("8");
  const updatedfNumber = await contract.retrieve();
  console.log(` updateFnumber: ${updatedfNumber.toString()}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
