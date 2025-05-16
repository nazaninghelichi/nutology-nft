// scripts/burn_all_nuts.js

async function main() {
    const [deployer] = await ethers.getSigners();
    const contract = await ethers.getContractAt(
      "NutologyNFT",
      "0x4601b5E87Cd5b0C483aa23152cB418c84bFB3680"
    );
  
    for (let i = 0; i <= 7; i++) {
      try {
        const tx = await contract.burn(i);
        console.log(`🔥 Burning token ID ${i}... TX: ${tx.hash}`);
        await tx.wait();
      } catch (err) {
        console.warn(`⚠️ Token ID ${i} failed or already burned.`);
      }
    }
  
    console.log("✅ All tokens burned!");
  }
  
  main().catch(console.error);
  