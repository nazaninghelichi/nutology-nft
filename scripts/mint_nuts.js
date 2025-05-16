async function main() {
    const [deployer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("NutologyNFT", "0x4601b5E87Cd5b0C483aa23152cB418c84bFB3680");
  
    // Use public HTTP gateway instead of raw ipfs://
    const base = "https://"; // This is the new base
    const nuts = {
      "FamilyNut.json": "bafybeidpreliayzvocdo5xi6h67exljxj6eikehqauiva6bn26sqo4lkcy",
      "ImNutWorking.json": "bafybeidjjipljddcismn5zbsnvv72xyqdiiigskh347lqns4pff5db3nq4",
      "NutToCrack.json": "bafybeicaq23ugemfhrwt5cmesmxzo4jg6nsliedt2dznef22quwbw6kwme",
      "NoNutLeft.json": "bafybeif5d4qo3xxnsq74xskutxoxt2wxpjysbfcos6xy4rskuk2piro474"
    };
  
    for (const [filename, cid] of Object.entries(nuts)) {
      const tokenURI = `${base}${cid}.ipfs.w3s.link/${filename}`;
      const tx = await contract.mintNFT(deployer.address, tokenURI);
      console.log(`🌰 Minting ${filename}... tx: ${tx.hash}`);
      await tx.wait();
    }
  
    console.log("✅ All nuts minted with HTTP URLs!");
  }
  
  main().catch(console.error);
  