# 🎈 Find MI (Find My Image)

## 😀팀원 구성 :

- 🐰 [황세원](https://github.com/pabaep) : 화면 구성 및 API 결과 화면 띄우기 담당
- 🐮 [손현오](https://github.com/SonHyeono) : open API 연결 부분 담당
- 🐶 [김병조](https://github.com/KIMBJ1) : 로딩 기능 구현, 기타 기능 담당

## ✨서비스 소개 :

- **_이미지 검색 API를 이용하여 키워드에 대한 이미지 검색 결과를 출력하고 원하는 결과가 아닐 경우 쿼리 재조합을 통한 재검색 기능 구현_** 🚀

< **상세내용** >

1. 사용자가 입력한 텍스트로 이미지 api를 호출
2. 해당 텍스트로 검색된 image를 보여줌.
3. 사용자가 원하는 이미지가 아닐 경우 (ex: 대선을 입력시 大選이 아니라 소주 '대선'이 나오는 경우) 아래 로직을 수행함.

   ```
   a. 검색 api를 통한 텍스트에 대한 뉴스 기사들을 크롤링

   b. 텍스트를 긁어온 후에 Koalanlp를 사용해서 명사들을 추출

   c. 명사들의 빈도수를 측정

   d. 빈도수가 높은 명사들을 하나씩 텍스트에 붙여서 이미지 api에서 재검색을 시도
   ```

4. 사용자가 입력한 텍스트에 텍스트 관련 단어들이 붙음으로서 검색의 정확도가 더 높아짐.

## ⏰프로젝트 기간

- `22/03/10 ~ 22/03/13`

## 🛠기술 스택 :

- 네이버 검색 API ( 원하는 이미지가 아닐 경우 키워드 재조합으로 재검색을 위해 사용)
- Koalanlp (크롤링한 뉴스기사에서 명사 추출)
- node.js (server.js에서 Open api와 소통 및 키워드 재조합 수행)
- React ( 화면 구성 )

## 📝기능 :

- ✅ 키워드 검색하면 이미지 출력
- ✅ 원하는 이미지가 맞을 경우 Correct -> 다운로드
- ✅ 원하는 이미지가 아닐 경우 retry하여 이미지 reloading

## 🖥실제 화면

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/57746855/158065166-f25a2900-74c2-414c-aeba-b00e6837da94.gif)


## 🎯트러블 슈팅

<a href="https://github.com/xxxxntp/React_Image_Search/wiki/Trouble-Shooting"><img src="https://img.shields.io/badge/Trouble Shooting-46B077?style=for-the-badge&logoWidth=50"/></a>

## 👾개선 사항

- retry 한 번만 가능 ( Koalanlp의 문제, "Cannot set asyncOptions after calling any other java function" error 발생 )
- 이미지 재 로딩시에 로딩화면이 제대로 보여지지 않는 문제를 해결해야 함

## ❗본 프로젝트를 통해 느낀점

- 버전 관리의 중요성을 알게 됨(특히나 .gitignore 파일을 이용해서 node_modules를 제외 할 경우 npm install 할 때 Koalanlp에서 Issue가 발생 )
