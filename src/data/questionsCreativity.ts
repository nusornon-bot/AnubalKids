import { Question } from '../types';

/**
 * คลังแบบทดสอบ: จินตนาการและความคิดสร้างสรรค์ (Creativity) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_CREATIVITY: Question[] = [
  {
    "id": "k1-cre-e1",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เมื่อนำสีไม้หรือสีเทียนมาระบายภาพ \"ผลส้มแสนอร่อย\" 🍊 ควรเลือกใช้สีใด?",
      "en": "When coloring a yummy ORANGE 🍊, which crayon color should you choose?",
      "zh": "给可口多汁的香橙 🍊 涂颜色时，应该挑选哪一种色彩？"
    },
    "illustration": "🍊 🖍️ 🍊",
    "illustrationSubtitle": {
      "th": "การเลือกสีตามธรรมชาติของวัตถุ",
      "en": "Coloring an orange: Orange color",
      "zh": "物体的固有色：橙色"
    },
    "options": [
      {
        "id": "opt-k1-cre-e1-1",
        "label": {
          "th": "สีส้ม 🍊",
          "en": "Orange color",
          "zh": "活力橙色 🍊"
        },
        "icon": "🍊"
      },
      {
        "id": "opt-k1-cre-e1-2",
        "label": {
          "th": "สีดำสนิท",
          "en": "Pure black",
          "zh": "漆黑色"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k1-cre-e1-3",
        "label": {
          "th": "สีขาวโพลน",
          "en": "Pure white",
          "zh": "纯白色"
        },
        "icon": "⬜"
      }
    ],
    "correctOptionId": "opt-k1-cre-e1-1",
    "explanation": {
      "th": "ผลส้มสุกมีสีส้มสดใส ชวนรับประทาน เก่งมากครับ!",
      "en": "Correct! Oranges are bright orange.",
      "zh": "答对了！熟透的橙子是橙色的。"
    }
  },
  {
    "id": "k1-cre-e2",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เมื่อหนูได้ยินเสียงเพลงจังหวะสนุกสนานคึกคัก 🎶 ร่างกายของหนูอยากทำสิ่งใด?",
      "en": "When you hear happy, lively music 🎶, what does your body want to do?",
      "zh": "当听到节奏欢快明朗的儿歌音乐 🎶 时，你的身体最想做什么？"
    },
    "illustration": "🎶 💃 🕺",
    "illustrationSubtitle": {
      "th": "การเคลื่อนไหวร่างกายตามจังหวะดนตรี",
      "en": "Move and dance to rhythm",
      "zh": "随音乐欢快起舞"
    },
    "options": [
      {
        "id": "opt-k1-cre-e2-1",
        "label": {
          "th": "นอนหลับนิ่งๆ",
          "en": "Lie still and sleep",
          "zh": "一动不动倒头大睡"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k1-cre-e2-2",
        "label": {
          "th": "โยกตัว ปรบมือ และเต้นรำตามจังหวะ 💃",
          "en": "Sway, clap hands, and dance along",
          "zh": "跟着欢快的节拍摇摆身体、拍手跳舞 💃"
        },
        "icon": "💃"
      },
      {
        "id": "opt-k1-cre-e2-3",
        "label": {
          "th": "นั่งร้องไห้เสียใจ",
          "en": "Sit and weep",
          "zh": "坐在角落里伤心哭泣"
        },
        "icon": "😭"
      }
    ],
    "correctOptionId": "opt-k1-cre-e2-2",
    "explanation": {
      "th": "ดนตรีทำให้เรามีความสุขและอยากขยับร่างกายเต้นรำ เก่งมากครับ!",
      "en": "Right! Upbeat music inspires dancing and joyful movement.",
      "zh": "答对啦！听着欢快音乐跳舞能让人身心愉悦。"
    }
  },
  {
    "id": "k1-cre-e3",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เครื่องดนตรีชนิดใดที่ใช้ \"มือหรือไม้ตี\" เพื่อให้เกิดเสียงจังหวะ ตึงๆ? 🥁",
      "en": "Which instrument do you BEAT with hands or sticks to make rhythmic boom sounds? 🥁",
      "zh": "哪一种打击乐器是用“鼓槌或双手拍打”发出咚咚咚的铿锵节奏声的？🥁"
    },
    "illustration": "🥁 🎶 🥁",
    "illustrationSubtitle": {
      "th": "เครื่องดนตรีประเภทตี: กลอง",
      "en": "Percussion: Drum",
      "zh": "打击乐器：大鼓小鼓"
    },
    "options": [
      {
        "id": "opt-k1-cre-e3-1",
        "label": {
          "th": "เปียโนกดคีย์",
          "en": "Piano",
          "zh": "钢琴"
        },
        "icon": "🎹"
      },
      {
        "id": "opt-k1-cre-e3-2",
        "label": {
          "th": "ขลุ่ยเป่า",
          "en": "Flute",
          "zh": "竹笛"
        },
        "icon": "🪈"
      },
      {
        "id": "opt-k1-cre-e3-3",
        "label": {
          "th": "กลอง 🥁",
          "en": "Drum",
          "zh": "鼓 🥁"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt-k1-cre-e3-3",
    "explanation": {
      "th": "กลองเป็นเครื่องดนตรีประเภทตี ให้จังหวะที่สนุกสนาน เก่งมากครับ!",
      "en": "Awesome! Drums are percussion instruments played by striking.",
      "zh": "太棒了！鼓是通过敲击发声的打击乐器。"
    }
  },
  {
    "id": "k1-cre-e4",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "อุปกรณ์ชนิดใดที่เด็กๆ ใช้สำหรับ \"ปั้นเป็นรูปสัตว์ ดอกไม้ หรือผลไม้\" ตามจินตนาการ? 🟤",
      "en": "What colorful material do kids knead and SHAPE into animals and flowers? 🟤",
      "zh": "小朋友们最喜欢用哪种色彩缤纷、软绵绵有弹性的手工材料来“捏小动物和小点心”？🟤"
    },
    "illustration": "🟤 🖐️ 🐘",
    "illustrationSubtitle": {
      "th": "งานปั้น: ดินน้ำมันหรือแป้งโดว์",
      "en": "Modeling clay / Playdough",
      "zh": "手工泥塑：橡皮泥与彩泥"
    },
    "options": [
      {
        "id": "opt-k1-cre-e4-1",
        "label": {
          "th": "ดินน้ำมัน หรือ แป้งโดว์ 🟤",
          "en": "Modeling clay or Playdough",
          "zh": "环保橡皮泥 / 彩泥面团 🟤"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k1-cre-e4-2",
        "label": {
          "th": "ก้อนหินแข็งเป๊ก",
          "en": "Hard stones",
          "zh": "坚硬冰冷的石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-cre-e4-3",
        "label": {
          "th": "แผ่นกระจกแตก",
          "en": "Broken glass",
          "zh": "锋利碎玻璃"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-cre-e4-1",
    "explanation": {
      "th": "ดินน้ำมันและแป้งโดว์นิ่ม ปั้นเป็นรูปทรงต่างๆ ได้ตามใจชอบ เก่งมากครับ!",
      "en": "Spot on! Modeling clay is wonderfully pliable for sculpting.",
      "zh": "答对了！橡皮泥柔软好捏，最适合创意捏塑。"
    }
  },
  {
    "id": "k1-cre-e5",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ถ้าหนูอยากวาดภาพ \"ต้นไม้ที่มีใบไม้เขียวชอุ่ม\" 🌳 ควรเลือกใช้สีใดระบายพุ่มใบไม้?",
      "en": "To draw a lush green tree 🌳, which color crayon should you use for the leaves?",
      "zh": "画一棵枝繁叶茂的大树 🌳 时，应该选哪种生机勃勃的颜色给树冠涂色？"
    },
    "illustration": "🌳 🖍️ 🌳",
    "illustrationSubtitle": {
      "th": "การเลือกสีเขียวสำหรับใบไม้",
      "en": "Lush leaves: Green color",
      "zh": "树叶的天然色彩：绿色"
    },
    "options": [
      {
        "id": "opt-k1-cre-e5-1",
        "label": {
          "th": "สีม่วงเข้ม",
          "en": "Dark purple",
          "zh": "深紫色"
        },
        "icon": "🟣"
      },
      {
        "id": "opt-k1-cre-e5-2",
        "label": {
          "th": "สีเขียว 🌿",
          "en": "Green color",
          "zh": "郁郁葱葱的绿色 🌿"
        },
        "icon": "🌿"
      },
      {
        "id": "opt-k1-cre-e5-3",
        "label": {
          "th": "สีชมพูแปร๋น",
          "en": "Hot pink",
          "zh": "荧光粉红色"
        },
        "icon": "💖"
      }
    ],
    "correctOptionId": "opt-k1-cre-e5-2",
    "explanation": {
      "th": "ใบไม้ส่วนใหญ่มีสีเขียวสดใส สวยงามมากครับ!",
      "en": "Correct! Leaves in nature are lush green.",
      "zh": "答对啦！大树的树叶主要是翠绿色的。"
    }
  },
  {
    "id": "k1-cre-e6",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ในการแสดงบทบาทสมมติเป็น \"กระต่ายน้อยน่ารัก\" 🐇 ท่าทางที่ควรทำคือข้อใด?",
      "en": "Roleplaying as a cute little RABBIT 🐇: What movement should you act out?",
      "zh": "在趣味情景表演中模仿扮演活泼可爱的“小兔子” 🐇 时，最逼真的肢体动作是？"
    },
    "illustration": "🐇 🐾 🐇",
    "illustrationSubtitle": {
      "th": "การแสดงท่าทางเลียนแบบสัตว์: กระต่าย",
      "en": "Pretend play: Bunny hops",
      "zh": "动作模仿：小兔子蹦蹦跳"
    },
    "options": [
      {
        "id": "opt-k1-cre-e6-1",
        "label": {
          "th": "กางปีกบินสูงเหมือนนกอินทรี",
          "en": "Soar like an eagle",
          "zh": "张开双臂学雄鹰高飞盘旋"
        },
        "icon": "🦅"
      },
      {
        "id": "opt-k1-cre-e6-2",
        "label": {
          "th": "ลงไปนอนคลานเลื้อยเหมือนงู",
          "en": "Slither like a snake",
          "zh": "趴在地上像长蛇一样扭动爬行"
        },
        "icon": "🐍"
      },
      {
        "id": "opt-k1-cre-e6-3",
        "label": {
          "th": "ทำมือสองข้างตั้งเป็นหูยาวบนศีรษะ แล้วกระโดดดึ๋งๆ 🐇",
          "en": "Put two hands up like long ears and hop around",
          "zh": "双手在头顶竖起代表长耳朵，欢快地双脚蹦跳 🐇"
        },
        "icon": "🐇"
      }
    ],
    "correctOptionId": "opt-k1-cre-e6-3",
    "explanation": {
      "th": "กระต่ายมีหูยาวและชอบกระโดด เลียนแบบได้น่ารักมากครับ!",
      "en": "Awesome! Rabbits have long ears and hop merrily.",
      "zh": "太棒了！竖起长耳朵蹦蹦跳跳最像小兔子。"
    }
  },
  {
    "id": "k1-cre-e7",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เครื่องดนตรีชนิดใดที่มี \"สายดีด\" ไพเราะ และเวลาเล่นต้องใช้มือจับคอกล่องแล้วดีดสาย? 🎸",
      "en": "Which string instrument with frets do you STRUM with your fingers? 🎸",
      "zh": "哪一种有琴弦的弹拨乐器，抱在怀里用手指轻轻拨动琴弦能奏出动听旋律？🎸"
    },
    "illustration": "🎸 🎶 🎸",
    "illustrationSubtitle": {
      "th": "เครื่องดนตรีประเภทเครื่องสาย: กีตาร์",
      "en": "String instrument: Guitar",
      "zh": "弹拨乐器：吉他"
    },
    "options": [
      {
        "id": "opt-k1-cre-e7-1",
        "label": {
          "th": "กีตาร์ 🎸",
          "en": "Guitar",
          "zh": "木吉他 / 电吉他 🎸"
        },
        "icon": "🎸"
      },
      {
        "id": "opt-k1-cre-e7-2",
        "label": {
          "th": "กลองชุด",
          "en": "Drum set",
          "zh": "架子鼓"
        },
        "icon": "🥁"
      },
      {
        "id": "opt-k1-cre-e7-3",
        "label": {
          "th": "นกหวีด",
          "en": "Whistle",
          "zh": "裁判口哨"
        },
        "icon": "🪈"
      }
    ],
    "correctOptionId": "opt-k1-cre-e7-1",
    "explanation": {
      "th": "กีตาร์เป็นเครื่องดนตรีประเภทเครื่องสาย ดีดแล้วเกิดเสียงกังวาน เก่งมากครับ!",
      "en": "Right! Guitars produce sounds when strings are plucked.",
      "zh": "答对了！吉他是一种非常受人喜爱的弹拨弦乐器。"
    }
  },
  {
    "id": "k1-cre-e8",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เมื่อนำ \"สีแดง\" 🔴 ผสมกับ \"สีเหลือง\" 🟡 จะได้สีใหม่ที่มีความสดใสคือสีใด?",
      "en": "Mix RED 🔴 and YELLOW 🟡 paint together. What bright new color do you get?",
      "zh": "色彩小魔术：把热情似火的红色颜料 🔴 与明亮的黄色颜料 🟡 调和在一起，会变出什么新颜色？"
    },
    "illustration": "🔴 + 🟡 = ❓",
    "illustrationSubtitle": {
      "th": "การผสมแม่สี: แดงผสมเหลืองได้ส้ม",
      "en": "Color mixing: Red + Yellow = Orange",
      "zh": "三原色调色：红加黄变橙"
    },
    "options": [
      {
        "id": "opt-k1-cre-e8-1",
        "label": {
          "th": "สีดำ",
          "en": "Black",
          "zh": "深黑色"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k1-cre-e8-2",
        "label": {
          "th": "สีส้ม 🟧",
          "en": "Orange",
          "zh": "明亮欢快的橙色 🟧"
        },
        "icon": "🟧"
      },
      {
        "id": "opt-k1-cre-e8-3",
        "label": {
          "th": "สีฟ้า",
          "en": "Blue",
          "zh": "天蓝色"
        },
        "icon": "🟦"
      }
    ],
    "correctOptionId": "opt-k1-cre-e8-2",
    "explanation": {
      "th": "แดงบวกเหลืองได้สีส้ม เหมือนผลส้มและพระอาทิตย์ เก่งมากครับ!",
      "en": "Spot on! Red and yellow blend into vibrant orange.",
      "zh": "太棒了！红色加上黄色会调出漂亮的橙色。"
    }
  },
  {
    "id": "k1-cre-e9",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "เมื่อนำกล่องกระดาษลังเหลือใช้ 📦 มาตกแต่งต่อเติม เด็กๆ สามารถจินตนาการแปลงร่างเป็นสิ่งใดได้?",
      "en": "What can kids creatively turn a used CARDBOARD BOX 📦 into?",
      "zh": "把家里闲置废弃的坚固大纸箱 📦 重新涂绘剪裁，小朋友们可以发挥想象把它变成什么？"
    },
    "illustration": "📦 🚀 🏰",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์สร้างสรรค์จากเศษวัสดุ",
      "en": "Creative upcycling: Box to castle/rocket",
      "zh": "废旧纸箱创意大变身"
    },
    "options": [
      {
        "id": "opt-k1-cre-e9-1",
        "label": {
          "th": "เสื้อยืดตัวบางสำหรับใส่นอน",
          "en": "Silk sleeping shirt",
          "zh": "一件软绵绵贴身真丝睡衣"
        },
        "icon": "👕"
      },
      {
        "id": "opt-k1-cre-e9-2",
        "label": {
          "th": "อาหารเย็นสำหรับกินแทนข้าว",
          "en": "Dinner food to eat",
          "zh": "今晚的一盘美味晚餐直接嚼碎吃"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k1-cre-e9-3",
        "label": {
          "th": "ยานอวกาศทะลุมิติ หรือ ปราสาทเจ้าหญิงแสนสวย 🚀 🏰",
          "en": "A fantasy spaceship or fairytale castle",
          "zh": "一艘探索宇宙的超级火箭，或一座梦幻城堡 🚀 🏰"
        },
        "icon": "🚀"
      }
    ],
    "correctOptionId": "opt-k1-cre-e9-3",
    "explanation": {
      "th": "กล่องลังสามารถแปลงร่างเป็นยานอวกาศ รถยนต์ หรือบ้านของเล่นได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Cardboard boxes can transform into spaceships, forts, and cars.",
      "zh": "答对了！大纸箱经过巧手装点，能变成酷炫火箭或梦幻城堡。"
    }
  },
  {
    "id": "k1-cre-e10",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ถ้าหนูอยากวาดภาพ \"ดวงดาวบนท้องฟ้าเวลากลางคืน\" ⭐ ควรใช้รูปทรงใดในการวาด?",
      "en": "To draw bright STARS in the night sky ⭐, which shape represents them best?",
      "zh": "在画纸上画出夜空中闪闪发光的小星星 ⭐ 时，通常选用哪种经典的几何形状？"
    },
    "illustration": "⭐ 🌌 ⭐",
    "illustrationSubtitle": {
      "th": "รูปทรงดวงดาว 5 แฉก",
      "en": "Star shape",
      "zh": "五角星图案"
    },
    "options": [
      {
        "id": "opt-k1-cre-e10-1",
        "label": {
          "th": "รูปดาวห้าแฉก ⭐",
          "en": "5-pointed Star",
          "zh": "五角星形状 ⭐"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k1-cre-e10-2",
        "label": {
          "th": "รูปสี่เหลี่ยมผืนผ้าทึบ",
          "en": "Solid rectangle",
          "zh": "实心长方形"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k1-cre-e10-3",
        "label": {
          "th": "วงกลมสีดำ",
          "en": "Black circle",
          "zh": "黑圆圈"
        },
        "icon": "⚫"
      }
    ],
    "correctOptionId": "opt-k1-cre-e10-1",
    "explanation": {
      "th": "รูปดาวห้าแฉกส่องประกายระยิบระยับสวยงาม เก่งมากครับ!",
      "en": "Correct! 5-pointed stars represent twinkling stars.",
      "zh": "答对啦！五角星常用来象征夜空闪耀的繁星。"
    }
  },
  {
    "id": "k1-cre-m1",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "เมื่อนำ \"สีน้ำเงิน\" 🔵 มาผสมกับ \"สีเหลือง\" 🟡 จะเสกเป็นสีใหม่อะไรที่เหมือนใบไม้?",
      "en": "Mix BLUE 🔵 and YELLOW 🟡 together. What leaf-like color appears?",
      "zh": "色彩小魔术：把深邃的蓝色颜料 🔵 和明艳的黄色颜料 🟡 搅拌融合，会变出什么像树叶一样的颜色？"
    },
    "illustration": "🔵 + 🟡 = ❓",
    "illustrationSubtitle": {
      "th": "การผสมแม่สี: น้ำเงินผสมเหลืองได้เขียว",
      "en": "Color mixing: Blue + Yellow = Green",
      "zh": "调色魔法：蓝加黄变绿"
    },
    "options": [
      {
        "id": "opt-k1-cre-m1-1",
        "label": {
          "th": "สีขาว",
          "en": "White",
          "zh": "洁白色"
        },
        "icon": "⬜"
      },
      {
        "id": "opt-k1-cre-m1-2",
        "label": {
          "th": "สีเขียว 🟢",
          "en": "Green",
          "zh": "充满生机的绿色 🟢"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cre-m1-3",
        "label": {
          "th": "สีแดง",
          "en": "Red",
          "zh": "大红色"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k1-cre-m1-2",
    "explanation": {
      "th": "น้ำเงินบวกเหลืองกลายเป็นสีเขียวธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Blue and yellow make green.",
      "zh": "答对了！蓝色加上黄色就能变出生机勃勃的绿色。"
    }
  },
  {
    "id": "k1-cre-m2",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "การทำงานศิลปะด้วยการ \"นำก้านกล้วยหรือใบไม้มาจุ่มสีแล้วกดลงบนกระดาษ\" เรียกว่างานศิลปะประเภทใด? 🍃",
      "en": "Dipping leaves or banana stems in paint and stamping onto paper 🍃 is what art technique?",
      "zh": "将洗净的天然树叶或切好的香蕉茎梗蘸满颜料，按压印在白纸上 🍃，这种美术创作叫？"
    },
    "illustration": "🍃 🎨 📄",
    "illustrationSubtitle": {
      "th": "การพิมพ์ภาพจากวัสดุธรรมชาติ",
      "en": "Printmaking / Stamping with nature",
      "zh": "大自然植物拓印版画"
    },
    "options": [
      {
        "id": "opt-k1-cre-m2-1",
        "label": {
          "th": "การทอผ้าไหม",
          "en": "Silk weaving",
          "zh": "织造丝绸布料"
        },
        "icon": "🧵"
      },
      {
        "id": "opt-k1-cre-m2-2",
        "label": {
          "th": "การปั้นดินเผา",
          "en": "Pottery firing",
          "zh": "高温烧烤陶器"
        },
        "icon": "🏺"
      },
      {
        "id": "opt-k1-cre-m2-3",
        "label": {
          "th": "การพิมพ์ภาพด้วยวัสดุธรรมชาติ 🍃",
          "en": "Printmaking with natural materials",
          "zh": "自然材料拓印 / 盖印画 🍃"
        },
        "icon": "🍃"
      }
    ],
    "correctOptionId": "opt-k1-cre-m2-3",
    "explanation": {
      "th": "การพิมพ์ภาพช่วยให้เห็นลวดลายเส้นใบไม้อย่างสวยงาม เก่งมากครับ!",
      "en": "Spot on! Leaf stamping is a creative printmaking technique.",
      "zh": "太棒了！拓印画能完美展现植物天然独特的叶脉肌理。"
    }
  },
  {
    "id": "k1-cre-m3",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "เครื่องดนตรีประเภทคีย์บอร์ดชนิดใดที่มี \"ลิ่มนิ้วสีขาวและสีดำ\" กว้างใหญ่ เสียงไพเราะกังวาน? 🎹",
      "en": "Which grand keyboard instrument has black and white keys producing rich chords? 🎹",
      "zh": "哪一种气势恢宏的西洋键盘乐器长着整齐排列的黑白琴键 🎹，被誉为乐器之王？"
    },
    "illustration": "🎹 🎶 🎹",
    "illustrationSubtitle": {
      "th": "เครื่องดนตรีเปียโน",
      "en": "Keyboard: Piano",
      "zh": "键盘乐器：钢琴"
    },
    "options": [
      {
        "id": "opt-k1-cre-m3-1",
        "label": {
          "th": "เปียโน (Piano) 🎹",
          "en": "Piano",
          "zh": "钢琴（Piano）🎹"
        },
        "icon": "🎹"
      },
      {
        "id": "opt-k1-cre-m3-2",
        "label": {
          "th": "กลองยาว",
          "en": "Long drum",
          "zh": "泰式传统长鼓"
        },
        "icon": "🥁"
      },
      {
        "id": "opt-k1-cre-m3-3",
        "label": {
          "th": "ฉิ่ง",
          "en": "Small cymbals",
          "zh": "泰国铜钹"
        },
        "icon": "🪙"
      }
    ],
    "correctOptionId": "opt-k1-cre-m3-1",
    "explanation": {
      "th": "เปียโนมีคีย์กดสีขาวสลับดำ ให้เสียงดนตรีไพเราะนุ่มนวล เก่งมากครับ!",
      "en": "Right! Pianos have 88 black and white keys making melodies.",
      "zh": "答对啦！钢琴黑白琴键跳跃，奏出优美动听的乐章。"
    }
  },
  {
    "id": "k1-cre-m4",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ในการแสดงนิทานเรื่อง \"สามลูกหมูสร้างบ้าน\" 🐷 เพื่อนที่รับบทเป็น \"หมาป่าเจ้าเล่ห์\" 🐺 ควรทำเสียงอย่างไร?",
      "en": "In the \"Three Little Pigs\" play 🐷, what kind of voice should the WOLF 🐺 use?",
      "zh": "在童话剧《三只小猪》🐷 表演中，扮演那只在门外呼呼吹大风的“大灰狼” 🐺 应该用怎样的声音配音？"
    },
    "illustration": "🐺 💨 🐷",
    "illustrationSubtitle": {
      "th": "การใช้เสียงตามบทบาทสมมติ",
      "en": "Acting voices: Deep, gruff wolf voice",
      "zh": "戏剧表演配音：粗野沉闷的大灰狼"
    },
    "options": [
      {
        "id": "opt-k1-cre-m4-1",
        "label": {
          "th": "ทำเสียงแหลมเล็กร้องจุ๊บๆ เหมือนหนู",
          "en": "Tiny squeaky mouse voice",
          "zh": "发出细如蚊蝇的温柔吱吱叫"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k1-cre-m4-2",
        "label": {
          "th": "ทำเสียงทุ้มต่ำและดุดันว่า \"ฮ่าๆๆ ข้าจะเป่าบ้านเจ้าให้พัง!\" 🐺",
          "en": "Deep, gruff, fierce voice: \"I'll huff and puff and blow your house down!\"",
          "zh": "捏着嗓子发出粗沉凶狠的怒吼：“哈哈！看我把你们的房子一口气吹倒！” 🐺"
        },
        "icon": "🐺"
      },
      {
        "id": "opt-k1-cre-m4-3",
        "label": {
          "th": "ทำเสียงร้องเพลงกล่อมนอนเบาๆ",
          "en": "Soft soothing lullaby",
          "zh": "唱一首轻柔的摇篮催眠曲"
        },
        "icon": "🛌"
      }
    ],
    "correctOptionId": "opt-k1-cre-m4-2",
    "explanation": {
      "th": "การปรับน้ำเสียงให้เข้ากับบุคลิกของตัวละครทำให้การแสดงสมจริงและสนุกมากครับ!",
      "en": "Awesome! Deep gruff voices suit fierce wolf characters.",
      "zh": "太棒了！根据角色个性变换嗓音与台词，戏剧表演才惟妙惟肖。"
    }
  },
  {
    "id": "k1-cre-m5",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "เมื่อนำ \"สีแดง\" 🔴 มาผสมกับ \"สีน้ำเงิน\" 🔵 จะได้สีใหม่ที่มีเสน่ห์ลึกลับคือสีใด?",
      "en": "Mix RED 🔴 and BLUE 🔵 together. What deep regal color is created?",
      "zh": "色彩实验：把热烈的红色颜料 🔴 与深沉的蓝色颜料 🔵 均匀混合，会调制出什么高贵典雅的颜色？"
    },
    "illustration": "🔴 + 🔵 = ❓",
    "illustrationSubtitle": {
      "th": "การผสมแม่สี: แดงผสมน้ำเงินได้ม่วง",
      "en": "Color mixing: Red + Blue = Purple",
      "zh": "调色原理：红加蓝变紫"
    },
    "options": [
      {
        "id": "opt-k1-cre-m5-1",
        "label": {
          "th": "สีส้มสด",
          "en": "Bright orange",
          "zh": "鲜艳橙色"
        },
        "icon": "🟧"
      },
      {
        "id": "opt-k1-cre-m5-2",
        "label": {
          "th": "สีเขียวมะนาว",
          "en": "Lime green",
          "zh": "青柠檬绿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cre-m5-3",
        "label": {
          "th": "สีม่วง 🟣",
          "en": "Purple / Violet",
          "zh": "优雅神秘的紫色 🟣"
        },
        "icon": "🟣"
      }
    ],
    "correctOptionId": "opt-k1-cre-m5-3",
    "explanation": {
      "th": "สีแดงผสมสีน้ำเงินได้สีม่วง เหมือนผลองุ่น เก่งมากครับ!",
      "en": "Correct! Red and blue blend into rich purple.",
      "zh": "答对了！红加蓝调配出美丽的紫色，就像甜美紫葡萄。"
    }
  },
  {
    "id": "k1-cre-m6",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "เมื่อตัดกระดาษสีเป็นชิ้นเล็กๆ แล้วนำมา \"ทากาวแปะติดลงบนโครงร่างภาพผลไม้\" เทคนิคนี้เรียกว่าอะไร? ✂️ 📄",
      "en": "Cutting colored paper into bits and GLUING them to form a mosaic picture ✂️ 📄 is called what?",
      "zh": "把五颜六色的彩纸撕碎或剪成几何碎片，然后涂上胶水拼贴在水果轮廓内 ✂️ 📄，这叫作什么美术技法？"
    },
    "illustration": "✂️ 📄 🖼️",
    "illustrationSubtitle": {
      "th": "งานฉีกปะและปะติดภาพ (Collage)",
      "en": "Collage / Paper mosaic art",
      "zh": "拼贴画（撕纸拼贴/剪贴画）"
    },
    "options": [
      {
        "id": "opt-k1-cre-m6-1",
        "label": {
          "th": "งานฉีกปะ / การปะติดกระดาษ (Collage) 📄",
          "en": "Torn paper collage / Mosaic",
          "zh": "拼贴画 / 撕纸剪贴艺术（Collage）📄"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k1-cre-m6-2",
        "label": {
          "th": "การหล่อโลหะทองเหลือง",
          "en": "Brass metal casting",
          "zh": "高温金属浇铸铸造"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k1-cre-m6-3",
        "label": {
          "th": "การสลักลายหินอ่อน",
          "en": "Marble carving",
          "zh": "大理石凿雕"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-k1-cre-m6-1",
    "explanation": {
      "th": "การฉีกปะกระดาษช่วยฝึกกล้ามเนื้อมือและสร้างสรรค์ลวดลายแปลกใหม่ เก่งมากครับ!",
      "en": "Spot on! Paper collage creates colorful mosaic-style textures.",
      "zh": "太棒了！拼贴画能锻炼手指精细动作，创作丰富肌理之美。"
    }
  },
  {
    "id": "k1-cre-m7",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "เครื่องดนตรีชนิดใดที่ต้องใช้ปาก \"เป่าลม\" ให้เกิดเสียงเพลงอันไพเราะ? 🪈",
      "en": "Which wind instrument do you PLAY BY BLOWING AIR with your mouth? 🪈",
      "zh": "下列哪一种管乐乐器需要用嘴唇轻衔、把“气息均匀吹入管口”才能奏出悠扬旋律？🪈"
    },
    "illustration": "🪈 💨 🎶",
    "illustrationSubtitle": {
      "th": "เครื่องดนตรีประเภทเป่า: ขลุ่ย",
      "en": "Wind instrument: Flute",
      "zh": "吹奏管乐器：长笛/木笛"
    },
    "options": [
      {
        "id": "opt-k1-cre-m7-1",
        "label": {
          "th": "กีตาร์โปร่ง",
          "en": "Acoustic guitar",
          "zh": "木吉他"
        },
        "icon": "🎸"
      },
      {
        "id": "opt-k1-cre-m7-2",
        "label": {
          "th": "ขลุ่ย / ปี่ 🪈",
          "en": "Flute / Pipe",
          "zh": "长笛 / 竹笛 / 木琴管 🪈"
        },
        "icon": "🪈"
      },
      {
        "id": "opt-k1-cre-m7-3",
        "label": {
          "th": "กลองสแนร์",
          "en": "Snare drum",
          "zh": "军鼓"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt-k1-cre-m7-2",
    "explanation": {
      "th": "ขลุ่ยเป็นเครื่องเป่าที่ต้องอาศัยการบังคับลมและการเปิดปิดรูนิ้ว เก่งมากครับ!",
      "en": "Right! Flutes are wind instruments played with breath control.",
      "zh": "答对啦！笛子靠吹气引起管内空气柱震动发出悠扬声音。"
    }
  },
  {
    "id": "k1-cre-m8",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ถ้าเปิดเพลงจังหวะ \"ช้าๆ นุ่มนวล ชวนเคลิ้มฝัน\" 🎶 เด็กๆ ควรเต้นด้วยท่าทางแบบใด?",
      "en": "When gentle, SLOW, dreamy music plays 🎶, how should children dance gracefully?",
      "zh": "当音响里流淌出柔美缓慢、宛如天鹅戏水般“悠扬轻柔的慢板华尔兹” 🎶 时，孩子们应该？"
    },
    "illustration": "🎶 🦢 🩰",
    "illustrationSubtitle": {
      "th": "การเคลื่อนไหวตามจังหวะช้า-เร็ว",
      "en": "Move slowly and smoothly to slow tempo",
      "zh": "随舒缓慢板音乐轻盈漫舞"
    },
    "options": [
      {
        "id": "opt-k1-cre-m8-1",
        "label": {
          "th": "เอาศีรษะโขกกำแพง",
          "en": "Bang head on wall",
          "zh": "拿头撞墙打节奏"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-cre-m8-2",
        "label": {
          "th": "กระโดดเตะต่อยอย่างรวดเร็วบ้าคลั่ง",
          "en": "Kung-fu punch & kick wildly",
          "zh": "发疯似的大力拳打脚踢翻跟头"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k1-cre-m8-3",
        "label": {
          "th": "ขยับตัวช้าๆ โบกแขนพริ้วไหวอย่างนุ่มนวลเหมือนคลื่นทะเลหรือขนนก 🦢",
          "en": "Move slowly, waving arms gently like calm waves or floating feathers",
          "zh": "脚步从容，双臂如羽翼或流水般舒缓轻柔地舒展曼舞 🦢"
        },
        "icon": "🩰"
      }
    ],
    "correctOptionId": "opt-k1-cre-m8-3",
    "explanation": {
      "th": "เคลื่อนไหวช้าๆ สอดคล้องกับจังหวะดนตรีที่นุ่มนวล แสดงถึงความเข้าถึงอารมณ์เพลง เก่งมากครับ!",
      "en": "Awesome! Slow tempos evoke smooth, flowing, and graceful body lines.",
      "zh": "太棒了！随慢节奏音乐优美伸展，展现灵动宁静的艺术美感。"
    }
  },
  {
    "id": "k1-cre-m9",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ในการวาดภาพทิวทัศน์ทะเล 🏖️ ถ้าเรานำ \"สีฟ้า\" ผสมกับ \"สีขาว\" เล็กน้อย จะได้สีอะไรที่เหมือนน้ำทะเลตื้น?",
      "en": "Mix BLUE with a little WHITE paint. What soft sky/sea shade is created? 🏖️",
      "zh": "在画沙滩海景 🏖️ 时，把纯净的天蓝色颜料加入少许白色颜料调和，会产生什么明媚清爽的色调？"
    },
    "illustration": "🟦 + ⬜ = ❓",
    "illustrationSubtitle": {
      "th": "การปรับค่าน้ำหนักสี: สีฟ้าผสมขาวได้ฟ้าอ่อน",
      "en": "Tints: Blue + White = Light sky blue",
      "zh": "色彩明度调节：蓝加白变浅天蓝"
    },
    "options": [
      {
        "id": "opt-k1-cre-m9-1",
        "label": {
          "th": "สีฟ้าอ่อน (สีท้องฟ้าสดใส) 🩵",
          "en": "Light blue (Sky blue)",
          "zh": "明朗清澈的浅蓝色（蔚蓝色）🩵"
        },
        "icon": "🩵"
      },
      {
        "id": "opt-k1-cre-m9-2",
        "label": {
          "th": "สีน้ำตาลเข้มไหม้",
          "en": "Burnt dark brown",
          "zh": "焦黑色深褐泥巴色"
        },
        "icon": "🟫"
      },
      {
        "id": "opt-k1-cre-m9-3",
        "label": {
          "th": "สีเทาหม่น",
          "en": "Dull dark grey",
          "zh": "灰蒙蒙水泥灰"
        },
        "icon": "🩶"
      }
    ],
    "correctOptionId": "opt-k1-cre-m9-1",
    "explanation": {
      "th": "การเติมสีขาวทำให้สีฟ้าสว่างขึ้น กลายเป็นสีฟ้าอ่อนที่สดใส เก่งมากครับ!",
      "en": "Spot on! Adding white lightens blue into an airy sky blue tint.",
      "zh": "答对了！在蓝色中调入白颜料能提高明度，调出清透天蓝色。"
    }
  },
  {
    "id": "k1-cre-m10",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "การพับกระดาษแผ่นสี่เหลี่ยมจัตุรัสให้กลายเป็น \"เรือใบหรือจรวดบิน\" ⛵ 🚀 เป็นศิลปะแขนงใด?",
      "en": "Folding a flat square paper into paper boats or rockets ⛵ 🚀 is what traditional art?",
      "zh": "把一张正方形彩色平整纸张，不裁不切、纯手工折叠出小帆船或飞行火箭 ⛵ 🚀，这门艺术叫？"
    },
    "illustration": "📄 ➡️ ⛵",
    "illustrationSubtitle": {
      "th": "ศิลปะการพับกระดาษ (Origami)",
      "en": "Origami: Paper folding art",
      "zh": "传统折纸手工艺术（Origami）"
    },
    "options": [
      {
        "id": "opt-k1-cre-m10-1",
        "label": {
          "th": "การแกะสลักกระจกเงา",
          "en": "Mirror engraving",
          "zh": "镜面精细激光雕刻"
        },
        "icon": "🪞"
      },
      {
        "id": "opt-k1-cre-m10-2",
        "label": {
          "th": "ศิลปะการพับกระดาษ (Origami) ⛵",
          "en": "Paper folding art (Origami)",
          "zh": "传统折纸造型艺术（Origami）⛵"
        },
        "icon": "⛵"
      },
      {
        "id": "opt-k1-cre-m10-3",
        "label": {
          "th": "การหล่อรูปปั้นทองเหลือง",
          "en": "Bronze metal casting",
          "zh": "大型青铜铸造法"
        },
        "icon": "🪙"
      }
    ],
    "correctOptionId": "opt-k1-cre-m10-2",
    "explanation": {
      "th": "โอริกามิช่วยฝึกสมาธิ มิติสัมพันธ์ และความแม่นยำของนิ้วมือ เก่งมากครับ!",
      "en": "Correct! Origami transforms simple paper into intricate 3D forms.",
      "zh": "答对啦！折纸艺术极富创造力，能锻炼空间想象力和动手精细度。"
    }
  },
  {
    "id": "k1-cre-h1",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "สีโทนร้อน เช่น \"สีแดง สีส้ม และสีเหลือง\" 🔴 🟧 🟡 มักให้ความรู้สึกอย่างไรแก่ผู้ชม?",
      "en": "WARM COLORS (Red, Orange, Yellow) 🔴 🟧 🟡 usually evoke what feelings in art?",
      "zh": "在美术画作中，红、橙、黄等“暖色调”色彩 🔴 🟧 🟡 通常会带给观众怎样的心理感受？"
    },
    "illustration": "🔴 🟧 🟡",
    "illustrationSubtitle": {
      "th": "อารมณ์ของสีโทนร้อน",
      "en": "Warm colors evoke warmth & energy",
      "zh": "暖色调心理效应：温暖热烈欢快"
    },
    "options": [
      {
        "id": "opt-k1-cre-h1-1",
        "label": {
          "th": "ง่วงนอนหลับสนิทในความมืด",
          "en": "Dark, sleepy, and silent",
          "zh": "昏昏沉沉只想睡觉"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k1-cre-h1-2",
        "label": {
          "th": "หนาวสั่นยะเยือกเหมือนน้ำแข็ง",
          "en": "Freezing shivering cold",
          "zh": "冷酷冰封、寒气逼人"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k1-cre-h1-3",
        "label": {
          "th": "อบอุ่น ร่าเริง ตื่นตัว และมีพลัง ☀️ 🔥",
          "en": "Warm, cheerful, energetic, and exciting",
          "zh": "温暖如春、热情奔放、充满活力与兴奋感 ☀️ 🔥"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k1-cre-h1-3",
    "explanation": {
      "th": "สีโทนร้อนเหมือนแสงแดดและเปลวไฟ ให้ความรู้สึกสดชื่นและมีพลัง เก่งมากครับ!",
      "en": "Correct! Warm hues radiate sunshine energy, heat, and joyous passion.",
      "zh": "答对了！暖色调如骄阳烈焰，让人感受到热情、温暖与蓬勃朝气。"
    }
  },
  {
    "id": "k1-cre-h2",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "สีโทนเย็น เช่น \"สีน้ำเงิน สีฟ้า และสีเขียว\" 🔵 🟢 มักให้ความรู้สึกอย่างไร?",
      "en": "COOL COLORS (Blue, Cyan, Green) 🔵 🟢 usually convey what mood in visual art?",
      "zh": "画卷上的蓝、绿、青等“冷色调”色彩 🔵 🟢，往往传递出什么样的氛围与心境？"
    },
    "illustration": "🔵 🟢 🌊",
    "illustrationSubtitle": {
      "th": "อารมณ์ของสีโทนเย็น",
      "en": "Cool colors: Calm, peaceful & cool",
      "zh": "冷色调氛围：宁静清爽安详"
    },
    "options": [
      {
        "id": "opt-k1-cre-h2-1",
        "label": {
          "th": "สงบ เย็นสบาย ผ่อนคลาย และสดชื่น 🌊 🍃",
          "en": "Calm, peaceful, refreshing, and serene",
          "zh": "宁静清凉、安详辽阔、心旷神怡且舒缓放松 🌊 🍃"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k1-cre-h2-2",
        "label": {
          "th": "โกรธเกรี้ยวดั่งไฟลุกท่วม",
          "en": "Furious angry rage",
          "zh": "怒火中烧、脾气暴躁"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k1-cre-h2-3",
        "label": {
          "th": "แสบร้อนเหมือนโดนน้ำพริก",
          "en": "Burning hot stinging",
          "zh": "火烧火燎剧烈刺痛"
        },
        "icon": "🌶️"
      }
    ],
    "correctOptionId": "opt-k1-cre-h2-1",
    "explanation": {
      "th": "สีโทนเย็นเหมือนน้ำและป่าเขา ทำให้จิตใจสงบเย็นผ่อนคลาย เก่งมากครับ!",
      "en": "Awesome! Cool hues echo tranquil water, calm skies, and deep forests.",
      "zh": "太棒了！冷色调让人联想起辽阔大海与幽静森林，抚平躁动带来安宁。"
    }
  },
  {
    "id": "k1-cre-h3",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "การประดิษฐ์หุ่นมือจาก \"ถุงเท้าเก่าที่ซักสะอาดแล้ว\" 🧦 โดยติดกระดุมทำเป็นลูกตา สามารถนำไปใช้ทำอะไรได้?",
      "en": "Make a puppet from a clean OLD SOCK 🧦 with button eyes. How can you play with it?",
      "zh": "把洗得干干净净的旧棉袜 🧦 缝上纽扣当大眼睛，巧手做成生动的手偶，可以拿来干什么？"
    },
    "illustration": "🧦 🎭 🗣️",
    "illustrationSubtitle": {
      "th": "การทำหุ่นมือและละครหุ่น",
      "en": "Sock puppet theater",
      "zh": "废旧袜子改造成生动手偶表演"
    },
    "options": [
      {
        "id": "opt-k1-cre-h3-1",
        "label": {
          "th": "เอาไปจุ่มน้ำมันก๊าดจุดไฟเล่น",
          "en": "Dip in kerosene and burn",
          "zh": "浸泡柴油当火把烧毁"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k1-cre-h3-2",
        "label": {
          "th": "สวมมือขยับปากเพื่อแสดงละครหุ่น เล่านิทานสนุกสนานให้เพื่อนฟัง 🎭",
          "en": "Slip over hand to perform puppet shows and tell stories",
          "zh": "套在手上开合嘴巴自编自演手偶剧，绘声绘色给朋友讲故事 🎭"
        },
        "icon": "🎭"
      },
      {
        "id": "opt-k1-cre-h3-3",
        "label": {
          "th": "ตัดเป็นชิ้นๆ กินเป็นอาหารว่าง",
          "en": "Cut and eat as snacks",
          "zh": "剪成一小截一小截吞进肚里当零食"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-cre-h3-2",
    "explanation": {
      "th": "หุ่นถุงเท้าใช้จัดละครเล่านิทานได้อย่างสร้างสรรค์และเพลิดเพลิน เก่งมากครับ!",
      "en": "Spot on! Sock puppets bring theatrical storytelling vividly to life.",
      "zh": "太棒了！旧物改造成生动手偶剧道具，既环保又极富表演趣味。"
    }
  },
  {
    "id": "k1-cre-h4",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเพื่อนร้องเพลงจบในการแสดงบนเวที 🎤 มารยาทของผู้ชมที่ดีในการแสดงความชื่นชมคือข้อใด?",
      "en": "Friend finishes singing a lovely song on stage 🎤. How should a polite audience applaud?",
      "zh": "同学在舞台上全力以赴演唱完一首动听歌曲 🎤，台下有素养的小观众应当怎样由衷赞美？"
    },
    "illustration": "🎤 👏 😊",
    "illustrationSubtitle": {
      "th": "มารยาทการเป็นผู้ชมการแสดงที่ดี",
      "en": "Applause etiquette for audience",
      "zh": "文明文明观赏礼仪：热烈鼓掌致意"
    },
    "options": [
      {
        "id": "opt-k1-cre-h4-1",
        "label": {
          "th": "ส่งเสียงโห่ไล่ให้เพื่อนร้องไห้",
          "en": "Boo loudly to make them cry",
          "zh": "在台下阴阳怪气地喝倒彩起哄嘲弄"
        },
        "icon": "👎"
      },
      {
        "id": "opt-k1-cre-h4-2",
        "label": {
          "th": "ปาขวดน้ำหรือเศษขนมขึ้นไปบนเวที",
          "en": "Throw water bottles on stage",
          "zh": "向台上狠狠扔空矿泉水瓶和脏纸屑"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-cre-h4-3",
        "label": {
          "th": "ปรบมือส่งเสียงให้กำลังใจด้วยรอยยิ้มอย่างอบอุ่น 👏",
          "en": "Clap enthusiastically and cheer with warm smiles",
          "zh": "面带微笑起立鼓掌，送上热烈的掌声与喝彩鼓励 👏"
        },
        "icon": "👏"
      }
    ],
    "correctOptionId": "opt-k1-cre-h4-3",
    "explanation": {
      "th": "การปรบมือให้เกียรติผู้แสดง เป็นมารยาทที่งดงามของผู้ชม เก่งมากครับ!",
      "en": "Correct! Cheering applause honors the performer's effort and courage.",
      "zh": "答对了！热烈真诚的掌声是对每一位登台表演者最好的尊重与鼓励。"
    }
  },
  {
    "id": "k1-cre-h5",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ในการออกแบบลายเสื้อยืด 👕 ด้วย \"การแต้มสีหยดสีลงบนกระดาษแล้วพับครึ่งรีดให้ติดกัน\" (ภาพพิมพ์กระจกเงา) ภาพที่ออกมาจะมีลักษณะใด?",
      "en": "Dab paint spots on paper, fold in half, and press. What symmetry appears when unfolded?",
      "zh": "在白纸一侧点上五彩斑斓的水粉颜料，快速对折用力抚平再展开，印出对称神秘图案，这种画面特征是？"
    },
    "illustration": "📄 🦋 🎨",
    "illustrationSubtitle": {
      "th": "การพิมพ์ภาพแบบสมมาตร (พับสี)",
      "en": "Symmetrical fold-print art",
      "zh": "对折压印对称图案（轴对称彩画）"
    },
    "options": [
      {
        "id": "opt-k1-cre-h5-1",
        "label": {
          "th": "ลวดลายสองฝั่งจะเหมือนกันและสมมาตรกันพอดีเหมือนปีกผีเสื้อ 🦋",
          "en": "Both sides are identical mirror reflections, symmetric like butterfly wings",
          "zh": "折痕左右两侧呈现完全镜像、绝妙吻合的轴对称美妙图案（宛如彩蝶双翼）🦋"
        },
        "icon": "🦋"
      },
      {
        "id": "opt-k1-cre-h5-2",
        "label": {
          "th": "กระดาษจะไหม้กลายเป็นเถ้าถ่าน",
          "en": "Paper burns to ash",
          "zh": "整张画纸瞬间起火化为灰烬"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k1-cre-h5-3",
        "label": {
          "th": "ไม่มีสีใดๆ ติดอยู่เลยขาวสะอาด",
          "en": "Completely clean blank",
          "zh": "上面干干净净一点颜料都没有留存"
        },
        "icon": "⬜"
      }
    ],
    "correctOptionId": "opt-k1-cre-h5-1",
    "explanation": {
      "th": "ภาพพับสีจะเกิดความสมมาตรที่น่าอัศจรรย์ใจคล้ายปีกผีเสื้อ เก่งมากครับ!",
      "en": "Awesome! Symmetrical folding mirrors shapes across the central fold crease.",
      "zh": "太棒了！对折颜料印画会产生神奇优美的左右轴对称图案。"
    }
  },
  {
    "id": "k1-cre-h6",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "เครื่องประกอบจังหวะไทยชนิดใดทำจาก \"ทองเหลืองหล่อเป็นฝาคู่ ร้อยเชือก\" มีเสียงดังกริ๊งกริ่ง \"ฉิ่ง-ฉับ\"? 🪙",
      "en": "Which Thai percussion instrument of paired small brass cymbals makes the ring-clap sound \"Ching-Chap\"? 🪙",
      "zh": "哪一种用黄铜精铸、用丝绳相连的泰国传统小巧打击乐器，相互碰击会发出清脆的“钦-恰（ฉิ่ง-ฉับ）”律动节拍？🪙"
    },
    "illustration": "🪙 🎶 🇹🇭",
    "illustrationSubtitle": {
      "th": "เครื่องดนตรีไทย: ฉิ่ง",
      "en": "Thai small brass cymbals (Ching)",
      "zh": "泰国传统节拍乐器：铜钹（Ching）"
    },
    "options": [
      {
        "id": "opt-k1-cre-h6-1",
        "label": {
          "th": "ระนาดเอกไม้",
          "en": "Ranat wooden xylophone",
          "zh": "泰式高音木琴"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-k1-cre-h6-2",
        "label": {
          "th": "ฉิ่ง 🪙",
          "en": "Ching (Thai small cymbals)",
          "zh": "铜钹 / 小钹（ฉิ่ง）🪙"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k1-cre-h6-3",
        "label": {
          "th": "ซอด้วง",
          "en": "Saw Duang fiddle",
          "zh": "泰式拉弦胡琴"
        },
        "icon": "🎻"
      }
    ],
    "correctOptionId": "opt-k1-cre-h6-2",
    "explanation": {
      "th": "ฉิ่งเป็นเครื่องกำกับจังหวะสำคัญของวงดนตรีไทย มีเสียงฉิ่งและฉับ เก่งมากครับ!",
      "en": "Spot on! The Ching sets tempo in classical Thai musical ensembles.",
      "zh": "答对了！小钹（ฉิ่ง）打出清脆节拍，是泰国古典传统乐队的节奏灵魂。"
    }
  },
  {
    "id": "k1-cre-h7",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "เมื่อต้องการวาดภาพ \"เมืองในอนาคตในจินตนาการ\" 🛸 เด็กๆ สามารถแต่งเติมสิ่งแปลกใหม่อะไรได้บ้าง?",
      "en": "Drawing a visionary \"CITY OF THE FUTURE\" 🛸: What futuristic ideas could you add?",
      "zh": "插上想象的翅膀、用画笔构筑一幅充满科幻色彩的“未来理想之城” 🛸 时，你可以大胆设计哪些前瞻元素？"
    },
    "illustration": "🛸 🏙️ 🚀",
    "illustrationSubtitle": {
      "th": "การคิดนอกกรอบและจินตนาการเชิงสร้างสรรค์",
      "en": "Futuristic creative design thinking",
      "zh": "未来主义幻想与工业创新思维"
    },
    "options": [
      {
        "id": "opt-k1-cre-h7-1",
        "label": {
          "th": "คัดลอกรูปโต๊ะเรียนเดิมซ้ำ 100 ตัว",
          "en": "Copy 100 identical classroom desks",
          "zh": "单调机械地画一百张一模一样的旧课桌"
        },
        "icon": "🪑"
      },
      {
        "id": "opt-k1-cre-h7-2",
        "label": {
          "th": "วาดแผ่นหินเปล่าๆ ไม่มีอะไรเลย",
          "en": "Blank stone slab only",
          "zh": "画一块黑漆漆干巴巴什么都没有的秃岩石"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-cre-h7-3",
        "label": {
          "th": "รถยนต์บินได้บนสะพานสายรุ้ง ตึกต้นไม้รักษ์โลก และทางเดินลอยฟ้า 🛸 🏙️",
          "en": "Flying cars on rainbow lanes, skywalks, and lush bio-architecture towers",
          "zh": "穿梭在空中彩虹立交桥上的飞行汽车、生态垂直绿化天际线大楼 🛸 🏙️"
        },
        "icon": "🛸"
      }
    ],
    "correctOptionId": "opt-k1-cre-h7-3",
    "explanation": {
      "th": "จินตนาการไม่มีขีดจำกัด ช่วยจุดประกายความคิดสร้างสรรค์ทางวิทยาศาสตร์และศิลปะ เก่งมากครับ!",
      "en": "Correct! Imaginative futuristic art incorporates eco-towers and soaring aerocars.",
      "zh": "答对啦！放飞无拘无束的想象力，未来建筑与悬浮科技绘就前沿杰作。"
    }
  },
  {
    "id": "k1-cre-h8",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "การนำ \"เปลือกไข่ที่ล้างสะอาดและย้อมสี\" 🥚 มาทุบเป็นชิ้นเล็กๆ แล้วปะติดบนภาพวาดแจกัน เรียกว่าเทคนิคใด?",
      "en": "Crushing dyed clean EGGSHELLS 🥚 to glue mosaic-style onto a vase painting is what technique?",
      "zh": "把洗净晾干并染好色的碎熟鸡蛋壳 🥚 用小镊子按色彩拼贴在一只陶瓷花瓶草图上，属于什么美工手法？"
    },
    "illustration": "🥚 🏺 🎨",
    "illustrationSubtitle": {
      "th": "งานโมเสกเปลือกไข่",
      "en": "Eggshell mosaic artwork",
      "zh": "蛋壳马赛克镶嵌画艺术"
    },
    "options": [
      {
        "id": "opt-k1-cre-h8-1",
        "label": {
          "th": "งานโมเสกเปลือกไข่ (Eggshell Mosaic) 🥚",
          "en": "Eggshell Mosaic craft",
          "zh": "蛋壳马赛克拼贴工艺（Eggshell Mosaic）🥚"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-cre-h8-2",
        "label": {
          "th": "การฉีดพ่นสีน้ำมันสเปรย์",
          "en": "Spray painting",
          "zh": "工业油漆化学喷涂"
        },
        "icon": "💨"
      },
      {
        "id": "opt-k1-cre-h8-3",
        "label": {
          "th": "การแกะสลักน้ำแข็งยักษ์",
          "en": "Ice sculpting",
          "zh": "大型冰雕电锯雕琢"
        },
        "icon": "🧊"
      }
    ],
    "correctOptionId": "opt-k1-cre-h8-1",
    "explanation": {
      "th": "โมเสกเปลือกไข่ช่วยสร้างผิวสัมผัสแตกลายที่มีเอกลักษณ์และสวยงามมาก เก่งมากครับ!",
      "en": "Awesome! Eggshell mosaics produce delicate, textured, craquelure patterns.",
      "zh": "太棒了！蛋壳拼贴画赋予画面独特的自然碎裂肌理美感，极具匠心。"
    }
  },
  {
    "id": "k1-cre-h9",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ในนิทานพื้นบ้าน เมื่อตัวละครต้อง \"ผ่านสะพานข้ามแม่น้ำที่มีสัตว์ประหลาดดักอยู่\" 🌉 ทางออกที่ชาญฉลาดและสันติที่สุดคือข้อใด?",
      "en": "In folklore, how should a brave, wise character pass a bridge monster 🌉 peacefully?",
      "zh": "在趣味寓言故事中，当主角必须经过一座有大怪兽守卫把关的古石桥 🌉 时，最彰显智慧与善意的和平通关策略是？"
    },
    "illustration": "🌉 🤝 🧠",
    "illustrationSubtitle": {
      "th": "การแก้ปัญหาเชิงสร้างสรรค์ในนิทาน",
      "en": "Story resolution: Wit and kindness over violence",
      "zh": "寓言情景中的智慧协商之道"
    },
    "options": [
      {
        "id": "opt-k1-cre-h9-1",
        "label": {
          "th": "หยิบก้อนหินไล่ขว้างปาใส่ด้วยความโกรธ",
          "en": "Throw rocks violently in anger",
          "zh": "不问青红皂白捡起巨石疯狂打砸攻击"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-cre-h9-2",
        "label": {
          "th": "ใช้ไหวพริบ ร้องเพลงแบ่งปันขนม และเจรจาผูกมิตรด้วยความจริงใจ 🤝 🎵",
          "en": "Use clever wit, share food, sing a peace song, and befriend honestly",
          "zh": "运用过人机智，主动分享干粮并唱起真诚的友谊之歌，化敌为友 🤝 🎵"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-cre-h9-3",
        "label": {
          "th": "นั่งร้องไห้ทิ้งตัวลงแม่น้ำจมน้ำ",
          "en": "Jump into the river drowning",
          "zh": "吓得闭上眼睛直接跳进滚滚江水里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cre-h9-2",
    "explanation": {
      "th": "การใช้ปัญญาและมิตรภาพแก้ปัญหา ดีกว่าการใช้กำลังความรุนแรง เก่งมากครับ!",
      "en": "Spot on! Folklore heroes triumph through quick wit, kindness, and clever peace.",
      "zh": "太棒了！大智大勇者善用机智与仁爱化解干戈，赢得信任与通路。"
    }
  },
  {
    "id": "k1-cre-h10",
    "grade": "K1",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเราต้องการแต่งนิทานสั้นด้วยตนเอง 📖 องค์ประกอบสำคัญในการเล่าเรื่องคือข้อใด?",
      "en": "To invent a captivating original short story 📖, what core elements are needed?",
      "zh": "构思自编一段引人入胜的原创童话小故事 📖 时，最不可或缺的核心戏剧三要素是？"
    },
    "illustration": "📖 🎭 ✨",
    "illustrationSubtitle": {
      "th": "องค์ประกอบของการเล่าเรื่อง (ตัวละคร ฉาก เหตุการณ์)",
      "en": "Storytelling elements: Characters, Setting, Plot",
      "zh": "故事创作三要素：人物、场景与情节"
    },
    "options": [
      {
        "id": "opt-k1-cre-h10-1",
        "label": {
          "th": "มีแต่เสียงตะโกนดังๆ หนวกหู",
          "en": "Only loud annoying screams",
          "zh": "从头到尾只有震耳欲聋的尖叫杂音"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-cre-h10-2",
        "label": {
          "th": "มีแต่หน้ากระดาษสีดำไม่มีคำพูดใดๆ",
          "en": "Just blank black pages with no words",
          "zh": "整本画册全是黑压压的空白，一个字都想不出"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k1-cre-h10-3",
        "label": {
          "th": "มีตัวละครหลัก มีสถานที่เกิดเหตุการณ์ และมีเรื่องราวการผจญภัยที่น่าติดตาม 📖",
          "en": "Compelling characters, a vivid setting, and an engaging adventure plot",
          "zh": "鲜明生动的鲜活角色、身临其境的场景设定以及起伏有趣的探险情节 📖"
        },
        "icon": "📖"
      }
    ],
    "correctOptionId": "opt-k1-cre-h10-3",
    "explanation": {
      "th": "ตัวละคร ฉาก และเรื่องราวที่น่าตื่นเต้น ทำให้ผู้ฟังเพลิดเพลินและได้ข้อคิด เก่งมากครับ!",
      "en": "Awesome! Character, setting, and plot form the timeless backbone of storytelling.",
      "zh": "答对了！生动的人物、生动的场景和峰回路转的情节构成了精彩故事的灵魂。"
    }
  },
  {
    "id": "k2-cre-e1",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 1: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #1: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 1 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e1-1",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e1-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e1-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e1-1",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e2",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 2: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #2: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 2 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e2-1",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e2-2",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e2-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e2-2",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e3",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 3: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #3: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 3 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e3-1",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-e3-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e3-3",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-cre-e3-3",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e4",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 4: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #4: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 4 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e4-1",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e4-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e4-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e4-1",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e5",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 5: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #5: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 5 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e5-1",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e5-2",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e5-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e5-2",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e6",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 6: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #6: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 6 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e6-1",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-e6-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e6-3",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-cre-e6-3",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e7",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 7: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #7: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 7 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e7-1",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e7-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e7-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e7-1",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e8",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 8: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #8: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 8 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e8-1",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e8-2",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e8-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e8-2",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e9",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 9: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #9: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 9 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e9-1",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-e9-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e9-3",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-cre-e9-3",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-e10",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะการวาดภาพและระบายสีระดับชั้นอนุบาล 2 ชุดที่ 10: การจัดคู่สีตรงข้าม เช่น สีแดงกับสีเขียว 🔴 🟢 ช่วยให้ภาพมีลักษณะอย่างไร?",
      "en": "K2 Drawing Skill #10: Complimentary color pairs like Red and Green 🔴 🟢 make artwork look how?",
      "zh": "幼儿园中班艺术素养第 10 题：在美术绘画中使用红与绿 🔴 🟢 等强烈对比色，能使画面产生什么视觉效果？"
    },
    "illustration": "🔴 🟢 🎨",
    "illustrationSubtitle": {
      "th": "คู่สีตรงข้ามและจุดเด่น",
      "en": "Complimentary contrast colors",
      "zh": "对比色的视觉冲击力"
    },
    "options": [
      {
        "id": "opt-k2-cre-e10-1",
        "label": {
          "th": "ดูโดดเด่น สดใส และสะดุดตาอย่างมีพลัง 🌟",
          "en": "Bold, vibrant, and strikingly eye-catching",
          "zh": "色彩鲜艳夺目、对比强烈且具有视觉张力 🌟"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-cre-e10-2",
        "label": {
          "th": "กลายเป็นภาพสีเทามองไม่เห็นอะไรเลย",
          "en": "Turns invisible grey",
          "zh": "变成灰蒙蒙一片完全看不清"
        },
        "icon": "🩶"
      },
      {
        "id": "opt-k2-cre-e10-3",
        "label": {
          "th": "ทำให้กระดาษละลายฉีกขาด",
          "en": "Rips paper",
          "zh": "把画纸瞬间溶化烧穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-e10-1",
    "explanation": {
      "th": "สีตรงข้ามช่วยขับเน้นให้แต่ละสีดูสดใสและโดดเด่นขึ้นอย่างลงตัว เก่งมากครับ!",
      "en": "Correct! Complementary colors create vibrant visual contrast.",
      "zh": "答对了！冷暖互补色能让主体更加凸显生动。"
    }
  },
  {
    "id": "k2-cre-m1",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 1: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #1: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 1 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m1-1",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m1-2",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m1-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m1-2",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m2",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 2: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #2: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 2 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m2-1",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-m2-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m2-3",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      }
    ],
    "correctOptionId": "opt-k2-cre-m2-3",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m3",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 3: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #3: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 3 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m3-1",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m3-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m3-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m3-1",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m4",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 4: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #4: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 4 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m4-1",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m4-2",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m4-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m4-2",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m5",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 5: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #5: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 5 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m5-1",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-m5-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m5-3",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      }
    ],
    "correctOptionId": "opt-k2-cre-m5-3",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m6",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 6: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #6: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 6 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m6-1",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m6-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m6-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m6-1",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m7",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 7: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #7: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 7 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m7-1",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m7-2",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m7-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m7-2",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m8",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 8: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #8: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 8 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m8-1",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-cre-m8-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m8-3",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      }
    ],
    "correctOptionId": "opt-k2-cre-m8-3",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m9",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 9: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #9: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 9 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m9-1",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m9-2",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m9-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m9-1",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-m10",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะดนตรีและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 10: การเคาะจังหวะดนตรี \"เร็ว-ช้า\" (Tempo) 🎶 มีผลต่ออารมณ์ความรู้สึกอย่างไร?",
      "en": "K2 Music & Rhythm #10: How does musical TEMPO (Fast vs Slow beats) 🎶 alter emotional mood?",
      "zh": "幼儿园中班音乐素养第 10 题：音乐中快节奏与慢节奏的交替变换 🎶，通常会带给听众怎样的情绪起伏？"
    },
    "illustration": "🎶 🥁 🏃",
    "illustrationSubtitle": {
      "th": "ความเร็วของจังหวะดนตรี (Tempo)",
      "en": "Musical tempo dynamics",
      "zh": "音乐速度与情绪表达"
    },
    "options": [
      {
        "id": "opt-k2-cre-m10-1",
        "label": {
          "th": "จังหวะเร็วทำให้หิวข้าวอย่างเดียว",
          "en": "Fast makes hungry only",
          "zh": "快节奏只会让人肚子饿想吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-cre-m10-2",
        "label": {
          "th": "จังหวะเร็วทำให้รู้สึกกระฉับกระเฉงตื่นเต้น ส่วนจังหวะช้าทำให้รู้สึกสงบผ่อนคลาย 🏃 🧘",
          "en": "Fast tempos feel energetic and excited, while slow tempos feel calm and relaxed",
          "zh": "欢快快板让人兴奋热血激昂，舒缓慢板让人心情宁静放松 🏃 🧘"
        },
        "icon": "🎶"
      },
      {
        "id": "opt-k2-cre-m10-3",
        "label": {
          "th": "ไม่มีผลอะไรเลยเพราะเสียงเหมือนเดิม",
          "en": "No effect at all",
          "zh": "完全没有分别，毫无情绪波澜"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-cre-m10-2",
    "explanation": {
      "th": "จังหวะดนตรีถ่ายทอดอารมณ์ความรู้สึกได้อย่างมหัศจรรย์ เก่งมากครับ!",
      "en": "Awesome! Tempo directly influences physiological energy and emotional arousal.",
      "zh": "太棒了！快节奏激发活力，慢节奏抚慰心灵。"
    }
  },
  {
    "id": "k2-cre-h1",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 1: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #1: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 1 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h1-1",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      },
      {
        "id": "opt-k2-cre-h1-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h1-3",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      }
    ],
    "correctOptionId": "opt-k2-cre-h1-3",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h2",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 2: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #2: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 2 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h2-1",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h2-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h2-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h2-1",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h3",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 3: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #3: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 3 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h3-1",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h3-2",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h3-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h3-2",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h4",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 4: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #4: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 4 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h4-1",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      },
      {
        "id": "opt-k2-cre-h4-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h4-3",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      }
    ],
    "correctOptionId": "opt-k2-cre-h4-3",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h5",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 5: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #5: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 5 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h5-1",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h5-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h5-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h5-1",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h6",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 6: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #6: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 6 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h6-1",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h6-2",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h6-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h6-2",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h7",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 7: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #7: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 7 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h7-1",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      },
      {
        "id": "opt-k2-cre-h7-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h7-3",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      }
    ],
    "correctOptionId": "opt-k2-cre-h7-3",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h8",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 8: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #8: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 8 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h8-1",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h8-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h8-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h8-1",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h9",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 9: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #9: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 9 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h9-1",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h9-2",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      },
      {
        "id": "opt-k2-cre-h9-3",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      }
    ],
    "correctOptionId": "opt-k2-cre-h9-2",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k2-cre-h10",
    "grade": "K2",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการประดิษฐ์และความคิดสร้างสรรค์ระดับชั้นอนุบาล 2 ชุดที่ 10: การออกแบบ \"หุ่นยนต์ทำความสะอาดรักษ์โลก\" 🤖 จากวัสดุรีไซเคิล ควรเลือกใช้วัสดุใดให้แข็งแรงและปลอดภัย?",
      "en": "K2 Invention Design #10: Designing an eco-friendly cleaning robot 🤖 from recyclables: What safe durable materials should be chosen?",
      "zh": "幼儿园中班创意制作第 10 题：用生活中的环保废旧物巧手拼装一只威武的“绿色清扫机器人” 🤖，应选择什么安全牢固的环保材料？"
    },
    "illustration": "🤖 ♻️ 🧴",
    "illustrationSubtitle": {
      "th": "การประดิษฐ์หุ่นยนต์จากวัสดุเหลือใช้",
      "en": "Recycled robot invention",
      "zh": "废旧物变废为宝环保制作"
    },
    "options": [
      {
        "id": "opt-k2-cre-h10-1",
        "label": {
          "th": "ถ่านไฟฉายเก่าขึ้นสนิมเปียกน้ำ",
          "en": "Rusty leaking chemical batteries",
          "zh": "流汤生锈漏液的废弃化学电池"
        },
        "icon": "🔋"
      },
      {
        "id": "opt-k2-cre-h10-2",
        "label": {
          "th": "เศษกระจกแตกแหลมคมเปื้อนโคลน",
          "en": "Sharp jagged broken glass",
          "zh": "锋利尖锐碎玻璃和脏泥巴"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-cre-h10-3",
        "label": {
          "th": "ขวดพลาสติกสะอาด ฝาขวดน้ำหลากสี และกล่องนมที่ล้างแห้งสนิท 🧴 📦",
          "en": "Clean plastic bottles, colorful bottle caps, and dried milk cartons",
          "zh": "洗净晾干的塑料矿泉水瓶、五彩瓶盖和坚挺的纸牛奶盒 🧴 📦"
        },
        "icon": "🤖"
      }
    ],
    "correctOptionId": "opt-k2-cre-h10-3",
    "explanation": {
      "th": "เลือกวัสดุรีไซเคิลที่สะอาดและปลอดภัย ช่วยให้สร้างสรรค์ผลงานได้อย่างมั่นใจ เก่งมากครับ!",
      "en": "Correct! Clean household recyclables are safe, versatile building components.",
      "zh": "答对了！选用清洁卫生的旧纸盒与塑料瓶盖，安全环保又好玩。"
    }
  },
  {
    "id": "k3-cre-e1",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 1: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #1: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 1 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e1-1",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e1-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e1-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e1-1",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e2",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 2: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #2: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 2 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e2-1",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e2-2",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e2-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e2-2",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e3",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 3: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #3: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 3 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e3-1",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-e3-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e3-3",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k3-cre-e3-3",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e4",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 4: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #4: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 4 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e4-1",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e4-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e4-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e4-1",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e5",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 5: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #5: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 5 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e5-1",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e5-2",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e5-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e5-2",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e6",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 6: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #6: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 6 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e6-1",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-e6-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e6-3",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k3-cre-e6-3",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e7",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 7: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #7: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 7 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e7-1",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e7-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e7-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e7-1",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e8",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 8: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #8: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 8 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e8-1",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e8-2",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e8-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e8-2",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e9",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 9: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #9: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 9 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e9-1",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-e9-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e9-3",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k3-cre-e9-3",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-e10",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 1,
    "question": {
      "th": "ทักษะสุนทรียภาพและการออกแบบระดับชั้นอนุบาล 3 ชุดที่ 10: สัดส่วนและความสมดุล (Balance) ในงานศิลปะหมายถึงสิ่งใด? ⚖️",
      "en": "K3 Aesthetics #10: What does VISUAL BALANCE ⚖️ mean in composing an art piece?",
      "zh": "幼儿园大班美术审美第 10 题：在艺术构图创作中，常常讲究画面的“视觉均衡与对称平衡（Balance）” ⚖️，它的含义是？"
    },
    "illustration": "⚖️ 🖼️ 🎨",
    "illustrationSubtitle": {
      "th": "หลักการจัดองค์ประกอบศิลป์: ความสมดุล",
      "en": "Principles of Art: Balance",
      "zh": "美术构图法则：视觉平衡美"
    },
    "options": [
      {
        "id": "opt-k3-cre-e10-1",
        "label": {
          "th": "การจัดวางองค์ประกอบ ภาพ และสีสันในภาพอย่างลงตัว ไม่หนักไปข้างใดข้างหนึ่งจนเอียง ⚖️",
          "en": "Arranging visual elements and colors harmoniously so neither side feels awkwardly lopsided",
          "zh": "巧妙布局画中景物与色彩重度，使左右上下整体视觉重力均匀安稳 ⚖️"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-cre-e10-2",
        "label": {
          "th": "การระบายสีดำทับทั้งภาพจนมิด",
          "en": "Painting whole canvas black",
          "zh": "把整幅画全部刷满黑漆涂抹均匀"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k3-cre-e10-3",
        "label": {
          "th": "การฉีกกระดาษเป็นชิ้นเล็กเท่าเม็ดทราย",
          "en": "Shredding paper to sand bits",
          "zh": "把画纸撕成细碎沙粒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-e10-1",
    "explanation": {
      "th": "ความสมดุลทำให้ภาพดูสง่างาม มีพลัง และสบายตา เก่งมากครับ!",
      "en": "Awesome! Balance creates visual stability and comfortable compositional harmony.",
      "zh": "太棒了！良好的均衡构图使艺术作品展现出稳定协调的古典美感。"
    }
  },
  {
    "id": "k3-cre-m1",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 1: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #1: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 1 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m1-1",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m1-2",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m1-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m1-2",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m2",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 2: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #2: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 2 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m2-1",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-m2-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m2-3",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      }
    ],
    "correctOptionId": "opt-k3-cre-m2-3",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m3",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 3: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #3: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 3 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m3-1",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m3-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m3-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m3-1",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m4",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 4: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #4: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 4 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m4-1",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m4-2",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m4-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m4-2",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m5",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 5: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #5: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 5 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m5-1",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-m5-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m5-3",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      }
    ],
    "correctOptionId": "opt-k3-cre-m5-3",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m6",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 6: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #6: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 6 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m6-1",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m6-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m6-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m6-1",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m7",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 7: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #7: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 7 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m7-1",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m7-2",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m7-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m7-2",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m8",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 8: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #8: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 8 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m8-1",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-m8-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m8-3",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      }
    ],
    "correctOptionId": "opt-k3-cre-m8-3",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m9",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 9: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #9: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 9 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m9-1",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m9-2",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m9-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m9-1",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-m10",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการประพันธ์และวรรณศิลป์ระดับชั้นอนุบาล 3 ชุดที่ 10: การใช้ \"คำสัมผัสคล้องจอง\" ในบทกลอนเด็ก เช่น \"กะลา-ตากลม-ผมยาว\" ช่วยสร้างความรู้สึกอย่างไร? 🎵",
      "en": "K3 Rhyme & Language Arts #10: How does poetic RHYMING in children's verses 🎵 delight the ear?",
      "zh": "幼儿园大班音韵文学素养第 10 题：在少儿儿歌童谣中押韵押字（如：“小鸭子，嘎嘎叫；走起路，摇啊摇”）🎵，会产生怎样动人的听觉艺术魅力？"
    },
    "illustration": "🎵 📜 🗣️",
    "illustrationSubtitle": {
      "th": "คำสัมผัสคล้องจองในบทกลอนเด็ก",
      "en": "Rhyming patterns in children poetry",
      "zh": "儿歌童谣的押韵与律动美"
    },
    "options": [
      {
        "id": "opt-k3-cre-m10-1",
        "label": {
          "th": "ทำให้ทุกคนปวดศีรษะมึนงง",
          "en": "Causes severe headaches",
          "zh": "让人头皮发麻晕头转向"
        },
        "icon": "🤕"
      },
      {
        "id": "opt-k3-cre-m10-2",
        "label": {
          "th": "ทำให้บทกลอนมีท่วงทำนองไพเราะ จดจำง่าย และสนุกสนานเพลิดเพลินในการขับร้อง 🎵",
          "en": "Creates melodic musical cadence, easy memory recall, and joyful chanting rhythm",
          "zh": "朗朗上口、悦耳动听，具有天然的音乐节奏感且极易记忆传唱 🎵"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k3-cre-m10-3",
        "label": {
          "th": "ทำให้กระดาษหนังสือขาดกระจุย",
          "en": "Tears book paper",
          "zh": "使书本纸张自动碎裂"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-m10-2",
    "explanation": {
      "th": "สัมผัสคล้องจองสร้างจังหวะดนตรีในภาษา ช่วยพัฒนาความจำและความคิดสร้างสรรค์ เก่งมากครับ!",
      "en": "Correct! Rhyme schemes endow spoken language with musical delight and memorability.",
      "zh": "答对了！押韵使语言富有韵律节拍之美，激发对语言文学的感知力。"
    }
  },
  {
    "id": "k3-cre-h1",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 1: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #1: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 1 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h1-1",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h1-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h1-3",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k3-cre-h1-3",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h2",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 2: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #2: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 2 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h2-1",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h2-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h2-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h2-1",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h3",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 3: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #3: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 3 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h3-1",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h3-2",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h3-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h3-2",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h4",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 4: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #4: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 4 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h4-1",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h4-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h4-3",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k3-cre-h4-3",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h5",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 5: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #5: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 5 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h5-1",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h5-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h5-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h5-1",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h6",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 6: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #6: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 6 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h6-1",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h6-2",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h6-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h6-2",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h7",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 7: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #7: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 7 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h7-1",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h7-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h7-3",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k3-cre-h7-3",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h8",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 8: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #8: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 8 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h8-1",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h8-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h8-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h8-1",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h9",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 9: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #9: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 9 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h9-1",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h9-2",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-cre-h9-3",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-cre-h9-2",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  },
  {
    "id": "k3-cre-h10",
    "grade": "K3",
    "subject": "creativity",
    "skillCode": "5",
    "difficulty": 3,
    "question": {
      "th": "ทักษะความคิดสร้างสรรค์ขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 10: การคิดเชิงนวัตกรรมเพื่อสังคม \"ออกแบบเครื่องกรองน้ำดักขยะอัจฉริยะในคลอง\" 🌊 ควรคำนึงถึงสิ่งใดเป็นอันดับแรก?",
      "en": "K3 Advanced Innovation #10: Designing an intelligent canal trash-trap & water filter 🌊: What is paramount?",
      "zh": "幼儿园大班工程创新设计第 10 题：针对河流污染问题，小小工程师构想设计一套“河道智能漂浮垃圾拦截与水质净化机” 🌊 时，最核心的科学考量是？"
    },
    "illustration": "🌊 💡 🐟",
    "illustrationSubtitle": {
      "th": "การออกแบบนวัตกรรมแก้ปัญหาสิ่งแวดล้อม",
      "en": "Eco-innovation design thinking",
      "zh": "工程设计思维与生态友好性"
    },
    "options": [
      {
        "id": "opt-k3-cre-h10-1",
        "label": {
          "th": "ต้องมีขนาดเล็กเท่าเมล็ดข้าวเปลือก",
          "en": "Must be size of a grain of rice",
          "zh": "必须做得像一粒米饭那么小巧玲珑毫无作用"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h10-2",
        "label": {
          "th": "ต้องระบายน้ำเสียลงทะเลให้หมดเร็วที่สุด",
          "en": "Pump raw sewage to sea",
          "zh": "用高压水枪把所有污水一股脑强行冲入大海深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-cre-h10-3",
        "label": {
          "th": "สามารถดักจับขยะลอยน้ำได้มีประสิทธิภาพ โดยไม่ทำอันตรายต่อปลาและสิ่งมีชีวิตในน้ำ 🐟 🌿",
          "en": "Effectively captures floating debris without harming fish or aquatic wildlife ecosystems",
          "zh": "既能高效自动拦截阻截水面塑料垃圾，又绝对不伤害小鱼小虾等水生动物的生息通道 🐟 🌿"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k3-cre-h10-3",
    "explanation": {
      "th": "นวัตกรรมที่แท้จริงต้องคำนึงถึงความปลอดภัยของระบบนิเวศและสิ่งแวดล้อม เก่งมากครับ!",
      "en": "Spot on! True human engineering balances utilitarian efficiency with environmental stewardship.",
      "zh": "太棒了！卓越的创新必须将生态环保与动物友好置于首要核心考量！"
    }
  }
];
