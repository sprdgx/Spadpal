const hre = require("hardhat");

async function main() {

  const Spadpal = await hre.ethers.getContractFactory("Spadpal");
  const spadpal = await Spadpal.deploy();

  await spadpal.deployed();
  
  console.log('Spadpa deployed to :' , spadpal.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
