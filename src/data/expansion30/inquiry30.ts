import { Question } from '../../types';

export const EXPANSION_30_INQUIRY: Question[] = [
  {
    "id": "exp30-inq-k1-01",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ประสาทสัมผัส: เราใช้สิ่งใดในการ \"ดมกลิ่น\" หอมของดอกไม้? 🌸",
      "en": "Sense organ: Which body part do we use to SMELL lovely flowers? 🌸",
      "zh": "感知器官：我们是用哪一个器官来“闻花香”的？🌸"
    },
    "illustration": "👃 🌸 💐 ✨",
    "illustrationSubtitle": {
      "th": "ประสาทสัมผัสทั้ง 5: การดมกลิ่น",
      "en": "Five senses: Smell with nose",
      "zh": "五官探索：鼻子用来闻气味"
    },
    "options": [
      {
        "id": "opt-nose",
        "label": {
          "th": "จมูก",
          "en": "Nose",
          "zh": "鼻子 (Nose)"
        },
        "icon": "👃"
      },
      {
        "id": "opt-ear",
        "label": {
          "th": "หู",
          "en": "Ears",
          "zh": "耳朵"
        },
        "icon": "👂"
      },
      {
        "id": "opt-foot",
        "label": {
          "th": "เท้า",
          "en": "Feet",
          "zh": "小脚丫"
        },
        "icon": "🦶"
      }
    ],
    "correctOptionId": "opt-nose",
    "explanation": {
      "th": "เก่งมากจ้ะ! จมูกมีไว้สำหรับหายใจและดมกลิ่นต่างๆ จ้า",
      "en": "Great job! Our nose breathes air and smells wonderful scents!",
      "zh": "真棒！鼻子用来呼吸新鲜空气和闻各种香香的气味！"
    }
  },
  {
    "id": "exp30-inq-k1-02",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สิ่งใดในภาพคือ \"สิ่งมีชีวิต\" ที่สามารถเติบโตและกินอาหารได้? 🐶 🪨 🚗",
      "en": "Which of these is a LIVING THING that grows and eats food? 🐶 🪨 🚗",
      "zh": "下面哪一个是能够长大、需要吃食物的“活生生的生物”？🐶 🪨 🚗"
    },
    "illustration": "🐶 (ลูกสุนัข)  VS  🪨 (ก้อนหิน)  VS  🚗 (รถยนต์)",
    "illustrationSubtitle": {
      "th": "สิ่งมีชีวิตและสิ่งไม่มีชีวิต",
      "en": "Living vs non-living things",
      "zh": "生物与非生物的观察"
    },
    "options": [
      {
        "id": "opt-rock",
        "label": {
          "th": "ก้อนหิน",
          "en": "Rock",
          "zh": "小石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-puppy",
        "label": {
          "th": "ลูกสุนัข (สิ่งมีชีวิต)",
          "en": "Puppy (Living)",
          "zh": "小狗狗（活生生的生物）"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-car",
        "label": {
          "th": "รถยนต์ของเล่น",
          "en": "Toy car",
          "zh": "小汽车"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-puppy",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! สุนัขต้องการอาหาร น้ำ อากาศ และสามารถเติบโตได้ จึงเป็นสิ่งมีชีวิต",
      "en": "Correct! Puppies need food, water, air, and grow bigger over time!",
      "zh": "完全正确！小狗需要喝水吃东西还会长大，是有生命的生物！"
    }
  },
  {
    "id": "exp30-inq-k1-03",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ลูกเจี๊ยบตัวน้อย 🐥 ฟักออกมาจากอะไรเอ่ย?",
      "en": "What does a baby chick 🐥 hatch from?",
      "zh": "毛茸茸的小鸡 🐥 是从什么里面破壳孵化出来的？"
    },
    "illustration": "🥚 ➡️ 🐣 ➡️ 🐥 ✨",
    "illustrationSubtitle": {
      "th": "การกำเนิดของสัตว์ปีก",
      "en": "Chick hatches from egg",
      "zh": "鸡蛋孵化成小鸡"
    },
    "options": [
      {
        "id": "opt-tree",
        "label": {
          "th": "ผลแอปเปิ้ลบนต้นไม้",
          "en": "Apple tree",
          "zh": "苹果树上的果子"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-water",
        "label": {
          "th": "ก้อนเมฆบนฟ้า",
          "en": "Clouds in sky",
          "zh": "天上的白云"
        },
        "icon": "☁️"
      },
      {
        "id": "opt-egg",
        "label": {
          "th": "ฟองไข่",
          "en": "An egg",
          "zh": "圆圆的鸡蛋"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-egg",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! แม่ไก่ออกไข่ และกกไข่จนลูกเจี๊ยบฟักออกมาจ้ะ",
      "en": "Awesome! Mother hen lays and incubates eggs until chicks hatch!",
      "zh": "太棒了！母鸡下蛋后用心孵化，毛茸茸的小鸡就从蛋壳里钻出来！"
    }
  },
  {
    "id": "exp30-inq-k1-04",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เวลา \"กลางวัน\" ☀️ ท้องฟ้าจะสว่างเพราะมีอะไรส่องแสงเจิดจ้า?",
      "en": "What shines brightly in the sky giving warmth during the DAY? ☀️",
      "zh": "在阳光明媚的“白天” ☀️，天空中最耀眼、带来温暖光芒的是什么？"
    },
    "illustration": "☀️ 🌤️ 🌳 🌻",
    "illustrationSubtitle": {
      "th": "กลางวันและดวงอาทิตย์",
      "en": "Sun gives light during daytime",
      "zh": "太阳在白天带来光明和温暖"
    },
    "options": [
      {
        "id": "opt-sun",
        "label": {
          "th": "ดวงอาทิตย์ (พระอาทิตย์)",
          "en": "The Sun",
          "zh": "大太阳 (The Sun)"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-moon",
        "label": {
          "th": "ดวงจันทร์เสี้ยว",
          "en": "Crescent Moon",
          "zh": "弯弯的月亮"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-lamp",
        "label": {
          "th": "โคมไฟตั้งโต๊ะ",
          "en": "Desk lamp",
          "zh": "床头台灯"
        },
        "icon": "🛋️"
      }
    ],
    "correctOptionId": "opt-sun",
    "explanation": {
      "th": "เก่งมากจ้ะ! พระอาทิตย์ให้แสงสว่างและความอบอุ่นแก่โลกในเวลากลางวันจ้ะ",
      "en": "Great job! The Sun illuminates and warms our Earth all day long!",
      "zh": "真棒！大太阳在白天照亮大地，带来无穷的光和热！"
    }
  },
  {
    "id": "exp30-inq-k1-05",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใด \"ว่ายน้ำ\" อยู่ในแม่น้ำและทะเล และมีครีบช่วยทรงตัว? 🐟 🐱 🐦",
      "en": "Which animal SWIMS in water using fins? 🐟 🐱 🐦",
      "zh": "哪一种动物生活在水里，用鱼鳍和尾巴摆动自由游水？🐟 🐱 🐦"
    },
    "illustration": "🐟 🌊 🐠 🐬",
    "illustrationSubtitle": {
      "th": "ถิ่นที่อยู่อาศัยของสัตว์น้ำ",
      "en": "Fish swim in aquatic habitats",
      "zh": "水生动物与游泳本领"
    },
    "options": [
      {
        "id": "opt-cat",
        "label": {
          "th": "แมว",
          "en": "Cat",
          "zh": "小猫"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-fish",
        "label": {
          "th": "ปลา",
          "en": "Fish",
          "zh": "游鱼 (Fish)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-bird",
        "label": {
          "th": "นกกระจอก",
          "en": "Sparrow",
          "zh": "麻雀小鸟"
        },
        "icon": "🐦"
      }
    ],
    "correctOptionId": "opt-fish",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ปลาอาศัยอยู่ในน้ำ หายใจด้วยเหงือกและว่ายน้ำด้วยครีบ",
      "en": "Correct! Fish live underwater, breathe with gills, and swim with fins!",
      "zh": "完全正确！鱼儿生活在水里，用腮呼吸、用鱼鳍游水！"
    }
  },
  {
    "id": "exp30-inq-k1-06",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เมื่อนำน้ำแข็งก้อน 🧊 วางทิ้งไว้ในที่ร้อน น้ำแข็งจะกลายเป็นอะไร?",
      "en": "When ice cubes 🧊 sit out in the warm sun, what do they melt into?",
      "zh": "冰凉的冰块 🧊 放在热热的太阳下，会融化变成什么？"
    },
    "illustration": "🧊 ➡️ ☀️ ➡️ 💧 💧",
    "illustrationSubtitle": {
      "th": "การละลายของน้ำแข็งเมื่อได้รับความร้อน",
      "en": "Ice melts into liquid water",
      "zh": "冰块受热融化成水"
    },
    "options": [
      {
        "id": "opt-rock",
        "label": {
          "th": "กลายเป็นก้อนหินแข็ง",
          "en": "Turns into rock",
          "zh": "变成坚硬的石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-fire",
        "label": {
          "th": "ลุกเป็นเปลวไฟสีแดง",
          "en": "Turns into fire",
          "zh": "燃起大火"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-liquid-water",
        "label": {
          "th": "ละลายกลายเป็นน้ำเปล่า",
          "en": "Melts into liquid water",
          "zh": "融化变成流动的水"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-liquid-water",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! น้ำแข็งโดนความร้อนจะละลายกลายเป็นน้ำใสๆ จ้า",
      "en": "Awesome! Warm heat melts solid ice cubes into liquid water!",
      "zh": "太棒了！受热后固体冰块就会融化成清澈的液态水！"
    }
  },
  {
    "id": "exp30-inq-k1-07",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ต้นไม้ 🌳 มีส่วนใดที่อยู่ใต้ดิน ช่วยดูดน้ำและยึดลำต้นให้มั่นคง?",
      "en": "Which part of a tree 🌳 grows underground to drink water and hold it firm?",
      "zh": "大树 🌳 哪一部分扎根在泥土深处，用来吸收水分并牢牢抓住大地？"
    },
    "illustration": "🌳 🍃 🪵 ⬇️ 🪱 (รากไม้ใต้ดิน)",
    "illustrationSubtitle": {
      "th": "ส่วนประกอบของต้นไม้",
      "en": "Roots grow underground",
      "zh": "地下的植物根系"
    },
    "options": [
      {
        "id": "opt-root",
        "label": {
          "th": "รากไม้",
          "en": "Roots",
          "zh": "根 (Roots)"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-leaf",
        "label": {
          "th": "ใบไม้",
          "en": "Leaves",
          "zh": "绿叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-flower",
        "label": {
          "th": "ดอกไม้",
          "en": "Flowers",
          "zh": "花朵"
        },
        "icon": "🌸"
      }
    ],
    "correctOptionId": "opt-root",
    "explanation": {
      "th": "เก่งมากจ้ะ! รากไม้ทำหน้าที่ดูดซึมน้ำและแร่ธาตุจากดินไปเลี้ยงลำต้น",
      "en": "Great job! Roots anchor trees underground and absorb water and minerals!",
      "zh": "真棒！树根深深扎在泥土中，吸饱水分给树叶提供养料！"
    }
  },
  {
    "id": "exp30-inq-k1-08",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "นกตัวน้อย 🐦 อาศัยอยู่ที่บ้านแบบไหนที่ทำจากกิ่งไม้บนต้นไม้?",
      "en": "Where do little birds 🐦 sleep and raise their chicks in trees?",
      "zh": "树上的小鸟 🐦 住在用小树枝搭建的什么家里面？"
    },
    "illustration": "🐦 🪺 🥚 🌲",
    "illustrationSubtitle": {
      "th": "รังนกแสนอบอุ่น",
      "en": "Bird nest on tree branches",
      "zh": "树枝上温暖的鸟巢"
    },
    "options": [
      {
        "id": "opt-cave",
        "label": {
          "th": "ถ้ำมืดใต้น้ำ",
          "en": "Underwater cave",
          "zh": "水底漆黑的洞穴"
        },
        "icon": "🕳️"
      },
      {
        "id": "opt-nest",
        "label": {
          "th": "รังนก",
          "en": "Bird nest",
          "zh": "鸟巢 / 鸟窝 (Nest)"
        },
        "icon": "🪺"
      },
      {
        "id": "opt-spider-web",
        "label": {
          "th": "ใยแมงมุม",
          "en": "Spider web",
          "zh": "蜘蛛网"
        },
        "icon": "🕸️"
      }
    ],
    "correctOptionId": "opt-nest",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! นกสร้างรังจากเศษไม้และใบหญ้าเพื่อวางไข่และเลี้ยงดูลูกนก",
      "en": "Correct! Birds build cozy nests with twigs and grass to protect their chicks!",
      "zh": "完全正确！鸟妈妈用小枯枝编织温暖的鸟窝来孵蛋宝宝！"
    }
  },
  {
    "id": "exp30-inq-k1-09",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "รสชาติของ \"น้ำตาล\" หรือ \"ขนมเค้ก\" 🍰 มีรสชาติอย่างไร?",
      "en": "How does sugar or birthday cake 🍰 taste to your tongue?",
      "zh": "尝一口甜甜的白糖或者生日蛋糕 🍰，舌头会感觉到什么味道？"
    },
    "illustration": "🍰 🍬 👅 😋",
    "illustrationSubtitle": {
      "th": "การรับรู้รสชาติด้วยลิ้น",
      "en": "Taste sweetness with tongue",
      "zh": "味觉探索：甜味"
    },
    "options": [
      {
        "id": "opt-sour",
        "label": {
          "th": "รสเปรี้ยวจี๊ด (เหมือนมะนาว)",
          "en": "Sour taste (like lemon)",
          "zh": "酸溜溜的酸味"
        },
        "icon": "🍋"
      },
      {
        "id": "opt-salty",
        "label": {
          "th": "รสเค็ม (เหมือนเกลือ)",
          "en": "Salty taste",
          "zh": "咸咸的咸味"
        },
        "icon": "🧂"
      },
      {
        "id": "opt-sweet",
        "label": {
          "th": "รสหวานชื่นใจ",
          "en": "Sweet taste",
          "zh": "甜丝丝的甜味"
        },
        "icon": "😋"
      }
    ],
    "correctOptionId": "opt-sweet",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ลิ้นของเราช่วยรับรส น้ำตาลและเค้กมีรสชาติหวานอร่อยจ้ะ",
      "en": "Awesome! Our tongue tastes sweet flavors from sugars and cakes!",
      "zh": "太棒了！小舌头尝出糖果和蛋糕是甜滋滋的！"
    }
  },
  {
    "id": "exp30-inq-k1-10",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "แม่เหล็ก 🧲 สามารถดูดติดกับสิ่งของชนิดใดได้?",
      "en": "Which object does a magnet 🧲 stick to and attract?",
      "zh": "红蓝两色的神奇磁铁 🧲 能够吸住哪种材质的小东西？"
    },
    "illustration": "🧲 ⚡ 📎 🪛 (เหล็ก)",
    "illustrationSubtitle": {
      "th": "แม่เหล็กดูดสิ่งของที่เป็นเหล็ก",
      "en": "Magnet attracts iron paperclips",
      "zh": "磁铁吸引铁制回形针"
    },
    "options": [
      {
        "id": "opt-clip",
        "label": {
          "th": "คลิปหนีบกระดาษโลหะเหล็ก",
          "en": "Metal iron paperclip",
          "zh": "铁制的金属回形针"
        },
        "icon": "📎"
      },
      {
        "id": "opt-wood",
        "label": {
          "th": "กิ่งไม้แห้ง",
          "en": "Wooden stick",
          "zh": "干燥的树枝小木棍"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-plastic",
        "label": {
          "th": "แก้วน้ำพลาสติก",
          "en": "Plastic cup",
          "zh": "塑料小杯子"
        },
        "icon": "🥤"
      }
    ],
    "correctOptionId": "opt-clip",
    "explanation": {
      "th": "เก่งที่สุด! แม่เหล็กมีแรงดึงดูดวัตถุที่ทำจากเหล็ก เช่น คลิปหนีบกระดาษหรือตะปูจ้า",
      "en": "Splendid! Magnets have magnetic force that attracts iron and metals!",
      "zh": "答得很棒！磁铁具有磁力，能牢牢吸住铁制的回形针和小铁钉！"
    }
  },
  {
    "id": "exp30-inq-k2-01",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "การลอยและการจม: วัตถุชิ้นใดเมื่อใส่ลงในอ่างน้ำจะ \"ลอยน้ำ\"? 🪵 🪨 🪛",
      "en": "Float vs Sink: Which object FLOATS on water surface? 🪵 🪨 🪛",
      "zh": "沉浮小实验：把下列物品放进水盆里，哪一个会“漂浮在水面”？🪵 🪨 🪛"
    },
    "illustration": "🪵 (ท่อนไม้ลอย) 🌊  VS  🪨 ⬇️ (ก้อนหินจม)",
    "illustrationSubtitle": {
      "th": "การทดลองลอยน้ำ-จมน้ำ",
      "en": "Wood floats on water surface",
      "zh": "小木块浮在水面上"
    },
    "options": [
      {
        "id": "opt-rock-sink",
        "label": {
          "th": "ก้อนหินหนาหนัก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Heavy stone",
          "zh": "沉甸甸的石头（沉）"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-wood-block",
        "label": {
          "th": "ท่อนไม้แห้งหรือลูกปิงปอง (ลอย)",
          "en": "Wooden block or ping-pong ball",
          "zh": "干燥的小木块或乒乓球（浮）"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-iron-coin",
        "label": {
          "th": "เหรียญบาทโลหะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Metal coin",
          "zh": "金属硬币（沉）"
        },
        "icon": "🪙"
      }
    ],
    "correctOptionId": "opt-wood-block",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ไม้มีความหนาแน่นน้อยกว่าน้ำ จึงลอยน้ำได้ ส่วนหินและเหรียญจะจมจ้ะ",
      "en": "Correct! Dry wood is less dense than water, so it floats cleanly on top!",
      "zh": "完全正确！干燥的木头密度比水小，所以能轻松漂在水面上！"
    }
  },
  {
    "id": "exp30-inq-k2-02",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สิ่งใดต่อไปนี้จำเป็นต่อการงอกของเมล็ดถั่วเขียวเป็นต้นกล้า? 🌱",
      "en": "What does a green mung bean seed 🌱 need to sprout into a seedling?",
      "zh": "一粒绿豆种子 🌱 要萌发破土长成小绿芽，最需要什么？"
    },
    "illustration": "🫘 ➡️ 💧 ☀️ 🌱 ✨",
    "illustrationSubtitle": {
      "th": "ปัจจัยการเจริญเติบโตของเมล็ดพืช",
      "en": "Seeds need water, air, and warmth",
      "zh": "种子萌发需要适量水分与空气"
    },
    "options": [
      {
        "id": "opt-ice-cream",
        "label": {
          "th": "น้ำเชื่อมไอศกรีม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Ice cream syrup",
          "zh": "浓浓的冰淇淋糖浆"
        },
        "icon": "🍦"
      },
      {
        "id": "opt-dark-freezer",
        "label": {
          "th": "แช่ในช่องแช่แข็งมืดสนิท",
          "en": "Total dark freezing frost",
          "zh": "绝对冰冻完全无空气"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-water-air",
        "label": {
          "th": "น้ำ อากาศ และความอบอุ่นที่พอเหมาะ",
          "en": "Water, air, and suitable warmth",
          "zh": "适量的水分、空气与适宜温暖"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-water-air",
    "explanation": {
      "th": "เก่งมากจ้ะ! เมล็ดพืชต้องอาศัยน้ำเพื่อดูดซึมให้เปลือกนุ่มและเริ่มงอกรากออกมาจ้า",
      "en": "Great job! Seeds absorb water to soften shells and sprout vigorous roots!",
      "zh": "真棒！绿豆吸饱了适量水分，胚芽破壳而出长出健康嫩根！"
    }
  },
  {
    "id": "exp30-inq-k2-03",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์กินพืช: สัตว์ชนิดใดในภาพกินหญ้าและใบไม้เป็นอาหารหลัก? 🐄 🦁 🐊",
      "en": "Herbivore: Which animal eats grass and green leaves as main food? 🐄 🦁 🐊",
      "zh": "食草动物探秘：下列哪一种动物以青草和绿树叶为主要食物？🐄 🦁 🐊"
    },
    "illustration": "🐄 🌾 🌿 🥛",
    "illustrationSubtitle": {
      "th": "สัตว์กินพืชเป็นอาหาร",
      "en": "Cows eat fresh meadow grass",
      "zh": "奶牛在草地上嚼食嫩青草"
    },
    "options": [
      {
        "id": "opt-cow",
        "label": {
          "th": "วัวนม (กินหญ้า)",
          "en": "Cow (Herbivore)",
          "zh": "奶牛（吃草食草动物）"
        },
        "icon": "🐄"
      },
      {
        "id": "opt-lion",
        "label": {
          "th": "สิงโตเจ้าป่า",
          "en": "Lion (Carnivore)",
          "zh": "威猛大狮子（肉食动物）"
        },
        "icon": "🦁"
      },
      {
        "id": "opt-croc",
        "label": {
          "th": "จระเข้",
          "en": "Crocodile",
          "zh": "大鳄鱼"
        },
        "icon": "🐊"
      }
    ],
    "correctOptionId": "opt-cow",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! วัว ควาย ม้า แกะ เป็นสัตว์กินพืช กินหญ้าเป็นอาหารจ้า",
      "en": "Awesome! Cows, horses, and sheep are herbivores that munch sweet grass!",
      "zh": "太棒了！奶牛是食草动物，专吃绿油油的草料，产出营养牛奶！"
    }
  },
  {
    "id": "exp30-inq-k2-04",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อแสงแดดส่องกระทบตัวเราในตอนกลางวัน จะเกิดอะไรขึ้นบนพื้นฝั่งตรงข้ามแสง? ☀️ 👤",
      "en": "When bright sunlight hits your body, what appears on the ground behind you? 👤",
      "zh": "当明亮的阳光照在小朋友身上时，背光的一侧地面上会出现什么？👤"
    },
    "illustration": "☀️ ➡️ 🧒 ➡️ 👤 (เงาสีดำบนพื้น)",
    "illustrationSubtitle": {
      "th": "การเกิดเงาจากแสงกระทบวัตถุทึบแสง",
      "en": "Light blocked casts dark shadow",
      "zh": "光线被不透明身体阻挡形成影子"
    },
    "options": [
      {
        "id": "opt-rainbow",
        "label": {
          "th": "สายรุ้งเจ็ดสี",
          "en": "Rainbow colors",
          "zh": "七彩斑斓色彩"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-shadow",
        "label": {
          "th": "เงาสีดำรูปตัวเรา",
          "en": "A dark shadow",
          "zh": "和自己形状一样的黑影子"
        },
        "icon": "👤"
      },
      {
        "id": "opt-firework",
        "label": {
          "th": "พลุไฟประกายแสง",
          "en": "Fireworks burst",
          "zh": "绚烂烟花"
        },
        "icon": "🎆"
      }
    ],
    "correctOptionId": "opt-shadow",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ร่างกายของเราเป็นวัตถุทึบแสง แสงส่องผ่านไม่ได้ จึงเกิดเป็นเงาทอดลงบนพื้นจ้ะ",
      "en": "Correct! Our opaque bodies block light rays, creating a matching shadow behind us!",
      "zh": "完全正确！身体挡住了光线前进的路线，在地面上投射出黑黑的影子！"
    }
  },
  {
    "id": "exp30-inq-k2-05",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เสียงเกิดจากอะไร? เวลาที่เราตีกลอง 🥁 แผ่นหน้ากลองจะมีลักษณะอย่างไร?",
      "en": "How is sound made? When we beat a drum 🥁, what does the drumhead do?",
      "zh": "声音是怎样产生的？当我们敲响大鼓时 🥁，鼓面会发生什么？"
    },
    "illustration": "🥁 〰️〰️ (สั่นสะเทือน) ➡️ 🎶 👂",
    "illustrationSubtitle": {
      "th": "การสั่นสะเทือนทำให้เกิดเสียง",
      "en": "Vibration produces sound waves",
      "zh": "物体振动产生动听声音"
    },
    "options": [
      {
        "id": "opt-melt",
        "label": {
          "th": "ละลายกลายเป็นไอ",
          "en": "Melts into liquid",
          "zh": "融化成水"
        },
        "icon": "💧"
      },
      {
        "id": "opt-freeze",
        "label": {
          "th": "แข็งตัวเป็นก้อนน้ำแข็ง",
          "en": "Freezes rock solid",
          "zh": "冻成冰块"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-vibrate",
        "label": {
          "th": "สั่นสะเทือนไปมาอย่างรวดเร็ว",
          "en": "Vibrates rapidly back and forth",
          "zh": "快速上下振动发声"
        },
        "icon": "〰️"
      }
    ],
    "correctOptionId": "opt-vibrate",
    "explanation": {
      "th": "เก่งกาจมาก! เสียงทุกเสียงเกิดจากการสั่นสะเทือน เมื่อเราตีกลอง หน้ากลองจะสั่นทำให้เกิดเสียงดนตรีจ้ะ",
      "en": "Brilliant! All sounds originate from vibrations vibrating air molecules into our ears!",
      "zh": "太聪明了！声音是由物体振动产生的，敲击鼓面引发空气振动传进耳朵！"
    }
  },
  {
    "id": "exp30-inq-k2-06",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "อากาศรอบตัวเรา 💨 ถึงแม้ตามองไม่เห็น แต่เรารู้ว่ามีอยู่จริงได้ด้วยวิธีใด?",
      "en": "Air is invisible 💨. How do we know it exists around us?",
      "zh": "我们看不见身边的空气 💨，但怎样可以证实空气确实真实存在？"
    },
    "illustration": "💨 🌬️ 🎈 (ลูกโป่งพองลม) 🪁 (ว่าวบิน)",
    "illustrationSubtitle": {
      "th": "คุณสมบัติของอากาศรอบตัว",
      "en": "Feel wind breeze and blow up balloons",
      "zh": "吹鼓气球、吹转风车、风吹树叶"
    },
    "options": [
      {
        "id": "opt-feel-wind",
        "label": {
          "th": "รู้สึกได้เมื่อมีลมพัดเย็น หรือเมื่อเป่าลูกโป่งให้พองโต",
          "en": "Feel breezy wind or blow into balloons",
          "zh": "微风拂面很凉爽，或者把空气吹进气球鼓起来"
        },
        "icon": "🎈"
      },
      {
        "id": "opt-eat-spoon",
        "label": {
          "th": "ใช้ช้อนตักอากาศใส่จานทาน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Scoop air with spoon into bowls",
          "zh": "拿勺子舀空气盛在盘子里"
        },
        "icon": "🥄"
      },
      {
        "id": "opt-paint-color",
        "label": {
          "th": "เอากระดาษทรายมาขัดอากาศ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sandpaper it",
          "zh": "用砂纸擦拭"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-feel-wind",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ลมคืออากาศที่เคลื่อนที่ และเมื่อเราเป่าลมเข้าลูกโป่ง ลูกโป่งก็จะขยายใหญ่ขึ้นพิสูจน์ว่ามีอากาศอยู่",
      "en": "Awesome! Wind is moving air, and inflated balloons clearly contain trapped air volume!",
      "zh": "太棒了！刮风就是空气在流动，吹胀的气球肚子里装的满满都是空气！"
    }
  },
  {
    "id": "exp30-inq-k2-07",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ลูกอ๊อดตัวน้อยว่ายน้ำมีหาง 🐟 เมื่อโตเต็มวัยจะสลัดหางและกลายเป็นสัตว์ชนิดใด?",
      "en": "Swimming tadpoles with tails 🐟 grow legs, lose tails, and transform into?",
      "zh": "小池塘里游水的小蝌蚪长大后缩掉尾巴长出四条腿，会变成什么？"
    },
    "illustration": "🥚 ➡️ 🐟 (ลูกอ๊อด) ➡️ 🐸 (กบเขียว)",
    "illustrationSubtitle": {
      "th": "วัฏจักรชีวิตของกบ",
      "en": "Tadpole transforms into adult frog",
      "zh": "小蝌蚪变成绿青蛙"
    },
    "options": [
      {
        "id": "opt-fish",
        "label": {
          "th": "ปลาฉลามยักษ์",
          "en": "Giant shark",
          "zh": "大鲨鱼"
        },
        "icon": "🦈"
      },
      {
        "id": "opt-frog",
        "label": {
          "th": "กบ (หรือเขียด)",
          "en": "Frog",
          "zh": "青蛙 / 树蛙 (Frog)"
        },
        "icon": "🐸"
      },
      {
        "id": "opt-duck",
        "label": {
          "th": "ลูกเป็ด",
          "en": "Duckling",
          "zh": "小鸭子"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt-frog",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ลูกอ๊อดจะค่อยๆ งอกขาหลัง ขาหน้า หางหดสั้นลง กลายเป็นกบที่กระโดดได้บนบกจ้ะ",
      "en": "Correct! Metamorphosis turns swimming tadpoles into leaping adult frogs!",
      "zh": "完全正确！小蝌蚪慢慢长出后腿前腿，尾巴褪去，蜕变成呱呱叫的小青蛙！"
    }
  },
  {
    "id": "exp30-inq-k2-08",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ผึ้งตัวน้อย 🐝 บินตอมดอกไม้เพื่อดูดกินสิ่งใด และช่วยผสมเกสรให้ดอกไม้?",
      "en": "What do bees 🐝 gather from blossoming flowers to make sweet honey?",
      "zh": "勤劳的小蜜蜂 🐝 在花丛中忙碌采食什么，顺便帮助花朵授粉？"
    },
    "illustration": "🐝 🌸 🍯 ✨",
    "illustrationSubtitle": {
      "th": "ผึ้งกับน้ำหวานจากดอกไม้",
      "en": "Bees drink nectar to make honey",
      "zh": "小蜜蜂采花蜜酿蜂蜜"
    },
    "options": [
      {
        "id": "opt-soil",
        "label": {
          "th": "ดินโคลนดำ",
          "en": "Mud and dirt",
          "zh": "地上的黑泥巴"
        },
        "icon": "🪱"
      },
      {
        "id": "opt-pebble",
        "label": {
          "th": "เศษก้อนกรวดหิน",
          "en": "Hard pebbles",
          "zh": "坚硬的小石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-nectar",
        "label": {
          "th": "น้ำหวานจากเกสรดอกไม้",
          "en": "Sweet flower nectar",
          "zh": "花蕊里的甘甜花蜜"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-nectar",
    "explanation": {
      "th": "เก่งมากจ้ะ! ผึ้งดูดน้ำหวานจากดอกไม้กลับไปสร้างรังและทำน้ำผึ้งแสนหวานจ้า",
      "en": "Great job! Honeybees drink sugary nectar and carry pollen to make delicious honey!",
      "zh": "真棒！小蜜蜂采摘花蜜酿造成香甜蜂蜜，同时帮植物传花粉结出累累硕果！"
    }
  },
  {
    "id": "exp30-inq-k2-09",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "หลอดทดลองผสมสี: สีแดง 🔴 ผสมกับ สีเหลือง 🟡 จะได้สีใหม่คือสีอะไร?",
      "en": "Color mixing inquiry: Red 🔴 + Yellow 🟡 creates which new color?",
      "zh": "色彩探索实验：红色水彩 🔴 加上 黄色水彩 🟡 搅拌均匀，会变出什么新颜色？"
    },
    "illustration": "🔴  +  🟡  =  ❓",
    "illustrationSubtitle": {
      "th": "แม่สีและการผสมสีขั้นที่สอง",
      "en": "Primary color mixing creates orange",
      "zh": "红黄相混得到橙色"
    },
    "options": [
      {
        "id": "opt-orange",
        "label": {
          "th": "สีส้ม 🟠",
          "en": "Orange 🟠",
          "zh": "橙色 / 橘色 🟠"
        },
        "icon": "🟠"
      },
      {
        "id": "opt-black",
        "label": {
          "th": "สีดำสนิท",
          "en": "Black",
          "zh": "黑漆漆的黑色"
        },
        "icon": "⚫"
      },
      {
        "id": "opt-white",
        "label": {
          "th": "สีขาวบริสุทธิ์",
          "en": "Pure white",
          "zh": "白色"
        },
        "icon": "⚪"
      }
    ],
    "correctOptionId": "opt-orange",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! สีแดงผสมกับสีเหลืองจะกลายเป็น สีส้ม แสนสดใสเหมือนผลส้มเลยจ้ะ",
      "en": "Awesome! Blending primary red and yellow creates vibrant secondary orange!",
      "zh": "太棒了！红色与黄色交融混和，立刻魔术般变成明快亮丽的橙色！"
    }
  },
  {
    "id": "exp30-inq-k2-10",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ในเวลากลางคืน 🌙 บนท้องฟ้ามืดมิด เราจะมองเห็นวัตถุธรรมชาติใดส่องแสง?",
      "en": "At night 🌙 in the dark sky, what natural celestial bodies shine down on us?",
      "zh": "夜幕降临的黑夜天空中 🌙，我们可以看见哪种大自然天体在闪闪发光？"
    },
    "illustration": "🌙 ⭐️ 🌟 🌌",
    "illustrationSubtitle": {
      "th": "ท้องฟ้ายามราตรี ดวงจันทร์และดวงดาว",
      "en": "Moon and stars illuminate the night sky",
      "zh": "夜空中的明月与繁星"
    },
    "options": [
      {
        "id": "opt-bright-sun",
        "label": {
          "th": "ดวงอาทิตย์จ้า",
          "en": "Blazing bright Sun",
          "zh": "金光刺眼的太阳"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-moon-stars",
        "label": {
          "th": "ดวงจันทร์และดวงดาวระยิบระยับ",
          "en": "The Moon and glittering stars",
          "zh": "明亮的月亮和闪烁的星星"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-rainbow",
        "label": {
          "th": "สายรุ้งกลางคืน",
          "en": "Midnight rainbow",
          "zh": "大彩虹"
        },
        "icon": "🌈"
      }
    ],
    "correctOptionId": "opt-moon-stars",
    "explanation": {
      "th": "เก่งที่สุด! ตอนกลางคืนพระอาทิตย์ลับขอบฟ้า ท้องฟ้ามืดลง เราจะเห็นดวงจันทร์และดวงดาวจ้ะ",
      "en": "Splendid! After sunset, the night sky is decorated by the Moon and distant stars!",
      "zh": "回答精彩！夜晚太阳落山后，月亮阿姨和漫天繁星照亮梦幻夜空！"
    }
  },
  {
    "id": "exp30-inq-k3-01",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "วัฏจักรชีวิตของผีเสื้อ 🦋: เรียงลำดับขั้นตอนการเจริญเติบโตให้ถูกต้อง?",
      "en": "Life cycle of butterfly 🦋: What is the correct developmental sequence?",
      "zh": "美丽蝴蝶的生命周期 🦋：正确的发展蜕变阶段顺序是？"
    },
    "illustration": "🥚 (ไข่) ➡️ 🐛 (หนอน) ➡️ 🥥 (ดักแด้) ➡️ 🦋 (ผีเสื้อ)",
    "illustrationSubtitle": {
      "th": "วัฏจักรชีวิตการแปรสัณฐานของผีเสื้อ",
      "en": "Egg -> Caterpillar -> Chrysalis -> Butterfly",
      "zh": "卵 ➡️ 毛毛虫 ➡️ 蛹 ➡️ 蝴蝶"
    },
    "options": [
      {
        "id": "opt-fly-first",
        "label": {
          "th": "ผีเสื้อ ➡️ ไข่ ➡️ ผีเสื้อทันที",
          "en": "Butterfly directly to butterfly",
          "zh": "直接从蛹变出毛毛虫"
        },
        "icon": "🐛"
      },
      {
        "id": "opt-wrong-order",
        "label": {
          "th": "ดักแด้ ➡️ ไข่ ➡️ หนอน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Chrysalis -> Egg -> Worm",
          "zh": "蛹 ➡️ 卵 ➡️ 毛虫"
        },
        "icon": "🔄"
      },
      {
        "id": "opt-egg-cat-chrys-fly",
        "label": {
          "th": "ไข่ ➡️ หนอนผีเสื้อ ➡️ ดักแด้ ➡️ ผีเสื้อปีกสวย",
          "en": "Egg -> Caterpillar -> Chrysalis -> Butterfly",
          "zh": "卵 ➡️ 毛毛虫 ➡️ 坚固的蛹 ➡️ 美丽的蝴蝶"
        },
        "icon": "🦋"
      }
    ],
    "correctOptionId": "opt-egg-cat-chrys-fly",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! ผีเสื้อเริ่มต้นจากฟองไข่บนใบไม้ กลายเป็นหนอนกินใบ เข้าดักแด้ แล้วกางปีกเป็นผีเสื้อ",
      "en": "Spot on! The complete metamorphosis: Egg to Leaf-eating Caterpillar to Chrysalis to Butterfly!",
      "zh": "精彩！完全变态发育过程：卵孵出毛毛虫，结成坚固的蛹，破茧化蝶翩翩起舞！"
    }
  },
  {
    "id": "exp30-inq-k3-02",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "วัฏจักรน้ำ: น้ำในแม่น้ำเมื่อได้รับความร้อนจากดวงอาทิตย์ ☀️ จะระเหยกลายเป็นไอ ลอยขึ้นไปรวมตัวเป็นอะไรบนฟ้า?",
      "en": "Water cycle: River water warmed by sunlight ☀️ evaporates into vapor and gathers into?",
      "zh": "水循环探秘：地面的河水被太阳照热 ☀️ 蒸发上升到高空，凝结汇聚成什么？"
    },
    "illustration": "🌊 ➡️ ☀️ ➡️ ☁️ ☁️ ➡️ 🌧️ 🌧️",
    "illustrationSubtitle": {
      "th": "การระเหยและการเกิดก้อนเมฆและฝน",
      "en": "Evaporation into clouds then rainfall",
      "zh": "水分蒸发成白云，积聚化作雨水降落"
    },
    "options": [
      {
        "id": "opt-clouds",
        "label": {
          "th": "ก้อนเมฆ (แล้วควบแน่นตกลงมาเป็นฝน)",
          "en": "Clouds (condensing into rain)",
          "zh": "天上的白云（越聚越重化作雨滴）"
        },
        "icon": "☁️"
      },
      {
        "id": "opt-rocks",
        "label": {
          "th": "ก้อนหินลอยได้ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Floating rocks",
          "zh": "漂浮的岩石"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-fire",
        "label": {
          "th": "ดวงดาวไฟ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Star fires",
          "zh": "火焰球"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-clouds",
    "explanation": {
      "th": "เก่งกาจมาก! ไอน้ำลอยสูงขึ้นกระทบความเย็นจนรวมตัวเป็นก้อนเมฆ เมื่อหนาแน่นหนักขึ้นจะตกลงมาเป็นหยดน้ำฝน",
      "en": "Brilliant! Warm water vapor condenses in cool air into clouds, falling as refreshing rain!",
      "zh": "太聪明了！地面水分受热蒸发升空遇冷，凝结成绵密云朵，积厚便成为降雨回到大地！"
    }
  },
  {
    "id": "exp30-inq-k3-03",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "สถานะของสสาร: \"น้ำแข็ง (ของแข็ง)\", \"น้ำดื่ม (ของเหลว)\" และ \"ไอน้ำพุ่งจากกาต้มน้ำ\" เป็นสถานะใด?",
      "en": "States of matter: Ice is solid, water is liquid, and steam pouring from a kettle is?",
      "zh": "物质的三态：冰块是固体，泉水是液体，从水壶嘴冒出腾腾白气属于什么状态？"
    },
    "illustration": "🧊 (ของแข็ง) ➡️ 💧 (ของเหลว) ➡️ 💨 (แก๊ส/ไอ)",
    "illustrationSubtitle": {
      "th": "สามสถานะของน้ำ: ของแข็ง ของเหลว แก๊ส",
      "en": "Three states of water: Solid, Liquid, Gas",
      "zh": "固态、液态、气态的奇妙转化"
    },
    "options": [
      {
        "id": "opt-solid",
        "label": {
          "th": "ของแข็ง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Solid",
          "zh": "固体"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-gas",
        "label": {
          "th": "แก๊ส (หรือก๊าซ / ไอระเหย)",
          "en": "Gas / Vapor",
          "zh": "气态 / 气体 (Gas)"
        },
        "icon": "💨"
      },
      {
        "id": "opt-metal",
        "label": {
          "th": "โลหะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Metal",
          "zh": "金属硬质"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-gas",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! น้ำสามารถเปลี่ยนได้ 3 สถานะ คือ ของแข็ง (น้ำแข็ง), ของเหลว (น้ำ), และแก๊ส (ไอน้ำ)",
      "en": "Correct! Water transforms across 3 fundamental states: Solid (Ice), Liquid (Water), and Gas (Steam)!",
      "zh": "完全正确！水拥有神奇的三态变化：冰（固态）、水（液态）、水蒸气（气态）！"
    }
  },
  {
    "id": "exp30-inq-k3-04",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การสังเคราะห์ด้วยแสง: พืชใช้ส่วนสีเขียวของ \"ใบ\" 🍃 ร่วมกับสิ่งใดในการปรุงอาหาร?",
      "en": "Photosynthesis: Green leaves 🍃 use chlorophyll alongside what to cook plant food?",
      "zh": "光合作用小知识：植物绿油油的叶子 🍃 利用叶绿素加上什么神奇能量来制造养分？"
    },
    "illustration": "🍃 ➕ ☀️ (แสงแดด) ➕ 💧 (น้ำ) ➡️ 🍎 (อาหารพืช)",
    "illustrationSubtitle": {
      "th": "พืชสร้างอาหารด้วยแสงแดด น้ำ และอากาศ",
      "en": "Plants produce food via sunlight and water",
      "zh": "吸收阳光、水分和二氧化碳制造养分"
    },
    "options": [
      {
        "id": "opt-chips-soda",
        "label": {
          "th": "มันฝรั่งทอดและน้ำอัดลม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Potato chips and soda",
          "zh": "薯片和可乐"
        },
        "icon": "🍟"
      },
      {
        "id": "opt-flashlight",
        "label": {
          "th": "ไฟฉายแบตเตอรี่ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Flashlight batteries",
          "zh": "手电筒电池"
        },
        "icon": "🔦"
      },
      {
        "id": "opt-sun-water",
        "label": {
          "th": "แสงแดด น้ำ และก๊าซคาร์บอนไดออกไซด์ในอากาศ",
          "en": "Sunlight, water & carbon dioxide",
          "zh": "阳光的照射、泥土水分与空气"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-sun-water",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! พืชใช้แสงแดด น้ำ และอากาศในการสร้างอาหาร เลี้ยงลำต้น ดอก และผลจ้ะ",
      "en": "Awesome! Photosynthesis utilizes sunlight, water, and air to generate plant nutrients and oxygen!",
      "zh": "太棒了！绿叶就像微型厨房，吸收阳光能量、水分与二氧化碳合成植物营养并释放氧气！"
    }
  },
  {
    "id": "exp30-inq-k3-05",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ระบบสุริยะจักรวาล: โลกของเรา 🌍 และดาวเคราะห์ต่างๆ โคจรรอบดาวดวงใหญ่ดวงใดที่เป็นศูนย์กลาง?",
      "en": "Solar System: Planet Earth 🌍 and other planets orbit around which central star?",
      "zh": "太阳系探索：我们居住的地球 🌍 与其它行星，围绕着哪一颗核心恒星公转？"
    },
    "illustration": "☀️ (ศูนย์กลาง) 🔄 🌍 🪐 🚀",
    "illustrationSubtitle": {
      "th": "ดวงอาทิตย์เป็นศูนย์กลางของระบบสุริยะ",
      "en": "Sun is center of our solar system",
      "zh": "太阳系八大行星绕着太阳运转"
    },
    "options": [
      {
        "id": "opt-sun-center",
        "label": {
          "th": "ดวงอาทิตย์ (The Sun)",
          "en": "The Sun",
          "zh": "巨大的太阳 (The Sun)"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-moon-center",
        "label": {
          "th": "ดวงจันทร์",
          "en": "The Moon",
          "zh": "月球"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-airplane",
        "label": {
          "th": "เครื่องบินไอพ่น",
          "en": "Jet airplane",
          "zh": "喷气式客机"
        },
        "icon": "✈️"
      }
    ],
    "correctOptionId": "opt-sun-center",
    "explanation": {
      "th": "เก่งกาจมาก! ดวงอาทิตย์เป็นดาวฤกษ์ดวงใหญ่ตรงกลาง โลกและดาวเคราะห์ดวงอื่นโคจรรอบดวงอาทิตย์จ้า",
      "en": "Brilliant! The Sun is the central star around which Earth and all solar planets orbit!",
      "zh": "太聪明了！太阳是太阳系的核心恒星，强大的引力让地球等行星稳定环绕它运转！"
    }
  },
  {
    "id": "exp30-inq-k3-06",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การเกิดกลางวัน-กลางคืน: ทำไมจึงมีกลางวันและกลางคืนสลับกันตลอดเวลา?",
      "en": "Day and Night: Why do daytime and nighttime alternate continuously?",
      "zh": "昼夜交替成因：为什么世界上会日复一日有白天与黑夜规律交替？"
    },
    "illustration": "☀️ ➡️ 🌍 🔄 (โลกหมุนรอบตัวเอง)",
    "illustrationSubtitle": {
      "th": "โลกหมุนรอบตัวเองครบ 1 รอบใน 24 ชั่วโมง",
      "en": "Earth rotates on its axis every 24 hours",
      "zh": "地球不停自转，面向太阳为白昼，背光为黑夜"
    },
    "options": [
      {
        "id": "opt-sun-sleeps",
        "label": {
          "th": "พระอาทิตย์หลับตาพักผ่อนตอนเย็น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sun closes eyes to sleep",
          "zh": "太阳爷爷闭上眼睛睡觉"
        },
        "icon": "😴"
      },
      {
        "id": "opt-earth-spin",
        "label": {
          "th": "โลกหมุนรอบตัวเอง ด้านที่หันรับแสงอาทิตย์เป็นกลางวัน",
          "en": "Earth rotates on its axis facing/away from Sun",
          "zh": "地球在自转，面对太阳的面是白天，背向太阳是黑夜"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-blanket-sky",
        "label": {
          "th": "มีผ้าห่มสีดำคลุมท้องฟ้าไว้ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Giant black blanket covers sky",
          "zh": "巨大的黑毯子盖住了天空"
        },
        "icon": "🛏️"
      }
    ],
    "correctOptionId": "opt-earth-spin",
    "explanation": {
      "th": "ถูกต้องที่สุด! โลกหมุนรอบตัวเอง ซีกโลกที่หันเข้าหาดวงอาทิตย์เป็นกลางวัน ส่วนอีกซีกเป็นกลางคืนจ้ะ",
      "en": "Correct! Earth’s 24-hour axial rotation brings alternating sunlight (day) and shadow (night)!",
      "zh": "完全正确！地球自转一圈是24小时，迎着太阳的一面是阳光白昼，背光的一面是静谧黑夜！"
    }
  },
  {
    "id": "exp30-inq-k3-07",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "คุณสมบัติของแม่เหล็ก: ขั้วเหนือ (N) 🔴 กับ ขั้วเหนือ (N) 🔴 ของแม่เหล็ก 2 แท่งเมื่อนำมาใกล้กันจะเป็นอย่างไร?",
      "en": "Magnetic poles: Two North (N) poles 🔴 brought close together will?",
      "zh": "磁极同极与异极小定律：两块磁铁的北极（N）与北极（N）相互靠近，会发生什么？"
    },
    "illustration": "🧲 [N] ⬅️ 💥 ➡️ [N] 🧲 (ผลักกัน)",
    "illustrationSubtitle": {
      "th": "ขั้วเหมือนกันผลักกัน ขั้วต่างกันดูดกัน",
      "en": "Like poles repel, opposite poles attract",
      "zh": "同名磁极相斥，异名磁极相吸"
    },
    "options": [
      {
        "id": "opt-attract",
        "label": {
          "th": "ดูดติดกันแน่นทันที โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stick tightly together",
          "zh": "紧紧吸附在一起"
        },
        "icon": "🧲"
      },
      {
        "id": "opt-melt-fire",
        "label": {
          "th": "เกิดไฟลุกไหม้ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Burst into flames",
          "zh": "冒烟起火"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-repel",
        "label": {
          "th": "ผลักออกจากกัน (ขั้วเหมือนกันจะผลักกัน)",
          "en": "Repel away from each other",
          "zh": "互相排斥推开（同极相斥）"
        },
        "icon": "↔️"
      }
    ],
    "correctOptionId": "opt-repel",
    "explanation": {
      "th": "เก่งกาจมาก! กฎของแม่เหล็ก: ขั้วเหมือนกัน (N กับ N หรือ S กับ S) จะผลักกัน ส่วนขั้วต่างกันจะดูดกันจ้า",
      "en": "Brilliant! Like magnetic poles (N-N or S-S) push apart/repel, while opposites attract!",
      "zh": "太聪明了！磁铁基本定律：“同性相斥，异性相吸”，两个相同的北极会有一股力道向外推开！"
    }
  },
  {
    "id": "exp30-inq-k3-08",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เครื่องมือทางวิทยาศาสตร์: ถ้าต้องการส่องดูสิ่งมีชีวิตขนาดเล็กจิ๋วที่มองด้วยตาเปล่าไม่เห็น ควรใช้เครื่องมือใด?",
      "en": "Scientific tools: To observe tiny microscopic creatures invisible to bare eyes, which tool is used?",
      "zh": "科学探索仪器：想要观察肉眼看不清的超微小微生物或花粉微粒，应该使用哪种仪器？"
    },
    "illustration": "🔬 🦠 🧫 ✨",
    "illustrationSubtitle": {
      "th": "กล้องจุลทรรศน์ขยายภาพวัตถุขนาดเล็ก",
      "en": "Microscope reveals microscopic wonders",
      "zh": "显微镜放大微观世界"
    },
    "options": [
      {
        "id": "opt-microscope",
        "label": {
          "th": "กล้องจุลทรรศน์ (Microscope)",
          "en": "Microscope",
          "zh": "显微镜 (Microscope)"
        },
        "icon": "🔬"
      },
      {
        "id": "opt-telescope",
        "label": {
          "th": "กล้องส่องทางไกลดูดาว",
          "en": "Astronomy telescope",
          "zh": "天文望远镜"
        },
        "icon": "🔭"
      },
      {
        "id": "opt-sunglasses",
        "label": {
          "th": "แว่นกันแดดสีดำ",
          "en": "Sunglasses",
          "zh": "遮光太阳镜"
        },
        "icon": "🕶️"
      }
    ],
    "correctOptionId": "opt-microscope",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! กล้องจุลทรรศน์มีเลนส์ขยายพิเศษ ช่วยให้มองเห็นเซลล์และสิ่งมีชีวิตจิ๋วได้ชัดเจนแจ่มแจ้ง",
      "en": "Awesome! A microscope magnifies microscopic cells and specimens by hundreds of times!",
      "zh": "太棒了！显微镜的高倍放大镜片能将微小细胞放大成百上千倍，带领我们看清微观奥秘！"
    }
  },
  {
    "id": "exp30-inq-k3-09",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การรักษาสิ่งแวดล้อม: ขยะอินทรีย์ เช่น เปลือกกล้วย 🍌 และเศษผัก 🥬 สามารถนำไปแปรรูปเป็นสิ่งใดที่มีประโยชน์มาก?",
      "en": "Eco inquiry: Organic kitchen waste like banana peels 🍌 & veggie scraps can be composted into?",
      "zh": "环保科学：香蕉皮 🍌 与果皮菜叶等厨余垃圾，经过发酵分解后可以变成什么有益之宝？"
    },
    "illustration": "🍌 🥬 ➡️ 🪱 🍂 ➡️ 🪴 (ปุ๋ยหมักบำรุงดิน)",
    "illustrationSubtitle": {
      "th": "การทำปุ๋ยหมักอินทรีย์จากเศษอาหาร",
      "en": "Organic composting feeds garden soil",
      "zh": "制作有机堆肥，肥沃泥土滋养植物"
    },
    "options": [
      {
        "id": "opt-plastic-bottle",
        "label": {
          "th": "ขวดพลาสติกสังเคราะห์ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Plastic drinking bottles",
          "zh": "塑料水瓶"
        },
        "icon": "🧴"
      },
      {
        "id": "opt-compost",
        "label": {
          "th": "ปุ๋ยหมักอินทรีย์บำรุงต้นไม้ให้เจริญเติบโต",
          "en": "Organic compost to nourish plants",
          "zh": "天然有机堆肥，让花草蔬菜长得更壮"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-metal-car",
        "label": {
          "th": "แผ่นเหล็กรถยนต์ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sheet metal",
          "zh": "钢铁汽车外壳"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-compost",
    "explanation": {
      "th": "ถูกต้องที่สุด! เศษผักและผลไม้สามารถย่อยสลายกลายเป็นปุ๋ยหมักธรรมชาติ ช่วยให้ดินอุดมสมบูรณ์และลดขยะ",
      "en": "Correct! Composting organic waste creates nutrient-rich soil fertilizer while reducing landfill trash!",
      "zh": "完全正确！果皮菜叶被微生物自然分解成营养堆肥，改良土壤滋养植物，环保又健康！"
    }
  },
  {
    "id": "exp30-inq-k3-10",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การทดลองแรงลอยตัวของไข่ไก่ 🥚: เมื่อเติม \"เกลือ\" 🧂 ลงไปในน้ำเปล่ามากๆ จะเกิดอะไรขึ้นกับไข่ไก่?",
      "en": "Saltwater density experiment: If you stir lots of SALT 🧂 into water, what happens to the egg 🥚?",
      "zh": "密度沉浮实验：往清水杯中加入很多食盐 🧂 搅拌融化后，沉底的生鸡蛋 🥚 会怎样？"
    },
    "illustration": "🥛 (น้ำเกลือเข้มข้น) 🧂 ➡️ 🥚 ⬆️ (ไข่ลอยขึ้นมา)",
    "illustrationSubtitle": {
      "th": "น้ำเกลือมีความหนาแน่นสูงพยุงไข่ให้ลอย",
      "en": "Salt increases water density floating the egg",
      "zh": "盐水密度变大，把沉重鸡蛋托浮起来"
    },
    "options": [
      {
        "id": "opt-egg-explodes",
        "label": {
          "th": "ไข่ไก่จะระเบิดแตกเป็นเสี่ยงๆ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Egg explodes loudly",
          "zh": "鸡蛋砰地一声爆炸了"
        },
        "icon": "💥"
      },
      {
        "id": "opt-egg-disappears",
        "label": {
          "th": "ไข่ไก่จะหายวับไปกับตา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Egg completely vanishes",
          "zh": "鸡蛋凭空消失不见"
        },
        "icon": "🫥"
      },
      {
        "id": "opt-egg-floats",
        "label": {
          "th": "ไข่ไก่จะลอยตัวขึ้นสู่ผิวน้ำ เพราะน้ำเกลือมีความหนาแน่นสูง",
          "en": "The egg floats up due to high saltwater density",
          "zh": "生鸡蛋从水底慢慢浮上来，因为盐水浮力变大了"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-egg-floats",
    "explanation": {
      "th": "สุดยอดนักวิทยาศาสตร์น้อย! เกลือทำให้น้ำมีความหนาแน่นมากกว่าไข่ไก่ จึงเกิดแรงพยุงให้ไข่ไก่ลอยขึ้นมาได้จ้า",
      "en": "Splendid young scientist! Dissolving salt increases water density above the egg’s density, making it float!",
      "zh": "太了不起了！水中融化大量盐分让液体密度显著提高，浮力大增把鸡蛋托到了水面！"
    }
  }
];
