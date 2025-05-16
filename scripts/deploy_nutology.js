// scripts/deploy_nutology.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying from:", deployer.address);
  
    const Nutology = await ethers.getContractFactory("NutologyNFT");
    const contract = await Nutology.deploy();
    await contract.deployed();
  
    console.log("✅ NutologyNFT deployed at:", contract.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  