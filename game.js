import { readLines } from "https://deno.land/std/io/mod.ts";

async function loadInappropriateWordsJa() {
  const dict = {};
  const fileReader = await Deno.open("inappropriate-words-ja/Sexual.txt");
  for await (const word of readLines(fileReader)) {
    if (!word) continue;
    if (!["イク", "催眠"].includes(word)) {
      dict[word] = true;
    }
  }
  dict["性病"] = true;
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

async function parseLemma() {
  const inappropriateWordsJa = await loadInappropriateWordsJa();
  const sudachiFilter = await loadSudachiFilter();

  const dict = {};
  const fileReader = await Deno.open(
    "nwc2010-ngrams/word/over999/1gms/1gm-0000",
  );
  for await (const line of readLines(fileReader)) {
    if (!line) continue;
    const arr = line.split(/\s/);
    const lemma = arr[0];
    if (lemma.length == 1) continue;
    if (lemma in sudachiFilter == false) continue;
    if (lemma in inappropriateWordsJa) continue;
    if (!/^[ぁ-んァ-ヴー一-龠々 ]+$/.test(lemma)) continue; // 数字記号は無視
    const count = parseInt(arr[1]);
    if (lemma in dict) {
      dict[lemma] += count;
    } else {
      dict[lemma] = count;
    }
  }
  const arr = Object.entries(dict);
  arr.sort(function (a, b) {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });
  return arr;
}

const result = await parseLemma();
Deno.writeTextFile(
  "src/game.lst",
  result.slice(0, 10000).map((x) => x[0]).join("\n"),
);