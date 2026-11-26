export interface FunFact {
  id: string;
  category: 'animals' | 'body' | 'space' | 'nature' | 'ocean' | 'science' | 'fruits' | 'numbers';
  categoryLabel: {
    th: string;
    en: string;
    zh?: string;
  };
  icon: string;
  badgeColor: string; // Tailwind color styles
  title: {
    th: string;
    en: string;
    zh?: string;
  };
  fact: {
    th: string;
    en: string;
    zh?: string;
  };
  curiosityQuestion: {
    th: string;
    en: string;
    zh?: string;
  };
}

export const FUN_FACTS: FunFact[] = [
  {
    id: 'elephant_ears',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐘',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'หูของพี่ช้างตัวโต', en: "Big Elephant's Ears" },
    fact: {
      th: 'รู้หรือไม่? พี่ช้างสะบัดหูไปมาไม่ได้แค่ไล่แมลงนะ แต่หูของช้างช่วยพัดระบายความร้อน เหมือนพัดลมติดตัวเลย!',
      en: 'Did you know? Elephants flap their big ears not just to shoo bugs, but to cool down their body like a built-in fan!',
    },
    curiosityQuestion: {
      th: 'ลองทำมือเป็นใบหูใหญ่ๆ แล้วพัดลมดูสิ รู้สึกเย็นขึ้นไหมนะ?',
      en: 'Try making big ears with your hands and flapping them! Feel the breeze?',
    },
  },
  {
    id: 'honeybee_dance',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐝',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    title: { th: 'การเต้นระบำของผึ้งน้อย', en: 'The Dancing Bees' },
    fact: {
      th: 'ผึ้งน้อยคุยกับเพื่อนๆ ด้วยการเต้นส่ายก้น! เมื่อเจอทุ่งดอกไม้หอมหวาน ผึ้งจะบินกลับรังแล้วเต้นบอกทิศทางให้เพื่อนๆ บินตามไป',
      en: 'Honeybees talk to their friends by doing a waggle dance! It tells other bees exactly where sweet flowers are.',
    },
    curiosityQuestion: {
      th: 'ถ้าเราเต้นส่ายก้นแบบผึ้งน้อย เพื่อนจะรู้ไหมนะว่าเรากำลังบอกอะไร?',
      en: 'If we did a wiggle dance like bees, what would we tell our friends?',
    },
  },
  {
    id: 'dolphin_sleep',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Ocean Friends' },
    icon: '🐬',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    title: { th: 'โลมานอนหลับตาข้างเดียว', en: 'Dolphin Sleeping Trick' },
    fact: {
      th: 'เวลานอนหลับ พี่โลมาจะหลับตาเพียงข้างเดียว และให้สมองพักผ่อนทีละครึ่ง เพื่อจะได้คอยว่ายน้ำขึ้นมาหายใจและระวังภัยได้ตลอดเวลา!',
      en: 'When dolphins sleep, they close only one eye! One half of their brain rests while the other stays awake to breathe.',
    },
    curiosityQuestion: {
      th: 'น้องๆ ลองหลับตาข้างเดียวกะพริบตาข้างเดียวได้ไหมเอ่ย?',
      en: 'Can you close just one eye like a smart dolphin?',
    },
  },
  {
    id: 'butterfly_feet',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '🦋',
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    title: { th: 'ผีเสื้อชิมรสด้วยเท้า', en: 'Butterflies Taste with Feet' },
    fact: {
      th: 'ผีเสื้อไม่ได้ใช้ลิ้นชิมรสนะ! แต่ผีเสื้อมีปุ่มรับรสอยู่ที่ปลายเท้า เมื่อเกาะบนใบไม้หรือดอกไม้ ก็จะรู้ได้ทันทีว่าหวานและอร่อยไหม',
      en: 'Butterflies do not taste with their tongues! They have taste buds on their feet to know if a flower is sweet.',
    },
    curiosityQuestion: {
      th: 'ถ้าคนเราชิมไอศกรีมด้วยปลายเท้าได้ คงจะจั๊กจี้และตลกน่าดูเลยเนอะ!',
      en: 'Imagine tasting ice cream with your toes! That would tickle so much!',
    },
  },
  {
    id: 'human_heart',
    category: 'body',
    categoryLabel: { th: 'ร่างกายแสนวิเศษ', en: 'Our Amazing Body' },
    icon: '❤️',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    title: { th: 'หัวใจเต้นตึกตัก', en: 'Our Beating Heart' },
    fact: {
      th: 'หัวใจของเรามีขนาดประมาณกำปั้นมือของตัวเราเอง และเต้นตึกตักส่งพลังเลือดไปเลี้ยงทั่วร่างกายตลอดเวลา ทั้งยามตื่นและยามหลับปุ๋ย!',
      en: 'Your heart is about the same size as your closed fist! It beats day and night to send healthy blood everywhere.',
    },
    curiosityQuestion: {
      th: 'ลองเอามือทาบอกด้านซ้ายดูสิ น้องๆ รู้สึกถึงจังหวะตึกตักไหมนะ?',
      en: 'Put your hand on your chest! Can you feel the gentle thump-thump rhythm?',
    },
  },
  {
    id: 'rainbow_sun_rain',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '🌈',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    title: { th: 'สายรุ้ง 7 สีบนท้องฟ้า', en: 'The 7-Color Rainbow' },
    fact: {
      th: 'สายรุ้งแสนสวยจะปรากฏขึ้นเมื่อมีแสงแดดส่องผ่านละอองฝนเม็ดเล็กๆ ในอากาศ จนกระจายออกเป็น 7 สีสดใส ได้แก่ ม่วง คราม น้ำเงิน เขียว เหลือง แสด แดง!',
      en: 'A beautiful rainbow appears when sunshine shines through tiny raindrops, splitting light into 7 glowing colors!',
    },
    curiosityQuestion: {
      th: 'น้องๆ จำได้ไหมนะว่าสีโปรดของตัวเองอยู่ในสายรุ้งหรือเปล่า?',
      en: 'Which color in the rainbow is your favorite?',
    },
  },
  {
    id: 'sun_giant',
    category: 'space',
    categoryLabel: { th: 'โลกและอวกาศ', en: 'Earth & Space' },
    icon: '☀️',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    title: { th: 'ดวงอาทิตย์ยักษ์ใหญ่', en: 'The Giant Sun' },
    fact: {
      th: 'ดวงอาทิตย์ที่เราเห็นบนท้องฟ้าตอนเช้า ใหญ่โตมหาศาลมาก จนสามารถใส่ลูกโลกใบกลมๆ ของเราเข้าไปข้างในได้มากกว่า 1 ล้านใบเลยทีเดียว!',
      en: 'The bright morning Sun is so gigantic that over one million Earths could fit inside it!',
    },
    curiosityQuestion: {
      th: 'วันนี้ตื่นมาเจอแสงแดดอบอุ่นแล้วหรือยังนะ?',
      en: 'Did you feel the warm and cheerful sunshine today?',
    },
  },
  {
    id: 'octopus_three_hearts',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Ocean Friends' },
    icon: '🐙',
    badgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
    title: { th: 'พี่ปลาหมึกยักษ์มี 3 หัวใจ', en: 'Octopus Has 3 Hearts' },
    fact: {
      th: 'คนเรามีหัวใจ 1 ดวง แต่พี่ปลาหมึกยักษ์ในทะเลมีหัวใจถึง 3 ดวง! และมีเลือดเป็นสีฟ้าสดใส ไม่ใช่สีแดงเหมือนมนุษย์ด้วยนะ',
      en: 'Humans have 1 heart, but an octopus has 3 hearts! Plus, their blood is a cool blue color instead of red.',
    },
    curiosityQuestion: {
      th: 'ถ้าเรามี 3 หัวใจแบบพี่ปลาหมึก เราจะรักคุณพ่อคุณแม่ได้เยอะขึ้น 3 เท่าไหมนะ?',
      en: 'With three hearts, could an octopus give three times as many hugs?',
    },
  },
  {
    id: 'giraffe_sleep',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦒',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    title: { th: 'พี่ยีราฟคอยาวนอนน้อยจัง', en: 'Giraffe Nap Time' },
    fact: {
      th: 'พี่ยีราฟที่ตัวสูงโย่ง คอยาวที่สุดในโลก นอนหลับแค่วันละประมาณ 30 นาทีเท่านั้นเอง และมักจะยืนหลับเพื่อพร้อมวิ่งเมื่อมีภัย!',
      en: 'Tall giraffes sleep only about 30 minutes a day! They usually nap while standing up, ready to run if needed.',
    },
    curiosityQuestion: {
      th: 'แต่น้องๆ ต้องนอนหลับพักผ่อนให้เต็มที่ 9-10 ชั่วโมง ร่างกายจะได้สูงและแข็งแรงนะ!',
      en: 'Unlike giraffes, kids need 9-10 hours of good sleep to grow tall and strong!',
    },
  },
  {
    id: 'banana_curved',
    category: 'fruits',
    categoryLabel: { th: 'ผลไม้แสนอร่อย', en: 'Tasty Fruits' },
    icon: '🍌',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'ทำไมกล้วยถึงงอโค้ง?', en: 'Why Are Bananas Curved?' },
    fact: {
      th: 'ผลกล้วยตอนยังเล็กจะห้อยลงล่าง แต่พอยิ่งโต กล้วยจะพยายามหงายขึ้นด้านบนเพื่อเอื้อมรับแสงแดด จึงทำให้กล้วยงอโค้งเป็นรูปพระจันทร์เสี้ยว!',
      en: 'Bananas start growing down, but then reach upward toward the sunlight! That reach makes them curved like a smiling moon.',
    },
    curiosityQuestion: {
      th: 'กล้วยมีรสหวาน หอม อร่อย และมีวิตามินช่วยให้สมองสดชื่นด้วยนะ!',
      en: 'Bananas look like bright yellow smiles and give you tons of playground energy!',
    },
  },
  {
    id: 'plant_drink_sun',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '🌱',
    badgeColor: 'bg-green-100 text-green-900 border-green-300',
    title: { th: 'ต้นไม้กินแสงแดดเป็นอาหาร', en: 'Plants Drink Sunshine' },
    fact: {
      th: 'ต้นไม้และใบไม้สีเขียว ปรุงอาหารเองได้โดยใช้แสงแดด น้ำ และอากาศ ใบไม้จะดูดอากาศเสียแล้วปล่อยอากาศบริสุทธิ์ให้เราได้สูดหายใจสดชื่น',
      en: 'Green plants make their own yummy food from sunshine, water, and air! They breathe out fresh clean air for us.',
    },
    curiosityQuestion: {
      th: 'ลองสูดหายใจเข้าลึกๆ ฟื้ดดด... ขอบคุณคุณต้นไม้รอบบ้านกันนะ!',
      en: 'Take a deep breath of fresh air! Let’s thank the happy green trees outside.',
    },
  },
  {
    id: 'bones_baby_adult',
    category: 'body',
    categoryLabel: { th: 'ร่างกายแสนวิเศษ', en: 'Our Amazing Body' },
    icon: '🦴',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    title: { th: 'กระดูกมหัศจรรย์ของเรา', en: 'Our Growing Bones' },
    fact: {
      th: 'ตอนเราเป็นเบบี๋แรกเกิด เรามีกระดูกประมาณ 300 ชิ้น แต่เมื่อโตขึ้น กระดูกชิ้นเล็กๆ จะค่อยๆ เชื่อมต่อกันจนเหลือ 206 ชิ้นที่แข็งแรงมากๆ!',
      en: 'Babies are born with about 300 bones! As you grow up, some bones join together to make 206 strong bones.',
    },
    curiosityQuestion: {
      th: 'ดื่มนมวันละ 1-2 กล่อง ช่วยให้กระดูกและฟันของน้องๆ แข็งแรงและตัวสูงขึ้นด้วยนะ!',
      en: 'Drinking milk and eating veggies keeps your bones happy, healthy, and super strong!',
    },
  },
  {
    id: 'koala_fingerprint',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐨',
    badgeColor: 'bg-stone-100 text-stone-900 border-stone-300',
    title: { th: 'ลายนิ้วมือของพี่โคอาลา', en: "Koala's Fingerprints" },
    fact: {
      th: 'พี่โคอาลาขนนุ่มที่ชอบกอดต้นไม้ มีลายนิ้วมือที่เหมือนกับลายนิ้วมือของคนเรามากๆ แทบแยกไม่ออกเลย!',
      en: 'Fuzzy koalas have fingerprints that look almost exactly like human fingerprints! Even microscopes can hardly tell.',
    },
    curiosityQuestion: {
      th: 'ลองมองดูลายนิ้วมือของตัวเองสิ มีลายก้นหอยหรือเส้นโค้งแบบไหนบ้างนะ?',
      en: 'Look closely at your thumb! Can you see the little swirl lines?',
    },
  },
  {
    id: 'moon_footsteps',
    category: 'space',
    categoryLabel: { th: 'โลกและอวกาศ', en: 'Earth & Space' },
    icon: '🌕',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    title: { th: 'รอยเท้าบนดวงจันทร์', en: 'Footprints on the Moon' },
    fact: {
      th: 'บนดวงจันทร์ไม่มีลมพัดและไม่มีฝนตก รอยเท้าของนักบินอวกาศที่เคยไปเดินไว้เมื่อ 50 ปีก่อน จึงยังคงอยู่เหมือนเดิมเป๊ะๆ!',
      en: 'There is no wind or rain on the Moon, so astronauts’ footprints can stay there undisturbed for millions of years!',
    },
    curiosityQuestion: {
      th: 'ถ้าน้องๆ ได้ขึ้นจรวดไปดวงจันทร์ อยากทิ้งรอยเท้าแบบไหนไว้เอ่ย?',
      en: 'If you could fly to the Moon in a shiny rocket, what would you bring?',
    },
  },
  {
    id: 'chameleon_eyes',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦎',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    title: { th: 'ตาสองข้างของกิ้งก่าคาเมเลียน', en: "Chameleon's Super Eyes" },
    fact: {
      th: 'กิ้งก่าคาเมเลียนสามารถขยับดวงตา 2 ข้างมองไปคนละทิศพร้อมกันได้ ข้างหนึ่งมองไปข้างหน้า อีกข้างมองไปข้างหลังได้สบายมาก!',
      en: 'Chameleons can move their two eyes independently! One eye can look forward while the other looks behind.',
    },
    curiosityQuestion: {
      th: 'กิ้งก่ายังเก่งเรื่องเปลี่ยนสีตัวให้กลมกลืนกับใบไม้ เพื่อซ่อนตัวได้ด้วยนะ!',
      en: 'They also change colors to match leaves and trees like magical camouflage!',
    },
  },
  {
    id: 'smile_muscles',
    category: 'body',
    categoryLabel: { th: 'ร่างกายแสนวิเศษ', en: 'Our Amazing Body' },
    icon: '😊',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    title: { th: 'พลังวิเศษของรอยยิ้ม', en: 'The Magic of Smiling' },
    fact: {
      th: 'เวลายิ้ม ร่างกายจะหลั่งสารแห่งความสุข ทำให้เรารู้สึกสดชื่น อารมณ์ดี และส่งต่อรอยยิ้มให้คุณครูกับเพื่อนๆ มีความสุขตามไปด้วย!',
      en: 'Smiling releases happy feelings in your brain! It helps you feel calm, joyful, and makes everyone around smile too.',
    },
    curiosityQuestion: {
      th: 'ตอนนี้น้องๆ ลองส่งยิ้มหวานๆ กว้างๆ ให้หน้าจอ 1 ครั้งดูสิคะ/ครับ! ยิ้มสวยจังเลย ✨',
      en: 'Give a big warm smile right now! You look so bright and wonderful! ✨',
    },
  },
  {
    id: 'strawberry_seeds',
    category: 'fruits',
    categoryLabel: { th: 'ผลไม้แสนอร่อย', en: 'Tasty Fruits' },
    icon: '🍓',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    title: { th: 'เมล็ดสตรอว์เบอร์รีอยู่ข้างนอก', en: 'Strawberry Outside Seeds' },
    fact: {
      th: 'ผลไม้ส่วนใหญ่จะมีเมล็ดซ่อนอยู่ข้างในเนื้อ แต่สตรอว์เบอร์รีสีแดงสดเป็นผลไม้พิเศษที่มีเมล็ดเล็กๆ อยู่ด้านนอกผิวผลถึง 200 เมล็ด!',
      en: 'Most fruits keep their seeds tucked safely inside, but strawberries wear about 200 tiny seeds on the outside!',
    },
    curiosityQuestion: {
      th: 'ผลสตรอว์เบอร์รีมีวิตามินซีเยอะมาก ช่วยป้องกันหวัดได้ดีเยี่ยมเลย!',
      en: 'Strawberries are sweet, juicy, and packed with Vitamin C to keep you healthy!',
    },
  },
  {
    id: 'penguin_swimming',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐧',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    title: { th: 'นกเพนกวินว่ายน้ำเก่งที่สุด', en: 'Penguins Fly Underwater' },
    fact: {
      th: 'เพนกวินเป็นนกที่บินบนท้องฟ้าไม่ได้ แต่ปีกของเพนกวินทำหน้าที่เหมือนใบพาย ทำให้เพนกวินว่ายน้ำดำน้ำได้เร็วเหมือนกำลังบินใต้น้ำ!',
      en: 'Penguins cannot fly in the air, but their flippers let them zoom and dive so fast it looks like flying underwater!',
    },
    curiosityQuestion: {
      th: 'เวลาเดินเตาะแตะบนน้ำแข็ง เพนกวินจะกางปีกทรงตัว ดุ๊กดิ๊กน่ารักมากเลยเนอะ!',
      en: 'Have you seen penguins waddle on ice? Waddle, waddle, splash!',
    },
  },
  {
    id: 'numbers_finger_counting',
    category: 'numbers',
    categoryLabel: { th: 'ตัวเลขแสนวิเศษ', en: 'Magic Numbers' },
    icon: '🖐️',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'มือสองข้างมี 10 นิ้วพอดี', en: 'Ten Super Fingers' },
    fact: {
      th: 'มือทั้งสองข้างของเรามี 10 นิ้วพอดีเป๊ะ นิ้วมือช่วยให้เรานับเลข 1 ถึง 10 ได้ง่ายๆ และยังช่วยหยิบจับของเล่น วาดรูป และกอดกันได้ด้วย!',
      en: 'Our two hands have exactly 10 fingers! They help us count 1 to 10 easily, color pictures, and hold hands.',
    },
    curiosityQuestion: {
      th: 'ลองชูนิ้วขึ้นมานับ 1, 2, 3, 4, 5... จนครบ 10 นิ้วพร้อมๆ กันดูสิ!',
      en: 'Let’s wiggle all 10 fingers together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10!',
    },
  },
  {
    id: 'cat_whiskers',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐱',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    title: { th: 'หนวดวิเศษของน้องแมว', en: "Kitty's Radar Whiskers" },
    fact: {
      th: 'หนวดของน้องแมวไม่ได้มีไว้เพื่อความน่ารักเท่านั้นนะ แต่หนวดทำหน้าที่เหมือนเสาเรดาร์ วัดความกว้างของช่องว่างว่าตัวแมวจะลอดผ่านได้ไหม!',
      en: 'A cat’s whiskers are like super sensors! They measure spaces so cats know if they can squeeze through without getting stuck.',
    },
    curiosityQuestion: {
      th: 'แมวยังใช้หนวดบอกอารมณ์ด้วยนะ ถ้าหนวดชี้ไปข้างหน้าแปลว่ากำลังตื่นเต้นและอยากเล่น!',
      en: 'Cats also twitch their whiskers when they are playful and curious!',
    },
  },
  {
    id: 'sea_turtle_memory',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Ocean Friends' },
    icon: '🐢',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    title: { th: 'แม่เต่าทะเลความจำดีเยี่ยม', en: 'Sea Turtle Travel Memory' },
    fact: {
      th: 'เต่าทะเลว่ายน้ำข้ามมหาสมุทรไปไกลหลายพันกิโลเมตร แต่เมื่อถึงเวลาวางไข่ แม่เต่าจะว่ายกลับมาที่ชายหาดเดิมที่ตัวเองเคยเกิดได้อย่างแม่นยำ!',
      en: 'Mother sea turtles swim thousands of miles across oceans, but always navigate back to the exact beach where they were born!',
    },
    curiosityQuestion: {
      th: 'เหมือนเต่าทะเลมีเข็มทิศวิเศษติดตัวอยู่ตลอดเวลาเลยนะ!',
      en: 'It is like sea turtles have their own built-in ocean GPS compass!',
    },
  },
  {
    id: 'water_cycle',
    category: 'science',
    categoryLabel: { th: 'วิทยาศาสตร์รอบตัว', en: 'Fun Science' },
    icon: '💧',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    title: { th: 'การเดินทางของหยดน้ำ', en: 'The Water Droplet Journey' },
    fact: {
      th: 'น้ำที่เราดื่มวันนี้ อาจเคยเป็นก้อนเมฆลอยบนฟ้า หรือเป็นเม็ดฝนตกลงบนภูเขามาก่อน! น้ำจะหมุนเวียนเปลี่ยนรูปไปเรื่อยๆ ไม่มีวันหายไปไหน',
      en: 'The water we drink today has been traveling for millions of years—becoming clouds, raindrops, and flowing rivers!',
    },
    curiosityQuestion: {
      th: 'การดื่มน้ำสะอาดวันละ 6-8 แก้ว จะช่วยให้สมองของน้องๆ ไบรท์สดใสและแข็งแรงนะ!',
      en: 'Drinking clean water keeps your brain sharp and energetic for fun games!',
    },
  },
  {
    id: 'snail_teeth',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '🐌',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'หอยทากตัวจิ๋วมีฟันนับพัน', en: 'Snail Tiny Teeth' },
    fact: {
      th: 'แม้หอยทากจะตัวเล็กนิดเดียวและเดินช้าๆ แต่ในปากของหอยทากมีฟันจิ๋วๆ เรียงกันบนแถบลิ้นมากถึง 14,000 ซี่ ไว้คอยขูดกินใบไม้!',
      en: 'Even though snails are tiny and crawl slowly, they have up to 14,000 microscopic teeth to gently scrape yummy leaves!',
    },
    curiosityQuestion: {
      th: 'คนเรามีฟันน้ำนม 20 ซี่ น้องๆ อย่าลืมแปรงฟันวันละ 2 ครั้งให้ฟันขาวสะอาดนะ!',
      en: 'We have 20 baby teeth—remember to brush them twice a day to keep them sparkling clean!',
    },
  },
  {
    id: 'dinosaur_birds',
    category: 'science',
    categoryLabel: { th: 'วิทยาศาสตร์รอบตัว', en: 'Fun Science' },
    icon: '🦖',
    badgeColor: 'bg-lime-100 text-lime-900 border-lime-300',
    title: { th: 'นกน้อยคือญาติของไดโนเสาร์', en: 'Birds and Dinosaurs' },
    fact: {
      th: 'รู้หรือไม่? นกกระจิบและนกพิราบที่บินอยู่นอกหน้าต่าง เป็นญาติสายตรงของไดโนเสาร์กินเนื้อตัวยักษ์อย่างทีเร็กซ์ (T-Rex) เลยนะ!',
      en: 'Did you know? Chirping birds outside your window are actually related to ancient feathered dinosaurs like T-Rex!',
    },
    curiosityQuestion: {
      th: 'ถ้าไดโนเสาร์บินมาร้องจิ๊บๆ นอกบ้านคงตลกน่าดูเลยเนอะ!',
      en: 'Can you imagine a little dinosaur chirping like a sparrow on a tree branch?',
    },
  },
  {
    id: 'flamingo_pink',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦩',
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    title: { th: 'ทำไมนกฟลามิงโกถึงมีขนสีชมพู', en: 'Why Are Flamingos Pink?' },
    fact: {
      th: 'ตอนเกิดใหม่ๆ ขนของนกฟลามิงโกเป็นสีเทานะ! แต่ที่ตัวกลายเป็นสีชมพูสวยหวาน เพราะพวกมันชอบกินกุ้งจิ๋วและสาหร่ายสีชมพูเป็นอาหาร',
      en: 'Flamingos are actually born with grey feathers! They turn vibrant pink because of the natural pink shrimp and algae they love to eat.',
    },
    curiosityQuestion: {
      th: 'ถ้าเรากินแครอทสีส้มทุกวัน ตัวเราจะเปลี่ยนสีเหมือนฟลามิงโกไหมนะ?',
      en: 'If we ate lots of orange carrots every day, would we turn colorful too?',
    },
  },
  {
    id: 'owl_head_turn',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦉',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'พี่นกฮูกหมุนคอได้รอบทิศ', en: "Owl's Super Turning Neck" },
    fact: {
      th: 'พี่นกฮูกกลอกลูกตาไปมาเหมือนคนเราไม่ได้ แต่ธรรมชาติให้คอพิเศษที่หมุนได้เกือบเป็นวงกลมถึง 270 องศาเพื่อมองรอบตัวโดยไม่ต้องขยับตัวเลย!',
      en: 'Owls cannot move their eyeballs, so nature gave them amazing necks that can turn up to 270 degrees to look around without moving their body!',
    },
    curiosityQuestion: {
      th: 'ลองหันหน้าไปทางซ้ายและขวาดูสิ หันได้ไกลแค่ไหนเอ่ย?',
      en: 'Try turning your head gently left and right! How far can you look?',
    },
  },
  {
    id: 'cheetah_speed',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐆',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    title: { th: 'เสือชีตาห์ ราชาแห่งความเร็ว', en: 'Cheetah: The Speed Champion' },
    fact: {
      th: 'เสือชีตาห์คือสัตว์บกที่วิ่งเร็วที่สุดในโลก! ออกตัววิ่งจาก 0 ถึง 100 กิโลเมตรต่อชั่วโมงได้ภายใน 3 วินาที เร็วยิ่งกว่ารถซูเปอร์คาร์เสียอีก',
      en: 'Cheetahs are the fastest land animals! They can sprint from 0 to 60 mph in just 3 seconds, faster than most race sports cars!',
    },
    curiosityQuestion: {
      th: 'ถ้าน้องๆ สวมรองเท้าวิ่งแข่งกับเสือชีตาห์ คิดว่าจะวิ่งได้กี่ก้าวกันนะ?',
      en: 'If you put on your running shoes, how fast do you like to run and dash?',
    },
  },
  {
    id: 'sea_otter_hands',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦦',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    title: { th: 'ตัวนากทะเลนอนจับมือกัน', en: 'Sea Otters Hold Hands' },
    fact: {
      th: 'เวลานากทะเลนอนหลับลอยตัวอยู่เหนือน้ำ พวกมันจะจับมือเพื่อนหรือคนในครอบครัวไว้แน่น เพื่อไม่ให้คลื่นน้ำพัดลอยแยกจากกัน น่ารักมากๆ เลย',
      en: 'When sea otters take naps while floating on the ocean, they hold hands so the gentle waves won’t drift them apart!',
    },
    curiosityQuestion: {
      th: 'ลองจับมือเพื่อนข้างๆ หรือคุณพ่อคุณแม่ดูสิ อบอุ่นหัวใจไหมนะ?',
      en: 'Try holding hands with someone next to you! Doesn’t it feel cozy and safe?',
    },
  },
  {
    id: 'frog_water_skin',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🐸',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    title: { th: 'พี่กบดื่มน้ำทางผิวหนัง', en: 'Frogs Drink with Their Skin' },
    fact: {
      th: 'พี่กบไม่เคยอ้าปากกลืนน้ำเหมือนคนเราเลยนะ! แต่พี่กบจะดูดซึมน้ำและความชุ่มชื้นผ่านทางผิวหนังบางๆ รอบตัวแทน',
      en: 'Frogs never swallow water with their mouths! Instead, they absorb moisture directly through their cool, smooth skin.',
    },
    curiosityQuestion: {
      th: 'เวลาอาบน้ำ น้องๆ เคยรู้สึกว่าผิวสดชื่นเหมือนพี่กบไหมเอ่ย?',
      en: 'When you take a splashy bath, do you feel fresh and clean like a happy frog?',
    },
  },
  {
    id: 'kangaroo_pouch',
    category: 'animals',
    categoryLabel: { th: 'สัตว์โลกน่ารัก', en: 'Cute Animals' },
    icon: '🦘',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    title: { th: 'ลูกจิงโจ้ในกระเป๋าหน้าท้อง', en: 'Baby Joey in Mother’s Pouch' },
    fact: {
      th: 'ตอนลูกจิงโจ้เกิดใหม่ ตัวของมันมีขนาดจิ๋วเท่าเมล็ดถั่วแดงเท่านั้น! แล้วจะคลานเข้าไปกินนมและนอนอบอุ่นในกระเป๋าหน้าท้องของคุณแม่จนโต',
      en: 'When a baby kangaroo is born, it is as tiny as a jellybean! It crawls safely into mom’s snug tummy pouch to grow big and strong.',
    },
    curiosityQuestion: {
      th: 'ถ้าเรามีกระเป๋าวิเศษหน้าท้อง น้องๆ อยากใส่ของเล่นอะไรไว้ข้างในบ้าง?',
      en: 'If you had a warm cozy tummy pocket, what favorite toy would you keep inside?',
    },
  },
  {
    id: 'clownfish_anemone',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Deep Ocean' },
    icon: '🐠',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    title: { th: 'ปลานีโมกับดอกไม้ทะเล', en: 'Clownfish and Sea Anemone' },
    fact: {
      th: 'ดอกไม้ทะเลมีหนวดพิษที่ปลาอื่นโดนแล้วเจ็บ แต่ปลานีโมมีเมือกพิเศษเคลือบตัว ทำให้ว่ายเข้าไปนอนกอดดอกไม้ทะเลได้อย่างปลอดภัยและช่วยดูแลกันและกัน',
      en: 'Sea anemones have stinging tentacles that tickle or sting, but clownfish have a special slimy coat that keeps them safe and snug inside!',
    },
    curiosityQuestion: {
      th: 'เพื่อนซี้ของน้องๆ ช่วยดูแลและแบ่งปันของเล่นอะไรให้กันบ้างนะ?',
      en: 'How do you and your best friend help and take good care of each other?',
    },
  },
  {
    id: 'blue_whale_heart',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Deep Ocean' },
    icon: '🐋',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    title: { th: 'หัวใจวาฬสีน้ำเงินใหญ่เท่ารถยนต์', en: 'Blue Whale’s Car-Sized Heart' },
    fact: {
      th: 'วาฬสีน้ำเงินคือสัตว์ที่ตัวใหญ่ที่สุดในประวัติศาสตร์โลก! หัวใจของมันหนักถึง 180 กิโลกรัม และใหญ่พอๆ กับรถยนต์คันเล็กๆ หนึ่งคันเลยนะ',
      en: 'The blue whale is the biggest creature to ever live on Earth! Its giant heart weighs about 400 pounds—as big as a small bumper car!',
    },
    curiosityQuestion: {
      th: 'ลองเอามือทาบอกด้านซ้าย รู้สึกถึงเสียงหัวใจเต้น ตึกตักๆ ไหม?',
      en: 'Put your hand over your left chest. Can you feel your heartbeat go thump-thump?',
    },
  },
  {
    id: 'seahorse_dad',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Deep Ocean' },
    icon: '🫧',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    title: { th: 'คุณพ่อม้าน้ำอุ้มท้องคลอดลูก', en: 'Super Dad Seahorse' },
    fact: {
      th: 'ในโลกใต้ทะเล คุณพ่อม้าน้ำเป็นผู้รับไข่มาใส่ในถุงหน้าท้อง แล้วอุ้มท้องดูแลลูกๆ จนกระทั่งคลอดลูกม้าน้ำตัวจิ๋วออกมานับร้อยตัว!',
      en: 'In the ocean world, daddy seahorses carry the eggs in their special brood pouch and give birth to hundreds of tiny baby seahorses!',
    },
    curiosityQuestion: {
      th: 'คุณพ่อหรือผู้ปกครองของน้องๆ เคยทำอะไรน่ารักๆ หรือดูแลเราอย่างไรบ้าง?',
      en: 'What is something super loving your dad or family does to take care of you?',
    },
  },
  {
    id: 'starfish_no_brain',
    category: 'ocean',
    categoryLabel: { th: 'ใต้ท้องทะเลลึก', en: 'Deep Ocean' },
    icon: '⭐',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    title: { th: 'ปลาดาวไม่มีเลือดและไม่มีสมอง', en: 'Starfish: The Star of the Sea' },
    fact: {
      th: 'ปลาดาวไม่มีสมองและไม่มีเลือดเหมือนสัตว์อื่น แต่ใช้น้ำทะเลสูบฉีดผ่านร่างกายเพื่อขยับแขนทั้งห้า และสามารถงอกแขนใหม่ขึ้นมาแทนที่ได้ถ้าขาดไป!',
      en: 'Starfish have no brain and no blood! Instead, they pump seawater through their bodies to move around, and can even regrow lost arms!',
    },
    curiosityQuestion: {
      th: 'ลองกางแขนกางขาทำท่าเป็นดาวห้าแฉกดูสิ เป็นดวงดาวที่สดใสมากๆ เลย!',
      en: 'Stretch out your arms and legs wide like a five-pointed star! Shining bright!',
    },
  },
  {
    id: 'tongue_fingerprint',
    category: 'body',
    categoryLabel: { th: 'ร่างกายมหัศจรรย์', en: 'Amazing Body' },
    icon: '👅',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    title: { th: 'ลิ้นของเรามีลวดลายเฉพาะตัว', en: 'Unique Tongue Prints' },
    fact: {
      th: 'นอกจากนิ้วมือที่มีลายนิ้วมือไม่ซ้ำใครแล้ว ลิ้นของคนเราทุกคนบนโลกก็มีลวดลายและปุ่มรับรสเฉพาะตัวที่ไม่เหมือนใครในโลกเลย!',
      en: 'Just like every person has unique fingerprints, everyone in the whole wide world has their very own unique tongue print!',
    },
    curiosityQuestion: {
      th: 'ลิ้นช่วยให้เรารู้รสหวานของไอศกรีมและรสเปรี้ยวของมะนาว น้องๆ ชอบรสอะไรที่สุด?',
      en: 'Our tongue tastes sweet ice cream and sour lemon! What flavor do you love most?',
    },
  },
  {
    id: 'eyebrows_sweat',
    category: 'body',
    categoryLabel: { th: 'ร่างกายมหัศจรรย์', en: 'Amazing Body' },
    icon: '🤨',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    title: { th: 'คิ้วแสนวิเศษ ปกป้องดวงตา', en: 'Eyebrows: The Eye Protectors' },
    fact: {
      th: 'คิ้วเหนือดวงตาไม่ได้มีไว้แค่แสดงอารมณ์นะ แต่รูปทรงโค้งของคิ้วช่วยเปลี่ยนทิศทางของเหงื่อและน้ำฝนให้ไหลไปด้านข้าง ไม่ให้เข้าตาของเรา',
      en: 'Eyebrows are not just for funny facial expressions! Their curved shape helps guide sweat and raindrops away from dripping into our eyes.',
    },
    curiosityQuestion: {
      th: 'ลองขยับคิ้วขึ้นลง ทำหน้าสงสัย หน้าดีใจ หรือหน้าประหลาดใจดูสิ!',
      en: 'Can you wiggle your eyebrows up and down? Make a surprised and happy face!',
    },
  },
  {
    id: 'stomach_growl',
    category: 'body',
    categoryLabel: { th: 'ร่างกายมหัศจรรย์', en: 'Amazing Body' },
    icon: '🥣',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: { th: 'ทำไมเวลาหิว ท้องถึงร้องจ๊อกๆ', en: 'Why Tummies Growl When Hungry' },
    fact: {
      th: 'เสียงท้องร้องไม่ได้แปลว่ามีกบอยู่ในท้องนะ! แต่เกิดจากกล้ามเนื้อกระเพาะอาหารและลำไส้บีบตัวไล่อากาศและน้ำย่อย เพื่อเตือนว่าได้เวลาเติมพลังแล้ว',
      en: 'A growling belly is just your stomach and intestines squeezing air and juices together to remind you: "Time for some healthy food fuel!"',
    },
    curiosityQuestion: {
      th: 'มื้อนี้อยากกินเมนูโปรดอะไรที่มีประโยชน์และทำให้ร่างกายแข็งแรง?',
      en: 'What healthy and yummy snack or meal gives you the most energy today?',
    },
  },
  {
    id: 'yawn_contagious',
    category: 'body',
    categoryLabel: { th: 'ร่างกายมหัศจรรย์', en: 'Amazing Body' },
    icon: '🥱',
    badgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
    title: { th: 'เห็นคนอื่นหาว ทำไมเราหาวตามนะ', en: 'Why Yawns Are Contagious' },
    fact: {
      th: 'นักวิทยาศาสตร์พบว่า เมื่อเราเห็นเพื่อนหรือคุณพ่อคุณแม่หาว สมองของเราจะสั่งให้หาวตาม เพราะเรามีความรู้สึกผูกพันและเข้าอกเข้าใจผู้อื่นนั่นเอง',
      en: 'Scientists discovered that when you see someone yawn and yawn too, it is your brain showing social connection and empathy!',
    },
    curiosityQuestion: {
      th: 'ลองแกล้งทำเสียงหาว ว้ากกก~ ดูสิ มีใครข้างๆ แอบหาวตามไหมนะ?',
      en: 'Give a big gentle yawn: Yaaawn~! Did anyone nearby catch your yawn?',
    },
  },
  {
    id: 'tree_talk_underground',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '🌳',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    title: { th: 'ต้นไม้คุยกันผ่านรากใต้ดิน', en: 'Trees Chat Underground' },
    fact: {
      th: 'ใต้ผืนดินในป่า มีเครือข่ายรากไม้และเส้นใยเห็ดราเชื่อมต่อกัน ต้นไม้ใหญ่สามารถส่งสัญญาณเตือนภัยและแบ่งปันสารอาหารให้ต้นไม้น้อยๆ ได้ด้วย!',
      en: 'Deep in the forest, trees connect through an underground web of roots and fungi! They can send alerts and share sweet food with young saplings!',
    },
    curiosityQuestion: {
      th: 'วันนี้ลองไปกอดต้นไม้หรือรดน้ำต้นไม้ดูสิ ต้นไม้คงจะมีความสุขมากๆ แน่เลย',
      en: 'Have you watered a plant or given a shady tree a gentle hello today?',
    },
  },
  {
    id: 'snowflake_shapes',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '❄️',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    title: { th: 'เกล็ดหิมะไม่มีลายซ้ำกันเลย', en: 'Every Snowflake Is Unique' },
    fact: {
      th: 'เกล็ดหิมะทุกเกล็ดที่ตกลงมาจากฟากฟ้ามีหกแฉกสวยงาม และไม่มีเกล็ดไหนในโลกที่มีลวดลายเหมือนกันเป๊ะเลยสักชิ้นเดียว!',
      en: 'Snowflakes fall from the sky with six delicate arms, and no two snowflakes in the whole world have ever been completely identical!',
    },
    curiosityQuestion: {
      th: 'ถ้าให้น้องๆ วาดรูปดาวหิมะบนกระดาษ จะวาดลวดลายสวยงามแบบไหน?',
      en: 'If you drew a sparkly snowflake on paper, what unique patterns would you create?',
    },
  },
  {
    id: 'glow_worms_firefly',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '💡',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    title: { th: 'แสงไฟเย็นๆ จากก้นหิ่งห้อย', en: 'The Firefly’s Cool Light' },
    fact: {
      th: 'แสงกะพริบที่ก้นของหิ่งห้อยเป็น "แสงเย็น" 100% คือมีแสงสว่างสดใสแต่ไม่มีความร้อนเลย ต่างจากหลอดไฟที่บ้านเราซึ่งเมื่อเปิดนานๆ จะร้อนจี๋',
      en: 'The blinking glow from a firefly is 100% cold light! It makes brilliant glowing light without creating any burning heat at all.',
    },
    curiosityQuestion: {
      th: 'ในคืนที่มืดมิด ถ้าเรามีแสงวิเศษส่องทาง น้องๆ อยากเดินทางไปสำรวจที่ไหน?',
      en: 'If you had a glowing lantern in the nighttime, where would you like to explore?',
    },
  },
  {
    id: 'clouds_weight',
    category: 'nature',
    categoryLabel: { th: 'ธรรมชาติมหัศจรรย์', en: 'Nature Wonders' },
    icon: '☁️',
    badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
    title: { th: 'เมฆปุยขาว หนักเท่าช้าง 100 เชือก', en: 'Fluffy Clouds Are Super Heavy' },
    fact: {
      th: 'ก้อนเมฆสีขาวปุกปุยที่เราเห็นลอยเบาๆ บนท้องฟ้า แท้จริงแล้วเต็มไปด้วยละอองน้ำมหาศาล เมฆก้อนหนึ่งอาจหนักถึง 500 ตัน หรือเท่ากับช้าง 100 เชือกเลยนะ!',
      en: 'A soft fluffy cloud floating high in the sky might look like cotton candy, but it actually holds tons of water droplets—as heavy as 100 big elephants!',
    },
    curiosityQuestion: {
      th: 'เวลามองท้องฟ้า น้องๆ เคยจินตนาการเห็นก้อนเมฆเป็นรูปสัตว์อะไรบ้าง?',
      en: 'When you gaze up at the sky, what animal or shape do the clouds look like to you?',
    },
  },
  {
    id: 'saturn_rings_ice',
    category: 'space',
    categoryLabel: { th: 'อวกาศกว้างใหญ่', en: 'Vast Space' },
    icon: '🪐',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    title: { th: 'วงแหวนดาวเสาร์ทำจากน้ำแข็ง', en: 'Saturn’s Sparkling Ice Rings' },
    fact: {
      th: 'วงแหวนสวยงามรอบดาวเสาร์ไม่ได้เป็นแผ่นแข็งนะ แต่ประกอบด้วยก้อนน้ำแข็งและหินอวกาศนับล้านๆ ชิ้น ตั้งแต่ขนาดเท่าเม็ดทรายจนถึงก้อนเท่าบ้าน!',
      en: 'Saturn’s magnificent rings are made of billions of floating ice chunks and dust pebbles, ranging from tiny sugar specks to house-sized icebergs!',
    },
    curiosityQuestion: {
      th: 'ถ้าได้ขึ้นยานอวกาศไปเล่นสไลเดอร์บนวงแหวนน้ำแข็ง น้องๆ จะชวนใครไปด้วย?',
      en: 'If you could slide along Saturn’s cosmic ice rings in a spaceship, who would you invite?',
    },
  },
  {
    id: 'stars_twinkle',
    category: 'space',
    categoryLabel: { th: 'อวกาศกว้างใหญ่', en: 'Vast Space' },
    icon: '🌟',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    title: { th: 'ทำไมดวงดาวถึงกระพริบวิบวับ', en: 'Why Do Stars Twinkle Twinkle?' },
    fact: {
      th: 'จริงๆ แล้วดวงดาวส่องแสงนิ่งๆ ตลอดเวลา แต่ที่ดาวดูกระพริบวิบวับ เพราะแสงดาวต้องเดินทางผ่านชั้นบรรยากาศของโลกที่มีกระแสลมพัดไหวไปมา',
      en: 'Stars in space actually shine steadily! They only seem to twinkle because their light bends and dances through the moving air in Earth’s atmosphere.',
    },
    curiosityQuestion: {
      th: 'ร้องเพลง "Twinkle, Twinkle, Little Star" ไปพร้อมๆ กันได้ไหมเอ่ย?',
      en: 'Can you sing the melody of "Twinkle, Twinkle, Little Star" together with a smile?',
    },
  },
  {
    id: 'space_quiet',
    category: 'space',
    categoryLabel: { th: 'อวกาศกว้างใหญ่', en: 'Vast Space' },
    icon: '🚀',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    title: { th: 'ในอวกาศเงียบสนิทที่สุด', en: 'The Silent, Cosmic Space' },
    fact: {
      th: 'ในอวกาศกว้างใหญ่ไม่มีอากาศให้คลื่นเสียงเดินทาง ดังนั้นไม่ว่าจะเกิดอะไรขึ้นในอวกาศ ก็จะเงียบสนิท ไม่มีเสียงแม้แต่น้อย นักบินอวกาศจึงต้องคุยผ่านวิทยุ',
      en: 'Sound needs air to travel. Because outer space is an empty vacuum with no air, it is completely silent! Astronauts use special radios to talk.',
    },
    curiosityQuestion: {
      th: 'ลองทำเสียง "ชู่ววว~" แล้วเงียบฟังเสียงรอบตัว 5 วินาที ได้ยินเสียงอะไรบ้าง?',
      en: 'Let’s say "Shhh~" and listen quietly for 5 seconds. What subtle sounds do you hear?',
    },
  },
  {
    id: 'watermelon_water',
    category: 'fruits',
    categoryLabel: { th: 'ผลไม้และของอร่อย', en: 'Yummy Fruits' },
    icon: '🍉',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    title: { th: 'แตงโมหวานฉ่ำ มีน้ำถึง 92%', en: 'Watermelon Is 92% Water!' },
    fact: {
      th: 'แตงโมเนื้อสีแดงหวานฉ่ำมีน้ำเป็นส่วนประกอบมากถึง 92%! เวลาที่วิ่งเล่นจนเหนื่อยและเหงื่อออก การกินแตงโมช่วยเติมน้ำให้ร่างกายสดชื่นได้ทันที',
      en: 'Juicy red watermelon is made of 92% pure refreshing water! Eating a crisp slice on a sunny day gives your body hydration and vitamins.',
    },
    curiosityQuestion: {
      th: 'นอกจากแตงโมแล้ว น้องๆ ชอบกินผลไม้อะไรที่หวานฉ่ำชื่นใจอีกบ้าง?',
      en: 'Besides juicy watermelon, what is your favorite sweet fruit to crunch on?',
    },
  },
  {
    id: 'apple_floats',
    category: 'fruits',
    categoryLabel: { th: 'ผลไม้และของอร่อย', en: 'Yummy Fruits' },
    icon: '🍎',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    title: { th: 'ทำไมผลแอปเปิลถึงลอยน้ำได้', en: 'Why Apples Bob and Float' },
    fact: {
      th: 'ถ้าโยนผลแอปเปิลลงในอ่างน้ำ แอปเปิลจะไม่จมแต่จะลอยตุ๊บป่อง เพราะเนื้อแอปเปิลมีช่องอากาศเล็กๆ ซ่อนอยู่ข้างในถึง 25% ทำหน้าที่เหมือนห่วงยางจิ๋ว!',
      en: 'If you drop an apple into a bucket of water, it will bob and float! That’s because 25% of an apple’s volume is pocketed with tiny air bubbles!',
    },
    curiosityQuestion: {
      th: 'คิดว่าผลไม้อื่นอย่างส้ม หรือกล้วย จะลอยน้ำหรือจมน้ำเหมือนแอปเปิลไหมนะ?',
      en: 'Do you think an orange or banana would float or sink in a bowl of water?',
    },
  },
  {
    id: 'soap_bubbles_round',
    category: 'science',
    categoryLabel: { th: 'วิทยาศาสตร์รอบตัว', en: 'Fun Science' },
    icon: '🫧',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    title: { th: 'ฟองสบู่เป็นทรงกลมเสมอ', en: 'Soap Bubbles Are Always Round' },
    fact: {
      th: 'ไม่ว่าเราจะใช้ไม้เป่าฟองสบู่รูปดาว รูปสามเหลี่ยม หรือรูปหัวใจ เมื่อฟองสบู่ลอยออกไปในอากาศ แรงตึงผิวจะดึงให้น้ำสบู่กลายเป็นทรงกลมสมบูรณ์แบบเสมอ!',
      en: 'No matter if your bubble wand is shaped like a star, triangle, or heart, surface tension always pulls the floating soap film into a perfect round sphere!',
    },
    curiosityQuestion: {
      th: 'ฟองสบู่ที่สะท้อนแสงแดดเป็นสีรุ้งสวยงาม น้องๆ ชอบเป่าหรือชอบวิ่งไล่จับฟองสบู่?',
      en: 'Bubbles shine with rainbow reflections in the sunlight! Do you like popping or blowing them?',
    },
  },
];

/**
 * สุ่ม Fun Fact มา 1 ข้อ โดยหลีกเลี่ยงข้อก่อนหน้า
 */
export function getRandomFunFact(excludeId?: string): FunFact {
  const pool = excludeId ? FUN_FACTS.filter((f) => f.id !== excludeId) : FUN_FACTS;
  const list = pool.length > 0 ? pool : FUN_FACTS;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export function getFunFactById(id: string): FunFact | undefined {
  return FUN_FACTS.find((f) => f.id === id);
}
