# README

オブジェクトのストローク（線）をランダムな設定の破線にするIllustrator用スクリプトです

<div class="fig center" style="margin-bottom: 20px;"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/cover.png" alt="イメージ" class="noshadow"></div>

### 更新履歴

* **0.5.3：数値変更時に情報が更新されない問題を解消**
* 0.5.2：数値が正しく反映されない問題を解消
* 0.5.1：新規作成

----

### 対応バージョン

* Illustrator 2019／2020

----

### ダウンロード

* [スクリプトをダウンロードする](https://github.com/gau/random_dashed_stroke/archive/master.zip)

----

### インストール方法

1. ダウンロードしたファイルを解凍します。
2. 所定の場所に「ランダム破線.jsx」をコピーします。
3. Illustratorを再起動します。
4. `ファイル > スクリプト > ランダム破線`と表示されていればインストール成功です。

#### ファイルをコピーする場所

| OS | フォルダの場所 |
|:-----|:-----|
| Mac |  /Applications/Adobe Illustrator *(ver)*/Presets/ja_JP/スクリプト/ |
| 64bit Win | C:\Program Files\Adobe\Adobe Illustrator *(ver)* (64 Bit)\Presets\ja_JP\スクリプト\ |

* *(ver)*にはお使いのIllustratorのバージョンが入ります

----

### スクリプトの概要

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/step1.png" alt="スクリプトの概要" class="noshadow"></div>

Illustratorの破線は、［線分］と［間隔］の数値をそれぞれ3つずつ設定できますが、本スクリプトでは、実線をすべて破線に変換した上で、これら6つの設定値を指定した範囲内のランダムな数値で埋めます。複数のオブジェクトを同時に処理することも可能です。

----

### 使い方

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/step2.png" alt="使い方" class="noshadow"></div>

線を設定したオブジェクトを選択し、スクリプトを実行します。ダイアログでは［線分］と［間隔］の最小値と最大値を指定できます。例えば、［線分］を［10pt］〜［30pt］とした場合、10ptから30ptの間でランダムの数値を線分に適用します。［ランダム破線を更新］ボタンをクリックするごとにランダムの数値を更新しますので、プレビューを確認しながら希望の形になったところで［OK］をクリックして実行してください。

----

### 端数の四捨五入

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/step3.png" alt="端数の四捨五入" class="noshadow"></div>

［端数を四捨五入する］のチェックをオンにしておくと、［線分］と［間隔］の値はすべて整数になります。

----

### 文字オブジェクトの破線

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/step4.png" alt="文字オブジェクトの破線" class="noshadow"></div>

Illustratorの仕様上、スクリプトを使って文字オブジェクトの線を破線にすることはできません。そのため、本スクリプトも文字の線へは残念ながら非対応です。文字の線をランダム破線にしたいときは、いったんダミーのパスを作成し、そのパスに対して本スクリプトでランダム破線を作成したあと、［スポイトツール］を使って線の設定を文字にコピーするといいでしょう。

----

### ランダム破線を使った作例

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/random_dashed_stroke/step5.png" alt="ランダム破線を使った作例" class="noshadow"></div>

手動で複数のランダム破線を作るのはとても時間がかかりますが、スプリクトを使うと作例ようなデザインのアクセントを効率的に作成できます。

----

### 注意

* スクリプトの実行前にドキュメントを保存しておくことをお勧めします。
* **CC 2018以前のバージョンでは、異なる設定の破線を複数同時に選択した状態で、［線パネル］の［破線］チェックを［オフ］→［オン］すると、フリーズやクラッシュする可能性があります。ご理解の上お使いください。なお、これはスクリプトではなくIllustrator自体の問題です（スクリプトを使わなくても、同様の操作で現象が再現されます）。2019以降では問題ありません。**
* 必要なオブジェクトが選択されていないときは、警告を表示して処理を中断します。
* オブジェクトの種類や構造によって意図しない結果になる可能性もゼロではありません。
* 次のアイテムには対応していません。これらのアイテムが選択されているときは、事前に警告を表示します。

	#### スクリプトから線を操作できないもの
	* 文字オブジェクト
	* 複合シェイプ

	#### そもそも線がないもの
	* シンボル
	* ラスター画像
	* ライブペイントグループ
	* 拡張前の画像トレース

----

### 免責事項

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。特に、 CC〜CC 2018までのバージョンでは、スクリプト実行後に特定の操作を行うとフリーズやクラッシュする可能性を含んでいます。ご理解の上お使いください。
* OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

----

### ライセンス

* ランダム破線.jsx
* Copyright (c) 2020 Toshiyuki Takahashi
* Released under the MIT license
* [http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)