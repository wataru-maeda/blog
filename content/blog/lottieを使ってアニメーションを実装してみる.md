---
path: lottie-ios
date: 2020-12-12T07:04:15.203Z
title: Lottieを使ってアニメーションを実装してみる
description: 今回Lottieというライブラリを使い、リッチアニメーションを実装してみるわけなのですが、Lottieとは何か、どう言う仕組みで動いているのか、他のアニメーションライブラリではなくなぜLottieなのか等々を纏めていきたいと思います。早速見ていきましょう。
---
こんにちは、バンクーバー在住のソフトウェアデベロッパーwataruです。

さて、今回Lottieというライブラリを使い、リッチアニメーションを実装してみるわけなのですが、Lottieとは何か、どう言う仕組みで動いているのか、他のアニメーションライブラリではなくなぜLottieなのか等々を纏めていきたいと思います。早速見ていきましょう。

### Lottieとは

Airbnbが開発した、リッチアニメーションを簡単に実装できるアニメーションライブラリです。

Lottie自体にアニメーションを付与する機能はなく、[Adobe After Effects](https://www.adobe.com/products/aftereffects.html) (ビデオエフェクトソフトウェア)から生成したJSONファイル(*のちにLottieファイルと呼ぶ)をモバイル、ウェブ上で読み込み、アニメーション表示するためのライブラリです。

要は動画でいうとこのビデオプレイヤー的な役割をするライブラリです。ビデオプレイヤー(Lottie)に好きな動画(Lottieファイル)を読み込ませることにより、様々なリッチアニメーションを実現することができます。

### なぜLottieを選んだのか

Github上のスター数は2万を超えています([こちら](https://github.com/airbnb/lottie-ios))。これだけで十分ライブラリの信憑性はあるのですが、ライブラリの導入のしやすさ、パフォーマンスチューニング、細やかな機能設定、それに複数のプラットフォーム(iOS, Android, React Native, Web...etc)で使える点等々で使用を決めました。ドキュメントは丁寧に纏められているのですが、サンプルが少ないのが少し残念でした。

* [公式ドキュメント](http://airbnb.io/lottie/#/ios)

### インストール

まず、公式ドキュメントのライブラリ[導入編](http://airbnb.io/lottie/#/ios?id=installing-lottie)を見てみましょう。ライブラリマネーシャーでおなじみ、cocoapodsを使用します。

Podファイルに以下一文を追加して、`pod install`するだけです。以上で導入完了。

```
pod 'lottie-ios'
```

### 実装

実装前に、Lottieファイルを落としてこないといけませんね。[LottieFiles](https://lottiefiles.com/)で無料のものを落としてきてください。僕は[こちら](https://lottiefiles.com/41256-skateboarding)のスケボー兄さんを使用させてもらいます。

ダウンロードしたLottieファイルをプロジェクトに取り込み、数行のコードを書けば完了です

```
import UIKit
import Lottie

class ViewController: UIViewController {
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    // play lottie file
    let animationView = AnimationView(name: "41256-skateboarding")
    animationView.frame = view.bounds
    animationView.loopMode = .loop
    animationView.contentMode = .scaleAspectFit
    view.addSubview(animationView)
    animationView.play()
  }
}
```

実行するとしてシミュレーター上でアニメーションを確認できました。




### Lottieの問題点

のちに詳しく書きますが、Adobe After Effectsのライセンスが有償なので、








モバイルアプリのクオリティーを決める上で欠かせないのがアニメーションで、


Lottieはリッチアニメーションを簡単に実装することができるライブラリです。

また、iOS, Android, React Native, Webと幅広く使用できる点も

LottieはAirbnbのアニメーションライブラリで、非常に簡単にリッチなアニメーションを実現できるのが特徴です。今回は

### 目的
