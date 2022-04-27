import { escapeSql } from "https://deno.land/x/escape/mod.ts";
import { createDbWorker } from "../node_modules/sql.js-httpvfs/dist/index.js";

const w1_ = Array.from(
  "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六",
);
const w2_ = Array.from(
  "引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話",
);
const w3_ = Array.from(
  "悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和",
);
const w4_ = Array.from(
  "愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録",
);
const w5_ = Array.from(
  "圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領歴",
);
const w6_ = Array.from(
  "胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論",
);
// https://okjiten.jp/7-tyuugakuseikanji.html
// 漢検4級
const w7_ = Array.from(
  "握扱依威偉為違緯維壱芋隠陰鋭影越援縁煙鉛汚押奥憶菓箇暇雅介壊戒皆較獲刈甘監汗歓勧乾鑑環含奇鬼祈輝幾儀戯詰脚却丘及朽拠巨距御驚凶恐響叫狭狂況仰駆屈掘繰傾恵迎撃肩堅遣兼軒圏剣玄誇鼓枯継互更荒抗攻稿香恒項豪込婚鎖歳彩載剤咲惨雌伺紫刺脂旨執芝煮斜釈寂狩朱趣需秀舟襲柔獣瞬巡旬盾紹召沼詳床称畳丈飾殖触浸震慎侵寝振薪陣尽尋吹是征姓井跡扇占鮮訴燥騒僧贈即俗耐替拓沢濁脱丹端嘆淡弾恥遅致蓄沖跳徴澄珍沈抵堤摘滴添殿途吐渡奴怒透唐桃盗塔到倒逃踏稲闘胴峠突鈍曇弐悩濃輩杯泊拍迫薄爆髪抜罰繁販搬範般盤被疲彼避尾微匹描浜敏怖膚浮腐敷普賦舞幅払噴柄壁捕舗峰抱砲肪坊忙冒傍帽凡盆漫慢妙眠矛霧娘茂網猛黙紋踊雄与誉腰溶躍謡翼雷頼絡欄離粒慮療隣涙隷麗齢暦劣烈恋露郎惑腕",
);
// 漢検3級
const w8_ = Array.from(
  "哀慰詠悦閲炎宴欧殴乙卸穏架佳華嫁餓怪悔塊概慨該穫隔郭岳掛滑勘肝貫敢緩冠換喚企軌棄棋忌既岐騎犠欺菊吉喫虐虚脅峡凝緊斤愚偶遇啓鶏携掲刑憩契鯨賢倹幻雇顧弧孤悟娯甲孔控拘郊硬綱巧坑慌絞酵克獄魂紺恨墾催債削錯搾撮擦暫施祉諮侍慈軸湿疾赦邪殊寿潤遵徐如晶掌鐘焦衝昇匠譲錠嬢冗嘱辱審伸辛粋炊遂衰穂酔随髄瀬牲婿請隻惜斥籍摂潜繕措阻粗礎双桑葬掃遭憎促賊逮胎怠滞袋滝託卓択諾奪胆鍛壇稚畜窒駐抽鋳彫超聴陳鎮墜訂帝締哲斗塗陶凍痘匿篤豚尿粘婆排陪縛伐帆伴藩畔蛮泌卑碑姫漂苗赴符封伏覆墳紛癖募慕簿崩芳胞縫倣邦飽奉妨乏謀膨房某墨没翻魔埋膜又魅滅免幽憂誘擁揚揺抑裸濫吏隆了猟陵糧厘零霊励裂錬廉炉漏廊浪楼湾",
);
const gradeByKanjis = [[], w1_, w2_, w3_, w4_, w5_, w6_, w7_, w8_];
const kanjiGrade = {};
for (let level = 1; level < gradeByKanjis.length; level++) {
  gradeByKanjis[level].forEach((kanji) => {
    kanjiGrade[kanji] = level;
  });
}
let correctAudio, incorrectAudio;
loadAudios();
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function playAudio(audioBuffer, volume) {
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  if (volume) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioContext.destination);
    audioSource.connect(gainNode);
    audioSource.start();
  } else {
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
}

function unlockAudio() {
  audioContext.resume();
}

function loadAudio(url) {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          resolve(audioBuffer);
        }, (err) => {
          reject(err);
        });
      });
    });
}

