// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const matchEscSqlRx = /[\0\b\t\n\r\x1a"'\\]/g;
function escapeSql(sqlStr) {
    const match = matchEscSqlRx.exec(sqlStr);
    if (!match) {
        return sqlStr;
    }
    let chunkIndex = matchEscSqlRx.lastIndex = 0;
    let escapedSqlStr = "";
    let matchChar;
    let escape;
    while(matchChar = matchEscSqlRx.exec(sqlStr)){
        switch(matchChar[0]){
            case "\0":
                escape = "\\0";
                break;
            case "\x08":
                escape = "\\b";
                break;
            case "\x09":
                escape = "\\t";
                break;
            case "\x1a":
                escape = "\\z";
                break;
            case "\n":
                escape = "\\n";
                break;
            case "\r":
                escape = "\\r";
                break;
            case '"':
            case "'":
            case "\\":
            case "%":
                escape = "\\" + matchChar[0];
                break;
            default:
                continue;
        }
        escapedSqlStr += sqlStr.slice(chunkIndex, matchChar.index) + escape;
        chunkIndex = matchEscSqlRx.lastIndex;
    }
    if (chunkIndex < sqlStr.length) {
        return "'" + escapedSqlStr + sqlStr.slice(chunkIndex) + "'";
    }
    return "'" + escapedSqlStr + "'";
}
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var n = t();
        for(var r in n)("object" == typeof exports ? exports : e)[r] = n[r];
    }
}(this, function() {
    return (()=>{
        "use strict";
        var e = {
            870: (e, t, n)=>{
                n.r(t), n.d(t, {
                    createEndpoint: ()=>o,
                    expose: ()=>l,
                    proxy: ()=>g,
                    proxyMarker: ()=>r,
                    releaseProxy: ()=>a,
                    transfer: ()=>y,
                    transferHandlers: ()=>c,
                    windowEndpoint: ()=>v,
                    wrap: ()=>f
                });
                const r = Symbol("Comlink.proxy"), o = Symbol("Comlink.endpoint"), a = Symbol("Comlink.releaseProxy"), s = Symbol("Comlink.thrown"), i = (e)=>"object" == typeof e && null !== e || "function" == typeof e, c = new Map([
                    [
                        "proxy",
                        {
                            canHandle: (e)=>i(e) && e[r],
                            serialize (e) {
                                const { port1: t , port2: n  } = new MessageChannel;
                                return l(e, t), [
                                    n,
                                    [
                                        n
                                    ]
                                ];
                            },
                            deserialize: (e)=>(e.start(), f(e))
                        }
                    ],
                    [
                        "throw",
                        {
                            canHandle: (e)=>i(e) && s in e,
                            serialize ({ value: e  }) {
                                let t;
                                return t = e instanceof Error ? {
                                    isError: !0,
                                    value: {
                                        message: e.message,
                                        name: e.name,
                                        stack: e.stack
                                    }
                                } : {
                                    isError: !1,
                                    value: e
                                }, [
                                    t,
                                    []
                                ];
                            },
                            deserialize (e) {
                                if (e.isError) throw Object.assign(new Error(e.value.message), e.value);
                                throw e.value;
                            }
                        }
                    ]
                ]);
                function l(e, t = self) {
                    t.addEventListener("message", function n(r) {
                        if (!r || !r.data) return;
                        const { id: o , type: a , path: i  } = Object.assign({
                            path: []
                        }, r.data), c = (r.data.argumentList || []).map(w);
                        let f;
                        try {
                            const t1 = i.slice(0, -1).reduce((e, t)=>e[t], e), n1 = i.reduce((e, t)=>e[t], e);
                            switch(a){
                                case 0:
                                    f = n1;
                                    break;
                                case 1:
                                    t1[i.slice(-1)[0]] = w(r.data.value), f = !0;
                                    break;
                                case 2:
                                    f = n1.apply(t1, c);
                                    break;
                                case 3:
                                    f = g(new n1(...c));
                                    break;
                                case 4:
                                    {
                                        const { port1: t2 , port2: n2  } = new MessageChannel;
                                        l(e, n2), f = y(t2, [
                                            t2
                                        ]);
                                    }
                                    break;
                                case 5:
                                    f = void 0;
                            }
                        } catch (e1) {
                            f = {
                                value: e1,
                                [s]: 0
                            };
                        }
                        Promise.resolve(f).catch((e)=>({
                                value: e,
                                [s]: 0
                            })).then((e)=>{
                            const [r, s] = b(e);
                            t.postMessage(Object.assign(Object.assign({}, r), {
                                id: o
                            }), s), 5 === a && (t.removeEventListener("message", n), u(t));
                        });
                    }), t.start && t.start();
                }
                function u(e) {
                    (function(e) {
                        return "MessagePort" === e.constructor.name;
                    })(e) && e.close();
                }
                function f(e, t) {
                    return d(e, [], t);
                }
                function p(e) {
                    if (e) throw new Error("Proxy has been released and is not useable");
                }
                function d(e, t = [], n = function() {}) {
                    let r = !1;
                    const s = new Proxy(n, {
                        get (n, o) {
                            if (p(r), o === a) return ()=>E(e, {
                                    type: 5,
                                    path: t.map((e)=>e.toString())
                                }).then(()=>{
                                    u(e), r = !0;
                                });
                            if ("then" === o) {
                                if (0 === t.length) return {
                                    then: ()=>s
                                };
                                const n1 = E(e, {
                                    type: 0,
                                    path: t.map((e)=>e.toString())
                                }).then(w);
                                return n1.then.bind(n1);
                            }
                            return d(e, [
                                ...t,
                                o
                            ]);
                        },
                        set (n, o, a) {
                            p(r);
                            const [s, i] = b(a);
                            return E(e, {
                                type: 1,
                                path: [
                                    ...t,
                                    o
                                ].map((e)=>e.toString()),
                                value: s
                            }, i).then(w);
                        },
                        apply (n, a, s) {
                            p(r);
                            const i = t[t.length - 1];
                            if (i === o) return E(e, {
                                type: 4
                            }).then(w);
                            if ("bind" === i) return d(e, t.slice(0, -1));
                            const [c, l] = m(s);
                            return E(e, {
                                type: 2,
                                path: t.map((e)=>e.toString()),
                                argumentList: c
                            }, l).then(w);
                        },
                        construct (n, o) {
                            p(r);
                            const [a, s] = m(o);
                            return E(e, {
                                type: 3,
                                path: t.map((e)=>e.toString()),
                                argumentList: a
                            }, s).then(w);
                        }
                    });
                    return s;
                }
                function m(e) {
                    const t = e.map(b);
                    return [
                        t.map((e)=>e[0]),
                        (n = t.map((e)=>e[1]), Array.prototype.concat.apply([], n))
                    ];
                    var n;
                }
                const h = new WeakMap;
                function y(e, t) {
                    return h.set(e, t), e;
                }
                function g(e) {
                    return Object.assign(e, {
                        [r]: !0
                    });
                }
                function v(e, t = self, n = "*") {
                    return {
                        postMessage: (t, r)=>e.postMessage(t, n, r),
                        addEventListener: t.addEventListener.bind(t),
                        removeEventListener: t.removeEventListener.bind(t)
                    };
                }
                function b(e) {
                    for (const [t, n] of c)if (n.canHandle(e)) {
                        const [r, o] = n.serialize(e);
                        return [
                            {
                                type: 3,
                                name: t,
                                value: r
                            },
                            o
                        ];
                    }
                    return [
                        {
                            type: 0,
                            value: e
                        },
                        h.get(e) || []
                    ];
                }
                function w(e) {
                    switch(e.type){
                        case 3:
                            return c.get(e.name).deserialize(e.value);
                        case 0:
                            return e.value;
                    }
                }
                function E(e, t, n) {
                    return new Promise((r)=>{
                        const o = new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
                        e.addEventListener("message", function t(n) {
                            n.data && n.data.id && n.data.id === o && (e.removeEventListener("message", t), r(n.data));
                        }), e.start && e.start(), e.postMessage(Object.assign({
                            id: o
                        }, t), n);
                    });
                }
            },
            162: function(e, t, n) {
                var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
                    void 0 === r && (r = n), Object.defineProperty(e, r, {
                        enumerable: !0,
                        get: function() {
                            return t[n];
                        }
                    });
                } : function(e, t, n, r) {
                    void 0 === r && (r = n), e[r] = t[n];
                }), o = this && this.__setModuleDefault || (Object.create ? function(e, t) {
                    Object.defineProperty(e, "default", {
                        enumerable: !0,
                        value: t
                    });
                } : function(e, t) {
                    e.default = t;
                }), a = this && this.__importStar || function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e) for(var n in e)"default" !== n && Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n);
                    return o(t, e), t;
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.createDbWorker = void 0;
                const s = a(n(870));
                async function i(e) {
                    if (e.data && "eval" === e.data.action) {
                        const t = new Int32Array(e.data.notify, 0, 2), n = new Uint8Array(e.data.notify, 8);
                        let r;
                        try {
                            r = {
                                ok: await u(e.data.request)
                            };
                        } catch (t1) {
                            console.error("worker request error", e.data.request, t1), r = {
                                err: String(t1)
                            };
                        }
                        const o = (new TextEncoder).encode(JSON.stringify(r));
                        n.set(o, 0), t[1] = o.length, Atomics.notify(t, 0);
                    }
                }
                function c(e) {
                    if ("BODY" === e.tagName) return "body";
                    const t = [];
                    for(; e.parentElement && "BODY" !== e.tagName;){
                        if (e.id) {
                            t.unshift("#" + e.id);
                            break;
                        }
                        {
                            let n = 1, r = e;
                            for(; r.previousElementSibling;)r = r.previousElementSibling, n++;
                            t.unshift(e.tagName.toLowerCase() + ":nth-child(" + n + ")");
                        }
                        e = e.parentElement;
                    }
                    return t.join(" > ");
                }
                function l(e) {
                    return Object.keys(e);
                }
                async function u(e) {
                    if (console.log("dom vtable request", e), "select" === e.type) return [
                        ...document.querySelectorAll(e.selector)
                    ].map((t)=>{
                        const n = {};
                        for (const r of e.columns)"selector" === r ? n.selector = c(t) : "parent" === r ? t.parentElement && (n.parent = t.parentElement ? c(t.parentElement) : null) : "idx" === r || (n[r] = t[r]);
                        return n;
                    });
                    if ("insert" === e.type) {
                        if (!e.value.parent) throw Error('"parent" column must be set when inserting');
                        const t = document.querySelectorAll(e.value.parent);
                        if (0 === t.length) throw Error(`Parent element ${e.value.parent} could not be found`);
                        if (t.length > 1) throw Error(`Parent element ${e.value.parent} ambiguous (${t.length} results)`);
                        const n = t[0];
                        if (!e.value.tagName) throw Error("tagName must be set for inserting");
                        const r = document.createElement(e.value.tagName);
                        for (const t1 of l(e.value))if (null !== e.value[t1]) {
                            if ("tagName" === t1 || "parent" === t1) continue;
                            if ("idx" === t1 || "selector" === t1) throw Error(`${t1} can't be set`);
                            r[t1] = e.value[t1];
                        }
                        return n.appendChild(r), null;
                    }
                    if ("update" === e.type) {
                        const t2 = document.querySelector(e.value.selector);
                        if (!t2) throw Error(`Element ${e.value.selector} not found!`);
                        const n1 = [];
                        for (const r1 of l(e.value)){
                            const o = e.value[r1];
                            if ("parent" !== r1) {
                                if ("idx" !== r1 && "selector" !== r1 && o !== t2[r1]) {
                                    if (console.log("SETTING ", r1, t2[r1], "->", o), "tagName" === r1) throw Error("can't change tagName");
                                    n1.push(r1);
                                }
                            } else if (o !== c(t2.parentElement)) {
                                const e1 = document.querySelectorAll(o);
                                if (1 !== e1.length) throw Error(`Invalid target parent: found ${e1.length} matches`);
                                e1[0].appendChild(t2);
                            }
                        }
                        for (const r2 of n1)t2[r2] = e.value[r2];
                        return null;
                    }
                    throw Error(`unknown request ${e.type}`);
                }
                s.transferHandlers.set("WORKERSQLPROXIES", {
                    canHandle: (e)=>!1,
                    serialize (e) {
                        throw Error("no");
                    },
                    deserialize: (e)=>(e.start(), s.wrap(e))
                }), t.createDbWorker = async function(e, t, n) {
                    const r = new Worker(t), o = s.wrap(r), a = await o.SplitFileHttpDatabase(n, e);
                    return r.addEventListener("message", i), {
                        db: a,
                        worker: o,
                        configs: e
                    };
                };
            },
            432: function(e, t, n) {
                var r = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
                    void 0 === r && (r = n), Object.defineProperty(e, r, {
                        enumerable: !0,
                        get: function() {
                            return t[n];
                        }
                    });
                } : function(e, t, n, r) {
                    void 0 === r && (r = n), e[r] = t[n];
                }), o = this && this.__exportStar || function(e, t) {
                    for(var n in e)"default" === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n);
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), o(n(162), t);
            }
        }, t = {};
        function n(r) {
            var o = t[r];
            if (void 0 !== o) return o.exports;
            var a = t[r] = {
                exports: {}
            };
            return e[r].call(a.exports, a, a.exports, n), a.exports;
        }
        return n.d = (e, t)=>{
            for(var r in t)n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            });
        }, n.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t), n.r = (e)=>{
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, n(432);
    })();
});
const w1_ = Array.from("一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六");
const w2_ = Array.from("引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話");
const w3_ = Array.from("悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和");
const w4_ = Array.from("愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録");
const w5_ = Array.from("圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領歴");
const w6_ = Array.from("胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論");
const w7_ = Array.from("握扱依威偉為違緯維壱芋隠陰鋭影越援縁煙鉛汚押奥憶菓箇暇雅介壊戒皆較獲刈甘監汗歓勧乾鑑環含奇鬼祈輝幾儀戯詰脚却丘及朽拠巨距御驚凶恐響叫狭狂況仰駆屈掘繰傾恵迎撃肩堅遣兼軒圏剣玄誇鼓枯継互更荒抗攻稿香恒項豪込婚鎖歳彩載剤咲惨雌伺紫刺脂旨執芝煮斜釈寂狩朱趣需秀舟襲柔獣瞬巡旬盾紹召沼詳床称畳丈飾殖触浸震慎侵寝振薪陣尽尋吹是征姓井跡扇占鮮訴燥騒僧贈即俗耐替拓沢濁脱丹端嘆淡弾恥遅致蓄沖跳徴澄珍沈抵堤摘滴添殿途吐渡奴怒透唐桃盗塔到倒逃踏稲闘胴峠突鈍曇弐悩濃輩杯泊拍迫薄爆髪抜罰繁販搬範般盤被疲彼避尾微匹描浜敏怖膚浮腐敷普賦舞幅払噴柄壁捕舗峰抱砲肪坊忙冒傍帽凡盆漫慢妙眠矛霧娘茂網猛黙紋踊雄与誉腰溶躍謡翼雷頼絡欄離粒慮療隣涙隷麗齢暦劣烈恋露郎惑腕");
const w8_ = Array.from("哀慰詠悦閲炎宴欧殴乙卸穏架佳華嫁餓怪悔塊概慨該穫隔郭岳掛滑勘肝貫敢緩冠換喚企軌棄棋忌既岐騎犠欺菊吉喫虐虚脅峡凝緊斤愚偶遇啓鶏携掲刑憩契鯨賢倹幻雇顧弧孤悟娯甲孔控拘郊硬綱巧坑慌絞酵克獄魂紺恨墾催債削錯搾撮擦暫施祉諮侍慈軸湿疾赦邪殊寿潤遵徐如晶掌鐘焦衝昇匠譲錠嬢冗嘱辱審伸辛粋炊遂衰穂酔随髄瀬牲婿請隻惜斥籍摂潜繕措阻粗礎双桑葬掃遭憎促賊逮胎怠滞袋滝託卓択諾奪胆鍛壇稚畜窒駐抽鋳彫超聴陳鎮墜訂帝締哲斗塗陶凍痘匿篤豚尿粘婆排陪縛伐帆伴藩畔蛮泌卑碑姫漂苗赴符封伏覆墳紛癖募慕簿崩芳胞縫倣邦飽奉妨乏謀膨房某墨没翻魔埋膜又魅滅免幽憂誘擁揚揺抑裸濫吏隆了猟陵糧厘零霊励裂錬廉炉漏廊浪楼湾");
const gradeByKanjis = [
    [],
    w1_,
    w2_,
    w3_,
    w4_,
    w5_,
    w6_,
    w7_,
    w8_
];
const kanjiGrade = {};
for(let level = 1; level < gradeByKanjis.length; level++){
    gradeByKanjis[level].forEach((kanji)=>{
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
    return fetch(url).then((response)=>response.arrayBuffer()).then((arrayBuffer)=>{
        return new Promise((resolve, reject)=>{
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer)=>{
                resolve(audioBuffer);
            }, (err)=>{
                reject(err);
            });
        });
    });
}
function loadAudios() {
    promises = [
        loadAudio("mp3/correct3.mp3"),
        loadAudio("mp3/incorrect1.mp3")
    ];
    Promise.all(promises).then((audioBuffers)=>{
        correctAudio = audioBuffers[0];
        incorrectAudio = audioBuffers[1];
    });
}
function getGrade(word) {
    const chars = word.split("");
    const grades = chars.map((x)=>{
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
    loadGrade();
    if (localStorage.getItem("darkMode") == 1) {
        document.documentElement.dataset.theme = "dark";
    }
}
function loadGrade() {
    const grade = localStorage.getItem("rensole-ja");
    if (grade) {
        const obj = document.getElementById("grade");
        [
            ...obj.options
        ].forEach((g)=>{
            if (g.value == grade) {
                g.selected = true;
            } else {
                g.selected = false;
            }
        });
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
function getWordVector(lemma) {
    return rensoleWorker.db.query(`SELECT * FROM magnitude WHERE key="${escapeSql(lemma)}"`).then((row)=>{
        if (row[0]) {
            const vector = new Array(300);
            for (const [k, v] of Object.entries(row[0])){
                if (k.startsWith("dim_")) {
                    const pos = parseInt(k.slice(4));
                    vector[pos] = v;
                }
            }
            return vector;
        }
    });
}
function getSiminyms(lemma) {
    return siminymWorker.db.query(`SELECT words FROM siminyms WHERE lemma="${escapeSql(lemma)}"`).then((row)=>{
        if (row[0]) {
            const words = JSON.parse(row[0].words);
            return words.reverse();
        }
    });
}
function showHint(hint) {
    let html = "";
    if (Object.keys(hint).length == 0) return html;
    let m = 2;
    if (hint.type == "pronounce") m = 4;
    if (hint.type == "grade") m = 6;
    let n = 1;
    if (hint.type == "pronounce") n = 3;
    if (hint.type == "grade") n = 5;
    const text = hint.text;
    for(let i = 0; i < text.length; i++){
        if (text[i] == hint.target[i]) {
            html += `<span class="hint${m}">${text[i]}</span>`;
        } else {
            html += `<span class="hint${n}">${text[i]}</span>`;
        }
    }
    return html;
}
function pronounceHint(count) {
    if (count == 1) {
        const pos = getRandomInt(0, pronounce.length);
        holedPronounce = pronounce.map((x, i)=>{
            return i == pos ? x : "?";
        });
        return {
            text: holedPronounce,
            type: "pronounce",
            target: pronounce
        };
    } else if (pronounce.length >= count) {
        const poses = pronounce.map((str, i)=>[
                str,
                i
            ]).filter((_, i)=>holedPronounce[i] == "?").map((x)=>x[1]);
        const pos1 = poses[getRandomInt(0, poses.length)];
        if (pos1) holedPronounce[pos1] = pronounce[pos1];
        return {
            text: holedPronounce,
            type: "pronounce",
            target: pronounce
        };
    }
}
function wordHint(count) {
    switch(count){
        case 1:
            {
                let hint = "";
                for(let i = 0; i < answer.length; i++){
                    hint += "？";
                }
                holedAnswer = hint;
                return {
                    text: hint,
                    type: "word",
                    target: answer
                };
            }
        case 2:
            {
                const pos = getRandomInt(0, answer.length);
                holedAnswer = holedAnswer.slice(0, pos) + answer[pos] + holedAnswer.slice(pos + 1);
                return {
                    text: holedAnswer,
                    type: "word",
                    target: answer
                };
            }
        default:
            {
                if (answer.length > count) {
                    const poses = holedAnswer.split("").map((str, i)=>[
                            str,
                            i
                        ]).filter((x)=>x[0] == "？").map((x)=>x[1]);
                    const pos1 = poses[getRandomInt(0, poses.length)];
                    holedAnswer = holedAnswer.slice(0, pos1) + answer[pos1] + holedAnswer.slice(pos1 + 1);
                    return {
                        text: holedAnswer,
                        type: "word",
                        target: answer
                    };
                } else {
                    return {};
                }
            }
    }
}
function gradeHint(count) {
    let hint = "";
    if (count == 1) {
        for (const str of answer){
            if (/^[ぁ-ん]+$/.test(str)) {
                hint += "ひ";
            } else if (/^[ァ-ヴー]+$/.test(answer)) {
                hint += "カ";
            } else {
                hint += "漢";
            }
        }
        return {
            text: hint,
            type: "grade",
            target: answer
        };
    } else {
        const grades = Array.from("１１２３４５６中中常");
        for(let i = 0; i < answer.length; i++){
            const grade = getGrade(answer[i]);
            hint += grades[grade];
        }
        return {
            text: hint,
            type: "grade",
            target: answer
        };
    }
}
function getHint(replyCount) {
    switch(replyCount){
        case 1:
            return wordHint(1);
        case 2:
            return gradeHint(1);
        case 3:
            return pronounceHint(1);
        case 5:
            return wordHint(2);
        case 6:
            return gradeHint(2);
        case 7:
            return pronounceHint(2);
        case 9:
            return wordHint(3);
        default:
            return {};
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
        "jackInTheBox"
    ];
    const animation = animations[getRandomInt(0, animations.length)];
    const classNames = [
        "animate__animated",
        `animate__${animation}`
    ];
    const answerText = document.getElementById("answerText");
    answerText.textContent = answer;
    answerText.parentNode.classList.add(...classNames);
    document.getElementById("restart").focus();
}
function search() {
    const searchText = document.getElementById("searchText");
    const word = searchText.value;
    getWordVector(word).then((b)=>{
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
function loadProblems() {
    return fetch("pronounce.tsv").then((response)=>response.text()).then((text)=>{
        document.getElementById("loading").classList.remove("d-none");
        const arr = text.trimEnd().split("\n");
        gradePoses = arr[0].split(",").map((x)=>parseInt(x));
        arr.slice(1).forEach((line)=>{
            vocabularies.push(line.split("\t"));
        });
        loadWorkers();
    });
}
function loadSiminymWorker() {
    let grade = localStorage.getItem("rensole-ja");
    if (!grade) {
        const obj = document.getElementById("grade");
        grade = obj.options[obj.selectedIndex].value;
    }
    const config = {
        from: "jsonconfig",
        configUrl: `/siminym-ja/db/${grade}/config.json`
    };
    return createDbWorker([
        config
    ], "/rensole-ja/sql.js-httpvfs/sqlite.worker.js", "/rensole-ja/sql.js-httpvfs/sql-wasm.wasm");
}
function loadRensoWorker() {
    const config = {
        from: "jsonconfig",
        configUrl: "/rensole-ja/db/config.json"
    };
    return createDbWorker([
        config
    ], "/rensole-ja/sql.js-httpvfs/sqlite.worker.js", "/rensole-ja/sql.js-httpvfs/sql-wasm.wasm");
}
function loadProblemVectors() {
    const promises1 = [
        getSiminyms(answer),
        getWordVector(answer)
    ];
    return Promise.all(promises1).then((result)=>{
        mostSimilars = result[0];
        answerVector = result[1];
        document.getElementById("searchText").focus();
        document.getElementById("loading").classList.add("d-none");
    });
}
async function changeProblem() {
    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("answer").classList.add("d-none");
    replyCount = 0;
    const pos = getRandomInt(0, problems.length);
    answer = problems[pos][0];
    pronounce = problems[pos][1].split("");
    const renso = document.getElementById("renso");
    while(renso.firstChild)renso.firstChild.remove();
    await loadProblemVectors();
}
async function loadWorkers() {
    const obj = document.getElementById("grade");
    const pos = gradePoses[obj.selectedIndex];
    problems = vocabularies.slice(0, pos);
    const promises1 = [
        loadSiminymWorker(),
        loadRensoWorker()
    ];
    await Promise.all(promises1).then((workers)=>{
        siminymWorker = workers[0];
        rensoleWorker = workers[1];
        changeProblem();
    });
}
function changeGrade() {
    const obj = document.getElementById("grade");
    const grade = obj.options[obj.selectedIndex].value;
    localStorage.setItem("rensole-ja", grade);
    location.reload();
}
const vocabularies = [];
let gradePoses = [];
let problems = [];
let replyCount = 0;
let mostSimilars;
let answerVector;
let answer;
let pronounce;
let holedAnswer;
let holedPronounce;
let rensoleWorker;
let siminymWorker;
loadConfig();
loadProblems();
document.addEventListener("keydown", function(event) {
    if (event.key == "Enter") search();
}, false);
document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("search").onclick = search;
document.getElementById("restart").onclick = changeProblem;
document.getElementById("grade").onchange = changeGrade;
document.addEventListener("click", unlockAudio, {
    once: true,
    useCapture: true
});

