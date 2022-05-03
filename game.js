import { readLines } from "https://deno.land/std/io/mod.ts";
import { YomiDict } from "https://raw.githubusercontent.com/marmooo/yomi-dict/main/mod.js";

function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

// https://babu-babu-baboo.hateblo.jp/entry/20091114/1258161477
// https://ja.wikipedia.org/wiki/ローマ字
// ヘボン式になるように改良 (ただし、を[wo] を除く)
function toRoman(str) {
  const roman = {
    "１": "1",
    "２": "2",
    "３": "3",
    "４": "4",
    "５": "5",
    "６": "6",
    "７": "7",
    "８": "8",
    "９": "9",
    "０": "0",
    "！": "!",
    "”": '"',
    "＃": "#",
    "＄": "$",
    "％": "%",
    "＆": "&",
    "’": "'",
    "（": "(",
    "）": ")",
    "＝": "=",
    "〜": "~",
    "｜": "|",
    "＠": "@",
    "‘": "`",
    "＋": "+",
    "＊": "*",
    "；": ";",
    "：": ":",
    "＜": "<",
    "＞": ">",
    "、": ",",
    "。": ".",
    "／": "/",
    "？": "?",
    "＿": "_",
    "・": "･",
    "「": "[",
    "」": "]",
    "｛": "{",
    "｝": "}",
    "￥": "\\",
    "＾": "^",
    "ふぁ": "fa",
    "ふぃ": "fi",
    "ふぇ": "fe",
    "ふぉ": "fo",
    "きゃ": "kya",
    "きゅ": "kyu",
    "きょ": "kyo",
    "しゃ": "sha",
    "しゅ": "shu",
    "しょ": "sho",
    "ちゃ": "tya",
    "ちゅ": "tyu",
    "ちょ": "tyo",
    "にゃ": "nya",
    "にゅ": "nyu",
    "にょ": "nyo",
    "ひゃ": "hya",
    "ひゅ": "hyu",
    "ひょ": "hyo",
    "みゃ": "mya",
    "みゅ": "myu",
    "みょ": "myo",
    "りゃ": "rya",
    "りゅ": "ryu",
    "りょ": "ryo",
    "ふゃ": "fya",
    "ふゅ": "fyu",
    "ふょ": "fyo",
    "ぴゃ": "pya",
    "ぴゅ": "pyu",
    "ぴょ": "pyo",
    "びゃ": "bya",
    "びゅ": "byu",
    "びょ": "byo",
    "ぢゃ": "dya",
    "ぢゅ": "dyu",
    "ぢょ": "dyo",
    "じゃ": "ja",
    "じゅ": "ju",
    "じょ": "jo",
    "ぎゃ": "gya",
    "ぎゅ": "gyu",
    "ぎょ": "gyo",
    "ゔぁ": "va",
    "ゔぃ": "vi",
    "ゔ": "vu",
    "ゔぇ": "ve",
    "ゔぉ": "vo",
    "ぱ": "pa",
    "ぴ": "pi",
    "ぷ": "pu",
    "ぺ": "pe",
    "ぽ": "po",
    "ば": "ba",
    "び": "bi",
    "ぶ": "bu",
    "べ": "be",
    "ぼ": "bo",
    "だ": "da",
    "ぢ": "di",
    "づ": "du",
    "で": "de",
    "ど": "do",
    "ざ": "za",
    "じ": "ji",
    "ず": "zu",
    "ぜ": "ze",
    "ぞ": "zo",
    "が": "ga",
    "ぎ": "gi",
    "ぐ": "gu",
    "げ": "ge",
    "ご": "go",
    "わ": "wa",
    "ゐ": "wi",
    // "う": "wu",
    "ゑ": "we",
    "を": "wo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "ぁ": "la",
    "ぃ": "li",
    "ぅ": "lu",
    "ぇ": "le",
    "ぉ": "lo",
    "ヶ": "ke",
    "ヵ": "ka",
    "ん": "nn",
    "ー": "-",
    "　": " ",
  };
  const regTu = /っ([bcdfghijklmnopqrstuvwyz])/gm;
  const regXtu = /っ/gm;

  let pnt = 0;
  const max = str.length;
  let s, r;
  let txt = "";

  while (pnt <= max) {
    r = roman[str.substring(pnt, pnt + 2)];
    if (r) {
      txt += r;
      pnt += 2;
    } else {
      s = str.substring(pnt, pnt + 1);
      r = roman[s];
      txt += r ? r : s;
      pnt += 1;
    }
  }
  txt = txt.replace(regTu, "$1$1");
  txt = txt.replace(regXtu, "xtu");
  return txt;
}

async function loadSiminyms() {
  const dict = [];
  const fileReader = await Deno.open("siminym-ja/all.lst");
  for await (const line of readLines(fileReader)) {
    const word = line.split(",", 1)[0];
    dict.push(word);
  }
  return dict;
}

async function loadSudachiFilter() {
  const dict = {};
  const paths = [
    "SudachiDict/src/main/text/small_lex.csv",
    "SudachiDict/src/main/text/core_lex.csv",
    "SudachiDict/src/main/text/notcore_lex.csv",
  ];
  for (const path of paths) {
    const fileReader = await Deno.open(path);
    for await (const line of readLines(fileReader)) {
      if (!line) continue;
      const arr = line.split(",");
      const lemma = arr[12];
      const pos1 = arr[5];
      const pos2 = arr[6];
      // const form = arr[10];
      const abc = arr[14];
      switch (pos1) {
        case "動詞":
          break;
        case "形容詞":
          break;
        case "名詞":
          if (pos2 != "普通名詞") continue;
          if (/[ぁ-ん]/.test(lemma.at(-1))) continue;
          break;
        default:
          continue;
      }
      if (abc != "A") continue;
      // if (form != "*" && !form.includes("終止形")) continue;
      dict[lemma] = true;
    }
  }
  return dict;
}

function getRoma(word, yomiDict) {
  let yomi = word;
  if (!/^[ぁ-んァ-ヴー]+$/.test(word)) {
    const yomis = yomiDict.get(word);
    if (!yomis) return;
    yomi = yomis[0];
  }
  const hira = kanaToHira(yomi);
  return toRoman(hira);
}

async function build(grades, threshold) {
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
    if (i == grades[gradePos] - 1) {
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


const yomiDict = await YomiDict.load("yomi-dict/yomi.csv");

const grades = [1000, 3000, 5000, 10000, 20000, 40000];
const threshold = 40000;
const [words, poses] = await build(grades, threshold);
const result = poses.join(",") + "\n" + words.join("\n");
Deno.writeTextFile("src/pronounce.tsv", result);