function loadAudios() {
  promises = [
    loadAudio("mp3/correct3.mp3"),
    loadAudio("mp3/incorrect1.mp3"),
  ];
  Promise.all(promises).then((audioBuffers) => {
    correctAudio = audioBuffers[0];
    incorrectAudio = audioBuffers[1];
  });
}

function getGrade(word) {
  const chars = word.split("");
  const grades = chars.map((x) => {
    if (x in kanjiGrade) {
      return kanjiGrade[x];
    } else if (/[一-龠々]/.test(x)) {
      return 9;
    } else {
      return 0;
    }
  });
  return Math.max(...grades);
}

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.dataset.theme = "dark";
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.dataset.theme = "dark";
  }
}

async function getWordVector(lemma) {
  const result = await rensoleWorker.db.query(
    `SELECT * FROM magnitude WHERE key="${escapeSql(lemma)}"`,
  );
  if (result[0]) {
    const vector = new Array(300);
    for (const [k, v] of Object.entries(result[0])) {
      if (k.startsWith("dim_")) {
        const pos = parseInt(k.slice(4));
        vector[pos] = v;
      }
    }
    return vector;
  }
}

async function getSiminyms(lemma) {
  const row = await siminymWorker.db.query(
    `SELECT words FROM siminyms WHERE lemma="${escapeSql(lemma)}"`,
  );
  if (row[0]) {
    const words = JSON.parse(row[0].words);
    return words.reverse();
  } else {
    return [];
  }
}

function showHint(text) {
  let html = "";
  if (text.includes("？")) {
    for (let i = 0; i < text.length; i++) {
      if (text[i] == answer[i]) {
        html += `<span class="hint2">${text[i]}</span>`;
      } else {
        html += `<span class="hint1">${text[i]}</span>`;
      }
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      html += `<span class="hint1">${text[i]}</span>`;
    }
  }
  return html;
}

function getHint(replyCount) {
  let hint = "";
  switch (replyCount) {
    case 1:
      for (let i = 0; i < answer.length; i++) {
        hint += "？";
      }
      holedAnswer = hint;
      return hint;
    case 3:
      for (const str of answer) {
        if (/^[ぁ-ん]+$/.test(str)) {
          hint += "ひ";
        } else if (/^[ァ-ヴー]+$/.test(answer)) {
          hint += "カ";
        } else {
          hint += "漢";
        }
      }
      return hint;
    case 5: {
      const pos = getRandomInt(0, answer.length);
      holedAnswer = holedAnswer.slice(0, pos) + answer[pos] +
        holedAnswer.slice(pos + 1);
      return holedAnswer;
    }
    case 7:
      if (answer.length > 2) {
        const poses = holedAnswer.split("")
          .map((str, i) => [str, i])
          .filter((x) => x[0] == "？")
          .map((x) => x[1]);
        const pos = poses[getRandomInt(0, poses.length)];
        holedAnswer = holedAnswer.slice(0, pos) + answer[pos] +
          holedAnswer.slice(pos + 1);
        return holedAnswer;
      } else {
        const grades = Array.from("１１２３４５６中中常");
        for (let i = 0; i < answer.length; i++) {
          const grade = getGrade(answer[i]);
          hint += grades[grade];
        }
        return hint;
      }
    case 9:
      if (answer.length > 3) {
        const poses = holedAnswer.split("")
          .map((str, i) => [str, i])
          .filter((x) => x[0] == "？")
          .map((x) => x[1]);
        const pos = poses[getRandomInt(0, poses.length)];
        holedAnswer = holedAnswer.slice(0, pos) + answer[pos] +
          holedAnswer.slice(pos + 1);
        return holedAnswer;
      } else {
        return "";
      }
    default:
      return "";
  }
}

function showAnswer(cleared) {
  if (cleared) {
    playAudio(correctAudio);
  } else {
    playAudio(incorrectAudio);
  }
  document.getElementById("answer").classList.remove("d-none");
  const animations = [
    "bounce",
    "rubberBand",
    "flip",
    "rotateIn",
    "swing",
    "tada",
    "heartBeat",
    "jackInTheBox",
  ];
  const animation = animations[getRandomInt(0, animations.length)];
  const classNames = ["animate__animated", `animate__${animation}`];
  const answerText = document.getElementById("answerText");
  answerText.textContent = answer;
  answerText.parentNode.classList.add(...classNames);
  document.getElementById("restart").focus();
}

