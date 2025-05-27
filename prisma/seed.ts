import { PrismaClient, Gender, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("owner1234!", 10); // 공통 비밀번호

  const sampleProducts = [
    {
      name: "어버이날 케이크 🌹",
      description: "신선한 딸기와 생크림이 어우러진 어버이날 맞춤 케이크에요!",
      price: 29000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/1/image_1748325627667_81255.jpeg"],
    },
    {
      name: "로또 케이크 🤑",
      description: "달콤한 케이크와 로또의 설렘까지! 행운을 기원하는 특별한 케이크입니다.",
      price: 32000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/2/image_1747986188560.jpeg"],
    },
    {
      name: "바다 케이크 🌊",
      description: "바다를 담은 듯한 푸른색의 케이크로, 여름을 느낄 수 있는 상큼한 맛이에요.",
      price: 18000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/3/image_1747986548849.jpeg"],
    },
    {
      name: "소주 케이크 🍶",
      description: "소주의 쌉싸름함과 달콤함은 없지만! 소주 한 병이 통으로 들어간 독특한 케이크입니다. 소주를 좋아하는 분들에게 추천!",
      price: 30000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/4/image_1747986622475.jpeg"],
    },
    {
      name: "젠더리빌 케이크 🏳️‍🌈",
      description: "다양한 색상의 크림과 과일로 만들어진 젠더리빌 케이크입니다. 아들일까? 딸일까? 설렘을 주는 특별한 케이크!",
      price: 31000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/5/image_1747986869109.jpeg"],
    },
    {
      name: "심플 케이크 🎂",
      description: "깔끔하고 심플한 디자인의 케이크로, 어떤 자리에서도 잘 어울려요. 기본에 충실한 맛!",
      price: 33000,
      imageUrls: ["https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/1/product/6/image_1747986899573.jpeg"],
    },
  ];

  const memberStoreData = [
    {
      member: {
        name: "김민수",
        email: "owner1@cakeletter.com",
        phone: "010-1234-5601",
        birth: new Date("1985-01-01"),
        gender: Gender.MALE,
      },
      store: {
        name: "달콤마카롱",
        openDays: 62,
        address: "서울특별시 강남구 테스트로 123",
        cityProvince: "서울특별시",
        district: "강남구",
        intro: "맛있고 예쁜 케이크 제공",
        content: "매일 아침 구워낸 생크림 케이크가 자랑인 케이크 전문점입니다. 특별한 날을 더욱 빛나게 해줄 케이크를 정성스럽게 준비해 드려요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/2.png",
      },
    },
    {
      member: {
        name: "이지은",
        email: "owner2@cakeletter.com",
        phone: "010-1234-5602",
        birth: new Date("1986-01-02"),
        gender: Gender.FEMALE,
      },
      store: {
        name: "스윗케이크하우스",
        openDays: 124,
        address: "서울특별시 마포구 테스트로 123",
        cityProvince: "서울특별시",
        district: "마포구",
        intro: "신선한 케이크 제공",
        content: "매일 아침 구워낸 생크림 케이크가 자랑인 케이크 전문점입니다. 특별한 날을 더욱 빛나게 해줄 케이크를 정성스럽게 준비해 드려요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/3.jpeg",
      },
    },
    {
      member: {
        name: "박정우",
        email: "owner3@cakeletter.com",
        phone: "010-1234-5603",
        birth: new Date("1987-01-03"),
        gender: Gender.MALE,
      },
      store: {
        name: "르베랑",
        openDays: 31,
        address: "부산광역시 해운대구 테스트로 123",
        cityProvince: "부산광역시",
        district: "해운대구",
        intro: "진한 초콜릿",
        content: "계절마다 달라지는 신메뉴와 감성적인 인테리어가 돋보이는 디저트 카페입니다. 눈과 입을 모두 만족시키는 디저트를 만나보세요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/4.jpeg",
      },
    },
    {
      member: {
        name: "최유진",
        email: "owner4@cakeletter.com",
        phone: "010-1234-5604",
        birth: new Date("1988-01-04"),
        gender: Gender.FEMALE,
      },
      store: {
        name: "베통",
        openDays: 127,
        address: "경기도 성남시 분당구 테스트로 123",
        cityProvince: "경기도",
        district: "성남시 분당구",
        intro: "건강한 빵",
        content: "저희 가게는 달콤한 수제 마카롱으로 입소문 난 디저트 카페입니다. 당일 생산, 당일 소진 원칙으로 신선함을 보장합니다.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/5.jpeg",
      },
    },
    {
      member: {
        name: "강도윤",
        email: "owner5@cakeletter.com",
        phone: "010-1234-5605",
        birth: new Date("1989-01-05"),
        gender: Gender.MALE,
      },
      store: {
        name: "릴리베이커리",
        openDays: 96,
        address: "대구광역시 수성구 테스트로 123",
        cityProvince: "대구광역시",
        district: "수성구",
        intro: "계절 디저트",
        content: "천연 발효종으로 만든 건강한 빵과 신선한 샐러드, 커피를 함께 즐길 수 있는 복합 베이커리입니다.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/6.jpeg",
      },
    },
    {
      member: {
        name: "정하늘",
        email: "owner6@cakeletter.com",
        phone: "010-1234-5606",
        birth: new Date("1990-01-06"),
        gender: Gender.FEMALE,
      },
      store: {
        name: "몽블랑디저트",
        openDays: 62,
        address: "인천광역시 연수구 테스트로 123",
        cityProvince: "인천광역시",
        district: "연수구",
        intro: "프랑스식 디저트",
        content: "프랑스식 몽블랑과 타르트 전문점입니다. 부드러운 무스와 고급 원재료로 특별한 하루를 선사합니다.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/7.jpeg",
      },
    },
    {
      member: {
        name: "배지훈",
        email: "owner7@cakeletter.com",
        phone: "010-1234-5607",
        birth: new Date("1991-01-07"),
        gender: Gender.MALE,
      },
      store: {
        name: "마들렌하우스",
        openDays: 21,
        address: "광주광역시 남구 테스트로 123",
        cityProvince: "광주광역시",
        district: "남구",
        intro: "향긋한 마들렌",
        content: "전통 프랑스식 마들렌과 다양한 티를 함께 즐길 수 있는 공간입니다. 조용한 분위기에서 힐링하세요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/8.jpeg",
      },
    },
    {
      member: {
        name: "윤서현",
        email: "owner8@cakeletter.com",
        phone: "010-1234-5608",
        birth: new Date("1992-01-08"),
        gender: Gender.FEMALE,
      },
      store: {
        name: "크림슈연구소",
        openDays: 42,
        address: "대전광역시 유성구 테스트로 123",
        cityProvince: "대전광역시",
        district: "유성구",
        intro: "바삭한 슈",
        content: "겉은 바삭하고 속은 부드러운 크림이 가득한 슈 전문 디저트 가게입니다. 직접 만든 바닐라 크림이 일품이에요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/9.jpeg",
      },
    },
    {
      member: {
        name: "장예림",
        email: "owner9@cakeletter.com",
        phone: "010-1234-5609",
        birth: new Date("1993-01-09"),
        gender: Gender.FEMALE,
      },
      store: {
        name: "타르트상점",
        openDays: 127,
        address: "울산광역시 중구 테스트로 123",
        cityProvince: "울산광역시",
        district: "중구",
        intro: "수제 타르트",
        content: "제철 과일을 활용한 수제 타르트를 판매하는 디저트 전문점입니다. 보기에도 예쁘고 맛도 훌륭해요.",
        imageUrl: "https://dh-cake-letter.s3.us-east-1.amazonaws.com/store/10.png",
      },
    },
  ];

  for (const { member, store } of memberStoreData) {
    const createdMember = await prisma.member.create({
      data: {
        ...member,
        password: hashedPassword,
        role: Role.OWNER,
      },
    });

    await prisma.store.create({
      data: {
        ...store,
        memberId: createdMember.id, // 관계 연결
      },
    });
    if (store.name === "달콤마카롱") {
      for (const product of sampleProducts) {
        const createdProduct = await prisma.product.create({
          data: {
            storeId: createdMember.id,
            name: product.name,
            description: product.description,
            price: product.price,
          },
        });

        for (const url of product.imageUrls) {
          await prisma.image.create({
            data: {
              productId: createdProduct.id,
              url,
            },
          });
        }
      }
    }
  }

  console.log("✅ 9명의 OWNER 및 Store 생성 완료");
}

main()
  .catch((e) => {
    console.error("❌ 시드 생성 실패:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
