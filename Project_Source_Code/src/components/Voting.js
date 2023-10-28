import React, { useState } from "react";
import { votingContract } from "../utils/constants";

function Voting() {
	const [CandidateName, setCandidateName] = useState("");
	const [CandidateAge, setCandidateAge] = useState("");
	const [CandidateID, setCandidateID] = useState("");
	const [VoterID, setVoterID] = useState("");
	const [VoterName, setVoterName] = useState("");
	const [VoterAge, setVoterAge] = useState("");
	const [VoterVoteID, setVoterVoteID] = useState("");
	const [PartyID, setPartyID] = useState("");
	const [VoteCount1, setVoteCount1] = useState("");
	const [VoteCount2, setVoteCount2] = useState("");
	const [VoteCount3, setVoteCount3] = useState("");
	const [HighestCount, setHighestCount] = useState("");

	const handleCandidatename = (e) => {
		setCandidateName(e.target.value);
	};

	const handleCandidateAge = (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setCandidateAge(Number(value));
	};

	const handleCandidateID = async (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setCandidateID(Number(value));
	};

	const handleCandidateRegistration = async (e) => {
		e.preventDefault();
		const enrollCanddidateTx = await votingContract.enrollCandidate(CandidateID, CandidateName, CandidateAge);
		await enrollCanddidateTx.wait();
		console.log(enrollCanddidateTx);
		alert(enrollCanddidateTx.hash);
	};

	const handleVoterID = async (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setVoterID(Number(value));
	};

	const handleVoterName = (e) => {
		setVoterName(e.target.value);
	};

	const handleVoterAge = async (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setVoterAge(Number(value));
	};

	const handleVoterRegistration = async (e) => {
		e.preventDefault();
		const enrollVoterTx = await votingContract.enrollVoter(VoterID, VoterName, VoterAge);
		await enrollVoterTx.wait();
		console.log(enrollVoterTx);
		alert(enrollVoterTx.hash);
	};

	const handlePartyID = async (e) => {
		setPartyID(Number(e.target.value));
	};

	const handleVoterVoteID = async (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setVoterVoteID(Number(value));
	};

	const handleVote = async (e) => {
		e.preventDefault();
		const voteTx = await votingContract.vote(PartyID, VoterVoteID);
		await voteTx.wait();
		console.log(voteTx);
		alert(voteTx.hash);
	};

	const handleQuery1 = async (e) => {
		let vote = Number(e.target.id);
		const voteCountTx = await votingContract.getVotecountOf(vote);
		setVoteCount1(voteCountTx.toString());
	};

	const handleQuery2 = async (e) => {
		let vote = Number(e.target.id);
		const voteCountTx = await votingContract.getVotecountOf(vote);
		setVoteCount2(voteCountTx.toString());
	};

	const handleQuery3 = async (e) => {
		let vote = Number(e.target.id);
		const voteCountTx = await votingContract.getVotecountOf(vote);
		setVoteCount3(voteCountTx.toString());
	};

	const handleResult = async () => {
		let number1 = await votingContract.getVotecountOf(1);
		let number2 = await votingContract.getVotecountOf(2);
		let number3 = await votingContract.getVotecountOf(3);

		let num1 = number1.toString();
		let num2 = number2.toString();
		let num3 = number3.toString();

		if (num1 > num2 && num1 > num3) {
			setHighestCount("BJP");
		} else if (num2 > num1 && num2 > num3) {
			setHighestCount("TRS");
		} else if (num3 > num1 && num3 > num2) {
			setHighestCount("Congress");
		} else {
			setHighestCount("");
		}
	};

	return (
		<div>
			<div className="flex flex-row space-x-52 mt-10 ml-96">
			<div>
					<div className="mt-14 ">
						<h3 className="text-2xl">Candidate Registration</h3>
						<form onSubmit={handleCandidateRegistration}>
							<div className="form-group mb-6">
								<div className="mt-3"></div>
								<div className="space-y-2">
									<div>
										<label>
											Candidate ID
											<select className="w-64 ml-2 rounded-full text-slate-900" value={CandidateID} onChange={handleCandidateID}>
												<option name="BJP">1</option>
												<option name="TRS">2</option>
												<option name="CONGRESS">3</option>
											</select>
										</label>
									</div>
									<div>
										<label>
											Candidate Name
											<span>
												<input className="ml-2 rounded-full text-slate-900" value={CandidateName} onChange={handleCandidatename} />
											</span>
										</label>
									</div>
									<div>
										<label>
											Candidate age
											<span>
												<input className="ml-2 rounded-full text-slate-900" value={CandidateAge} onChange={handleCandidateAge} />
											</span>
										</label>
									</div>
								</div>
								<input className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-4" type="submit" value="Register" />
							</div>
						</form>
					</div>
					<div className="mt-14">
						<h3 className="text-2xl">Voter Registration</h3>
						<form onSubmit={handleVoterRegistration}>
							<div>
								<label>
									VotedID
									<span className="ml-2 mr-2 ">
										<input className="rounded-full text-slate-900" value={VoterID} onChange={handleVoterID} />
									</span>
								</label>
							</div>
							<div className="mt-2">
								<label>
									Voter Name
									<span className="ml-2 mr-2 ">
										<input className="rounded-full text-slate-900" value={VoterName} onChange={handleVoterName} />
									</span>
								</label>
							</div>
							<div className="mt-2">
								<label>
									Voter Age
									<span className="ml-2 mr-2 ">
										<input className="rounded-full text-slate-900" value={VoterAge} onChange={handleVoterAge} />
									</span>
								</label>
							</div>

							<button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2">Register</button>
						</form>
					</div>
				</div>
				<div>
					<form onSubmit={handleVote}>
						<p className="text-2xl">Vote</p>
						<div>
							<div>
								<img
									className="max-w-sm max-h-40 full-auto"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1PeilVpA3QSlwxU5Z34Oc1Y-x_Idy3bU8nLrhTLtUhQ&s"
									alt="BJP"
								/>
							</div>
							<div>
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border border-black border-x-2 border-y-2 bg-white checked:bg-blue-600 checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									value="1"
									onChange={handlePartyID}
								/>
								<label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
									BJP ID - 1
								</label>
							</div>
						</div>
						<div>
							<div>
								<img
									className="w-56 max-h-40 full-auto"
									src="https://4.bp.blogspot.com/-usfE8G6o_wY/WsjahdsdZGI/AAAAAAAAWBI/dexdE3O-Jt0XN0v2GvdWswfDww8HuVbAQCLcBGAs/s1600/trs03%2Bcopy.jpg"
									alt="TRS"
								/>
							</div>
							<div>
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border border-black border-x-2 border-y-2 bg-white checked:bg-blue-600 checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									value="2"
									onChange={handlePartyID}
								/>

								<label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
									TRS ID - 2
								</label>
							</div>
						</div>
						<div>
							<div>
								<img
									className="max-w-sm max-h-40 full-auto"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLtqW8T4TEv-Ni-3NbGT28sFKUQOkoUEnOCryW3ZGuA&s"
									alt="CONGRESS"
								/>
							</div>
							<div>
								<input
									className="form-check-input appearance-none rounded-full h-4 w-4 border border-black border-x-2 border-y-2 bg-white checked:bg-blue-600 checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  mr-2 cursor-pointer"
									type="radio"
									name="flexRadioDefault"
									value="3"
									onChange={handlePartyID}
								/>
								<label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
									CONGRESS ID - 3
								</label>
							</div>
						</div>
						<div className="mt-5">
							<label>
								VotedID
								<span className="ml-2 mr-2 ">
									<input className="rounded-full w-20 text-slate-900" value={VoterVoteID} onChange={handleVoterVoteID} />
								</span>
							</label>
						</div>
						<input className="bg-red-500 hover:bg-blue-900 text-white font-bold py-3 px-16 rounded-full mt-4" type="submit" value="Vote" />
					</form>
				</div>
				{/* =>>>>>>>............................................................................. */}
				<div>
					<div className="">
						<p className="text-2xl">Result</p>
						<div className="mt-12"></div>
						<button onClick={handleQuery1} id="1" className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2">
							Query
						</button>
						<p>{VoteCount1}</p>
					</div>
					<div className="mt-20">
						<div></div>
						<button onClick={handleQuery2} id="2" className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2">
							Query
						</button>
						<p>{VoteCount2}</p>
					</div>
					<div className="mt-20">
						<button onClick={handleQuery3} id="3" className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2">
							Query
						</button>
						<p>{VoteCount3}</p>
					</div>
					<div className="mt-28">
						<button onClick={handleResult} className="bg-red-500 hover:bg-blue-900 text-white font-bold py-3 px-5 rounded-full ">
							Winner
						</button>
						<p className="text-3xl">{HighestCount}</p>
					</div>
				</div>
				{/* =>>>>>>>........................................................................ */}
				
			</div>
		</div>
	);
}

export default Voting;
