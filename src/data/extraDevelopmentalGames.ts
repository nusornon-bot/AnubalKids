import { Grade } from '../types';

// ==========================================
// 1. ประเภท ร่างกาย (Physical & Motor Skills)
// ==========================================
export interface BodyMovementExercise {
  id: string;
  grade: Grade;
  title: string;
  animalName: string;
  emoji: string;
  actionInstruction: string;
  voiceGuide: string;
  benefitDescription: string;
  targetCount: number; // e.g. 5 ครั้ง หรือ 10 วินาที
  unitLabel: string; // 'ครั้ง' | 'วินาที'
  motionType: 'jump' | 'balance' | 'stretch' | 'wings' | 'spin' | 'march';
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ท้าทาย';
  bgGradient: string;
}

export const BODY_MOVEMENT_GAMES: BodyMovementExercise[] = [
  {
    id: 'phys-01-frog-jump',
    grade: 'K1',
    title: 'กบเขียวกระโดด อ๊บ อ๊บ!',
    animalName: 'เจ้ากบน้อย',
    emoji: '🐸',
    actionInstruction: 'ย่อเข่าลงแล้วกระโดดขึ้นสูงๆ นับ 1 2 3!',
    voiceGuide: 'เด็กๆ จ๋า ย่อตัวลงเหมือนกบน้อย แล้วกระโดดดึ๋งๆ ขึ้นสูงๆ เลยนะจ๊ะ!',
    benefitDescription: 'พัฒนากล้ามเนื้อมัดใหญ่ ขา ข้อต่อ และการสปริงตัว',
    targetCount: 5,
    unitLabel: 'ครั้ง',
    motionType: 'jump',
    difficulty: 'ง่าย',
    bgGradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'phys-02-flamingo-balance',
    grade: 'K1',
    title: 'นกฟลามิงโกยืนขาเดียวทรงตัว',
    animalName: 'ฟลามิงโกสีชมพู',
    emoji: '🦩',
    actionInstruction: 'ยกขาขึ้นหนึ่งข้าง กางแขนออก ทรงตัวให้นิ่งที่สุด',
    voiceGuide: 'กางแขนออกสองข้าง ยกขาขึ้นหนึ่งข้าง ทรงตัวนิ่งๆ นับ 1 ถึง 5 นะจ๊ะ',
    benefitDescription: 'ฝึกระบบประสาททรงตัว (Vestibular System) และความนิ่งของกล้ามเนื้อแกนกลาง',
    targetCount: 5,
    unitLabel: 'วินาที',
    motionType: 'balance',
    difficulty: 'ง่าย',
    bgGradient: 'from-pink-400 to-rose-500',
  },
  {
    id: 'phys-03-eagle-wings',
    grade: 'K1',
    title: 'นกอินทรียักษ์กระพือปีกบิน',
    animalName: 'นกอินทรีเจ้าเวหา',
    emoji: '🦅',
    actionInstruction: 'กางแขนทั้งสองข้างแล้วโบกขึ้น-ลงช้าๆ เหมือนปีกนกบินบนท้องฟ้า',
    voiceGuide: 'กางแขนกว้างๆ โบกปีกบินลู่ลม บินขึ้นสูงๆ ช้าๆ อย่างสง่างามเลยจ้า',
    benefitDescription: 'ยืดเหยียดกล้ามเนื้อไหล่ แขน และทรวงอก เพิ่มความยืดหยุ่น',
    targetCount: 8,
    unitLabel: 'ครั้ง',
    motionType: 'wings',
    difficulty: 'ง่าย',
    bgGradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 'phys-04-bunny-hop',
    grade: 'K2',
    title: 'กระต่ายน้อยชูสองหู กระโดดไปข้างหน้า',
    animalName: 'กระต่ายหูยาว',
    emoji: '🐰',
    actionInstruction: 'ยกสองมือแนบศีรษะเป็นหูกระต่าย แล้วกระโดดก้าวไปข้างหน้าเบาๆ',
    voiceGuide: 'ชูสองนิ้วขึ้นเป็นหูกระต่ายดุ๊กดิ๊ก แล้วกระโดดหยอยๆ ไปข้างหน้าทีละก้าว!',
    benefitDescription: 'ความสัมพันธ์ของสายตา เท้า และการทรงตัวขณะเคลื่อนที่',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'jump',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'phys-05-tree-wind',
    grade: 'K2',
    title: 'ต้นไม้ใหญ่ลู่สายลมพัดเบาๆ',
    animalName: 'ต้นไม้ใหญ่ร่มรื่น',
    emoji: '🌳',
    actionInstruction: 'ชูสองมือขึ้นฟ้า แล้วเอียงตัวไปทางซ้ายและขวาตามลมพัด',
    voiceGuide: 'ชูมือสูงๆ สู่ท้องฟ้า ลมพัดมาแล้ว เอียงซ้ายเบาๆ แล้วเอียงขวาช้าๆ',
    benefitDescription: 'ยืดหยุ่นกล้ามเนื้อลำตัวด้านข้างและการรับรู้ตำแหน่งร่างกายในพื้นที่ (Proprioception)',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-lime-400 to-emerald-600',
  },
  {
    id: 'phys-06-crab-walk',
    grade: 'K2',
    title: 'ปูเฉียงเดินข้าง ก้ามหนีบปิ๊บๆ',
    animalName: 'เจ้าปูก้ามโต',
    emoji: '🦀',
    actionInstruction: 'ทำมือก้ามปู ชูขึ้น ย่อตัวลงเล็กน้อยแล้วก้าวสไลด์ไปทางข้าง',
    voiceGuide: 'หนีบก้ามปิ๊บๆ แล้วย่อตัวก้าวไปทางขวา 3 ก้าว ทางซ้าย 3 ก้าว เหมือนปูเดินริมชายหาด!',
    benefitDescription: 'พัฒนาการทำงานร่วมกันของสมองสองซีกและการเคลื่อนไหวแบบ Lateral Movement',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'march',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-red-400 to-rose-600',
  },
  {
    id: 'phys-07-giraffe-reach',
    grade: 'K3',
    title: 'ยีราฟคอยาว เอื้อมแตะยอดไม้ยอดดาว',
    animalName: 'พี่ยีราฟคอยาว',
    emoji: '🦒',
    actionInstruction: 'เขย่งปลายเท้าขึ้น ชูมือให้สูงที่สุด ยืดตัวให้ยาวเหมือนยีราฟ',
    voiceGuide: 'เขย่งปลายเท้าขึ้น ชูมือขึ้นฟ้า เอื้อมแตะใบไม้ยอดไม้สูงที่สุดเท่าที่ทำได้เลยจ้ะ!',
    benefitDescription: 'ฝึกความแข็งแรงของน่อง ข้อเท้า และแนวกระดูกสันหลังให้ยืดตรง',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'phys-08-butterfly-flutter',
    grade: 'K3',
    title: 'ผีเสื้อกระพือปีก นั่งขัดสมาธิขยับเข่า',
    animalName: 'ผีเสื้อแสนสวย',
    emoji: '🦋',
    actionInstruction: 'นั่งลงประกบฝ่าเท้าสองข้างเข้าหากัน จับปลายเท้าแล้วขยับเข่าขึ้นลงเบาๆ',
    voiceGuide: 'นั่งประกบฝ่าเท้าเข้าหากัน จับปลายเท้าไว้ แล้วขยับเข่าเหมือนปีกผีเสื้อโบยบินในทุ่งดอกไม้',
    benefitDescription: 'เปิดข้อต่อสะโพก ผ่อนคลายกล้ามเนื้อขาหนีบ เพิ่มความยืดหยุ่น',
    targetCount: 10,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-purple-400 to-indigo-600',
  },
  {
    id: 'phys-09-star-touch',
    grade: 'K3',
    title: 'แตะสลับไขว้ แขนขวาแตะเข่าซ้าย แขนซ้ายแตะเข่าขวา',
    animalName: 'ดาวน้อยประสานพลัง',
    emoji: '⭐',
    actionInstruction: 'ยกเข่าซ้ายขึ้น เอามือขวาไปแตะ แล้วสลับยกเข่าขวาเอามือซ้ายไปแตะ',
    voiceGuide: 'ยกเข่าขึ้น แล้วเอามือฝั่งตรงข้ามมาแตะ สลับซ้าย-ขวา จังหวะ 1-2 ยอดเยี่ยมมาก!',
    benefitDescription: 'การทำงานข้ามแนวกึ่งกลางลำตัว (Cross-body Midline Integration) ช่วยเชื่อมโยงสมองซีกซ้ายและขวา',
    targetCount: 8,
    unitLabel: 'ครั้ง',
    motionType: 'march',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-indigo-400 to-violet-600',
  },
  {
    id: 'phys-10-windmill-spin',
    grade: 'K3',
    title: 'กังหันลมหมุนรอบตัว ช้าๆ นุ่มนวล',
    animalName: 'กังหันลมสุขสันต์',
    emoji: '🎡',
    actionInstruction: 'กางแขนออกทั้งสองข้าง หมุนตัวเป็นวงกลมช้าๆ 1 รอบ แล้วหยุดนิ่งทรงตัว',
    voiceGuide: 'กางแขนออก ก้าวหมุนตัวรอบตัวเองช้าๆ 1 รอบ แล้วหยุดยืนนิ่ง ไม่เซนะจ๊ะ!',
    benefitDescription: 'การปรับสมดุลสายตาและการทรงตัวอย่างรวดเร็วหลังการเคลื่อนไหว',
    targetCount: 4,
    unitLabel: 'รอบ',
    motionType: 'spin',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-teal-400 to-cyan-600',
  },
  // --- เพิ่มอีก 12 ท่าใหม่ตามคำขอ ---
  {
    id: 'phys-11-penguin-waddle',
    grade: 'K1',
    title: 'เพนกวินน้อยเดินเตาะแตะบนน้ำแข็ง',
    animalName: 'เพนกวินขั้วโลก',
    emoji: '🐧',
    actionInstruction: 'แนบแขนชิดลำตัว แบมือออก ย่อเข่าเล็กน้อย แล้วเดินโยกย้ายซ้าย-ขวา',
    voiceGuide: 'แนบแขนสองข้างติดลำตัว แบมือน้อยๆ แล้วเดินเตาะแตะเหมือนเพนกวินบนหิมะจ้า',
    benefitDescription: 'พัฒนากล้ามเนื้อสะโพก การถ่ายน้ำหนักเท้าซ้าย-ขวา และการควบคุมจุดศูนย์ถ่วง',
    targetCount: 6,
    unitLabel: 'ก้าว',
    motionType: 'march',
    difficulty: 'ง่าย',
    bgGradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 'phys-12-pony-trot',
    grade: 'K1',
    title: 'ม้าลำพองวิ่งเหยาะๆ กุบกับ',
    animalName: 'ลูกม้าแสนซน',
    emoji: '🐴',
    actionInstruction: 'ยกเข่าสูงสลับซ้าย-ขวา พร้อมแกว่งแขนตามจังหวะเสียงกุบกับ',
    voiceGuide: 'ยกเข่าขึ้นสูงๆ วิ่งเหยาะๆ อยู่กับที่ กุบกับ กุบกับ สนุกจังเลย!',
    benefitDescription: 'ส่งเสริมความคล่องแคล่วว่องไว (Agility) และความแข็งแรงของหัวใจและกล้ามเนื้อขา',
    targetCount: 8,
    unitLabel: 'ก้าว',
    motionType: 'march',
    difficulty: 'ง่าย',
    bgGradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'phys-13-turtle-tuck',
    grade: 'K1',
    title: 'เต่าน้อยหดหัวในกระดองอบอุ่น',
    animalName: 'เต่าน้อยใจดี',
    emoji: '🐢',
    actionInstruction: 'นั่งยองๆ กอดเข่า หดคอลงช้าๆ แล้วค่อยๆ ยืดคอและแขนออกมา',
    voiceGuide: 'กอดเข่าไว้ช้าๆ หลบในกระดองเต่า... แล้วค่อยๆ ยืดคอออกมารับแสงแดดนะจ๊ะ',
    benefitDescription: 'เพิ่มความยืดหยุ่นของข้อต่อสะโพก หลังส่วนล่าง และฝึกการคลายกล้ามเนื้อตามจังหวะ',
    targetCount: 5,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ง่าย',
    bgGradient: 'from-emerald-400 to-green-600',
  },
  {
    id: 'phys-14-tree-sway',
    grade: 'K1',
    title: 'ต้นไม้ใหญ่เอนไหวตามสายลม',
    animalName: 'ต้นไม้ใหญ่ร่มรื่น',
    emoji: '🌳',
    actionInstruction: 'ยืนตรง ชูแขนสองข้างขึ้นเหนือศีรษะ แล้วเอียงลำตัวไปทางซ้ายและขวาช้าๆ',
    voiceGuide: 'ชูมือขึ้นสูงเป็นกิ่งไม้ แล้วเอนตัวไปทางซ้าย... เอนไปทางขวา... ลมพัดเย็นสบาย',
    benefitDescription: 'ยืดเหยียดกล้ามเนื้อลำตัวด้านข้าง (Lateral Flexion) เสริมสร้างสมดุลแกนกลาง',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ง่าย',
    bgGradient: 'from-lime-400 to-emerald-500',
  },
  {
    id: 'phys-15-monkey-climb',
    grade: 'K2',
    title: 'ลิงจ๋อปีนต้นกล้วยแสนสนุก',
    animalName: 'พี่ลิงจอมซน',
    emoji: '🐒',
    actionInstruction: 'เอื้อมมือขึ้นสูงสลับซ้าย-ขวา พร้อมยกเข่าขึ้น ทำท่าเหมือนกำลังปีนต้นไม้',
    voiceGuide: 'เอื้อมมือซ้ายสูงๆ เอื้อมมือขวาสูงๆ ยกเข่าขึ้นด้วยนะจ๊ะ ปีนไปเก็บกล้วยสุกหอมหวาน!',
    benefitDescription: 'การทำงานประสานกันของตา แขน ขา และกล้ามเนื้อหัวไหล่ (Upper Extremity Mobility)',
    targetCount: 8,
    unitLabel: 'ครั้ง',
    motionType: 'march',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'phys-16-bunny-hop',
    grade: 'K2',
    title: 'กระต่ายหูยาวกระโดดเท้าคู่',
    animalName: 'กระต่ายขาวตากลม',
    emoji: '🐰',
    actionInstruction: 'ยกมือสองข้างทำเป็นหูกระต่ายบนศีรษะ กระโดดเท้าคู่ไปข้างหน้าเบาๆ',
    voiceGuide: 'ทำหูกระต่ายน่ารัก แล้วกระโดดดึ๋งๆ สองเท้าพร้อมกัน ลงพื้นเบาๆ นุ่มนวลนะจ๊ะ',
    benefitDescription: 'ฝึกพลังการสปริงข้อเท้า การลงน้ำหนักเท้าคู่เพื่อถนอมข้อต่อ และการทรงตัว',
    targetCount: 6,
    unitLabel: 'ครั้ง',
    motionType: 'jump',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-pink-300 to-rose-400',
  },
  {
    id: 'phys-17-starfish-stretch',
    grade: 'K2',
    title: 'ปลาดาวแผ่ตัวบนหาดทรายขาว',
    animalName: 'ปลาดาวสีส้ม',
    emoji: '⭐',
    actionInstruction: 'ยืนกางแขนและขากว้างที่สุดเหมือนปลาดาว 5 แฉก ยืดค้างไว้ แล้วหุบเข้า',
    voiceGuide: 'กางแขนกว้างๆ กางขากว้างๆ เป็นปลาดาวแสนสวย ยืดตัวให้ยาวที่สุด นับ 1 ถึง 5 นะจ๊ะ',
    benefitDescription: 'เปิดแผงอก ยืดกล้ามเนื้อแขน ขา และส่งเสริมสรีระท่ายืนที่สง่างามถูกต้อง',
    targetCount: 5,
    unitLabel: 'วินาที',
    motionType: 'stretch',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-orange-400 to-pink-500',
  },
  {
    id: 'phys-18-lion-roar-stretch',
    grade: 'K2',
    title: 'สิงโตเจ้าป่ายืดแผ่นหลังคำราม',
    animalName: 'สิงโตผู้กล้าหาญ',
    emoji: '🦁',
    actionInstruction: 'คุกเข่า วางมือบนพื้น โก่งหลังขึ้นช้าๆ แล้วแอ่นหลังพร้อมอ้าปากทำท่าคำรามเบาๆ',
    voiceGuide: 'คุกเข่าลง วางมือบนพื้น โก่งหลังขึ้นเหมือนแมว... แล้วเงยหน้ายืดตัวคำราม โฮก!',
    benefitDescription: 'สร้างความยืดหยุ่นให้กระดูกสันหลัง ช่วยผ่อนคลายกล้ามเนื้อหลังจากการนั่งโต๊ะเรียน',
    targetCount: 5,
    unitLabel: 'ครั้ง',
    motionType: 'stretch',
    difficulty: 'ปานกลาง',
    bgGradient: 'from-amber-500 to-red-500',
  },
  {
    id: 'phys-19-crab-walk-side',
    grade: 'K3',
    title: 'ปูทะเลเดินก้าวไปด้านข้าง',
    animalName: 'เจ้าปูก้ามโต',
    emoji: '🦀',
    actionInstruction: 'ย่อเข่าลงครึ่งหนึ่ง กางมือทำก้ามปู หนีบๆ แล้วก้าวขาไปด้านข้างซ้ายและขวา',
    voiceGuide: 'ย่อตัวลง ทำก้ามปู หนีบๆ ก้าวไปทางซ้าย ก้าวไปทางขวา เดินเหมือนปูริมทะเล!',
    benefitDescription: 'เสริมสร้างความแข็งแรงของกล้ามเนื้อต้นขาด้านนอกและด้านใน (Hip Abductors/Adductors)',
    targetCount: 8,
    unitLabel: 'ก้าว',
    motionType: 'march',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'phys-20-butterfly-flutter',
    grade: 'K3',
    title: 'ผีเสื้อแสนสวยกระพือปีกชมสวน',
    animalName: 'ผีเสื้อปีกหลากสี',
    emoji: '🦋',
    actionInstruction: 'นั่งประกบฝ่าเท้าสองข้างเข้าหากัน จับปลายเท้าไว้ ขยับหัวเข่าขึ้น-ลงนุ่มนวล',
    voiceGuide: 'นั่งลง เอาฝ่าเท้าแตะกัน ขยับเข่าขึ้นลงเบาๆ เหมือนปีกผีเสื้อกำลังบินในทุ่งดอกไม้',
    benefitDescription: 'เปิดข้อต่อสะโพกและกระดูกเชิงกราน ผ่อนคลายกล้ามเนื้อขาหนีบอย่างปลอดภัย',
    targetCount: 10,
    unitLabel: 'ครั้ง',
    motionType: 'wings',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'phys-21-elephant-trunk-swing',
    grade: 'K3',
    title: 'ช้างน้อยแกว่งงวงพ่นละอองน้ำ',
    animalName: 'พลายแก้วตัวโต',
    emoji: '🐘',
    actionInstruction: 'ก้มตัวเล็กน้อย ประสานมือสองข้างยื่นไปข้างหน้า แกว่งแขนซ้าย-ขวาเหมือนงวงช้าง',
    voiceGuide: 'ประสานมือยื่นไปข้างหน้า ก้มตัวลงนิดหน่อย แล้วแกว่งงวงช้างไปซ้าย... ไปขวา... ชื่นใจจัง',
    benefitDescription: 'บริหารกล้ามเนื้อลำตัว หลังส่วนบน และฝึกจังหวะการแกว่งที่ควบคุมทิศทางได้แม่นยำ',
    targetCount: 8,
    unitLabel: 'ครั้ง',
    motionType: 'balance',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-slate-400 to-cyan-600',
  },
  {
    id: 'phys-22-giraffe-tiptoe',
    grade: 'K3',
    title: 'ยีราฟคอยาวเขย่งปลายเท้าแตะเมฆ',
    animalName: 'พี่ยีราฟคอยาว',
    emoji: '🦒',
    actionInstruction: 'ชูแขนสองข้างขึ้นสูง เขย่งปลายเท้าขึ้น ค้างไว้ทรงตัวให้นิ่งที่สุด',
    voiceGuide: 'ชูมือขึ้นสูงให้ถึงท้องฟ้า เขย่งปลายเท้าขึ้นยืนนิ่งๆ เป็นยีราฟตัวสูงที่สุดในโลก!',
    benefitDescription: 'พัฒนากล้ามเนื้อน่อง เอ็นร้อยหวาย และระบบประสาทการทรงตัวระดับสูง',
    targetCount: 5,
    unitLabel: 'วินาที',
    motionType: 'balance',
    difficulty: 'ท้าทาย',
    bgGradient: 'from-amber-400 to-yellow-500',
  },
];

