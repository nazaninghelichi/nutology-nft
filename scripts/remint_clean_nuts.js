// scripts/remint_clean_nuts.js

async function main() {
    const [deployer] = await ethers.getSigners();
    const contract = await ethers.getContractAt(
      "NutologyNFT",
      "0x4601b5E87Cd5b0C483aa23152cB418c84bFB3680"
    );
  
    const nuts = {
      "FamilyNut": "https://bafybeic73uktehqjrjlgvcbbw5mb3ikgay7q7vpgfl5lokjxyuqwqdjb3y.ipfs.w3s.link/FamilyNut.json",
      "ImNutWorking": "https://bafybeihitryjm7goooi7egwxquga2yquooizrphjbpf3gxn7cm6vjdsvii.ipfs.w3s.link/ImNutWorking.json",
      "NutToCrack": "https://bafybeiftnuxiilhpd62ss57oqsp2ylbkuopaxbl2op46dwonmus5gkpcs4.ipfs.w3s.link/NutToCrack.json",
      "NoNutLeft": "https://bafybeifpoc5pud5mzkf37cfrxb7sekm5v46kj2oociqgrlwivt7n52tlxi.ipfs.w3s.link/NoNutLeft.json"
    };
  
    for (const [name, uri] of Object.entries(nuts)) {
      const tx = await contract.mintNFT(deployer.address, uri);
      console.log(`🌰 Minted ${name}: tx ${tx.hash}`);
      await tx.wait();
    }
  
    console.log("✅ All 4 fresh Nutology NFTs minted!");
  }
  
  main().catch(console.error);
  