const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("Counter");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log(contract.address);
  return contract.address;
};

const runMain = async () => {
  try {
    const address = await main();
    process.send(address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