// ==========================================
// 2. ประเภท อารมณ์ (Emotional Development & Calming)
// ==========================================
export interface CalmMindExercise {
  id: string;
  grade: Grade;
  title: string;
  subtitle: string;
  emoji: string;
  activityType: 'balloon_breath' | 'glitter_jar' | 'flower_candle' | 'affirmation' | 'butterfly_hug' | 'peace_bell';
  instruction: string;
  voiceGuide: string;
  soothingAffirmation: string;
  ambientSoundName: string;
  colorTone: string;
  cycles: number;
}

export const CALM_MIND_GAMES: CalmMindExercise[] = [
  {
    id: 'calm-01-balloon-breath',
    grade: 'K1',
    title: 'ลูกโป่งลมหายใจวิเศษ 🎈',
    subtitle: 'สูดหายใจเข้าลูกโป่งพองโต ผ่อนหายใจออกลูกโป่งแฟบลงช้าๆ',
    emoji: '🎈',
    activityType: 'balloon_breath',
    instruction: 'แตะปุ่มเพื่อเริ่มสูดลมหายใจเข้าลึกๆ ให้ลูกโป่งพอง และผ่อนลมออกช้าๆ',
    voiceGuide: 'สูดลมหายใจเข้าทางจมูกลึกๆ ให้ลูกโป่งพองโต... แล้วค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ สบายใจจัง',
    soothingAffirmation: 'หนูรู้สึกสงบและผ่อนคลาย จิตใจสบายและมีความสุข',
    ambientSoundName: 'ลมพัดอ่อนโยน',
    colorTone: 'from-sky-300 via-indigo-200 to-pink-200',
    cycles: 4,
  },
  {
    id: 'calm-02-smell-flower-blow-candle',
    grade: 'K1',
    title: 'ดมดอกไม้หอมชื่นใจ & เป่าเทียนวันเกิด 🌸🕯️',
    subtitle: 'สูดกลิ่นหอมดอกไม้ลึกๆ แล้วเป่าเทียนให้เปลวไฟพลิ้วไหว',
    emoji: '🌸',
    activityType: 'flower_candle',
    instruction: 'ดมดอกไม้ชื่นใจ (หายใจเข้า) แล้วเป่าลมเบาๆ (หายใจออก)',
    voiceGuide: 'หลับตาเบาๆ สูดกลิ่นหอมของดอกไม้... แล้วทำปากจู๋เป่าลมเบาๆ ให้เทียนดับนะจ๊ะ',
    soothingAffirmation: 'ความโกรธและความกังวลค่อยๆ ละลายหายไป เหลือแต่ความสบายใจ',
    ambientSoundName: 'เสียงกระดิ่งลมโมบาย',
    colorTone: 'from-pink-300 via-rose-200 to-amber-200',
    cycles: 4,
  },
  {
    id: 'calm-03-glitter-calm-jar',
    grade: 'K1',
    title: 'ขวดแก้วประกายดาว คลายอารมณ์ ✨',
    subtitle: 'เมื่อโกรธหรือตื่นเต้น นั่งดูเกล็ดวิเศษค่อยๆ ตกสู่ก้นขวดอย่างสงบ',
    emoji: '✨',
    activityType: 'glitter_jar',
    instruction: 'แตะเพื่อเขย่าขวด แล้วมองดูเกล็ดประกายดาวค่อยๆ ลอยตกลงสู่ก้นขวดอย่างนุ่มนวล',
    voiceGuide: 'เขย่าขวดประกายดาววิเศษ... ดูดาวน้อยค่อยๆ ลอยลงสู่ก้นขวดช้าๆ ใจเราก็สงบนิ่งเหมือนกันนะ',
    soothingAffirmation: 'เมื่อใจสงบนิ่ง หนูจะคิดและพูดได้อย่างน่ารักเสมอ',
    ambientSoundName: 'เสียงหยดน้ำใส',
    colorTone: 'from-purple-300 via-indigo-200 to-blue-200',
    cycles: 3,
  },
  {
    id: 'calm-04-butterfly-hug',
    grade: 'K2',
    title: 'อ้อมกอดผีเสื้อ ให้กำลังใจตัวเอง 🦋',
    subtitle: 'กอดตัวเองไขว้แขนที่หน้าอก แตะไหล่ซ้ายขวาสลับกันเบาๆ',
    emoji: '🫂',
    activityType: 'butterfly_hug',
    instruction: 'ยกมือสองข้างไขว้ที่อก ตบไหล่ซ้ายที ขวาที เบาๆ อย่างอบอุ่น',
    voiceGuide: 'กอดตัวเองแน่นๆ นะจ๊ะ เอามือแตะไหล่ซ้ายที ขวาที หนูเป็นเด็กดี เป็นที่รักของทุกคนนะ',
    soothingAffirmation: 'หนูเก่งและเข้มแข็ง หนูรักตัวเองและพร้อมเริ่มต้นใหม่อย่างสดใส',
    ambientSoundName: 'เสียงฮาร์ปนุ่มนวล',
    colorTone: 'from-teal-300 via-emerald-200 to-sky-200',
    cycles: 5,
  },
  {
    id: 'calm-05-peaceful-lake',
    grade: 'K2',
    title: 'สระน้ำระลอกคลื่นแห่งความสงบ 🌊',
    subtitle: 'แตะผิวน้ำเบาๆ ดูวงระลอกคลื่นแผ่ขยายออกช้าๆ อย่างนุ่มนวล',
    emoji: '💧',
    activityType: 'peace_bell',
    instruction: 'แตะหน้าจอเพื่อสร้างวงคลื่นน้ำใส ฟังเสียงระฆังทิพย์ก้องกังวาน',
    voiceGuide: 'แตะที่ผิวน้ำเบาๆ ดูวงคลื่นน้ำแผ่ออกไป จิตใจของหนูก็กว้างขวางและสงบนิ่งเหมือนผิวน้ำใส',
    soothingAffirmation: 'ใจหนูเย็นใส สะอาด สว่าง สงบ เหมือนน้ำในสระบัว',
    ambientSoundName: 'เสียงระฆังเซนกังวาน',
    colorTone: 'from-cyan-300 via-teal-200 to-indigo-200',
    cycles: 4,
  },
  {
    id: 'calm-06-affirmation-sun',
    grade: 'K2',
    title: 'พระอาทิตย์ยิ้มแฉ่ง & คำพูดเติมพลังใจ ☀️',
    subtitle: 'เปล่งเสียงประโยคคิดบวก ให้หัวใจพองโตสดใส',
    emoji: '☀️',
    activityType: 'affirmation',
    instruction: 'แตะรัศมีดวงอาทิตย์เพื่ออ่านและฟังข้อความบอกรักตัวเอง',
    voiceGuide: 'พูดตามครูนะจ๊ะ: "วันนี้ฉันมีความสุข ฉันยิ้มแย้ม และฉันทำได้!"',
    soothingAffirmation: 'หนูเป็นคนน่ารัก มีน้ำใจ และมีความสามารถมากมาย',
    ambientSoundName: 'เสียงนกน้อยร้องเพลง',
    colorTone: 'from-amber-300 via-yellow-200 to-orange-200',
    cycles: 3,
  },
  {
    id: 'calm-07-feather-fall',
    grade: 'K3',
    title: 'ขนนกเบาหวิว ลอยละล่อง 🪶',
    subtitle: 'เป่าลมเบาๆ เลี้ยงขนนกไม่ให้ตก แล้วปล่อยให้ร่อนลงสู่พื้นอย่างนุ่มนวล',
    emoji: '🪶',
    activityType: 'balloon_breath',
    instruction: 'ควบคุมลมหายใจให้สม่ำเสมอ ผ่อนคลายกล้ามเนื้อใบหน้าและไหล่',
    voiceGuide: 'สูดลมเข้าแล้วเป่าเบาๆ ประคองขนนกสีขาวสะอาดให้ลอยพลิ้วไหวในอากาศอย่างผ่อนคลาย',
    soothingAffirmation: 'ปล่อยวางความตึงเครียด ร่างกายทุกส่วนเบาสบายเหมือนขนนก',
    ambientSoundName: 'เสียงสายลมฤดูใบไม้ผลิ',
    colorTone: 'from-sky-200 via-blue-100 to-indigo-200',
    cycles: 4,
  },
  {
    id: 'calm-08-starry-night-rest',
    grade: 'K3',
    title: 'ท้องฟ้าราตรีดวงดาวหลับฝันดี 🌙',
    subtitle: 'แตะเปิดดาวทีละดวงเพื่อผ่อนคลายกล้ามเนื้อทีละส่วนของร่างกาย',
    emoji: '🌙',
    activityType: 'peace_bell',
    instruction: 'ผ่อนคลายหน้าผาก ผ่อนคลายแขน ผ่อนคลายขา นั่งหลังตรงสบายๆ',
    voiceGuide: 'แตะดวงดาวทีละดวง ส่งความผ่อนคลายไปที่ดวงตา หัวไหล่ และแขนขาทุกส่วนนะจ๊ะ',
    soothingAffirmation: 'ร่างกายของหนูได้รับการพักผ่อนอย่างเต็มอิ่มและเปี่ยมพลัง',
    ambientSoundName: 'เสียงกล่องดนตรีกล่อม',
    colorTone: 'from-indigo-400 via-purple-300 to-slate-300',
    cycles: 4,
  },
  {
    id: 'calm-09-rainbow-bridge',
    grade: 'K3',
    title: 'สะพานสายรุ้ง 7 สีแห่งความหวัง 🌈',
    subtitle: 'ลากนิ้วตามแถบสีรุ้ง สูดลมหายใจเปลี่ยนอารมณ์ขุ่นมัวเป็นความสดใส',
    emoji: '🌈',
    activityType: 'balloon_breath',
    instruction: 'ลากนิ้วข้ามสะพานสายรุ้งจากซ้ายไปขวา สูดลมหายใจสดชื่น',
    voiceGuide: 'ลากนิ้วข้ามสะพานสายรุ้งแสนสวย สูดความสดใสของสีสันทั้ง 7 สีเข้ามาเติมเต็มหัวใจ',
    soothingAffirmation: 'หลังพายุฝนผ่านพ้นไป ท้องฟ้าจะสดใสและมีสายรุ้งงดงามเสมอ',
    ambientSoundName: 'เสียงดนตรีสดใส',
    colorTone: 'from-violet-300 via-pink-200 to-yellow-200',
    cycles: 4,
  },
  {
    id: 'calm-10-loving-kindness',
    grade: 'K3',
    title: 'แผ่เมตตา & ส่งความปรารถนาดีให้ทุกคน 💖',
    subtitle: 'ส่งหัวใจแห่งความรักให้ครอบครัว เพื่อนๆ และสัตว์โลกทั้งปวง',
    emoji: '💖',
    activityType: 'affirmation',
    instruction: 'แตะหัวใจเพื่อส่งประกายความรักออกไปรอบตัว',
    voiceGuide: 'ส่งความรักความอบอุ่นให้คุณพ่อคุณแม่ คุณครู และเพื่อนทุกคน ขอให้ทุกคนมีความสุขนะจ๊ะ',
    soothingAffirmation: 'ขอให้ทุกคนมีความสุข ปลอดภัย และมีรอยยิ้มที่สดใสในทุกวัน',
    ambientSoundName: 'เสียงคอรัสอันอบอุ่น',
    colorTone: 'from-rose-300 via-pink-200 to-indigo-200',
    cycles: 3,
  },
  // --- เพิ่มอีก 12 กิจกรรมใหม่ตามคำขอ ---
  {
    id: 'calm-11-rainbow-breath',
    grade: 'K1',
    title: 'หายใจสายรุ้ง 7 สีสดใส 🌈',
    subtitle: 'สูดหายใจวาดโค้งสายรุ้งบนฟ้า ผ่อนลมหายใจระบายสีสันแห่งความสุข',
    emoji: '🌈',
    activityType: 'balloon_breath',
    instruction: 'แตะเพื่อเริ่มวาดสายรุ้ง หายใจเข้าท้องพอง หายใจออกผ่อนคลาย',
    voiceGuide: 'สูดลมหายใจเข้าลึกๆ วาดสายรุ้งสีแดง ส้ม เหลือง เขียว ฟ้า คราม ม่วง แล้วค่อยๆ ผ่อนลมหายใจออกช้าๆ สบายใจจัง',
    soothingAffirmation: 'จิตใจของหนูสดใสและเต็มไปด้วยสีสันแห่งความสุขเหมือนสายรุ้ง',
    ambientSoundName: 'เสียงสายลมฤดูใบไม้ผลิ',
    colorTone: 'from-amber-200 via-sky-200 to-pink-200',
    cycles: 4,
  },
  {
    id: 'calm-12-gentle-ocean-wave',
    grade: 'K1',
    title: 'คลื่นทะเลเห่กล่อมหาดทราย 🌊',
    subtitle: 'หายใจเข้าคลื่นซัดเข้าหาด หายใจออกคลื่นไหลกลับสู่ทะเลอย่างสงบ',
    emoji: '🌊',
    activityType: 'balloon_breath',
    instruction: 'ทำตามจังหวะคลื่นทะเล สูดหายใจเข้า และผ่อนออกอย่างนุ่มนวล',
    voiceGuide: 'ซู่... คลื่นลูกนุ่มซัดเข้าหาด สูดลมหายใจเข้า... ซ่า... คลื่นไหลกลับทะเล ผ่อนลมหายใจออก สบายตัวจัง',
    soothingAffirmation: 'ความเหนื่อยล้าค่อยๆ ไหลไปกับเกลียวคลื่น เหลือแต่ความสงบในใจ',
    ambientSoundName: 'เสียงคลื่นทะเลแผ่วเบา',
    colorTone: 'from-cyan-300 via-blue-200 to-teal-100',
    cycles: 4,
  },
  {
    id: 'calm-13-wind-chime-peace',
    grade: 'K1',
    title: 'กระดิ่งลมกังวานใสใจสงบ 🎐',
    subtitle: 'สดับฟังเสียงใสของกระดิ่งลม หลับตาเบาๆ นึกถึงสิ่งที่ทำให้ยิ้มได้',
    emoji: '🎐',
    activityType: 'peace_bell',
    instruction: 'แตะฟังเสียงกระดิ่งลม สูดหายใจเข้าลึกๆ แล้วยิ้มหวานๆ',
    voiceGuide: 'ฟังเสียงกรุ๊งกริ๊งของกระดิ่งลม... หายใจเข้าลึกๆ ให้ลมเย็นผ่านหัวใจ ยิ้มรับความสุขนะจ๊ะ',
    soothingAffirmation: 'ทุกเสียงรอบตัวเตือนให้หนูมีสติและรู้สึกปลอดภัยเสมอ',
    ambientSoundName: 'เสียงโมบายลมแก้วใส',
    colorTone: 'from-indigo-200 via-sky-100 to-emerald-100',
    cycles: 3,
  },
  {
    id: 'calm-14-sunflower-bloom',
    grade: 'K1',
    title: 'ดอกทานตะวันคลี่กลีบรับไออุ่น 🌻',
    subtitle: 'หายใจเข้าดอกไม้ค่อยๆ บาน หายใจออกผ่อนคลายกล้ามเนื้อทั่วตัว',
    emoji: '🌻',
    activityType: 'flower_candle',
    instruction: 'สูดรับความสดชื่นยามเช้าให้ดอกไม้บานสะพรั่ง',
    voiceGuide: 'สูดลมหายใจเข้าช้าๆ ดอกทานตะวันสีเหลืองกำลังบานรับแสงแดด... ผ่อนลมหายใจออก อบอุ่นหัวใจจัง',
    soothingAffirmation: 'หนูพร้อมเริ่มต้นสิ่งดีๆ ด้วยรอยยิ้มและพลังบวกเสมอ',
    ambientSoundName: 'เสียงนกร้องยามเช้า',
    colorTone: 'from-yellow-200 via-amber-100 to-lime-100',
    cycles: 4,
  },
  {
    id: 'calm-15-feather-floating',
    grade: 'K2',
    title: 'ขนนกสีขาวลอยละล่องบนอากาศ 🪶',
    subtitle: 'ผ่อนลมหายใจเป่าขนนกน้อยให้ลอยล่องอย่างนุ่มนวลและแผ่วเบา',
    emoji: '🪶',
    activityType: 'balloon_breath',
    instruction: 'เป่าลมเบาๆ ให้ขนนกลอยค้างบนอากาศอย่างนุ่มนวลที่สุด',
    voiceGuide: 'สูดลมหายใจเข้าทางจมูก... แล้วค่อยๆ เป่าลมทางปากเบาๆ ประคองขนนกสีขาวให้ลอยอยู่บนฟ้า',
    soothingAffirmation: 'ร่างกายของหนูเบาสบาย ไม่มีความตึงเครียดหรือความกังวล',
    ambientSoundName: 'เสียงลมพัดผ่านทุ่งหญ้า',
    colorTone: 'from-slate-200 via-sky-100 to-indigo-100',
    cycles: 4,
  },
  {
    id: 'calm-16-warm-cocoa-cup',
    grade: 'K2',
    title: 'ถ้วยช็อกโกแลตอุ่นละมุน ☕',
    subtitle: 'ดมกลิ่นหอมกรุ่นของโกโก้อุ่นๆ แล้วเป่าควันกรุ่นให้คลายร้อน',
    emoji: '☕',
    activityType: 'flower_candle',
    instruction: 'ดมกลิ่นหอมชื่นใจ (หายใจเข้า) แล้วเป่าให้โกโก้คลายร้อน (หายใจออก)',
    voiceGuide: 'ถือถ้วยโกโก้ไว้สองมือ สูดกลิ่นหอมหวานชื่นใจ... แล้วเป่าลมฟู่เบาๆ คลายร้อน อุ่นใจจัง',
    soothingAffirmation: 'ความอบอุ่นนี้ช่วยให้หนูรู้สึกปลอดภัยและผ่อนคลายเต็มเปี่ยม',
    ambientSoundName: 'เสียงเตาผิงอบอุ่น',
    colorTone: 'from-amber-300 via-orange-100 to-rose-100',
    cycles: 4,
  },
  {
    id: 'calm-17-sleeping-bear-hibernation',
    grade: 'K2',
    title: 'พี่หมีจำศีลในถ้ำอันแสนอบอุ่น 🐻❄️',
    subtitle: 'นั่งตัวตรงนิ่งๆ หายใจเข้าท้องพอง หายใจออกท้องยุบ ช้าและสม่ำเสมอ',
    emoji: '🐻',
    activityType: 'affirmation',
    instruction: 'วางมือบนหน้าท้อง สัมผัสการพองและยุบของท้องอย่างสงบนิ่ง',
    voiceGuide: 'เหมือนพี่หมีนอนหลับสบายในฤดูหนาว... วางมือที่ท้อง สูดลมเข้าท้องพอง... ผ่อนลมออกท้องยุบ...',
    soothingAffirmation: 'หนูควบคุมลมหายใจของตนเองได้ ร่างกายและจิตใจสงบนิ่งดีเยี่ยม',
    ambientSoundName: 'เสียงลมหนาวแผ่วเบา',
    colorTone: 'from-blue-200 via-indigo-100 to-slate-200',
    cycles: 4,
  },
  {
    id: 'calm-18-dandelion-seeds',
    grade: 'K2',
    title: 'ดอกแดนดิไลออนลอยลมไกล 🌾',
    subtitle: 'สูดลมหายใจเข้าเต็มปอด แล้วเป่าเมล็ดปุยขาวให้ลอยไปส่งความสุข',
    emoji: '🌾',
    activityType: 'flower_candle',
    instruction: 'สูดลมหายใจเข้าลึกๆ แล้วเป่าลมยาวๆ ให้เมล็ดดอกไม้ลอยไป',
    voiceGuide: 'สูดลมหายใจเข้าลึกๆ นับ 1 2 3... แล้วเป่าฟู่ยาวๆ ให้ปุยดอกไม้ลอยไปส่งความสุขให้เพื่อนๆ นะจ๊ะ',
    soothingAffirmation: 'ทุกครั้งที่ผ่อนลมหายใจ หนูส่งความสุขและความอ่อนโยนออกไปรอบตัว',
    ambientSoundName: 'เสียงลมพัดรวงข้าว',
    colorTone: 'from-lime-200 via-emerald-100 to-sky-100',
    cycles: 4,
  },
  {
    id: 'calm-19-kindness-heart-glow',
    grade: 'K3',
    title: 'ดวงใจเปี่ยมสุข กอดตัวเองอบอุ่น 💖',
    subtitle: 'วางมือทาบอก สัมผัสจังหวะหัวใจ โอบกอดและกล่าวชื่นชมตัวเอง',
    emoji: '💖',
    activityType: 'butterfly_hug',
    instruction: 'ยกแขนกอดตัวเองเบาๆ ตบไหล่สลับซ้าย-ขวาอย่างอ่อนโยน',
    voiceGuide: 'ไขว้แขนสองข้างกอดตัวเองไว้ ตบไหล่ซ้ายเบาๆ ตบไหล่ขวาเบาๆ... พูดในใจว่า "หนูเก่งและเป็นเด็กดีนะ"',
    soothingAffirmation: 'หนูรักและภูมิใจในตัวเอง หนูเป็นเด็กที่น่ารักและมีความสุขเสมอ',
    ambientSoundName: 'เสียงเพลงกล่อมนอนเบาๆ',
    colorTone: 'from-pink-300 via-rose-200 to-purple-200',
    cycles: 4,
  },
  {
    id: 'calm-20-rain-drops-puddle',
    grade: 'K3',
    title: 'หยาดฝนรินบนสระบัวอันสงบนิ่ง 🌧️💧',
    subtitle: 'หลับตาฟังเสียงหยดน้ำ เปาะแปะ หายใจเข้า-ออก เป็นจังหวะสมดุล',
    emoji: '💧',
    activityType: 'glitter_jar',
    instruction: 'มองดูหยดน้ำสร้างระลอกคลื่นนุ่มนวล สูดลมหายใจช้าๆ',
    voiceGuide: 'หยาดฝนเย็นฉ่ำโปรยปรายลงบนใบบัว... สูดลมหายใจเข้าสดชื่น... ผ่อนลมหายใจออกช้าๆ เย็นสบายใจ',
    soothingAffirmation: 'จิตใจของหนูใสสะอาดและสงบนิ่ง เหมือนผิวน้ำที่ราบเรียบ',
    ambientSoundName: 'เสียงฝนตกปรอยๆ',
    colorTone: 'from-teal-300 via-cyan-100 to-blue-200',
    cycles: 4,
  },
  {
    id: 'calm-21-starlight-wishes',
    grade: 'K3',
    title: 'ดวงดาวส่องแสงบนฟ้าราตรี 🌟',
    subtitle: 'มองดูแสงดาวระยิบระยับ สูดความสงบเย็น และปล่อยความตึงเครียดออกไป',
    emoji: '🌟',
    activityType: 'peace_bell',
    instruction: 'แตะดวงดาวเพื่อรับประกายแสงแห่งความหวังและรอยยิ้ม',
    voiceGuide: 'ดวงดาวน้อยกะพริบตาให้หนูบนท้องฟ้า... สูดลมหายใจรับความกล้าหาญ... ผ่อนลมหายใจทิ้งความกลัวไปนะจ๊ะ',
    soothingAffirmation: 'หนูมีความกล้าหาญและจิตใจที่เข้มแข็ง พร้อมเผชิญสิ่งใหม่อย่างมั่นใจ',
    ambientSoundName: 'เสียงกระดิ่งดนตรีสวรรค์',
    colorTone: 'from-indigo-300 via-purple-200 to-sky-200',
    cycles: 3,
  },
  {
    id: 'calm-22-floating-cloud-travel',
    grade: 'K3',
    title: 'ก้อนเมฆปุกปุยลอยท่องเวหา ☁️',
    subtitle: 'จินตนาการว่าร่างกายเบาสบายเหมือนปุยเมฆ ลอยไปบนฟ้ากว้างอย่างอิสระ',
    emoji: '☁️',
    activityType: 'balloon_breath',
    instruction: 'หายใจเข้าช้าๆ จินตนาการว่าตัวเบาสบายลอยขึ้นสู่ท้องฟ้า',
    voiceGuide: 'หลับตาลงเบาๆ รู้สึกว่าตัวเบาหวิวเหมือนปุยเมฆสีขาว... ลอยไปบนท้องฟ้าสีคราม สบายเหลือเกิน',
    soothingAffirmation: 'หนูรู้สึกผ่อนคลายในทุกส่วนของร่างกาย สดชื่นและพร้อมเรียนรู้สิ่งใหม่',
    ambientSoundName: 'เสียงเครื่องดนตรีฮาร์ปนุ่มละมุน',
    colorTone: 'from-sky-200 via-indigo-100 to-white',
    cycles: 4,
  },
];

