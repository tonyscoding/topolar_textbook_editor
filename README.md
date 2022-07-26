# topolar_textbook_editor
### 토폴라 교재 편집기

## How to release
#### 1. ```yarn deploy && yarn deploy:mac```
#### 2. dist폴더의 assets폴더와 index.html파일을 build폴더로 이동(build폴더에 있던 기존 assets폴더와 index.html파일은 삭제)
#### 3. build폴더의 assets/index.OOOOOOOO.js파일 열기
#### 4. 51번째 줄에 있는 모든 Object.keys(변수명)앞에 if(변수명)입력(return 뒤에 있는 Object.keys는 제외)
#### 5. ```yarn deploy && yarn deploy:mac```