function search() {
  const searchText = document.getElementById("searchText");
  const word = searchText.value;
  getWordVector(word).then((b) => {
    if (b) {
      document.getElementById("notExisted").classList.add("invisible");
      if (replyCount >= 10) {
        if (word == answer) {
          showAnswer(true);
        } else {
          showAnswer(false);
        }
      } else {
        const a = answerVector;
        const similarity = math.dot(a, b) / (math.norm(a) * math.norm(b));
        const template = document.createElement("template");
        const m = mostSimilars[replyCount];
        const hint = getHint(replyCount);
        template.innerHTML = `
          <tr>
            <td>${word}</td><td>${similarity.toFixed(3)}</td>
            <td>${m[0]}</td><td>${m[1].toFixed(3)}</td>
            <td>${showHint(hint)}</td></td>
          </tr>
        `;
        const renso = document.getElementById("renso");
        const tr = template.content.firstElementChild;
        renso.insertBefore(tr, renso.firstChild);
        if (word == answer) showAnswer(true);
      }
      replyCount += 1;
    } else {
      document.getElementById("notExisted").classList.remove("invisible");
    }
    searchText.value = "";
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function loadProblems() {
  await fetch("game.csv")
    .then((response) => response.text())
    .then((text) => {
      text.trimEnd().split("\n").forEach((line) => {
        const [word, numStr] = line.split(",");
        vocabularies.push([word, parseInt(numStr)]);
      });
      gradePoses = calcGradePos();
      changeGrade();
    });
}

async function loadSiminymWorker(answer, grade) {
  if (!grade) {
    const obj = document.getElementById("grade");
    grade = obj.options[obj.selectedIndex].value;
  }
  const config = {
    from: "jsonconfig",
    configUrl: `/siminym-ja/db/${grade}/config.json`,
  };
  siminymWorker = await createDbWorker(
    [config],
    "/siminym-ja/sql.js-httpvfs/sqlite.worker.js",
    "/siminym-ja/sql.js-httpvfs/sql-wasm.wasm",
  );
  mostSimilars = await getSiminyms(answer);
}

async function loadRensoWorker(answer) {
  const config = {
    from: "jsonconfig",
    configUrl: "/rensole-ja/db/config.json",
  };
  rensoleWorker = await createDbWorker(
    [config],
    "/rensole-ja/sql.js-httpvfs/sqlite.worker.js",
    "/rensole-ja/sql.js-httpvfs/sql-wasm.wasm",
  );
  answerVector = await getWordVector(answer);
}

async function restart() {
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  replyCount = 0;
  const pos = getRandomInt(0, problems.length);
  answer = problems[pos][0];
  while (renso.firstChild) renso.firstChild.remove();
  document.getElementById("answer").classList.add("d-none");
  const promises = [
    getSiminyms(answer),
    getWordVector(answer),
  ];
  Promise.all(promises).then((result) => {
    mostSimilars = result[0];
    answerVector = result[1];
    document.getElementById("searchText").focus();
    loading.classList.add("d-none");
  });
}

function calcGradePos() {
  const result = [];
  [...document.getElementById("grade").options].forEach(e => {
    const grade = parseInt(e.value);
    const pos = vocabularies.findIndex(x => x[1] > grade);
    result.push(pos);
  });
  return result;
}

function changeGrade() {
  const obj = document.getElementById("grade");
  const grade = obj.options[obj.selectedIndex].value;
  loadSiminymWorker(answer, grade);
  replyCount = 0;
  while (renso.firstChild) renso.firstChild.remove();
  const pos = gradePoses[obj.selectedIndex];
  problems = vocabularies.slice(0, pos - 1);
  answer = problems[getRandomInt(0, problems.length)][0];
}

const vocabularies = [];
let gradePoses = [];
let problems = [];
let replyCount = 0;
let mostSimilars;
let answerVector;
let answer;
let holedAnswer;
let rensoleWorker;
let siminymWorker;
loadConfig();
loadProblems().then(() => {
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  loadSiminymWorker(answer);
  loadRensoWorker(answer);
  const renso = document.getElementById("renso");
  while (renso.firstChild) renso.firstChild.remove();
  loading.classList.add("d-none");
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    search();
  }
}, false);
document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("search").onclick = search;
document.getElementById("restart").onclick = restart;
document.getElementById("grade").onchange = changeGrade;
document.addEventListener("click", unlockAudio, {
  once: true,
  useCapture: true,
});