// ==========================================
// 3. ประเภท สังคม (Social Skills & Manners)
// ==========================================
export interface SocialScenarioQuestion {
  id: string;
  grade: Grade;
  title: string;
  situationContext: string;
  situationEmoji: string;
  socialVirtue: string; // e.g. "การกล่าวขอบคุณ", "การรอคอย", "การแบ่งปัน"
  questionPrompt: string;
  voicePrompt: string;
  options: {
    id: string;
    text: string;
    emoji: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const SOCIAL_MANNERS_GAMES: SocialScenarioQuestion[] = [
  {
    "id": "soc-01-say-thank-you",
    "grade": "K1",
    "title": "เมื่อได้รับของขวัญหรือขนมจากผู้ใหญ่ 🎁",
    "situationContext": "คุณยายนำขนมคุกกี้แสนอร่อยมาให้หนูรับประทาน",
    "situationEmoji": "👵🍪",
    "socialVirtue": "การกล่าวคำขอบคุณและไหว้",
    "questionPrompt": "เมื่อได้รับขนม หนูควรทำอย่างไรเป็นอันดับแรก?",
    "voicePrompt": "เมื่อผู้ใหญ่ยื่นขนมอร่อยๆ ให้ หนูควรปฏิบัติตนอย่างไรจึงจะน่ารักที่สุดจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ยกมือไหว้สวยงาม พร้อมกล่าวขอบคุณครับหรือค่ะ",
        "emoji": "🙏",
        "isCorrect": true,
        "feedback": "ถูกต้องจ้า! การไหว้และพูดขอบคุณแสดงถึงมารยาทไทยที่น่ารัก ผู้ใหญ่ชื่นชมเสมอ"
      },
      {
        "id": "opt-b",
        "text": "รีบคว้าขนมมาแกะกินทันที แล้ววิ่งหนีไปเล่นคนเดียว",
        "emoji": "🏃💨",
        "isCorrect": false,
        "feedback": "ไม่น่ารักเลยนะจ๊ะ ควรไหว้และขอบคุณผู้ใหญ่ก่อนเสมอจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "ยืนมองนิ่งเฉย ไม่ยอมเอ่ยปากพูดอะไรกับผู้ใหญ่เลย",
        "emoji": "😶",
        "isCorrect": false,
        "feedback": "ควรเปล่งเสียงพูดขอบคุณด้วยรอยยิ้มแจ่มใสนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-02-say-sorry-bump",
    "grade": "K1",
    "title": "เมื่อเดินสะดุดหรือชนเพื่อนโดยไม่ได้ตั้งใจ 💥",
    "situationContext": "ขณะกำลังเดินไปห้องน้ำ หนูเผลอเดินชนเพื่อนจนเพื่อนเซ",
    "situationEmoji": "🚶‍♂️💥🚶‍♀️",
    "socialVirtue": "การกล่าวคำขอโทษและห่วงใย",
    "questionPrompt": "หนูควรทำอย่างไรกับเพื่อน?",
    "voicePrompt": "เมื่อเผลอเดินชนเพื่อนโดยไม่ได้ตั้งใจ หนูควรพูดและทำอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "แกล้งชี้นิ้วว่าเพื่อนเดินไม่ระวัง จนทำให้เดินมาชนเรา",
        "emoji": "😆👉",
        "isCorrect": false,
        "feedback": "การชี้นิ้วโทษเพื่อนทำให้เพื่อนเสียใจมากเลยนะจ๊ะ ไม่ควรทำอย่างยิ่ง"
      },
      {
        "id": "opt-b",
        "text": "รีบช่วยพยุงถามไถ่ แล้วพูดขอโทษด้วยความจริงใจ",
        "emoji": "🤝❤️",
        "isCorrect": true,
        "feedback": "เก่งมากจ้ะ! การยอมรับความผิดและกล่าวขอโทษอย่างจริงใจ ทำให้มิตรภาพยืนยาว"
      },
      {
        "id": "opt-c",
        "text": "แกล้งทำเป็นมองไม่เห็น แล้วรีบเดินหนีไปเล่นที่อื่น",
        "emoji": "🙈",
        "isCorrect": false,
        "feedback": "หากชนเพื่อน เราควรหยุดถามไถ่และกล่าวขอโทษทันทีนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-03-sharing-toys",
    "grade": "K1",
    "title": "เมื่ออยากเล่นของเล่นที่เพื่อนกำลังเล่นอยู่ 🧸",
    "situationContext": "เพื่อนกำลังต่อบล็อกไม้อยู่ และหนูอยากร่วมเล่นด้วยมากๆ",
    "situationEmoji": "🧱🧸",
    "socialVirtue": "การขออนุญาตและการรอคอย",
    "questionPrompt": "วิธีขอเล่นร่วมกับเพื่อนที่ถูกต้องคือข้อใด?",
    "voicePrompt": "ถ้าหนูอยากเล่นของเล่นกับเพื่อน หนูควรทำอย่างไรดีเอ่ย?",
    "options": [
      {
        "id": "opt-a",
        "text": "แย่งของเล่นมาจากมือเพื่อน เพราะเราอยากเล่นมากตอนนี้",
        "emoji": "🤼",
        "isCorrect": false,
        "feedback": "การแย่งของเล่นทำให้ของพังและเพื่อนเสียใจ เป็นพฤติกรรมที่ไม่ดีจ้ะ"
      },
      {
        "id": "opt-b",
        "text": "ลงไปนอนดิ้นร้องไห้เสียงดัง เพื่อให้เพื่อนยอมยกให้เล่น",
        "emoji": "😭",
        "isCorrect": false,
        "feedback": "การร้องไห้เอาแต่ใจไม่ได้ช่วยแก้ปัญหา ควรฝึกพูดด้วยเหตุผลนะจ๊ะ"
      },
      {
        "id": "opt-c",
        "text": "เดินเข้าไปพูดสุภาพ ขอร่วมเล่นต่อบล็อกด้วยคนได้ไหมจ๊ะ",
        "emoji": "🗣️✨",
        "isCorrect": true,
        "feedback": "ยอดเยี่ยมมาก! การเอ่ยปากขออนุญาตอย่างสุภาพ เพื่อนๆ ยินดีต้อนรับเสมอ"
      }
    ]
  },
  {
    "id": "soc-04-line-up-turn",
    "grade": "K2",
    "title": "การเข้าแถวรอรับอาหารหรือขึ้นเครื่องเล่น 🚶‍♂️🚶‍♀️",
    "situationContext": "มีเพื่อนหลายคนกำลังต่อแถวรอเล่นชิงช้าในสนามเด็กเล่น",
    "situationEmoji": "🎪🛝",
    "socialVirtue": "การเข้าแถวเคารพลำดับกติกา",
    "questionPrompt": "หนูควรปฏิบัติตนอย่างไร?",
    "voicePrompt": "เมื่อเห็นเพื่อนๆ กำลังต่อแถวเล่นเครื่องเล่น หนูควรทำอย่างไรเอ่ย?",
    "options": [
      {
        "id": "opt-a",
        "text": "เดินไปต่อท้ายแถว รอคอยรอบของตนเองอย่างอดทน",
        "emoji": "🧍‍♂️🧍‍♀️",
        "isCorrect": true,
        "feedback": "ถูกต้องจ้า! คนเก่งย่อมรู้จักการรอคอยตามลำดับก่อน-หลังอย่างมีระเบียบ"
      },
      {
        "id": "opt-b",
        "text": "วิ่งไปแทรกแซงคิวข้างหน้า เพราะกลัวไม่ได้เล่นชิงช้า",
        "emoji": "🏃💨❌",
        "isCorrect": false,
        "feedback": "การแซงคิวเป็นการเอาเปรียบเพื่อนๆ ไม่ยุติธรรมต่อคนที่มาก่อนจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "ผลักเพื่อนข้างหน้าให้ออกไป เพื่อให้ตนเองได้ขึ้นเล่นก่อน",
        "emoji": "🙅‍♂️",
        "isCorrect": false,
        "feedback": "การผลักเพื่อนอันตรายมาก อาจทำให้เพื่อนได้รับบาดเจ็บได้นะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-05-cleanup-together",
    "grade": "K2",
    "title": "เมื่อได้ยินเสียงกริ่งหมดเวลาเล่น 🔔🧸",
    "situationContext": "คุณครูให้สัญญาณว่าหมดเวลาเล่นเสรี และของเล่นวางกระจัดกระจาย",
    "situationEmoji": "🔔🧩",
    "socialVirtue": "การมีจิตสาธารณะและช่วยเก็บของ",
    "questionPrompt": "เด็กดีควรช่วยกันทำสิ่งใด?",
    "voicePrompt": "หมดเวลาเล่นแล้ว ของเล่นเต็มพื้นเลย หนูควรทำอย่างไรดีนะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "รีบวิ่งไปนั่งรอเฉยๆ ไม่ยอมเก็บเพราะอ้างว่าไม่ได้เล่น",
        "emoji": "🏃🚪",
        "isCorrect": false,
        "feedback": "ของเล่นในห้องเป็นของส่วนรวม ช่วยกันเก็บทำให้เราน่ารักและมีน้ำใจจ้ะ"
      },
      {
        "id": "opt-b",
        "text": "ช่วยเพื่อนและคุณครู เก็บของเล่นเข้ากล่องจนสะอาด",
        "emoji": "📦🧹",
        "isCorrect": true,
        "feedback": "น่ารักที่สุดเลย! ช่วยกันคนละไม้คนละมือ ห้องเรียนจะสะอาดและของไม่พังสูญหาย"
      },
      {
        "id": "opt-c",
        "text": "เตะของเล่นไปซ่อนไว้ใต้ตู้ เพื่อจะได้ไม่ต้องเหนื่อยเก็บ",
        "emoji": "🦶❌",
        "isCorrect": false,
        "feedback": "การเตะของเล่นทำให้ของเล่นชำรุดเสียหายนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-06-comfort-sad-friend",
    "grade": "K2",
    "title": "เมื่อเห็นเพื่อนกำลังร้องไห้คิดถึงคุณแม่ 😢",
    "situationContext": "เพื่อนใหม่นั่งกอดเข่าร้องไห้เงียบๆ อยู่มุมห้อง",
    "situationEmoji": "😢🫂",
    "socialVirtue": "ความเห็นอกเห็นใจและปลอบโยน (Empathy)",
    "questionPrompt": "หนูสามารถแสดงน้ำใจช่วยเหลือเพื่อนได้อย่างไร?",
    "voicePrompt": "เพื่อนกำลังร้องไห้เสียใจ หนูจะเข้าไปช่วยเหลือเพื่อนอย่างไรดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ล้อเลียนเพื่อนว่าขี้แงจัง แล้วชวนคนอื่นมาหัวเราะใส่",
        "emoji": "😝❌",
        "isCorrect": false,
        "feedback": "ห้ามล้อเลียนเพื่อนเด็ดขาดนะจ๊ะ เพราะจะยิ่งทำให้เพื่อนเศร้าใจมากขึ้น"
      },
      {
        "id": "opt-b",
        "text": "ตะโกนฟ้องคุณครูเสียงดังลั่น โดยไม่เข้าไปถามเพื่อนเลย",
        "emoji": "📢",
        "isCorrect": false,
        "feedback": "เราควรเข้าไปถามไถ่เพื่อนด้วยความนุ่มนวลก่อนจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "เดินเข้าไปหา ส่งทิชชูให้ แล้วชวนเพื่อนมาเล่นด้วยกัน",
        "emoji": "🧻🤝",
        "isCorrect": true,
        "feedback": "ยอดเยี่ยมมากจ้ะ! ความอบอุ่นและคำปลอบโยนของเพื่อนคือกำลังใจที่ดีที่สุด"
      }
    ]
  },
  {
    "id": "soc-07-quiet-in-library",
    "grade": "K3",
    "title": "การปฏิบัติตนในห้องสมุดหรือมุมหนังสือ 📚🤫",
    "situationContext": "มีเพื่อนๆ หลายคนกำลังตั้งใจอ่านนิทานอยู่ในมุมหนังสือ",
    "situationEmoji": "📚🤫",
    "socialVirtue": "การเกรงใจและเคารพความสงบส่วนรวม",
    "questionPrompt": "กติกามารยาทในห้องสมุดที่ถูกต้องคือ?",
    "voicePrompt": "ในห้องสมุดที่มีเพื่อนๆ กำลังอ่านหนังสือ เราควรปฏิบัติตัวอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "เดินช้าๆ เบาๆ พูดกระซิบ และเปิดหน้านิทานอย่างเบามือ",
        "emoji": "🤫📖",
        "isCorrect": true,
        "feedback": "ถูกต้องที่สุด! การไม่ส่งเสียงดังรบกวนสมาธิผู้อื่นเป็นมารยาทสังคมที่สำคัญมาก"
      },
      {
        "id": "opt-b",
        "text": "วิ่งไล่จับและตะโกนคุยกับเพื่อนเสียงดังลั่นทั่วทั้งห้อง",
        "emoji": "🏃‍♂️📢",
        "isCorrect": false,
        "feedback": "ห้องสมุดต้องการความสงบ การส่งเสียงดังรบกวนผู้อื่นจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "ฉีกหน้าหนังสือนิทานมาพับเครื่องบินร่อนเล่นในห้องสมุด",
        "emoji": "✈️❌",
        "isCorrect": false,
        "feedback": "หนังสือเป็นของส่วนรวม ต้องทะนุถนอมไม่ฉีกขาดนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-08-listen-speaker",
    "grade": "K3",
    "title": "เมื่อมีเพื่อนหรือคุณครูกำลังยืนเล่านิทานหน้าชั้นเรียน 🧑‍🏫📖",
    "situationContext": "เพื่อนคนหนึ่งกำลังออกไปเล่าเรื่องครอบครัวของตนเองหน้าห้อง",
    "situationEmoji": "🗣️👂",
    "socialVirtue": "การเป็นผู้ฟังที่ดี (Active Listening)",
    "questionPrompt": "มารยาทของผู้ฟังที่ดีควรทำอย่างไร?",
    "voicePrompt": "เมื่อเพื่อนยืนพูดหน้าห้อง ผู้ฟังที่ดีควรทำตัวอย่างไรเอ่ย?",
    "options": [
      {
        "id": "opt-a",
        "text": "หันไปชวนเพื่อนข้างๆ คุยแข่งเสียงดังกับคนที่กำลังพูด",
        "emoji": "🗣️🗣️",
        "isCorrect": false,
        "feedback": "การพูดคุยแทรกขณะมีคนพูดแสดงถึงการไม่ให้เกียรติผู้อื่นนะจ๊ะ"
      },
      {
        "id": "opt-b",
        "text": "มองดูเพื่อนอย่างตั้งใจฟัง และปรบมือให้เมื่อพูดจบแล้ว",
        "emoji": "👀👏",
        "isCorrect": true,
        "feedback": "เก่งมากจ้ะ! การตั้งใจฟังและปรบมือให้เกียรติผู้พูดคือคุณสมบัติของผู้นำที่ดี"
      },
      {
        "id": "opt-c",
        "text": "เอาของเล่นขึ้นมาเคาะโต๊ะ ส่งเสียงดังรบกวนสมาธิเพื่อน",
        "emoji": "🧸❌",
        "isCorrect": false,
        "feedback": "ควรเก็บของเล่นและตั้งใจฟังก่อนจ้ะ"
      }
    ]
  },
  {
    "id": "soc-09-include-new-friend",
    "grade": "K3",
    "title": "เมื่อมีเพื่อนใหม่ย้ายเข้ามาเรียนวันแรก 🎒👋",
    "situationContext": "มีเพื่อนใหม่ย้ายมา ยืนเก้ๆ กังๆ ไม่กล้าเข้ามาเล่นกับใคร",
    "situationEmoji": "🎒👋",
    "socialVirtue": "การต้อนรับและความเป็นมิตร (Inclusivity)",
    "questionPrompt": "หนูควรแสดงความเป็นมิตรอย่างไร?",
    "voicePrompt": "เพื่อนใหม่ยังไม่มีเพื่อนเล่นเลย หนูจะเข้าไปทักทายอย่างไรดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ชวนเพื่อนในกลุ่มไม่ให้เข้าไปพูดคุยหรือเล่นกับเพื่อนใหม่",
        "emoji": "🙅‍♀️👥",
        "isCorrect": false,
        "feedback": "การกีดกันเพื่อนทำให้เพื่อนเหงาและเสียใจ เป็นสิ่งที่ไม่ควรทำเลยนะจ๊ะ"
      },
      {
        "id": "opt-b",
        "text": "จ้องมองด้วยสายตาดุใส่เพื่อนใหม่ แล้วเดินหนีไปเล่นที่อื่น",
        "emoji": "😠",
        "isCorrect": false,
        "feedback": "ควรยิ้มแย้มและกล่าวทักทายอย่างเป็นมิตรจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "เดินเข้าไปยิ้ม ทักทายสวัสดี แนะนำชื่อและชวนมาเล่นด้วย",
        "emoji": "🤝😊",
        "isCorrect": true,
        "feedback": "น่ารักน่าประทับใจมาก! คำทักทายและรอยยิ้มทำให้เพื่อนใหม่รู้สึกอบอุ่นคลายกังวล"
      }
    ]
  },
  {
    "id": "soc-10-cheer-everyone",
    "grade": "K3",
    "title": "เมื่อเล่นเกมกีฬาแล้วทีมของเพื่อนเป็นฝ่ายชนะ 🏆🤝",
    "situationContext": "แข่งขันวิ่งผลัดเสร็จสิ้น ทีมของเพื่อนวิ่งเข้าเส้นชัยก่อน",
    "situationEmoji": "🏃‍♀️🥇🤝",
    "socialVirtue": "น้ำใจนักกีฬา (Sportsmanship)",
    "questionPrompt": "นักกีฬาที่ดีควรปฏิบัติตนอย่างไร?",
    "voicePrompt": "แม้ทีมเราจะไม่ได้ที่หนึ่ง แต่เราควรแสดงน้ำใจนักกีฬาอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ยิ้มแย้มจับมือยินดีด้วย ชื่นชมเพื่อนว่าวิ่งเก่งมากๆ เลย",
        "emoji": "🤝🎉",
        "isCorrect": true,
        "feedback": "สุดยอดน้ำใจนักกีฬา! รู้แพ้ รู้ชนะ รู้อภัย มิตรภาพสำคัญกว่าผลแพ้ชนะเสมอ"
      },
      {
        "id": "opt-b",
        "text": "โกรธโมโห ขว้างขวดน้ำลงพื้น และตะโกนโวยวายไม่ยอมรับผล",
        "emoji": "😡💥",
        "isCorrect": false,
        "feedback": "การแพ้ชนะเป็นเรื่องธรรมดาของการเล่นเกม ไม่ควรใช้อารมณ์โมโหจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "กล่าวหาว่าเพื่อนโกง ทั้งที่เพื่อนวิ่งถูกต้องตามกฎกติกา",
        "emoji": "🤥",
        "isCorrect": false,
        "feedback": "เราควรเคารพกติกาและร่วมยินดีกับผู้ชนะอย่างจริงใจจ้ะ"
      }
    ]
  },
  {
    "id": "soc-11-line-up-cafeteria",
    "grade": "K1",
    "title": "การเข้าแถวรอรับนมและอาหารกลางวัน 🥛🚶‍♂️",
    "situationContext": "ถึงเวลาพักดื่มนม มีเพื่อนๆ ยืนต่อแถวรอรับกล่องนมเรียบร้อย",
    "situationEmoji": "🥛👫👫",
    "socialVirtue": "การเข้าแถวรอคอยตามลำดับ (Patience & Order)",
    "questionPrompt": "เมื่อหนูเดินมาถึงแถว หนูควรทำอย่างไร?",
    "voicePrompt": "มีเพื่อนๆ กำลังต่อแถวรับนมอยู่ หนูควรทำอย่างไรจึงจะถูกต้องตามระเบียบจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "วิ่งไปแทรกแซงหน้าแถวสุดทันที เพราะรู้สึกหิวนมมากเหลือเกิน",
        "emoji": "🏃💨❌",
        "isCorrect": false,
        "feedback": "การแซงคิวทำให้เพื่อนๆ เดือดร้อนและเป็นการกระทำที่ไม่น่ารักเลยนะจ๊ะ"
      },
      {
        "id": "opt-b",
        "text": "เดินไปต่อท้ายแถวอย่างเรียบร้อย รอรับนมตามลำดับคิวของตนเอง",
        "emoji": "🚶‍♂️✅",
        "isCorrect": true,
        "feedback": "ถูกต้องที่สุดจ้ะ! การต่อแถวแสดงถึงการเคารพสิทธิผู้อื่นและมีวินัยในตนเอง"
      },
      {
        "id": "opt-c",
        "text": "ผลักเพื่อนข้างหน้าให้ออกจากแถว เพื่อจะได้เข้าไปรับนมก่อน",
        "emoji": "✋💥",
        "isCorrect": false,
        "feedback": "ห้ามผลักเพื่อนเด็ดขาดจ้ะ เพราะอาจทำให้เพื่อนล้มบาดเจ็บได้"
      }
    ]
  },
  {
    "id": "soc-12-clean-up-toys",
    "grade": "K1",
    "title": "ช่วยกันเก็บของเล่นเข้าที่เมื่อเล่นเสร็จ 🧸📦",
    "situationContext": "เสียงกริ่งหมดเวลาเล่นดังขึ้น ตัวต่อและของเล่นยังกระจายอยู่บนพรม",
    "situationEmoji": "🧩📦🧸",
    "socialVirtue": "ความรับผิดชอบและจิตสาธารณะ (Responsibility)",
    "questionPrompt": "เมื่อได้ยินเสียงหมดเวลาเล่น หนูควรทำอย่างไร?",
    "voicePrompt": "หมดเวลาเล่นของเล่นแล้ว หนูและเพื่อนๆ ควรช่วยกันทำอะไรเอ่ย?",
    "options": [
      {
        "id": "opt-a",
        "text": "รีบวิ่งหนีไปเล่นอย่างอื่นทันที ปล่อยให้เพื่อนเก็บของคนเดียว",
        "emoji": "🏃‍♂️💨",
        "isCorrect": false,
        "feedback": "เราเล่นด้วยกัน ก็ต้องช่วยกันเก็บรักษา ไม่เอาเปรียบเพื่อนนะจ๊ะ"
      },
      {
        "id": "opt-b",
        "text": "เตะของเล่นไปกองรวมไว้ใต้โต๊ะครู เพื่อจะได้เสร็จไวไม่ต้องเก็บ",
        "emoji": "🦶❌",
        "isCorrect": false,
        "feedback": "ควรจัดเก็บลงในกล่องของเล่นให้ถูกที่ ไม่เตะหรือโยนของเล่นจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "ช่วยเพื่อนเก็บของเล่นใส่กล่อง และนำไปวางคืนที่เดิมให้เรียบร้อย",
        "emoji": "🤝📦",
        "isCorrect": true,
        "feedback": "เก่งมากจ้า! การช่วยกันเก็บของเล่นทำให้ห้องเรียนเป็นระเบียบและน่าอยู่เสมอ"
      }
    ]
  },
  {
    "id": "soc-13-cover-mouth-cough",
    "grade": "K1",
    "title": "มารยาทเมื่อไอหรือจามในที่สาธารณะ 😷🤧",
    "situationContext": "ขณะกำลังนั่งฟังนิทาน หนูรู้สึกคันคอและอยากจะไอหรือจามออกมา",
    "situationEmoji": "🤧💨👧",
    "socialVirtue": "สุขอนามัยและความเกรงใจผู้อื่น (Hygiene & Consideration)",
    "questionPrompt": "หนูควรทำอย่างไรก่อนที่จะไอหรือจาม?",
    "voicePrompt": "เมื่อรู้สึกจะไอหรือจาม หนูควรป้องกันเชื้อโรคกระจายอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ใช้กระดาษทิชชูหรือข้อพับแขนเสื้อ ปิดปากและจมูกให้มิดชิด",
        "emoji": "💪😷",
        "isCorrect": true,
        "feedback": "ถูกต้องมากจ้ะ! การใช้ข้อพับแขนหรือทิชชูปิดปากช่วยป้องกันเชื้อโรคแพร่สู่เพื่อนๆ"
      },
      {
        "id": "opt-b",
        "text": "หันหน้าไปจามใส่หน้าเพื่อนข้างๆ เต็มแรงโดยไม่ปิดปากเลย",
        "emoji": "😱❌",
        "isCorrect": false,
        "feedback": "อันตรายมากจ้ะ เชื้อโรคจะกระเด็นใส่เพื่อน ทำให้เพื่อนป่วยได้นะ"
      },
      {
        "id": "opt-c",
        "text": "เอามือปิดปากแล้วเอามือที่เปื้อนน้ำมูก ไปจับของเล่นเพื่อนต่อ",
        "emoji": "🖐️🦠",
        "isCorrect": false,
        "feedback": "หากใช้มือปิดปาก ต้องรีบไปล้างมือด้วยสบู่ให้สะอาดก่อนจับของเล่นนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-14-borrow-crayon-permission",
    "grade": "K1",
    "title": "การขอยืมสีเทียนจากเพื่อนอย่างสุภาพ 🖍️🙏",
    "situationContext": "สีเทียนสีฟ้าของหนูหมด แต่เห็นเพื่อนมีสีฟ้าอยู่ในกล่อง",
    "situationEmoji": "🖍️🎨👧👦",
    "socialVirtue": "การขออนุญาตและการเคารพของผู้อื่น (Respect & Politeness)",
    "questionPrompt": "หนูควรปฏิบัติอย่างไรเพื่อขอใช้สีฟ้า?",
    "voicePrompt": "อยากใช้สีเทียนของเพื่อน หนูควรพูดกับเพื่อนอย่างไรก่อนดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ดึงแย่งสีมาจากมือเพื่อนทันที โดยไม่เอ่ยปากขออนุญาตเลย",
        "emoji": "😠✊",
        "isCorrect": false,
        "feedback": "การแย่งของคนอื่นเป็นมารยาทที่ไม่ดี และอาจทำให้เกิดการทะเลาะกันได้จ้ะ"
      },
      {
        "id": "opt-b",
        "text": "สบตายิ้มหวาน พูดขออนุญาตยืมสีฟ้า แล้วสัญญาจะรีบคืนให้",
        "emoji": "🙏💬",
        "isCorrect": true,
        "feedback": "น่ารักมากจ้ะ! การกล่าวขออนุญาตอย่างสุภาพ ทำให้เพื่อนยินดีแบ่งปันด้วยความเต็มใจ"
      },
      {
        "id": "opt-c",
        "text": "แอบหยิบสีใส่กระเป๋าตัวเอง ตอนที่เพื่อนเผลอหันไปทางอื่น",
        "emoji": "🤫❌",
        "isCorrect": false,
        "feedback": "การหยิบของคนอื่นโดยไม่บอกถือเป็นเรื่องไม่ถูกต้องนะจ๊ะ ต้องบอกเจ้าของก่อนเสมอ"
      }
    ]
  },
  {
    "id": "soc-15-respect-library-quiet",
    "grade": "K2",
    "title": "การรักษาความสงบในห้องสมุด 📚🤫",
    "situationContext": "ในห้องสมุดมีคุณครูและพี่ๆ กำลังตั้งใจอ่านหนังสือเงียบๆ",
    "situationEmoji": "📚🤫👧👦",
    "socialVirtue": "การเคารพกติกาและสถานที่ (Respecting Rules & Quiet Spaces)",
    "questionPrompt": "เมื่อเข้ามาในห้องสมุด เราควรปฏิบัติตนอย่างไร?",
    "voicePrompt": "ในห้องสมุดที่มีคนอ่านหนังสืออยู่ เราควรใช้ระดับเสียงและการเดินอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "วิ่งเล่นไล่จับกับเพื่อนเสียงดัง วิ่งวนรอบตู้หนังสือไปมา",
        "emoji": "🏃‍♂️💨❌",
        "isCorrect": false,
        "feedback": "ห้ามวิ่งในห้องสมุดเด็ดขาด เพราะเสียงดังและอาจชนชั้นหนังสือล้มได้นะจ๊ะ"
      },
      {
        "id": "opt-b",
        "text": "ตะโกนเรียกเพื่อนข้ามห้องสมุด เพื่อให้มาดูภาพตลกในหนังสือ",
        "emoji": "📢❌",
        "isCorrect": false,
        "feedback": "การส่งเสียงดังรบกวนสมาธิของผู้อื่น ควรเดินไปใกล้ๆ แล้วกระซิบเบาๆ แทนจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "เดินช้าๆ เบาๆ ไม่ส่งเสียงดัง และใช้เสียงกระซิบเวลาคุยกัน",
        "emoji": "🤫👣",
        "isCorrect": true,
        "feedback": "ยอดเยี่ยมมากจ้ะ! ห้องสมุดเป็นที่ที่ต้องการความสงบเพื่อให้ทุกคนมีสมาธิอ่านหนังสือ"
      }
    ]
  },
  {
    "id": "soc-16-cheer-friend-fall",
    "grade": "K2",
    "title": "แสดงความห่วงใยเมื่อเห็นเพื่อนวิ่งหกล้ม 🏃‍♀️🤕",
    "situationContext": "ขณะเล่นที่สนามเด็กเล่น เพื่อนสะดุดขาตัวเองล้มลง มีรอยถลอกที่หัวเข่า",
    "situationEmoji": "🤕🩹👧👦",
    "socialVirtue": "ความมีน้ำใจและการช่วยเหลือเกื้อกูล (Caring & Helping Others)",
    "questionPrompt": "หนูควรทำอย่างไรเมื่อเห็นเพื่อนล้มเจ็บ?",
    "voicePrompt": "เพื่อนวิ่งหกล้มร้องไห้อยู่ตรงหน้า หนูจะช่วยเพื่อนอย่างไรดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "รีบเข้าไปพยุงถามไถ่อาการ แล้วช่วยพาเพื่อนไปห้องพยาบาล",
        "emoji": "🤝🏥",
        "isCorrect": true,
        "feedback": "หัวใจทองคำมากจ้ะ! ความช่วยเหลือและความอบอุ่นของเพื่อนทำให้เพื่อนหายเจ็บได้เร็วขึ้น"
      },
      {
        "id": "opt-b",
        "text": "ยืนชี้นิ้วหัวเราะเยาะเพื่อนเสียงดัง แล้วชวนเพื่อนคนอื่นมาล้อ",
        "emoji": "😆👉❌",
        "isCorrect": false,
        "feedback": "การหัวเราะเยาะคนที่เจ็บปวดทำร้ายจิตใจเพื่อนมาก ไม่ควรทำอย่างยิ่งจ้ะ"
      },
      {
        "id": "opt-c",
        "text": "แกล้งทำเป็นมองไม่เห็น แล้วรีบวิ่งไปเล่นเครื่องเล่นอื่นต่อ",
        "emoji": "🏃‍♀️💨",
        "isCorrect": false,
        "feedback": "เพื่อนที่ดีต้องไม่ทอดทิ้งกันเมื่อเพื่อนต้องการความช่วยเหลือน้า"
      }
    ]
  },
  {
    "id": "soc-17-greet-security-cleaner",
    "grade": "K2",
    "title": "ทักทายคุณลุงยามและคุณป้าแม่บ้านด้วยความเคารพ 🙏🏫",
    "situationContext": "ตอนเช้าเดินเข้าประตูโรงเรียน เจอลุงยามคอยเปิดประตูและป้าแม่บ้านกวาดใบไม้",
    "situationEmoji": "👮‍♂️🧹👧🙏",
    "socialVirtue": "การให้เกียรติและเคารพผู้อื่นทุกอาชีพ (Respect for Community Helpers)",
    "questionPrompt": "เมื่อพบผู้ใหญ่ที่คอยดูแลโรงเรียน หนูควรทำอย่างไร?",
    "voicePrompt": "เจอลุงยามและป้าแม่บ้านที่คอยดูแลความสะอาดปลอดภัยให้เรา หนูควรทักทายอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "เดินก้มหน้าเชิดใส่ ไม่ยอมสบตาหรือไม่พูดจาทักทายผู้ใหญ่เลย",
        "emoji": "😒❌",
        "isCorrect": false,
        "feedback": "ไม่น่ารักเลยจ้ะ การทักทายด้วยรอยยิ้มทำให้ทั้งเราและผู้ใหญ่มีความสุขใจทั้งวัน"
      },
      {
        "id": "opt-b",
        "text": "ยกมือไหว้อย่างสวยงาม ยิ้มแย้มกล่าวสวัสดีครับหรือสวัสดีค่ะ",
        "emoji": "🙏😊",
        "isCorrect": true,
        "feedback": "น่าชื่นชมที่สุดจ้ะ! ทุกคนที่ทำงานช่วยเหลือโรงเรียนคือผู้มีพระคุณที่ควรได้รับความเคารพ"
      },
      {
        "id": "opt-c",
        "text": "โยนเศษกระดาษลงพื้น เพื่อแกล้งให้คุณป้าแม่บ้านต้องตามมากวาด",
        "emoji": "🗑️❌",
        "isCorrect": false,
        "feedback": "เราควรช่วยทิ้งขยะลงถังให้เรียบร้อยเพื่อช่วยแบ่งเบาภาระของคุณป้าแม่บ้านนะจ๊ะ"
      }
    ]
  },
  {
    "id": "soc-18-lost-and-found-return",
    "grade": "K2",
    "title": "ความซื่อสัตย์เมื่อเก็บของมีค่าตกหล่นได้ 👛✨",
    "situationContext": "หนูเห็นกระเป๋าดินสอแสนสวยพร้อมเงินเหรียญตกอยู่ใต้ต้นไม้",
    "situationEmoji": "👛🪙🔍👧",
    "socialVirtue": "ความซื่อสัตย์สุจริต (Honesty & Integrity)",
    "questionPrompt": "ของชิ้นนี้ไม่ใช่ของหนู หนูควรทำอย่างไร?",
    "voicePrompt": "เก็บของมีค่าของคนอื่นที่ตกอยู่ได้ หนูควรนำไปไว้ที่ไหนดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "แอบยัดใส่กระเป๋าตัวเองเอากลับบ้าน เพื่อนำไปใช้เป็นของตนเอง",
        "emoji": "🎒🤫❌",
        "isCorrect": false,
        "feedback": "ของที่ไม่ใช่ของเรา ห้ามนำมาเป็นของตนเองเด็ดขาดนะจ๊ะ เพราะเจ้าของจะเสียใจมาก"
      },
      {
        "id": "opt-b",
        "text": "เอาเงินในกระเป๋าไปซื้อขนมกินคนเดียว โดยไม่บอกคุณครูเลย",
        "emoji": "🍬❌",
        "isCorrect": false,
        "feedback": "การนำเงินของคนอื่นไปใช้เป็นสิ่งผิดและไม่ซื่อสัตย์นะจ๊ะ"
      },
      {
        "id": "opt-c",
        "text": "นำไปมอบให้คุณครูทันที เพื่อช่วยประกาศตามหาเพื่อนเจ้าของ",
        "emoji": "👩‍🏫📦",
        "isCorrect": true,
        "feedback": "ยอดเยี่ยมมากคนเก่ง! ความซื่อสัตย์เป็นสมบัติที่ล้ำค่าที่สุด เจ้าของต้องดีใจมากแน่ๆ"
      }
    ]
  },
  {
    "id": "soc-19-listen-when-teacher-talks",
    "grade": "K3",
    "title": "การเป็นผู้ฟังที่ดีเมื่อครูหรือเพื่อนกำลังพูด 👂👩‍🏫",
    "situationContext": "คุณครูกำลังอธิบายการทดลองวิทยาศาสตร์แสนสนุกอยู่หน้าห้อง",
    "situationEmoji": "👩‍🏫🔬👂👧",
    "socialVirtue": "มารยาทการฟังและการให้เกียรติผู้พูด (Attentive Listening)",
    "questionPrompt": "ขณะที่ครูกำลังพูดอธิบาย นักเรียนที่ดีควรทำอย่างไร?",
    "voicePrompt": "ขณะคุณครูกำลังอธิบายบทเรียน หนูควรตั้งใจฟังอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ตั้งใจฟัง สบตาครู และยกมือขออนุญาตเมื่อต้องการถามคำถาม",
        "emoji": "🙋‍♀️👂",
        "isCorrect": true,
        "feedback": "ยอดเยี่ยมมากจ้ะ! การตั้งใจฟังและยกมือก่อนพูดแสดงถึงมารยาทในห้องเรียนที่ดีเยี่ยม"
      },
      {
        "id": "opt-b",
        "text": "หันไปคุยแข่งกับคุณครู ชวนเพื่อนข้างๆ เล่นของเล่นใต้โต๊ะ",
        "emoji": "🗣️👥❌",
        "isCorrect": false,
        "feedback": "การคุยแทรกทำให้เราไม่เข้าใจบทเรียนและรบกวนสมาธิเพื่อนคนอื่นด้วยนะจ๊ะ"
      },
      {
        "id": "opt-c",
        "text": "ตะโกนแทรกขึ้นมาทันที โดยไม่รอให้คุณครูพูดอธิบายจบก่อนเลย",
        "emoji": "📢❌",
        "isCorrect": false,
        "feedback": "ควรฝึกรอจังหวะให้คุณครูพูดจบ แล้วยกมือขออนุญาตก่อนพูดเสมอจ้ะ"
      }
    ]
  },
  {
    "id": "soc-20-celebrate-friend-victory",
    "grade": "K3",
    "title": "ร่วมยินดีจากใจเมื่อเพื่อนชนะการประกวดวาดภาพ 🎨🏆",
    "situationContext": "คุณครูประกาศผลภาพวาดชนะเลิศ เป็นภาพของเพื่อนสนิทของหนู",
    "situationEmoji": "🎨🥇👏👧👦",
    "socialVirtue": "การชื่นชมยินดีในความสำเร็จของผู้อื่น (Rejoicing in Others Success)",
    "questionPrompt": "หนูควรแสดงความรู้สึกอย่างไรต่อเพื่อน?",
    "voicePrompt": "เพื่อนได้รับรางวัลชนะเลิศ หนูจะพูดและแสดงความรู้สึกอย่างไรกับเพื่อนจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "ทำหน้าบึ้ง พูดว่าภาพไม่สวยเลย ฟลุกชนะชัดๆ แล้วเดินหนีไป",
        "emoji": "😒❌",
        "isCorrect": false,
        "feedback": "ความอิจฉาทำให้ใจเราขุ่นมัวนะจ๊ะ ควรเปลี่ยนเป็นแรงบันดาลใจฝึกฝนตนเองดีกว่า"
      },
      {
        "id": "opt-b",
        "text": "ปรบมือเสียงดัง ยิ้มแย้ม และพูดชื่นชมว่าภาพของเพื่อนสวยงามมาก",
        "emoji": "👏🎉",
        "isCorrect": true,
        "feedback": "งดงามมากจ้ะ! ความยินดีจากใจจริงทำให้มิตรภาพแน่นแฟ้น และหัวใจเราก็มีความสุขไปด้วย"
      },
      {
        "id": "opt-c",
        "text": "แกล้งทำเป็นไม่ได้ยินผลการแข่งขัน แล้วไม่ยอมพูดกับเพื่อนอีกเลย",
        "emoji": "🚶‍♀️💨",
        "isCorrect": false,
        "feedback": "เพื่อนแท้ย่อมยินดีในความสำเร็จของเพื่อนเสมอ อย่าปล่อยให้อารมณ์น้อยใจทำลายมิตรภาพนะ"
      }
    ]
  },
  {
    "id": "soc-21-table-manners-eating",
    "grade": "K3",
    "title": "มารยาทบนโต๊ะอาหารและการเคี้ยวข้าวอย่างสุภาพ 🍽️🍲",
    "situationContext": "หนูกำลังรับประทานอาหารกลางวันร่วมโต๊ะกับคุณครูและเพื่อนๆ",
    "situationEmoji": "🍽️🍛👧👦",
    "socialVirtue": "มารยาทบนโต๊ะอาหาร (Table Manners & Cleanliness)",
    "questionPrompt": "การรับประทานอาหารที่ถูกสุขอนามัยและสุภาพคือข้อใด?",
    "voicePrompt": "เวลานั่งทานข้าวร่วมกับเพื่อนๆ เราควรเคี้ยวข้าวและพูดคุยอย่างไรจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "อ้าปากเคี้ยวข้าวเสียงดังแจ๊บๆ และพูดคุยทั้งที่มีข้าวเต็มปาก",
        "emoji": "🗣️🍚❌",
        "isCorrect": false,
        "feedback": "อาหารอาจกระเด็นใส่เพื่อน และเสี่ยงต่อการสำลักอาหารลงหลอดลม อันตรายมากจ้ะ"
      },
      {
        "id": "opt-b",
        "text": "เอาช้อนส้อมมาเคาะจานชามเล่น ให้เกิดเสียงดังรบกวนผู้อื่น",
        "emoji": "🥁❌",
        "isCorrect": false,
        "feedback": "ไม่ควรเคาะช้อนชามบนโต๊ะอาหารนะจ๊ะ เพราะส่งเสียงรบกวนและอาจทำให้จานแตกได้"
      },
      {
        "id": "opt-c",
        "text": "หุบปากเคี้ยวข้าวอย่างสุภาพ กลืนให้หมดก่อนแล้วค่อยพูดคุย",
        "emoji": "😋🥄",
        "isCorrect": true,
        "feedback": "ถูกต้องจ้า! การเคี้ยวไม่ส่งเสียงแจ๊บๆ และไม่พูดตอนข้าวเต็มปาก ป้องกันอาหารสำลักและดูสุภาพมาก"
      }
    ]
  },
  {
    "id": "soc-22-welcome-new-friend",
    "grade": "K3",
    "title": "ต้อนรับเพื่อนใหม่อย่างอบอุ่นในวันเปิดเทอม 🎒👋",
    "situationContext": "มีเพื่อนใหม่เพิ่งย้ายโรงเรียนมา นั่งตัวลีบดูเขินอายและยังไม่มีใครคุยด้วย",
    "situationEmoji": "🎒👋👧👦",
    "socialVirtue": "การเป็นมิตรและการสร้างมิตรภาพ (Hospitality & Inclusiveness)",
    "questionPrompt": "หนูควรทำอย่างไรเพื่อให้เพื่อนใหม่รู้สึกสบายใจ?",
    "voicePrompt": "เห็นเพื่อนใหม่ดูเหงาและประหม่า หนูจะเข้าไปสานสัมพันธ์อย่างไรดีจ๊ะ?",
    "options": [
      {
        "id": "opt-a",
        "text": "เดินเข้าไปทักทาย แนะนำตัวเอง และชวนเพื่อนมาเล่นเกมร่วมกัน",
        "emoji": "👋🤗",
        "isCorrect": true,
        "feedback": "น่ารักที่สุดเลยจ้ะ! การหยิบยื่นไมตรีให้เพื่อนใหม่ช่วยให้เพื่อนปรับตัวได้เร็วและมีความสุขที่โรงเรียน"
      },
      {
        "id": "opt-b",
        "text": "ชวนเพื่อนในกลุ่มล้อเลียนเพื่อนใหม่ จนเพื่อนรู้สึกอายและเสียใจ",
        "emoji": "😝❌",
        "isCorrect": false,
        "feedback": "การกลั่นแกล้งหรือล้อเลียนเพื่อนเป็นสิ่งที่ไม่ดีมากๆ จะทำให้เพื่อนเสียใจและไม่อยากมาโรงเรียนนะจ๊ะ"
      },
      {
        "id": "opt-c",
        "text": "มองเมินเฉยไม่สนใจ คิดว่าไม่ใช่เพื่อนในกลุ่มเดิมของตนเอง",
        "emoji": "😒",
        "isCorrect": false,
        "feedback": "เปิดใจรับเพื่อนใหม่ทำให้เรามีมิตรภาพที่กว้างขวางและมีความสุขเพิ่มขึ้นจ้ะ"
      }
    ]
  }
];

