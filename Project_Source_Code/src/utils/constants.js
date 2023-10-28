import { ethers } from "ethers";
import abi from "./voting.json";

export const contractAddress = "0xE6eF3733c6276e99385391064764Dd493814C36F";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const votingContract = new ethers.Contract(contractAddress, abi, signer);
