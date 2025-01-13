import { TextLineStream } from "@std/streams";
import { YomiDict } from "yomi-dict";
import { hiraToRoma } from "hiraroma";

function kanaToHira(str) {
  return str.replace(/[ァ-ヶ]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

async function loadSiminyms() {
  const dict = [];
  const file = await Deno.open("siminym-ja-repo/all.lst");
  const lineStream = file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
  for await (const line of lineStream) {
    const word = line.split(",", 1)[0];
    dict.push(word);
  }
  return dict;
}

// async function _loadSudachiFilter() {
//   const dict = {};
//   const paths = [
//     "SudachiDict/src/main/text/small_lex.csv",
//     "SudachiDict/src/main/text/core_lex.csv",
//   ];
//   for (const path of paths) {
//     const file = await Deno.open(path);
//     const lineStream = file.readable
//       .pipeThrough(new TextDecoderStream())
//       .pipeThrough(new TextLineStream());
//     for await (const line of lineStream) {
//       const arr = line.split(",");
//       const lemma = arr[12];
//       const pos1 = arr[5];
//       const pos2 = arr[6];
//       // const form = arr[10];
//       const abc = arr[14];
//       switch (pos1) {
//         case "動詞":
//           break;
//         case "形容詞":
//           break;
//         case "名詞":
//           if (pos2 != "普通名詞") continue;
//           if (/[ぁ-ん]/.test(lemma.at(-1))) continue;
//           break;
//         default:
//           continue;
//       }
//       if (abc != "A") continue;
//       // if (form != "*" && !form.includes("終止形")) continue;
//       dict[lemma] = true;
//     }
//   }
//   return dict;
// }

function getRoma(word, yomiDict) {
  let yomi = word;
  if (!/^[ぁ-んァ-ヴー]+$/.test(word)) {
    const yomis = yomiDict.get(word);
    if (!yomis) return;
    yomi = yomis[0];
  }
  const hira = kanaToHira(yomi);
  return hiraToRoma(hira);
}

async function build(grades) {
  const words = [];
  const poses = [];
  const yomiDict = await YomiDict.load("yomi-dict/yomi.csv");
  const siminyms = await loadSiminyms();
  // const sudachiFilter = await loadSudachiFilter();
  let gradePos = 0;
  for (let i = 0; i < siminyms.length; i++) {
    const word = siminyms[i];
    if (word.length == 1) continue;
    // if (word in sudachiFilter == false) continue;
    if (i >= grades[gradePos] - 1) {
      poses.push(words.length);
      gradePos += 1;
    }
    const roma = getRoma(word, yomiDict);
    if (roma) {
      words.push(`${word}\t${roma}`);
    } else {
      console.log(`error: ${word}`);
    }
  }
  return [words, poses];
}

const grades = [1000, 3000, 5000, 10000, 20000, 40000];
const [words, poses] = await build(grades);
const result = poses.join(",") + "\n" + words.join("\n");
Deno.writeTextFile("src/pronounce.tsv", result);