// ==========================================
// 4. ประเภท ทักษะสมอง (EF - Executive Functions)
// ==========================================
export interface BrainFlexChallenge {
  id: string;
  grade: Grade;
  title: string;
  efDomain: 'ยับยั้งชั่งใจ (Inhibition)' | 'ยืดหยุ่นทางความคิด (Shifting)' | 'ความจำขณะทำงาน (Working Memory)' | 'การวางแผนเป้าหมาย (Planning)';
  ruleDescription: string;
  voiceGuide: string;
  ruleIcon: string;
  rounds: {
    promptEmoji: string;
    promptText: string;
    correctAnswerId: string;
    choices: { id: string; text: string; emoji: string }[];
    explanation: string;
  }[];
}

export const BRAIN_FLEX_GAMES: BrainFlexChallenge[] = [
  {
    id: 'ef-01-day-night-stroop',
    grade: 'K1',
    title: 'กฎตรงข้าม: กลางวัน ☀️ vs กลางคืน 🌙',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เมื่อเห็นภาพ "พระอาทิตย์" ให้แตะ "พระจันทร์" | เมื่อเห็นภาพ "พระจันทร์" ให้แตะ "พระอาทิตย์"',
    voiceGuide: 'เกมท้าทายสมอง! ฟังดีๆ นะจ๊ะ เห็นพระอาทิตย์ให้แตะพระจันทร์ เห็นพระจันทร์ให้แตะพระอาทิตย์ ห้ามเผลอนะ!',
    ruleIcon: '☯️',
    rounds: [
      {
        promptEmoji: '☀️',
        promptText: 'ภาพคือ: พระอาทิตย์สว่างจ้า (ต้องแตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'moon',
        choices: [
          { id: 'sun', text: 'พระอาทิตย์', emoji: '☀️' },
          { id: 'moon', text: 'พระจันทร์', emoji: '🌙' },
        ],
        explanation: 'เก่งมาก! สมองควบคุมการยับยั้งความเคยชินได้สำเร็จ เห็นพระอาทิตย์แต่แตะพระจันทร์!',
      },
      {
        promptEmoji: '🌙',
        promptText: 'ภาพคือ: พระจันทร์ยามค่ำคืน (ต้องแตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'sun',
        choices: [
          { id: 'sun', text: 'พระอาทิตย์', emoji: '☀️' },
          { id: 'moon', text: 'พระจันทร์', emoji: '🌙' },
        ],
        explanation: 'ยอดเยี่ยม! เห็นพระจันทร์แตะพระอาทิตย์ ไม่หลงกล!',
      },
      {
        promptEmoji: '☀️',
        promptText: 'พระอาทิตย์มาอีกแล้ว! ตอบอะไรเอ่ย?',
        correctAnswerId: 'moon',
        choices: [
          { id: 'sun', text: 'พระอาทิตย์', emoji: '☀️' },
          { id: 'moon', text: 'พระจันทร์', emoji: '🌙' },
        ],
        explanation: 'ถูกต้องที่สุด! ฝึกสมาธิและการเบรกความคิดอัตโนมัติได้อย่างดีเยี่ยม',
      },
    ],
  },
  {
    id: 'ef-02-opposite-actions',
    grade: 'K1',
    title: 'สูง vs ต่ำ กฎตรงข้ามหรรษา ⬆️⬇️',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เมื่อลูกศรชี้ "ขึ้นบน" ให้แตะ "ลงล่าง" | เมื่อลูกศรชี้ "ลงล่าง" ให้แตะ "ขึ้นบน"',
    voiceGuide: 'ลูกศรชี้ขึ้น ให้กดลงล่าง! ลูกศรชี้ลง ให้กดขึ้นบน! มีสติคุมนิ้วมือนะจ๊ะ',
    ruleIcon: '🔄',
    rounds: [
      {
        promptEmoji: '⬆️',
        promptText: 'ลูกศรชี้ขึ้นฟ้า ⬆️ (แตะตรงข้าม!)',
        correctAnswerId: 'down',
        choices: [
          { id: 'up', text: 'ขึ้นบน', emoji: '⬆️' },
          { id: 'down', text: 'ลงล่าง', emoji: '⬇️' },
        ],
        explanation: 'เป๊ะมาก! ลูกศรชี้ขึ้นให้แตะลงล่าง สมองเบรกพฤติกรรมอัตโนมัติได้เฉียบคม!',
      },
      {
        promptEmoji: '⬇️',
        promptText: 'ลูกศรชี้ลงดิน ⬇️ (แตะตรงข้าม!)',
        correctAnswerId: 'up',
        choices: [
          { id: 'up', text: 'ขึ้นบน', emoji: '⬆️' },
          { id: 'down', text: 'ลงล่าง', emoji: '⬇️' },
        ],
        explanation: 'เก่งจังเลย! ชี้ลงล่างก็แตะขึ้นบน ถูกต้อง 100%!',
      },
    ],
  },
  {
    id: 'ef-03-color-shape-shift',
    grade: 'K2',
    title: 'สลับกฎฉับไว: กฎสี 🎨 หรือ กฎรูปทรง 🔺',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'สังเกตป้ายประกาศด้านบน: หากบอก "หากลุ่มสีแดง" ให้ดูที่สี! หากบอก "หากลุ่มทรงกลม" ให้ดูที่ทรง!',
    voiceGuide: 'ระวังกฎเปลี่ยนนะจ๊ะ! รอบนี้ให้จับคู่ตามสี หรือรูปทรง ดูป้ายคำสั่งให้ดีๆ',
    ruleIcon: '🔀',
    rounds: [
      {
        promptEmoji: '🔴',
        promptText: 'กฎรอบนี้: "แตะสิ่งที่เป็น วงกลม ⚪ (ไม่ว่าสีอะไร)"',
        correctAnswerId: 'circle-blue',
        choices: [
          { id: 'square-red', text: 'สี่เหลี่ยมสีแดง', emoji: '🟥' },
          { id: 'circle-blue', text: 'วงกลมสีฟ้า', emoji: '🔵' },
          { id: 'triangle-green', text: 'สามเหลี่ยมสีเขียว', emoji: '🔺' },
        ],
        explanation: 'เก่งมาก! ถึงอีกอันจะเป็นสีแดง แต่กฎบอกให้หาทรงกลม หนูจึงเลือกวงกลมสีฟ้าได้ถูกต้อง!',
      },
      {
        promptEmoji: '🔀',
        promptText: 'กฎเปลี่ยนแล้ว!: "แตะสิ่งที่เป็น สีเขียว 🟢 (ไม่ว่ารูปทรงอะไร)"',
        correctAnswerId: 'triangle-green',
        choices: [
          { id: 'square-red', text: 'สี่เหลี่ยมสีแดง', emoji: '🟥' },
          { id: 'circle-blue', text: 'วงกลมสีฟ้า', emoji: '🔵' },
          { id: 'triangle-green', text: 'สามเหลี่ยมสีเขียว', emoji: '🔺' },
        ],
        explanation: 'สุดยอดความยืดหยุ่นทางความคิด (Cognitive Flexibility)! สลับตามกฎใหม่ได้ทันที!',
      },
    ],
  },
  {
    id: 'ef-04-land-water-inhibition',
    grade: 'K2',
    title: 'สัตว์บกหรือสัตว์น้ำ ห้ามเผลอนะ 🐘🐟',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'กฎ: ให้แตะเฉพาะ "สัตว์ที่ว่ายน้ำได้" เท่านั้น! หากเป็นสัตว์บกห้ามแตะเด็ดขาด!',
    voiceGuide: 'เลือกเฉพาะสัตว์ที่อยู่ในน้ำนะจ๊ะ สัตว์บนบกห้ามแตะเลย!',
    ruleIcon: '🌊',
    rounds: [
      {
        promptEmoji: '❓',
        promptText: 'ตัวไหนเอ่ยที่ "ว่ายน้ำและอาศัยอยู่ในน้ำ"?',
        correctAnswerId: 'fish',
        choices: [
          { id: 'elephant', text: 'ช้างตัวใหญ่', emoji: '🐘' },
          { id: 'fish', text: 'ปลาการ์ตูน', emoji: '🐠' },
          { id: 'cat', text: 'แมวน้อย', emoji: '🐱' },
        ],
        explanation: 'ถูกต้อง! ปลาการ์ตูนอาศัยอยู่ในน้ำ ส่วนช้างกับแมวเป็นสัตว์บก',
      },
      {
        promptEmoji: '❓',
        promptText: 'รอบนี้หา "สัตว์บกที่เดินบนพื้นดิน" (สัตว์น้ำห้ามแตะ!)',
        correctAnswerId: 'giraffe',
        choices: [
          { id: 'whale', text: 'วาฬสีน้ำเงิน', emoji: '🐋' },
          { id: 'giraffe', text: 'ยีราฟคอยาว', emoji: '🦒' },
          { id: 'octopus', text: 'หมึกยักษ์', emoji: '🐙' },
        ],
        explanation: 'เก่งมาก! ยีราฟเดินบนบก ยับยั้งไม่เผลอไปแตะปลาหมึกกับวาฬ!',
      },
    ],
  },
  {
    id: 'ef-05-working-memory-path',
    grade: 'K2',
    title: 'จำลำดับเดินหีบสมบัติ 1-2-3 🗝️💎',
    efDomain: 'ความจำขณะทำงาน (Working Memory)',
    ruleDescription: 'จำลำดับสิ่งของที่กะพริบ: ดอกไม้ 🌸 -> ดาว ⭐ -> หีบสมบัติ 🎁',
    voiceGuide: 'จำสิ่งของตามลำดับให้ดีนะจ๊ะ: ดอกไม้, ดาว, หีบสมบัติ แล้วแตะเรียงตามลำดับเดิมเลย!',
    ruleIcon: '🧠',
    rounds: [
      {
        promptEmoji: '🌸 ⭐ 🎁',
        promptText: 'ลำดับคือ: [ 🌸 ดอกไม้ ] -> [ ⭐ ดาว ] -> [ 🎁 หีบสมบัติ ] สิ่งแรกที่ต้องแตะคือ?',
        correctAnswerId: 'flower',
        choices: [
          { id: 'star', text: 'ดวงดาว', emoji: '⭐' },
          { id: 'flower', text: 'ดอกไม้', emoji: '🌸' },
          { id: 'chest', text: 'หีบสมบัติ', emoji: '🎁' },
        ],
        explanation: 'จำได้แม่นยำ! ดอกไม้คือชิ้นแรกสุดในลำดับความจำขณะทำงาน (Working Memory)',
      },
    ],
  },
  {
    id: 'ef-06-big-small-shift',
    grade: 'K3',
    title: 'ตัวใหญ่ vs ตัวเล็ก สลับกติกา 🐘🐁',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'ฟังกฎให้ดี: รอบแรกให้เลือก "ตัวที่ใหญ่ที่สุด" -> รอบสองเปลี่ยนเป็น "ตัวที่เล็กที่สุด"',
    voiceGuide: 'ดูขนาดให้ดีนะจ๊ะ รอบแรกเลือกตัวใหญ่สุด รอบสองเลือกตัวเล็กสุด!',
    ruleIcon: '📏',
    rounds: [
      {
        promptEmoji: '🐘 🐕 🐜',
        promptText: 'กฎที่ 1: แตะสัตว์ที่มีขนาด "ใหญ่ที่สุด"',
        correctAnswerId: 'elephant',
        choices: [
          { id: 'elephant', text: 'ช้าง', emoji: '🐘' },
          { id: 'dog', text: 'สุนัข', emoji: '🐕' },
          { id: 'ant', text: 'มดแดง', emoji: '🐜' },
        ],
        explanation: 'ถูกต้อง ช้างมีขนาดร่างกายใหญ่ที่สุดในตัวเลือก!',
      },
      {
        promptEmoji: '🔀',
        promptText: 'กฎที่ 2 เปลี่ยนทันที!: แตะสัตว์ที่มีขนาด "เล็กที่สุด"',
        correctAnswerId: 'ant',
        choices: [
          { id: 'elephant', text: 'ช้าง', emoji: '🐘' },
          { id: 'dog', text: 'สุนัข', emoji: '🐕' },
          { id: 'ant', text: 'มดแดง', emoji: '🐜' },
        ],
        explanation: 'สมองสลับโหมดได้เร็วมาก! คราวนี้เลือกมดตัวจิ๋วได้อย่างถูกต้อง',
      },
    ],
  },
  {
    id: 'ef-07-left-right-inversion',
    grade: 'K3',
    title: 'ลูกศรซ้ายขวากลับด้าน (Inhibition) ⬅️➡️',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'ลูกศรชี้ "ไปทางซ้าย ⬅️" ให้แตะ "ไปทางขวา" | ลูกศรชี้ "ไปทางขวา ➡️" ให้แตะ "ไปทางซ้าย"',
    voiceGuide: 'ลูกศรชี้ซ้ายกดขวา ลูกศรชี้ขวากดซ้าย ฝึกสมองสั่งการข้ามฝั่งนะจ๊ะ!',
    ruleIcon: '↔️',
    rounds: [
      {
        promptEmoji: '⬅️',
        promptText: 'ลูกศรชี้ซ้าย ⬅️ (แตะทิศตรงข้าม!)',
        correctAnswerId: 'right',
        choices: [
          { id: 'left', text: 'ชี้ซ้าย', emoji: '⬅️' },
          { id: 'right', text: 'ชี้ขวา', emoji: '➡️' },
        ],
        explanation: 'ยอดเยี่ยม! ทิศตรงข้ามของซ้ายคือขวา ไม่ถูกภาพลวงหลอกตา',
      },
      {
        promptEmoji: '➡️',
        promptText: 'ลูกศรชี้ขวา ➡️ (แตะทิศตรงข้าม!)',
        correctAnswerId: 'left',
        choices: [
          { id: 'left', text: 'ชี้ซ้าย', emoji: '⬅️' },
          { id: 'right', text: 'ชี้ขวา', emoji: '➡️' },
        ],
        explanation: 'ถูกอีกแล้ว! สมองมีความไวและการยับยั้งดีเยี่ยมระดับอนุบาล 3 เลย!',
      },
    ],
  },
  {
    id: 'ef-08-categorize-tools',
    grade: 'K3',
    title: 'จัดกระเป๋าไปโรงเรียน วางแผนเป้าหมาย 🎒✏️',
    efDomain: 'การวางแผนเป้าหมาย (Planning)',
    ruleDescription: 'ภารกิจ: เลือกเฉพาะ "อุปกรณ์เครื่องเขียนที่ใช้เรียนหนังสือ" เข้ากระเป๋า',
    voiceGuide: 'วางแผนจัดกระเป๋าไปโรงเรียนกัน เลือกเฉพาะของที่ใช้เรียนหนังสือน้า',
    ruleIcon: '🎯',
    rounds: [
      {
        promptEmoji: '🎒',
        promptText: 'สิ่งใด "จำเป็นสำหรับการวาดเขียนและเรียนหนังสือ"?',
        correctAnswerId: 'pencil',
        choices: [
          { id: 'frying-pan', text: 'กระทะทำอาหาร', emoji: '🍳' },
          { id: 'pencil', text: 'กล่องดินสอสี', emoji: '✏️' },
          { id: 'pillow', text: 'หมอนนอน', emoji: '🛏️' },
        ],
        explanation: 'เก่งมากจ้ะ! กล่องดินสอคืออุปกรณ์การเรียนที่ถูกต้อง',
      },
    ],
  },
  {
    id: 'ef-09-sound-visual-match',
    grade: 'K3',
    title: 'เสียงสัตว์กับตัวจริง สลับคู่ 🐶🐱',
    efDomain: 'ความจำขณะทำงาน (Working Memory)',
    ruleDescription: 'ได้ยินเสียง "โฮ่ง โฮ่ง" ให้แตะ "น้องหมา" | ได้ยินเสียง "เหมียว เหมียว" ให้แตะ "น้องแมว"',
    voiceGuide: 'ฟังเสียงในใจ: "โฮ่ง โฮ่ง" คือสัตว์ตัวไหนเอ่ย แตะให้ถูกต้องนะจ๊ะ',
    ruleIcon: '👂',
    rounds: [
      {
        promptEmoji: '🔊 "โฮ่ง! โฮ่ง!"',
        promptText: 'เสียงร้อง: "โฮ่ง! โฮ่ง!" สัตว์ตัวใดส่งเสียงนี้?',
        correctAnswerId: 'dog',
        choices: [
          { id: 'cat', text: 'แมวเหมียว', emoji: '🐱' },
          { id: 'dog', text: 'สุนัขแสนรู้', emoji: '🐶' },
          { id: 'duck', text: 'เป็ดก้าบๆ', emoji: '🦆' },
        ],
        explanation: 'ถูกต้อง! สุนัขเห่าเสียงโฮ่งๆ การเชื่อมโยงเสียงกับภาพทำงานได้แม่นยำ',
      },
    ],
  },
  {
    id: 'ef-10-stop-think-go',
    grade: 'K3',
    title: 'หยุด-คิด-ทำ (Stop, Think & Act) 🚦💡',
    efDomain: 'การวางแผนเป้าหมาย (Planning)',
    ruleDescription: 'ก่อนแตะคำตอบ: นับ 1-2 ในใจ หายใจเข้าลึกๆ แล้วค่อยเลือกข้อที่ถูกต้องที่สุด',
    voiceGuide: 'ฝึกทักษะสุดยอดของ EF: หยุดคิด 2 วินาที สังเกตให้รอบคอบ แล้วค่อยแตะคำตอบ!',
    ruleIcon: '🧠',
    rounds: [
      {
        promptEmoji: '💡',
        promptText: 'ผลไม้อะไรมีสีแดง มีเมล็ดเล็กๆ อยู่ด้านนอก?',
        correctAnswerId: 'strawberry',
        choices: [
          { id: 'banana', text: 'กล้วยหอมสีเหลือง', emoji: '🍌' },
          { id: 'strawberry', text: 'สตรอว์เบอร์รีสีแดง', emoji: '🍓' },
          { id: 'grape', text: 'องุ่นสีม่วง', emoji: '🍇' },
        ],
        explanation: 'ยอดเยี่ยมมาก! หยุดคิดพิจารณาเงื่อนไข 2 ข้อ (สีแดง + มีเมล็ดด้านนอก) จนได้คำตอบที่ถูกต้องที่สุด!',
      },
    ],
  },
  // --- เพิ่มอีก 13 ภารกิจใหม่ตามคำขอ ---
  {
    id: 'ef-11-hot-cold-inversion',
    grade: 'K1',
    title: 'กฎตรงข้าม: ร้อนจี๊ด 🔥 vs เย็นเฉียบ ❄️',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เมื่อเห็นภาพ "กองไฟร้อน" ให้แตะ "ก้อนน้ำแข็ง" | เมื่อเห็นภาพ "ก้อนน้ำแข็ง" ให้แตะ "กองไฟร้อน"',
    voiceGuide: 'เกมท้าทายสมอง! เห็นไฟร้อนให้แตะก้อนน้ำแข็ง เห็นน้ำแข็งให้แตะกองไฟ ห้ามเผลอตอบความจริงนะจ๊ะ!',
    ruleIcon: '🌡️',
    rounds: [
      {
        promptEmoji: '🔥',
        promptText: 'ภาพคือ: กองไฟสีแดงร้อนแรง (ต้องแตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'ice',
        choices: [
          { id: 'fire', text: 'กองไฟร้อน', emoji: '🔥' },
          { id: 'ice', text: 'ก้อนน้ำแข็งเย็น', emoji: '❄️' },
        ],
        explanation: 'เก่งมากจ้ะ! เห็นไฟร้อนแต่แตะน้ำแข็งเย็น สมองเบรกความคุ้นชินได้สำเร็จ',
      },
      {
        promptEmoji: '❄️',
        promptText: 'ภาพคือ: ก้อนน้ำแข็งเย็นเฉียบ (ต้องแตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'fire',
        choices: [
          { id: 'fire', text: 'กองไฟร้อน', emoji: '🔥' },
          { id: 'ice', text: 'ก้อนน้ำแข็งเย็น', emoji: '❄️' },
        ],
        explanation: 'ยอดเยี่ยม! เห็นน้ำแข็งแต่แตะกองไฟ สมองยืดหยุ่นดีเยี่ยม',
      },
    ],
  },
  {
    id: 'ef-12-big-small-reverse',
    grade: 'K1',
    title: 'กฎสลับขนาด: ช้างยักษ์ 🐘 vs หนูน้อย 🐭',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เมื่อเห็น "ช้างตัวโต" ให้แตะ "หนูตัวจิ๋ว" | เมื่อเห็น "หนูตัวจิ๋ว" ให้แตะ "ช้างตัวโต"',
    voiceGuide: 'เห็นช้างยักษ์ให้แตะหนูจิ๋ว! เห็นหนูจิ๋วให้แตะช้างยักษ์! คุมสติตอบให้ตรงข้ามนะจ๊ะ',
    ruleIcon: '↔️',
    rounds: [
      {
        promptEmoji: '🐘',
        promptText: 'ช้างตัวโตมาแล้ว! ต้องแตะสัตว์ขนาดตรงข้ามคืออะไร?',
        correctAnswerId: 'mouse',
        choices: [
          { id: 'elephant', text: 'ช้างตัวโต', emoji: '🐘' },
          { id: 'mouse', text: 'หนูตัวจิ๋ว', emoji: '🐭' },
        ],
        explanation: 'ถูกต้อง! เห็นช้างยักษ์แต่ตอบหนูน้อย ไม่หลงกลภาพลวงตา!',
      },
      {
        promptEmoji: '🐭',
        promptText: 'หนูตัวจิ๋ววิ่งมา! ต้องแตะสัตว์ขนาดตรงข้ามคืออะไร?',
        correctAnswerId: 'elephant',
        choices: [
          { id: 'elephant', text: 'ช้างตัวโต', emoji: '🐘' },
          { id: 'mouse', text: 'หนูตัวจิ๋ว', emoji: '🐭' },
        ],
        explanation: 'เก่งมากจ้า! สลับขนาดในใจได้อย่างรวดเร็วและแม่นยำ',
      },
    ],
  },
  {
    id: 'ef-13-fast-slow-shift',
    grade: 'K1',
    title: 'กฎความเร็วตรงข้าม: เสือชีตาห์ 🐆 vs เต่าต้วมเตี้ยม 🐢',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'เห็น "สัตว์วิ่งเร็วปานสายฟ้า" ให้แตะ "สัตว์เดินช้า" | เห็น "สัตว์เดินช้า" ให้แตะ "สัตว์วิ่งเร็ว"',
    voiceGuide: 'เห็นเสือชีตาห์วิ่งเร็วให้แตะน้องเต่า เห็นน้องเต่าให้แตะเสือชีตาห์ สลับความคิดทันใจ!',
    ruleIcon: '⏱️',
    rounds: [
      {
        promptEmoji: '🐆',
        promptText: 'เสือชีตาห์วิ่งเร็วลมกรด! (แตะสิ่งที่ตรงข้าม)',
        correctAnswerId: 'turtle',
        choices: [
          { id: 'cheetah', text: 'เสือชีตาห์วิ่งเร็ว', emoji: '🐆' },
          { id: 'turtle', text: 'เต่าน้อยเดินช้า', emoji: '🐢' },
        ],
        explanation: 'ยอดเยี่ยม! ทักษะ Cognitive Shifting ทำงานสลับความเร็วได้ฉับไว',
      },
      {
        promptEmoji: '🐢',
        promptText: 'เต่าน้อยเดินต้วมเตี้ยม! (แตะสิ่งที่ตรงข้าม)',
        correctAnswerId: 'cheetah',
        choices: [
          { id: 'cheetah', text: 'เสือชีตาห์วิ่งเร็ว', emoji: '🐆' },
          { id: 'turtle', text: 'เต่าน้อยเดินช้า', emoji: '🐢' },
        ],
        explanation: 'ถูกต้องที่สุด! เห็นความช้าแต่เลือกความเร็ว สลับขั้วความคิดได้ทันที',
      },
    ],
  },
  {
    id: 'ef-14-land-water-reverse',
    grade: 'K1',
    title: 'บก 🚗 vs น้ำ ⛵ ยานพาหนะสลับเส้นทาง',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'เห็น "รถวิ่งบนถนน" ให้แตะ "เรือลอยในน้ำ" | เห็น "เรือลอยในน้ำ" ให้แตะ "รถวิ่งบนถนน"',
    voiceGuide: 'เห็นรถแล่นบนบก ให้แตะเรือลอยน้ำ เห็นเรือลอยน้ำ ให้แตะรถยนต์ สลับเส้นทางในใจนะจ๊ะ',
    ruleIcon: '🛣️🌊',
    rounds: [
      {
        promptEmoji: '🚗',
        promptText: 'รถยนต์วิ่งบนถนนบก (แตะพาหนะเส้นทางตรงข้าม!)',
        correctAnswerId: 'boat',
        choices: [
          { id: 'car', text: 'รถยนต์บนบก', emoji: '🚗' },
          { id: 'boat', text: 'เรือใบในน้ำ', emoji: '⛵' },
        ],
        explanation: 'เก่งมากจ้ะ! สลับจากบกไปน้ำได้ถูกต้อง',
      },
      {
        promptEmoji: '⛵',
        promptText: 'เรือใบแล่นในทะเลน้ำใส (แตะพาหนะเส้นทางตรงข้าม!)',
        correctAnswerId: 'car',
        choices: [
          { id: 'car', text: 'รถยนต์บนบก', emoji: '🚗' },
          { id: 'boat', text: 'เรือใบในน้ำ', emoji: '⛵' },
        ],
        explanation: 'ถูกต้อง! สลับจากน้ำไปบกได้อย่างคล่องแคล่ว',
      },
    ],
  },
  {
    id: 'ef-15-happy-sad-inversion',
    grade: 'K2',
    title: 'กฎอารมณ์ตรงข้าม: ยิ้มแย้ม 😊 vs หน้าเศร้า 😢',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เห็น "หน้ายิ้มมีความสุข" ให้แตะ "หน้าเศร้า" | เห็น "หน้าเศร้า" ให้แตะ "หน้ายิ้มมีความสุข"',
    voiceGuide: 'ฝึกเบรกการเชื่อมโยงอารมณ์: เห็นยิ้มแตะเศร้า เห็นเศร้าแตะยิ้ม ห้ามตอบตามใจชอบนะ!',
    ruleIcon: '🎭',
    rounds: [
      {
        promptEmoji: '😊',
        promptText: 'ใบหน้ายิ้มแจ่มใสเบิกบาน (แตะอารมณ์ตรงข้าม!)',
        correctAnswerId: 'sad',
        choices: [
          { id: 'happy', text: 'หน้ายิ้มมีความสุข', emoji: '😊' },
          { id: 'sad', text: 'หน้าเศร้าเสียใจ', emoji: '😢' },
        ],
        explanation: 'ยอดเยี่ยม! ควบคุมนิ้วมือไม่ให้กดตามความเคยชินได้เป็นเลิศ',
      },
      {
        promptEmoji: '😢',
        promptText: 'ใบหน้าร้องไห้เศร้าใจ (แตะอารมณ์ตรงข้าม!)',
        correctAnswerId: 'happy',
        choices: [
          { id: 'happy', text: 'หน้ายิ้มมีความสุข', emoji: '😊' },
          { id: 'sad', text: 'หน้าเศร้าเสียใจ', emoji: '😢' },
        ],
        explanation: 'เก่งมากจ้า! สลับขั้วอารมณ์ตามกติกาได้อย่างมีวินัย',
      },
    ],
  },
  {
    id: 'ef-16-shape-circle-square',
    grade: 'K2',
    title: 'รูปทรงสลับร่าง: วงกลมมน 🔴 vs สี่เหลี่ยมเหลี่ยม 🟦',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'เห็น "วงกลมสีแดง" ให้แตะ "สี่เหลี่ยมสีน้ำเงิน" | เห็น "สี่เหลี่ยมสีน้ำเงิน" ให้แตะ "วงกลมสีแดง"',
    voiceGuide: 'เห็นวงกลม ให้แตะสี่เหลี่ยม เห็นสี่เหลี่ยม ให้แตะวงกลม สลับรูปทรงให้ว่องไว!',
    ruleIcon: '🔷',
    rounds: [
      {
        promptEmoji: '🔴',
        promptText: 'รูปทรงวงกลมมนสีแดง (แตะรูปทรงตรงข้าม!)',
        correctAnswerId: 'square',
        choices: [
          { id: 'circle', text: 'วงกลมสีแดง', emoji: '🔴' },
          { id: 'square', text: 'สี่เหลี่ยมสีน้ำเงิน', emoji: '🟦' },
        ],
        explanation: 'ถูกต้อง! สลับรูปทรงจากกลมเป็นเหลี่ยมได้อย่างแม่นยำ',
      },
      {
        promptEmoji: '🟦',
        promptText: 'รูปทรงสี่เหลี่ยมมีมุม (แตะรูปทรงตรงข้าม!)',
        correctAnswerId: 'circle',
        choices: [
          { id: 'circle', text: 'วงกลมสีแดง', emoji: '🔴' },
          { id: 'square', text: 'สี่เหลี่ยมสีน้ำเงิน', emoji: '🟦' },
        ],
        explanation: 'เยี่ยมมาก! สมองแยกแยะคุณลักษณะและสลับมิติสัมพันธ์ได้ดี',
      },
    ],
  },
  {
    id: 'ef-17-loud-quiet-sound',
    grade: 'K2',
    title: 'เสียงดังลั่น 📢 vs เสียงกระซิบแผ่ว 🤫',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เห็น "โทรโข่งเสียงดัง" ให้แตะ "กระซิบเบาๆ" | เห็น "กระซิบเบาๆ" ให้แตะ "โทรโข่งเสียงดัง"',
    voiceGuide: 'เห็นเสียงดัง ให้เลือกเสียงเบา เห็นเสียงเบา ให้เลือกเสียงดัง คุมสติให้ดีนะจ๊ะ',
    ruleIcon: '🔊',
    rounds: [
      {
        promptEmoji: '📢',
        promptText: 'โทรโข่งประกาศเสียงดังลั่นห้อง! (แตะระดับเสียงตรงข้าม)',
        correctAnswerId: 'whisper',
        choices: [
          { id: 'loud', text: 'โทรโข่งเสียงดัง', emoji: '📢' },
          { id: 'whisper', text: 'เอานิ้วแตะปากกระซิบเบา', emoji: '🤫' },
        ],
        explanation: 'เก่งมากจ้ะ! เบรกความคุ้นชินของเสียงดัง เลือกความเงียบสงบได้ถูกต้อง',
      },
      {
        promptEmoji: '🤫',
        promptText: 'ท่าทางกระซิบแผ่วเบาเงียบกริบ (แตะระดับเสียงตรงข้าม)',
        correctAnswerId: 'loud',
        choices: [
          { id: 'loud', text: 'โทรโข่งเสียงดัง', emoji: '📢' },
          { id: 'whisper', text: 'เอานิ้วแตะปากกระซิบเบา', emoji: '🤫' },
        ],
        explanation: 'ถูกต้อง! สลับขั้วระดับเสียงได้ฉับไว',
      },
    ],
  },
  {
    id: 'ef-18-heavy-light-reverse',
    grade: 'K2',
    title: 'กฎน้ำหนักตรงข้าม: ลูกตุ้มเหล็กหนัก 🏋️ vs ขนนกเบา 🪶',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'เห็น "ของหนักมาก" ให้แตะ "ของเบาหวิว" | เห็น "ของเบาหวิว" ให้แตะ "ของหนักมาก"',
    voiceGuide: 'เห็นของหนักให้แตะขนนกเบา เห็นขนนกเบาให้แตะลูกตุ้มหนัก สลับน้ำหนักในจินตนาการ!',
    ruleIcon: '⚖️',
    rounds: [
      {
        promptEmoji: '🏋️',
        promptText: 'ลูกตุ้มเหล็กหนักอึ้งยกแทบไม่ไหว! (แตะน้ำหนักตรงข้าม)',
        correctAnswerId: 'feather',
        choices: [
          { id: 'heavy', text: 'ลูกตุ้มเหล็กหนัก', emoji: '🏋️' },
          { id: 'feather', text: 'ขนนกเบาหวิว', emoji: '🪶' },
        ],
        explanation: 'ยอดเยี่ยมมาก! การยับยั้งความเข้าใจเรื่องน้ำหนักแล้วตอบตรงข้ามทำได้ยอดเยี่ยม',
      },
      {
        promptEmoji: '🪶',
        promptText: 'ขนนกสีขาวเบาหวิวปลิวตามลม! (แตะน้ำหนักตรงข้าม)',
        correctAnswerId: 'heavy',
        choices: [
          { id: 'heavy', text: 'ลูกตุ้มเหล็กหนัก', emoji: '🏋️' },
          { id: 'feather', text: 'ขนนกเบาหวิว', emoji: '🪶' },
        ],
        explanation: 'เก่งมากจ้า! สลับมิติน้ำหนักได้อย่างคล่องแคล่ว',
      },
    ],
  },
  {
    id: 'ef-19-daylight-stars-shift',
    grade: 'K3',
    title: 'ท้องฟ้ากลางวันเมฆขาว 🌤️ vs ท้องฟ้ากลางคืนดาวพราว 🌌',
    efDomain: 'ความจำขณะทำงาน (Working Memory)',
    ruleDescription: 'จำกฎ: กลางวัน = 🌌 (ดาวกลางคืน) | กลางคืน = 🌤️ (เมฆกลางวัน) ห้ามสลับนะจ๊ะ',
    voiceGuide: 'เกมความจำขณะทำงาน: จำคู่สลับให้แม่นยำ แล้วเลือกคำตอบให้ถูกต้อง!',
    ruleIcon: '✨',
    rounds: [
      {
        promptEmoji: '🌤️',
        promptText: 'เห็นท้องฟ้ากลางวันมีแดดอ่อนๆ (คู่สลับของกลางวันคืออะไร?)',
        correctAnswerId: 'night_sky',
        choices: [
          { id: 'day_sky', text: 'ท้องฟ้ากลางวัน', emoji: '🌤️' },
          { id: 'night_sky', text: 'ท้องฟ้าราตรีมีดาว', emoji: '🌌' },
        ],
        explanation: 'ถูกต้อง! Working Memory ดึงกฎที่บันทึกไว้ในสมองมาใช้ได้อย่างแม่นยำ',
      },
      {
        promptEmoji: '🌌',
        promptText: 'เห็นท้องฟ้ายามค่ำคืนมืดมิด (คู่สลับของกลางคืนคืออะไร?)',
        correctAnswerId: 'day_sky',
        choices: [
          { id: 'day_sky', text: 'ท้องฟ้ากลางวัน', emoji: '🌤️' },
          { id: 'night_sky', text: 'ท้องฟ้าราตรีมีดาว', emoji: '🌌' },
        ],
        explanation: 'เก่งมากจ้ะ! ความจำระยะสั้นทำงานอย่างมีประสิทธิภาพสูง',
      },
    ],
  },
  {
    id: 'ef-20-eat-drink-inversion',
    grade: 'K3',
    title: 'ของเคี้ยวอร่อย 🍎 vs ของดื่มชื่นใจ 🧃',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เห็น "ผลไม้ต้องเคี้ยว" ให้แตะ "กล่องน้ำดื่ม" | เห็น "กล่องน้ำดื่ม" ให้แตะ "ผลไม้ต้องเคี้ยว"',
    voiceGuide: 'เห็นของเคี้ยวให้เลือกกล่องน้ำ เห็นกล่องน้ำให้เลือกผลไม้เคี้ยว สลับพฤติกรรมการกิน!',
    ruleIcon: '🍴',
    rounds: [
      {
        promptEmoji: '🍎',
        promptText: 'ผลแอปเปิ้ลกรอบอร่อยต้องเคี้ยว (แตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'juice',
        choices: [
          { id: 'apple', text: 'ผลไม้เคี้ยวกรุบ', emoji: '🍎' },
          { id: 'juice', text: 'กล่องน้ำผลไม้ดูดดื่ม', emoji: '🧃' },
        ],
        explanation: 'ยอดเยี่ยม! สมองแยกประเภทการรับประทานแล้วสลับขั้วได้เป๊ะมาก',
      },
      {
        promptEmoji: '🧃',
        promptText: 'กล่องน้ำผลไม้มีหลอดดูดดื่ม (แตะสิ่งที่ตรงข้าม!)',
        correctAnswerId: 'apple',
        choices: [
          { id: 'apple', text: 'ผลไม้เคี้ยวกรุบ', emoji: '🍎' },
          { id: 'juice', text: 'กล่องน้ำผลไม้ดูดดื่ม', emoji: '🧃' },
        ],
        explanation: 'ถูกต้องที่สุด! ไม่หลงตามคำสั่งอัตโนมัติของสมอง',
      },
    ],
  },
  {
    id: 'ef-21-color-stroop-blue-yellow',
    grade: 'K3',
    title: 'สลับสีสองฝั่ง: สีน้ำเงิน 🔵 vs สีเหลือง 🟡',
    efDomain: 'ยับยั้งชั่งใจ (Inhibition)',
    ruleDescription: 'เห็น "วงกลมสีน้ำเงิน" ให้แตะ "วงกลมสีเหลือง" | เห็น "วงกลมสีเหลือง" ให้แตะ "วงกลมสีน้ำเงิน"',
    voiceGuide: 'เห็นสีน้ำเงินให้แตะสีเหลือง เห็นสีเหลืองให้แตะสีน้ำเงิน ฝึกสายตาและสมองสลับสีไว!',
    ruleIcon: '🎨',
    rounds: [
      {
        promptEmoji: '🔵',
        promptText: 'วงกลมสีน้ำเงินโผล่มา! (แตะสีตรงข้ามทันที)',
        correctAnswerId: 'yellow',
        choices: [
          { id: 'blue', text: 'สีน้ำเงิน', emoji: '🔵' },
          { id: 'yellow', text: 'สีเหลือง', emoji: '🟡' },
        ],
        explanation: 'เก่งมากจ้า! ทักษะ Color-Stroop ยับยั้งการกดสีตรงหน้าได้สำเร็จ',
      },
      {
        promptEmoji: '🟡',
        promptText: 'วงกลมสีเหลืองสดใส! (แตะสีตรงข้ามทันที)',
        correctAnswerId: 'blue',
        choices: [
          { id: 'blue', text: 'สีน้ำเงิน', emoji: '🔵' },
          { id: 'yellow', text: 'สีเหลือง', emoji: '🟡' },
        ],
        explanation: 'ยอดเยี่ยม! สลับคู่สีในสมองได้อย่างรวดเร็วมาก',
      },
    ],
  },
  {
    id: 'ef-22-animal-bird-fish',
    grade: 'K3',
    title: 'นกบินบนฟ้า 🕊️ vs ปลาว่ายในน้ำ 🐠',
    efDomain: 'ยืดหยุ่นทางความคิด (Shifting)',
    ruleDescription: 'เห็น "นกบินบนฟ้า" ให้แตะ "ปลาว่ายในน้ำ" | เห็น "ปลาว่ายในน้ำ" ให้แตะ "นกบินบนฟ้า"',
    voiceGuide: 'เห็นนกบินฟ้า ให้แตะปลาว่ายน้ำ เห็นปลาว่ายน้ำ ให้แตะนกบินฟ้า สลับถิ่นที่อยู่ของสัตว์!',
    ruleIcon: '🕊️🐠',
    rounds: [
      {
        promptEmoji: '🕊️',
        promptText: 'นกพิราบสีขาวบินเวหา (แตะสัตว์ในถิ่นตรงข้าม!)',
        correctAnswerId: 'fish',
        choices: [
          { id: 'bird', text: 'นกบินบนฟ้า', emoji: '🕊️' },
          { id: 'fish', text: 'ปลาว่ายในน้ำ', emoji: '🐠' },
        ],
        explanation: 'ถูกต้อง! สลับถิ่นที่อยู่อากาศกับน้ำได้อย่างคล่องแคล่ว',
      },
      {
        promptEmoji: '🐠',
        promptText: 'ปลาการ์ตูนว่ายแหวกว่ายใต้ทะเล (แตะสัตว์ในถิ่นตรงข้าม!)',
        correctAnswerId: 'bird',
        choices: [
          { id: 'bird', text: 'นกบินบนฟ้า', emoji: '🕊️' },
          { id: 'fish', text: 'ปลาว่ายในน้ำ', emoji: '🐠' },
        ],
        explanation: 'เก่งมากจ้ะ! สลับจากน้ำสู่ฟ้าได้อย่างว่องไว',
      },
    ],
  },
  {
    id: 'ef-23-rule-switch-master',
    grade: 'K3',
    title: 'ปรมาจารย์สลับกฎคู่ผสม (Dual Rule Master) ☀️🌙🚦',
    efDomain: 'การวางแผนเป้าหมาย (Planning)',
    ruleDescription: 'รอบนี้ต้องใช้ทั้งสองกฎ: สลับกลางวัน/กลางคืน และหยุดคิด 2 วินาทีก่อนกดเสมอ!',
    voiceGuide: 'ภารกิจระดับปรมาจารย์ EF! ตั้งสติให้มั่นคง นึกถึงกฎตรงข้าม แล้วค่อยแตะคำตอบนะจ๊ะ',
    ruleIcon: '👑',
    rounds: [
      {
        promptEmoji: '☀️👑',
        promptText: 'พระอาทิตย์มงกุฎทอง! กฎตรงข้ามต้องตอบสิ่งใด?',
        correctAnswerId: 'moon',
        choices: [
          { id: 'sun', text: 'พระอาทิตย์', emoji: '☀️' },
          { id: 'moon', text: 'พระจันทร์เสี้ยว', emoji: '🌙' },
          { id: 'star', text: 'ดวงดาว', emoji: '⭐' },
        ],
        explanation: 'สุดยอดปรมาจารย์ EF ตัวจริง! ควบคุมตนเองและคิดวางแผนก่อนลงมือทำได้อย่างสมบูรณ์แบบ!',
      },
      {
        promptEmoji: '🌙👑',
        promptText: 'พระจันทร์มงกุฎทอง! กฎตรงข้ามต้องตอบสิ่งใด?',
        correctAnswerId: 'sun',
        choices: [
          { id: 'sun', text: 'พระอาทิตย์', emoji: '☀️' },
          { id: 'moon', text: 'พระจันทร์เสี้ยว', emoji: '🌙' },
          { id: 'star', text: 'ดวงดาว', emoji: '⭐' },
        ],
        explanation: 'ยินดีด้วยคนเก่ง! หนูผ่านด่านทักษะสมอง EF ระดับสูงสุดของปฐมวัยแล้วจ้ะ!',
      },
    ],
  },
];
