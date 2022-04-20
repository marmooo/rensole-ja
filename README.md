# Rensole-ja

[単語の類似度を使った連想ゲーム](https://marmooo.github.io/rensole-ja/)です。

## Installation

- install [N-gram corpus](http://www.s-yata.jp/corpus/nwc2010/ngrams/) (free)
- install [SudachiDict](https://github.com/WorksApplications/SudachiDict)
  licenced under the Apache-2.0
- install
  [MosasoM/inappropriate-words-ja](https://github.com/MosasoM/inappropriate-words-ja)
  licensed under the MIT
- install
  [cc.ja.300.vec.gz](https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.ja.300.vec.gz)
  from [fastText](https://fasttext.cc/docs/en/crawl-vectors.html) licensed under
  the [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- install [marmooo/Siminym-ja](https://github.com/marmooo/siminym-ja) licensed under the
  [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- `npm install`

## Build

```
bash build-dict.sh
bash build-db.sh
bash build.sh
```

## Related projects

- [Rensole-en](https://github.com/marmooo/rensole-en) (English)
- [Rensole-zh](https://github.com/marmooo/rensole-zh) (Chinese)

## License

CC BY-SA 4.0
