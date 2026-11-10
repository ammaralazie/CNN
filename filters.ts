export const verticalGray = [
    1, 0, 1,
    1, 0, 1,
    1, 0, 1
]


export const horizontalGray = [
    -1, -1, -1,
     0,  0,  0,
     1,  1,  1
]

export const edgeDetection = [
    -1, -1, -1,
    -1, 8, -1,
    -1, -1, -1
]

export const sharpen = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
]

export const blur = [
    1 / 9, 1 / 9, 1 / 9,
    1 / 9, 1 / 9, 1 / 9,
    1 / 9, 1 / 9, 1 / 9
]

export const emboss = [
    -2, -1, 0,
    -1, 1, 1,   
    0, 1, 2
]

export const coolred = [
    0, 0, 1,
    0, 1, 0,
    1, 0, 0
]



// ===== جوانب الملعب (خط التماس وخط المرمى) =====
// خط أبيض عريض (2-3 بكسل) وسط عشب أغمق

export const sideLineVertical = [
    -1, 1, 1,
    -1, 1, 1,
    -1, 1, 1
]

export const sideLineVerticalRight = [
    1, 1, -1,
    1, 1, -1,
    1, 1, -1
]

export const goalLineHorizontalTop = [
    -1, -1, -1,
     1,  1,  1,
     1,  1,  1
]

export const goalLineHorizontalBottom = [
     1,  1,  1,
     1,  1,  1,
    -1, -1, -1
]

// ===== منطقة الجزاء ومنطقة المرمى =====
// مستطيل: ركن بزاوية قائمة + خط ممتد. الركن هو الميزة المميزة

export const penaltyBoxCornerTL = [
     2,  2,  2,
     2, -1, -1,
     2, -1, -1
]

export const penaltyBoxCornerTR = [
     2,  2,  2,
    -1, -1,  2,
    -1, -1,  2
]

export const penaltyBoxCornerBL = [
     2, -1, -1,
     2, -1, -1,
     2,  2,  2
]

export const penaltyBoxCornerBR = [
    -1, -1,  2,
    -1, -1,  2,
     2,  2,  2
]

// ===== نقطة الجزاء ونقطة المنتصف =====
// نقطة بيضاء صغيرة معزولة وسط عشب

export const penaltySpot = [
    -1, -1, -1,
    -1,  8, -1,
    -1, -1, -1
]

// ===== مركز الملعب: تقاطع الخط الأوسط مع الدائرة =====

export const crossJunction = [
    -1,  2, -1,
     2,  2,  2,
    -1,  2, -1
]

export const tJunctionDown = [
    -1, -1, -1,
     2,  2,  2,
    -1,  2, -1
]

export const tJunctionUp = [
    -1,  2, -1,
     2,  2,  2,
    -1, -1, -1
]

// ===== دائرة المنتصف وقوس منطقة الجزاء =====
// أقواس باتجاهات أربعة: القوس يظهر كحافة منحنية

export const arcTopLeft = [
     0,  2,  2,
     2, -1, -1,
     2, -1, -1
]

export const arcTopRight = [
     2,  2,  0,
    -1, -1,  2,
    -1, -1,  2
]

export const arcBottomLeft = [
     2, -1, -1,
     2, -1, -1,
     0,  2,  2
]

export const arcBottomRight = [
    -1, -1,  2,
    -1, -1,  2,
     2,  2,  0
]

// ===== المرمى: عارضتان وقائمان =====
// عارضة أفقية بيضاء وقائم عمودي رفيع

export const goalPostVertical = [
    -1, 3, -1,
    -1, 3, -1,
    -1, 3, -1
]

export const goalCrossbar = [
    -1, -1, -1,
     3,  3,  3,
    -1, -1, -1
]

// ===== اللاعبون: جسم بحجم أكبر ورأس =====
// جسم عمودي عريض، ثم رأس كنقطة فوقه

export const playerBody = [
    -1, 3, -1,
    -1, 3, -1,
    -1, 3, -1
]

export const playerHead = [
    -1, -1, -1,
    -1,  5, -1,
    -1, -1, -1
]

export const playerLegs = [
     2, -1,  2,
     2, -1,  2,
     2, -1,  2
]

// ===== الكرة: تحسين =====
// الكرة صغيرة ومستديرة وفاتحة مع حدود أغمق

export const ballCircle = [
    -1, -1, -1,
    -1,  8, -1,
    -1, -1, -1
]

export const ballRing = [
     1,  1,  1,
     1, -8,  1,
     1,  1,  1
]


export const sobelX = [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
]

export const sobelY = [
    -1, -2, -1,
     0,  0,  0,
     1,  2,  1
]

export const diagonalLeft = [
    1, 0, 0,
    0, 0, 0,
    0, 0, -1
]

// ===== التمييز اللوني: الأخضر (العشب) والأبيض (الخطوط) =====
// فلاتر لونية: تُستخدم على صورة ملوّنة بعمق 3، وليس بتكرار القيمة
// الترتيب [R, G, B] لكل خلية

export const grassColorWeights = [-0.5, 1.0, -0.5]
export const whiteColorWeights = [0.33, 0.33, 0.33]
export const redColorWeights = [1.0, -0.5, -0.5]
export const blueColorWeights = [-0.5, -0.5, 1.0]