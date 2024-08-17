# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## コードの変更をするときの git の操作
1. まずは master ブランチに移動&最新化する。
$ git checkout master
$ git pull origin master

2. 何かを修正するときは master ブランチから 作業ブランチを切り出し、切り出したブランチへ移動する。
$ git checkout -b feature/新機能名

※ ('$ git branch' コマンドで現在のブランチを確認できる。)
※ (不要なブランチを削除する →　git branch -d ブランチ名)

3. 現在の変更されているファイルを確認する。
$ git status
※ (変更されているファイルは赤色)

4. 変更したファイルをステージングエリアに追加
$ git add ファイル名
※ ($ git add . ← このコマンドで変更されているファイルを一括でステージングエリアに追加できる。)

※ 変更内容をステージングエリアから戻したいとき
$ git reset HEAD ファイル名

5. 変更したファイルがステージングエリアに上がったことを確認
$ git status (上がっていたら緑色)

6. 変更をコミットする。
$ git commit -m "変更内容を記載"

7. GitHub にプッシュする。
$ git push -u origin ブランチ名
※ ('ブランチ名' は上記の例で言うと 'feature/新機能名')

8. ブラウザの GitHub の画面で Pull requests タブを開く。

9. compare & Pull request ボタンを押す。

10. マージ先のブランチを main → master

11. create pull request ボタンでプルリクエストを作成。

12. merge pull request を押す。

13. comfirm merge で master ブランチへマージされる。

14. 不要なブランチを消す(紫のボタン)

15. ローカル master ブランチを最新化する
$ git checkout master
$ git pull origin master
※ 取り込む内容とローカルで変更された内容が被ってエラーしたとき↓
$ git stash (変更内容を別の場所に退避)
$ git pull origin master (最新の情報を取得する)
$ git stash list (退避させた変更内容の一覧を表示)
$ git stash pop stash@{0} (退避させた変更を戻す)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
