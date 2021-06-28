const 암호화 = require("crypto-js"),
  헥스를바이너리로 = require("hex-to-binary");
const 블록_생성_간격 = 1;
const 난이도_조절_간격 = 10;

class 블록 {
  constructor(인덱스, 해시, 이전해시, 시간, 데이터, 난이도, 논스) {
    this.인덱스 = 인덱스;
    this.해시 = 해시;
    this.이전해시 = 이전해시;
    this.시간 = 시간;
    this.데이터 = 데이터;
    this.난이도 = 난이도;
    this.논스 = 논스;
  }
}

const 시간가져오기 = () => Math.round(new Date().getTime() / 1000);
const 해시만들기 = (인덱스, 이전해시, 시간, 데이터, 난이도, 논스) =>
  암호화
    .SHA256(인덱스 + 이전해시 + 시간 + JSON.stringify(데이터) + 난이도 + 논스)
    .toString();

시간 = 시간가져오기();
console.log(해시만들기(0, "", 시간, "", 0, 0) + " : " + 시간);

const 제네시스블록 = new 블록(
  //인덱스, 해시, 이전해시, 시간, 데이터, 난이도, 논스
  0, //인덱스
  "08529b977c2fd7f37f92da9d151dec85ad8c8c1064015676e926937e3bd7a5a7", //해시
  "",
  1624870552, //시간
  "", //제네시스 거래들
  0, //난이도
  0 //논스
);

let 블록체인 = [제네시스블록];

const 최신블록가져오기 = () => 블록체인[블록체인.length - 1];

const 블록체인가져오기 = () => 블록체인;

const 블록이올바른지 = (후보블록, 최신블록) => {
  if (!블록구조가올바른지(후보블록)) {
    console.log("후보 블록의 구조가 이상합니다.");
    return false;
  } else if (최신블록.인덱스 + 1 !== 후보블록.인덱스) {
    console.log("후보 블록의 인덱스가 이상합니다.");
    return false;
  } else if (최신블록.해시 !== 후보블록.이전해시) {
    console.log(
      "후보 블록의 이전 해시값이 실제 최근 블록의 해시값과 다릅니다."
    );
    return false;
  } else if (블록들해시가져오기(후보블록) !== 후보블록.해시) {
    console.log("후보 블록의 다이제스트와 해시 계산값이 다릅니다.");
    return false;
  } else if (!시간이올바른지(후보블록, 최신블록)) {
    console.log("후보 블록의 시간이 올바르지 않습니다.");
    return false;
  }
  return true;
};

const 블록을체인에더하라 = (후보블록) => {
  if (블록이올바른지(후보블록, 최신블록가져오기())) {
    블록체인.push(후보블록);
    return true;
  }
};

const 블록구조가올바른지 = (블록) => {
  return (
    typeof 블록.인덱스 === "number" &&
    typeof 블록.해시 === "string" &&
    typeof 블록.이전해시 === "string" &&
    typeof 블록.시간 === "number" &&
    typeof 블록.데이터 === "object"
  );
};

const 블록들해시가져오기 = (블록) =>
  해시만들기(
    블록.인덱스,
    블록.이전해시,
    블록.시간,
    블록.데이터,
    블록.난이도,
    블록.논스
  );
const 시간이올바른지 = (새로운블록, 이전블록) => {
  return (
    이전블록.시간 - 60 < 새로운블록.시간 &&
    새로운블록.시간 - 60 < 시간가져오기()
  );
};

const 체인이올바른지 = (후보체인) => {
  const 제네시스가올바른지 = (블록) => {
    return JSON.stringify(블록) === JSON.stringify(제네시스블록);
  };
  if (!제네시스가올바른지(후보체인[0])) {
    console.log("제네시스 블록이 다름.");
    return null;
  }
};
const 새로운난이도계산 = (새로운블록, 블록체인) => {
  //todo : 새로운 난이도 계산
  const 마지막으로계산된블록 = 블록체인[블록체인.length - 난이도_조절_간격];
  const 예상시간 = 블록_생성_간격 * 난이도_조절_간격;
  const 걸린시간 = 새로운블록.시간 - 마지막으로계산된블록.시간;
  if (걸린시간 < 예상시간) {
    console.log(
      "걸린시간 : " +
        걸린시간 +
        ", 예상시간 : " +
        예상시간 +
        " 난이도 + 1 = " +
        (마지막으로계산된블록.난이도 + 1)
    );
    return 마지막으로계산된블록.난이도 + 1;
  } else if (걸린시간 > 예상시간) {
    console.log(
      "걸린시간 : " +
        걸린시간 +
        ", 예상시간 : " +
        예상시간 +
        " 난이도 - 1 = " +
        (마지막으로계산된블록.난이도 - 1)
    );
    return 마지막으로계산된블록.난이도 - 1;
  } else {
    console.log("걸린시간 : " + 걸린시간 + ", 예상시간 : " + 예상시간);
    return 마지막으로계산된블록.난이도;
  }
};

const 난이도찾기 = () => {
  //todo : 난이도 리턴(새로운 것 || 기존 것)
  const 최신블록 = 최신블록가져오기();
  if (최신블록.인덱스 % 난이도_조절_간격 === 0 && 최신블록.인덱스 !== 0) {
    return 새로운난이도계산(최신블록, 블록체인가져오기());
  } else {
    return 최신블록.난이도;
  }
};

const 해시가난이도와일치하는지 = (해시, 난이도 = 0) => {
  const 바이너리의해시 = 헥스를바이너리로(해시);
  const 필요한0 = "0".repeat(난이도);
  // console.log("난이도 시도 : ", 난이도, " 해시 : ", 바이너리의해시);
  return 바이너리의해시.startsWith(필요한0);
};

const 블록캐기 = (인덱스, 이전해시, 시간, 데이터, 난이도) => {
  let 논스 = 0;
  while (true) {
    const 해시 = 해시만들기(인덱스, 이전해시, 시간, 데이터, 난이도, 논스);
    if (해시가난이도와일치하는지(해시, 난이도)) {
      return new 블록(인덱스, 해시, 이전해시, 시간, 데이터, 난이도, 논스);
    }
    논스++;
  }
};

const 블록채굴 = (데이터) => {
  const 이전블록 = 최신블록가져오기();
  const 새로운블록인덱스 = 이전블록.인덱스 + 1;
  const 새로운시간 = 시간가져오기();
  const 난이도 = 난이도찾기();
  const 새로운블록 = 블록캐기(
    새로운블록인덱스,
    이전블록.해시,
    새로운시간,
    데이터,
    난이도
  );
  블록을체인에더하라(새로운블록);
  return 새로운블록;
};

// 블록채굴({});

const 블록자동채굴 = () => {
  console.log(
    "채굴 !",
    최신블록가져오기().인덱스 + 1,
    " 난이도 : ",
    최신블록가져오기().난이도
  );
  return 블록채굴({});
};

while (true) {
  블록자동채굴();
}
