import Image from "next/image";
import queenChallenge from "@/assets/images/queen-challenge.png";

export default function QueenChallenge() {
  return <Image src={queenChallenge} alt="queenChallenge" height={80} className="select-none" draggable={false} />;
}
