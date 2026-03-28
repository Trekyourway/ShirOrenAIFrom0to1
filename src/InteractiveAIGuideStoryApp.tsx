import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Target,
  Wrench,
  FileText,
  Link as LinkIcon,
  PlayCircle,
  AlertTriangle,
  User,
  BookOpen,
  Sparkles,
  Settings,
  Bot,
  Rocket,
  ClipboardList,
  PenSquare,
} from 'lucide-react';

type SlideType = 'story' | 'lesson' | 'task' | 'prompt';
type IconKey =
  | 'sparkles'
  | 'alert'
  | 'bot'
  | 'user'
  | 'book'
  | 'target'
  | 'check'
  | 'file'
  | 'lightbulb'
  | 'rocket'
  | 'wrench'
  | 'settings'
  | 'clipboard'
  | 'pen'
  | 'link'
  | 'play';

type Slide = {
  id: number;
  chapter: string;
  title: string;
  body: string;
  note: string;
  icon: IconKey;
  type: SlideType;
};

type Resource = {
  label: string;
  url: string;
  when: string;
};

const slidesData: Slide[] = [
  {
    id: 1,
    chapter: 'פתיחה',
    title: 'יש יותר מדי מידע, פחות מדי סדר.',
    body:
      'אנשים רבים רוצים להפיק יותר מעצמם, לבנות משהו אמיתי, או להתקדם עם רעיון שכבר יושב להם בראש. אבל במקום תנועה יש הצפה: יותר מדי אפשרויות, יותר מדי כלים, וקפיצה מוקדמת מדי לפתרון לפני שיש בהירות.',
    note:
      'המדריך הזה לא מיועד רק למי שלמדה פיתוח. הוא מיועד למי שרוצה לבנות משהו אמיתי ולא להישאר ברמת דיבורים, רעיונות ובלגן.',
    icon: 'sparkles',
    type: 'story',
  },
  {
    id: 2,
    chapter: 'פתיחה',
    title: 'התחושה הזאת הגיונית לגמרי.',
    body:
      'כשיש AI, מדריכים, כלים, סרטונים, פלטפורמות, תבניות ורעיונות מכל כיוון, קל מאוד לחשוב שהבעיה היא בך. בפועל, רוב האנשים פשוט לא למדו מסלול מסודר: איך לקחת רעיון, לחדד אותו, לבחור דרך, לעבוד נכון מול כלי AI, ולהתקדם בלי להתפזר.',
    note:
      'הבעיה היא לרוב לא חוסר אינטליגנציה ולא חוסר פוטנציאל. הבעיה היא שאין מסגרת עבודה ברורה.',
    icon: 'alert',
    type: 'story',
  },
  {
    id: 3,
    chapter: 'פתיחה',
    title: 'AI יכול לקדם אותך. הוא גם יכול לפזר אותך.',
    body:
      'בלי מסגרת, אנשים שואלים צ׳אט שאלות גדולות מדי, מקבלים הרבה טקסט, מתלהבים רגע, ואז נתקעים. עם מסגרת, אותו AI הופך לשותף עבודה: מסכם, מפרק, מחדד, מאתגר, מנסח ועוזר להוציא לפועל.',
    note: 'כלי AI הם לא תחליף לחשיבה. הם מכפיל כוח לחשיבה מסודרת.',
    icon: 'bot',
    type: 'story',
  },
  {
    id: 4,
    chapter: 'פתיחה',
    title: 'מי אני ולמה קל לי ללמוד את זה מהר יחסית',
    body:
      'אני שיר אורן. חייתי ולמדתי את העולמות האלה מעל 15 שנה. אני מכירה גם פיתוח, גם ניהול, גם מוצר, גם תהליכי עבודה, וגם את הפער בין רעיון למציאות. לכן קל לי יותר ללמוד כלים חדשים, לראות מבנים, ולזהות איפה אנשים נמרחים או הולכים לאיבוד.',
    note: 'המטרה כאן היא לקצר לך דרך, לא להרשים אותך במילים.',
    icon: 'user',
    type: 'story',
  },
  {
    id: 5,
    chapter: 'פתיחה',
    title: 'מה תקבלי כאן',
    body:
      'סיפור עבודה כרונולוגי. קצר. פרקטי. מדפדפים קדימה ואחורה. בכל שלב תביני מה עושים עכשיו, למה זה בא עכשיו, מה הטעות הנפוצה, ומה המשימה הקטנה שתזיז אותך.',
    note:
      'בסוף תמצאי גם use case מלא של יומן תודות ומשימות יומי, אחרי שכל הבסיס כבר יושב.',
    icon: 'book',
    type: 'story',
  },
  {
    id: 6,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'לא מתחילים מקוד. מתחילים מהבעיה.',
    body:
      'רוב האנשים אומרים: אני רוצה אפליקציה. זאת לא התחלה טובה. צריך להבין קודם מה כואב, למי, באיזה הקשר, ומה אמור להשתפר אם הפתרון יעבוד.',
    note: 'פיצ׳ר הוא לא בעיה. מסך הוא לא בעיה. טכנולוגיה היא לא בעיה.',
    icon: 'target',
    type: 'lesson',
  },
  {
    id: 7,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'משימה 1 — כתבי את הבעיה במשפט אחד',
    body: 'השלימי: אנשים ש_____ לא מצליחים _____ כי _____.',
    note: 'אל תכתבי פתרון. רק בעיה.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 8,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'מי המשתמש הראשון',
    body:
      'לא בונים לכולם. השאלה הנכונה היא מי האדם הראשון שעבורו הגרסה הראשונה צריכה לעבוד. אדם אמיתי עדיף על קהל מופשט.',
    note: 'ככל שתהיי ספציפית יותר בהתחלה, יהיה קל יותר לבנות משהו ברור.',
    icon: 'user',
    type: 'lesson',
  },
  {
    id: 9,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'משימה 2 — בחרי אדם ראשון',
    body:
      'כתבי: עבור מי בדיוק אני בונה עכשיו? מה היום שלו נראה? מתי הכאב מופיע? מה ייחשב אצלו שיפור?',
    note: 'מותר להתחיל ממישהי כמוך. זה אפילו חכם לפעמים.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 10,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'מהי התוצאה הרצויה',
    body:
      'אחרי שימוש אחד, או אחרי שבוע שימוש, מה אמור להיות טוב יותר? סדר? בהירות? חיסכון בזמן? פחות עומס? החלטה מהירה יותר? בלי זה, אי אפשר להגדיר הצלחה.',
    note: 'אם לא ברור מה נחשב הצלחה, המוצר ייסחב לכל הכיוונים.',
    icon: 'rocket',
    type: 'lesson',
  },
  {
    id: 11,
    chapter: 'פרק 1 — לפני שבונים',
    title: 'משימה 3 — הגדירי הצלחה פשוטה',
    body:
      'כתבי משפט קצר: אם המשתמש יעשה X, ויקבל Y, זה ייחשב הצלחה לגרסה ראשונה.',
    note: 'שמרי את זה פשוט. לא מערכת שלמה. תוצאה אחת.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 12,
    chapter: 'פרק 2 — מרעיון ל-PRD',
    title: 'עכשיו מתחילים לתעד',
    body:
      'PRD לא חייב להיות מסמך כבד. בגרסה ראשונה הוא פשוט מסמך עבודה. הוא שומר עלייך מפני בלגן, קפיצות, ודיונים אינסופיים עם עצמך או עם ה-AI.',
    note: 'אם זה לא כתוב, זה ישתנה שוב ושוב.',
    icon: 'file',
    type: 'lesson',
  },
  {
    id: 13,
    chapter: 'פרק 2 — מרעיון ל-PRD',
    title: 'מה חייב להיכנס למסמך הראשון',
    body:
      'שם הרעיון. הבעיה. המשתמש הראשון. התוצאה הרצויה. מה חייב להיות ב-MVP. מה נשאר בחוץ. זרימת שימוש בסיסית. אילו נתונים שומרים. מה נחשב Done.',
    note: 'זה מספיק כדי להתחיל. לא צריך 40 עמודים.',
    icon: 'clipboard',
    type: 'lesson',
  },
  {
    id: 14,
    chapter: 'פרק 2 — מרעיון ל-PRD',
    title: 'משימה 4 — פתחי מסמך עבודה',
    body:
      'צרי מסמך חדש ומלאי רק שבע שורות: הבעיה, למי, הערך המרכזי, מה חובה, מה בחוץ, זרימה בסיסית, ו-Done.',
    note: 'זאת נקודת המעבר מרעיון מעורפל לעבודה אמיתית.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 15,
    chapter: 'פרק 2 — מרעיון ל-PRD',
    title: 'פרומפט פתיחה ל-PRD ראשוני',
    body:
      'עזור לי להפוך את הרעיון הבא למסמך PRD מינימלי עבור MVP. כלול: הבעיה, המשתמש הראשון, התוצאה הרצויה, 3 צעדי flow, מה חובה, מה מחוץ לגרסה, ו-Definition of Done. הנה הרעיון: _____.',
    note: 'אל תבקשי עדיין עיצוב, מסכים או קוד.',
    icon: 'pen',
    type: 'prompt',
  },
  {
    id: 16,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: '״אפליקציה״ זאת מילה כללית מדי',
    body:
      'לפני בחירת כלים צריך להבין מה סוג הפתרון. אותו רעיון יכול להתחיל כדף נחיתה, כלי אישי, ווב־אפ פשוט, בוט, אוטומציה, או מוצר תוכן. הסוג משנה את כל השאר.',
    note: 'טעות נפוצה: לבחור טכנולוגיה לפני שבוחרים צורת פתרון.',
    icon: 'lightbulb',
    type: 'lesson',
  },
  {
    id: 17,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: 'דף נחיתה / אתר תוכן',
    body:
      'נכון כשרוצים לבדוק עניין, לאסוף לידים, להסביר רעיון, למכור שירות או מוצר תוכן, או לבדוק מסר. בדרך כלל אין צורך בלוגיקה עמוקה או במסד נתונים מלא.',
    note: 'אם עדיין אין ודאות שיש צורך, זה לעיתים הצעד הראשון הנכון.',
    icon: 'target',
    type: 'lesson',
  },
  {
    id: 18,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: 'Web App',
    body:
      'נכון כשיש לוגיקה, מצבים, דאטה, הרשאות, מסכים, ושימוש שחוזר על עצמו. לדוגמה: ניהול משימות, מעקב, מערכת לקוחות, אזור אישי, או כלי שעושים בו פעולות ולא רק קוראים.',
    note: 'כאן כבר צריך לחשוב על frontend, backend ונתונים.',
    icon: 'wrench',
    type: 'lesson',
  },
  {
    id: 19,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: 'אפליקציית מובייל / Native',
    body:
      'נכון רק אם יש סיבה אמיתית: שימוש תכוף מאוד בנייד, יכולות מכשיר, push notifications, או חוויית מובייל עמוקה במיוחד. אחרת, לפעמים web app רספונסיבי מספיק בשלב ראשון.',
    note: 'התחלה בנייטיב מייקרת ומסבכת.',
    icon: 'rocket',
    type: 'lesson',
  },
  {
    id: 20,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: 'בוטים, אוטומציות ו-Agentic Flows',
    body:
      'נכון כשיש תהליך, החלטות, טריגרים, הודעות, או טיפול במידע. לדוגמה: קריאת מיילים, סיווג, תגובות, משימות חוזרות, או שרשור של כמה סוכנים מומחים.',
    note: 'כאן חשוב לחשוב על rules, handoff, permissions, וגבולות.',
    icon: 'bot',
    type: 'lesson',
  },
  {
    id: 21,
    chapter: 'פרק 3 — לבחור מה בכלל בונים',
    title: 'משימה 5 — בחרי צורת פתרון ראשונה',
    body:
      'עני: מה הצורה הכי קטנה שעדיין מייצרת ערך? דף? מסך אחד? כלי אישי? אוטומציה? בוט? אל תבחרי לפי מה שנשמע מרשים. בחרי לפי מה שאפשר להתחיל איתו חכם.',
    note: 'הרבה מוצרים טובים מתחילים קטן מאוד.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 22,
    chapter: 'פרק 4 — בחירת כלים',
    title: 'כלים בוחרים לפי צורך, לא לפי הייפ',
    body:
      'הכלי הנכון תלוי בסוג המוצר, ברמת השליטה שאת צריכה, במהירות, בתקציב, וביכולת שלך להחזיק את זה בהמשך. אין כלי קסם שמתאים להכול.',
    note: 'השאלה היא לא רק מה בונה מהר. השאלה היא גם מה תדעי לתחזק ולהמשיך איתו.',
    icon: 'wrench',
    type: 'lesson',
  },
  {
    id: 23,
    chapter: 'פרק 4 — בחירת כלים',
    title: 'מתי no-code / low-code יכול להספיק',
    body:
      'כשצריך לבדוק רעיון, להרים מסלול משתמש בסיסי, לחבר דאטה, לבנות טופס, או להוציא MVP מהר יחסית. זה טוב במיוחד כשמטרת השלב היא למידה ולא שלמות.',
    note:
      'אבל צריך לבדוק מראש גבולות: בעלות על הקוד, אבטחה, לוגים, database, scaling, ויכולת יציאה בהמשך.',
    icon: 'settings',
    type: 'lesson',
  },
  {
    id: 24,
    chapter: 'פרק 4 — בחירת כלים',
    title: 'מתי צריך קוד מסודר יותר',
    body:
      'כשיש לוגיקה משמעותית, אבטחה, אינטגרציות, ניהול מצבים, הרשאות, תשתית אמיתית, או צורך בבעלות גבוהה יותר על המערכת. כאן כבר כדאי לחשוב על stack, repo, error handling, logs, ו-DB.',
    note: 'אם בונים משהו אמיתי, צריך לחשוב מעבר ל״זה עובד על המסך״.',
    icon: 'settings',
    type: 'lesson',
  },
  {
    id: 25,
    chapter: 'פרק 4 — בחירת כלים',
    title: 'משימה 6 — טבלת בחירה קצרה',
    body:
      'כתבי לעצמך שלוש עמודות: מה אני בונה, כמה שליטה אני צריכה, ומה רמת המורכבות האמיתית. אחר כך בחרי כלי בהתאם, לא לפי מצב רוח.',
    note: 'אפילו טבלה פשוטה כזאת יכולה לחסוך הרבה סיבובים.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 26,
    chapter: 'פרק 5 — עבודה אמיתית מול AI',
    title: 'אל תבקשי מה-AI לבנות ״משהו״',
    body:
      'בקשות כלליות מחזירות תוצרים כלליים. ככל שהבעיה, ההקשר, המגבלות והתוצר המבוקש ברורים יותר, כך גם העבודה תהיה טובה יותר.',
    note: 'Prompt טוב מתחיל בהקשר ולא ב״תבנה לי״.',
    icon: 'bot',
    type: 'lesson',
  },
  {
    id: 27,
    chapter: 'פרק 5 — עבודה אמיתית מול AI',
    title: 'המבנה של פרומפט עבודה טוב',
    body:
      'תפקיד. מטרה. הקשר. קהל. מגבלות. מה בפנים ומה בחוץ. פורמט התשובה. קריטריוני הצלחה. שאלות סגירה אם יש פערים. זה כבר משנה את האיכות.',
    note: 'ה-AI לא קורא מחשבות. הוא מגיב למסגרת.',
    icon: 'pen',
    type: 'lesson',
  },
  {
    id: 28,
    chapter: 'פרק 5 — עבודה אמיתית מול AI',
    title: 'פרומפט — פירוק רעיון לצעדי עבודה',
    body:
      'אתה מומחה מוצר ויישום. קח את הרעיון הבא והפוך אותו לצעדים כרונולוגיים לבניית MVP. אל תתחיל מקוד. התחל מהבעיה, המשתמש הראשון, התוצאה הרצויה, מסמך העבודה, סוג הפתרון, ואז הצע שלב בנייה ראשון. הרעיון: _____.',
    note: 'זה פרומפט טוב לשלב מוקדם.',
    icon: 'pen',
    type: 'prompt',
  },
  {
    id: 29,
    chapter: 'פרק 5 — עבודה אמיתית מול AI',
    title: 'פרומפט — ביקורת על MVP עמוס מדי',
    body:
      'פעל כמומחה מוצר. הנה ה-MVP שלי. מצא מה מיותר לגרסה ראשונה, מה מסוכן, ומה צריך לדחות. תן טבלה של Must / Nice to Have / Later עם נימוק קצר. הנה ה-MVP: _____.',
    note: 'זה עוזר להילחם בפיצ׳ריזם.',
    icon: 'pen',
    type: 'prompt',
  },
  {
    id: 30,
    chapter: 'פרק 5 — עבודה אמיתית מול AI',
    title: 'פרומפט — הגדרות שצריך לשזור לאורך הדרך',
    body:
      'עבור הרעיון הבא, עזור לי להגדיר בהדרגה: מטרת המוצר, משתמש ראשון, scope, out of scope, נתונים, הרשאות, Definition of Done, סיכונים, והנחות. אל תכתוב לי הכול בבת אחת. עבור שלב שלב.',
    note: 'ככה לא טובעים במסמך גדול מדי בהתחלה.',
    icon: 'pen',
    type: 'prompt',
  },
  {
    id: 31,
    chapter: 'פרק 6 — עבודה עם סוכנים',
    title: 'מתי צריך סוכן אחד ומתי כמה',
    body:
      'לפעמים שיחה אחת מספיקה. אבל כשיש פרויקט מורכב, עדיף להפריד תפקידים: סוכן מוביל, מומחה UX, מומחה קופי, פונקציונלי, ארכיטקטורה, ביקורת. זה שומר על סדר ואיכות.',
    note: 'הסוכן המוביל לא חייב לעשות הכול בעצמו.',
    icon: 'bot',
    type: 'lesson',
  },
  {
    id: 32,
    chapter: 'פרק 6 — עבודה עם סוכנים',
    title: 'מבנה בסיסי של orchestration',
    body:
      'Lead Agent מקבל PRD. אחר כך הוא מחלק למומחים: UX למבנה וזרימות, קופי למסרים, פונקציונלי לכללים ומצבים, ארכיטקטורה למימוש. בסוף הוא מחזיר סינתזה, סיכונים, הנחות, והחלטות פתוחות.',
    note: 'הפרדה כזאת חוסכת בלגן וסתירות.',
    icon: 'clipboard',
    type: 'lesson',
  },
  {
    id: 33,
    chapter: 'פרק 6 — עבודה עם סוכנים',
    title: 'משימה 7 — נסחי handoff טוב',
    body:
      'כתבי handoff קצר: זה הרעיון, זאת המטרה, זה התוצר שאני צריכה ממך, אלו המגבלות, ואלו השאלות שצריך לסגור. handoff טוב הוא חצי עבודה.',
    note: 'בלי זה, סוכנים יחזירו חומרים לא מסונכרנים.',
    icon: 'check',
    type: 'task',
  },
  {
    id: 34,
    chapter: 'פרק 6 — עבודה עם סוכנים',
    title: 'הגדרות חשובות בדרך',
    body:
      'לאורך התהליך צריך לשזור: permissions, גישה לכלים, rules, scope, זיכרון פרויקט, מגבלות, ובדיקת מקורות. אחרת הסוכן יעבוד, אבל לא תמיד בכיוון שאת צריכה.',
    note: 'הגדרות הן לא קישוט. הן שומרות על התוצאה.',
    icon: 'settings',
    type: 'lesson',
  },
  {
    id: 35,
    chapter: 'פרק 7 — טעויות נפוצות',
    title: 'טעות 1 — להתחיל מהכלי',
    body:
      'אנשים בוחרים פלטפורמה ואז מנסים להתאים אליה רעיון. זה הפוך. קודם הבעיה, אחר כך הפתרון, ואז הכלי.',
    note: 'הכלי צריך לשרת את החשיבה, לא להחליף אותה.',
    icon: 'alert',
    type: 'lesson',
  },
  {
    id: 36,
    chapter: 'פרק 7 — טעויות נפוצות',
    title: 'טעות 2 — לבנות לכולם',
    body:
      '״לכולם״ נשמע גדול, אבל בפועל הוא מטשטש הכול: מסרים, UX, פיצ׳רים, עדיפויות. הגרסה הראשונה צריכה לעבוד חזק עבור מישהו ראשון ברור.',
    note: 'מיקוד הוא כוח, לא מגבלה.',
    icon: 'alert',
    type: 'lesson',
  },
  {
    id: 37,
    chapter: 'פרק 7 — טעויות נפוצות',
    title: 'טעות 3 — לתת ל-AI להציף אותך',
    body:
      'אם כל תשובה היא עוד מסמך, עוד טבלה, עוד רשימה, אבל אין החלטה ואין צעד הבא, את מתקדמת לכאורה אבל לא באמת.',
    note: 'בכל סשן עבודה צריך לצאת עם החלטה או משימה.',
    icon: 'alert',
    type: 'lesson',
  },
  {
    id: 38,
    chapter: 'פרק 7 — טעויות נפוצות',
    title: 'טעות 4 — MVP עמוס',
    body:
      'הרבה רעיונות מתים לא כי הם לא טובים, אלא כי ניסו להכניס הכול בגרסה הראשונה. MVP צריך לייצר ערך, לא להרשים ברוחב.',
    note: 'פחות זה לא עונש. פחות זה איך זזים.',
    icon: 'alert',
    type: 'lesson',
  },
  {
    id: 39,
    chapter: 'פרק 8 — קישורים ונקודות ערך לאורך הדרך',
    title: 'איפה נכון לשלב קישורים',
    body:
      'לא בתחילת הסיפור. רק כשיש הקשר. אחרי שהמשתמש מבין למה צריך PRD — אפשר לקשר לתבנית. אחרי שבוחרים כלי — אפשר לקשר לתיעוד. אחרי שמבינים orchestration — אפשר לקשר ל-skills, subagents או workflows.',
    note: 'קישור בלי הקשר הוא עומס. קישור בזמן הנכון הוא מכפיל ערך.',
    icon: 'link',
    type: 'lesson',
  },
  {
    id: 40,
    chapter: 'פרק 8 — קישורים ונקודות ערך לאורך הדרך',
    title: 'איפה נכון לשלב יוטיוב',
    body:
      'רק כשסרטון באמת חוסך חיכוך: הדגמה של tool setup, walkthrough של PRD, או הסבר קצר על flow מסוים. לא להפיל רשימת סרטונים באמצע.',
    note: 'עדיף המלצה אחת מדויקת בשלב הנכון מאשר עשר המלצות רועשות.',
    icon: 'play',
    type: 'lesson',
  },
  {
    id: 41,
    chapter: 'פרק 9 — Use Case בסוף',
    title: 'Use Case מלווה — יומן תודות ומשימות יומי',
    body:
      'עכשיו, אחרי שכל השלד ברור, אפשר לשים use case ספציפי. הבעיה: היום מתפזר, הראש עמוס, ודברים נשארים באוויר. הערך: עצירה קצרה, שלוש תודות, שלוש משימות, שמירה, וסימון שבוצע.',
    note: 'כאן ה-use case בא לשרת את ההבנה, לא להחליף אותה.',
    icon: 'book',
    type: 'lesson',
  },
  {
    id: 42,
    chapter: 'פרק 9 — Use Case בסוף',
    title: 'פירוק MVP של יומן התודות',
    body:
      'מסך כניסה יומי. שדות לתודות. שדות למשימות. כפתור שמירה. תצוגת היסטוריה. סטטוס הושלם. מחוץ לגרסה ראשונה: הרשמה, שיתוף, גרפים, קהילה, AI אישי, תזכורות חכמות.',
    note: 'כאן כבר אפשר לעבור לאפיון מסכים, דאטה וזרימות.',
    icon: 'clipboard',
    type: 'lesson',
  },
  {
    id: 43,
    chapter: 'סיום',
    title: 'מה עכשיו',
    body:
      'קודם כל: לסגור מסמך עבודה ראשון. אחר כך לבחור סוג פתרון. אחר כך כלי. אחר כך פרומפטים ועבודה מסודרת. ורק אז להתחיל לבנות. זה הסדר. הוא חוסך המון.',
    note: 'מוצר אמיתי לא נולד מטקסט יפה. הוא נולד מהתקדמות מסודרת.',
    icon: 'rocket',
    type: 'story',
  },
];

const iconMap: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  alert: AlertTriangle,
  bot: Bot,
  user: User,
  book: BookOpen,
  target: Target,
  check: CheckCircle2,
  file: FileText,
  lightbulb: Lightbulb,
  rocket: Rocket,
  wrench: Wrench,
  settings: Settings,
  clipboard: ClipboardList,
  pen: PenSquare,
  link: LinkIcon,
  play: PlayCircle,
};

const resources: Resource[] = [
  {
    label: 'Claude Code — Skills',
    url: 'https://code.claude.com/docs/en/skills',
    when: 'אחרי שמבינים מהו skill ומה תפקידו בתוך תהליך עבודה.',
  },
  {
    label: 'Claude Code — Subagents',
    url: 'https://code.claude.com/docs/en/sub-agents',
    when: 'אחרי שמבינים למה לפצל מומחים ולא לעבוד מול צ׳אט אחד שעושה הכול.',
  },
  {
    label: 'Claude Code — Permissions',
    url: 'https://code.claude.com/docs/en/permissions',
    when: 'כשמתחילים לעבוד עם כלים וגישה שדורשת גבולות ברורים.',
  },
  {
    label: 'Claude Code — Hooks',
    url: 'https://code.claude.com/docs/en/hooks-guide',
    when: 'כשיש טריגרים, אוטומציות, או בדיקות חוזרות שצריך למכן.',
  },
  {
    label: 'Google Antigravity — Skills',
    url: 'https://antigravity.google/docs/skills',
    when: 'אחרי שיש כבר הבנה בסיסית על מבנה תהליך וסוגי מומחיות.',
  },
  {
    label: 'Google Antigravity — Rules / Workflows',
    url: 'https://antigravity.google/docs/rules-workflows',
    when: 'כשצריך מסלול עבודה חוזר ולא רק בקשה חד־פעמית.',
  },
  {
    label: 'Google Antigravity — Agent Manager',
    url: 'https://antigravity.google/docs/agent-manager',
    when: 'כשמתחילים לעבוד עם כמה agents ורוצים לראות ולנהל אותם.',
  },
];

const youtubeIdeas = [
  'חפשי walkthrough קצר של PRD MVP ולא סרטון כללי על startup ideas.',
  'חפשי demo מעשי של Claude Code skills / subagents רק אחרי שהמבנה הלוגי כבר יושב.',
  'חפשי סרטון setup לכלי ספציפי רק בשלב שבו באמת בחרת בו.',
  'אם סרטון לא עוזר לך לעשות צעד אמיתי עכשיו, הוא כנראה סתם דופמין.',
];

function validateSlides(data: Slide[]): string[] {
  const errors: string[] = [];
  const ids = new Set<number>();

  if (data.length < 40) {
    errors.push('Expected at least 40 slides.');
  }

  for (const slide of data) {
    if (ids.has(slide.id)) {
      errors.push(`Duplicate slide id: ${slide.id}`);
    }
    ids.add(slide.id);

    if (!slide.chapter.trim()) {
      errors.push(`Slide ${slide.id} is missing chapter.`);
    }
    if (!slide.title.trim()) {
      errors.push(`Slide ${slide.id} is missing title.`);
    }
    if (!slide.body.trim()) {
      errors.push(`Slide ${slide.id} is missing body.`);
    }
    if (!slide.note.trim()) {
      errors.push(`Slide ${slide.id} is missing note.`);
    }
    if (!iconMap[slide.icon]) {
      errors.push(`Slide ${slide.id} has invalid icon: ${slide.icon}`);
    }
  }

  return errors;
}

const slideValidationTestCases = [
  {
    name: 'slides count is at least 40',
    passed: slidesData.length >= 40,
  },
  {
    name: 'first slide title is a valid string',
    passed: typeof slidesData[0]?.title === 'string' && slidesData[0].title.length > 0,
  },
  {
    name: 'all slide ids are unique',
    passed: new Set(slidesData.map((slide) => slide.id)).size === slidesData.length,
  },
  {
    name: 'all slides have required fields',
    passed: validateSlides(slidesData).length === 0,
  },
];

function SlideCard({
  slide,
  editMode,
  onUpdate,
}: {
  slide: Slide;
  editMode: boolean;
  onUpdate: (field: keyof Pick<Slide, 'title' | 'body' | 'note'>, value: string) => void;
}) {
  const Icon = iconMap[slide.icon] || FileText;
  const typeClass = {
    story: 'bg-white border-slate-200',
    lesson: 'bg-white border-blue-100',
    task: 'bg-amber-50 border-amber-200',
    prompt: 'bg-emerald-50 border-emerald-200',
  }[slide.type] || 'bg-white border-slate-200';

  return (
    <div className={`rounded-3xl border p-5 shadow-sm sm:p-6 ${typeClass}`}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-2xl bg-slate-100 p-3">
          <Icon className="h-6 w-6 text-slate-700" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-xs text-slate-500">{slide.chapter}</div>
          {editMode ? (
            <textarea
              className="w-full resize-none bg-transparent text-2xl font-bold leading-tight outline-none"
              value={slide.title}
              rows={2}
              onChange={(e) => onUpdate('title', e.target.value)}
            />
          ) : (
            <h1 className="text-2xl font-bold leading-tight text-slate-900">{slide.title}</h1>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {editMode ? (
          <textarea
            className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[16px] leading-7 outline-none"
            value={slide.body}
            onChange={(e) => onUpdate('body', e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap text-[16px] leading-7 text-slate-800">{slide.body}</p>
        )}

        {editMode ? (
          <textarea
            className="min-h-[96px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none"
            value={slide.note}
            onChange={(e) => onUpdate('note', e.target.value)}
          />
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{slide.note}</div>
        )}
      </div>
    </div>
  );
}

export default function InteractiveAIGuideStoryApp() {
  const [slides, setSlides] = useState<Slide[]>(slidesData);
  const [current, setCurrent] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    setValidationErrors(validateSlides(slides));
  }, [slides]);

  const safeCurrent = Math.min(Math.max(current, 0), slides.length - 1);
  const slide = slides[safeCurrent] ?? slidesData[0];
  const progress = slides.length > 0 ? Math.round(((safeCurrent + 1) / slides.length) * 100) : 0;

  const chapterList = useMemo(() => {
    const seen = new Set<string>();
    return slides
      .map((s, index) => ({ chapter: s.chapter, index }))
      .filter((item) => {
        if (seen.has(item.chapter)) {
          return false;
        }
        seen.add(item.chapter);
        return true;
      });
  }, [slides]);

  const updateSlide = (field: keyof Pick<Slide, 'title' | 'body' | 'note'>, value: string) => {
    setSlides((prev) => prev.map((s, i) => (i === safeCurrent ? { ...s, [field]: value } : s)));
  };

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-auto">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500">מדריך אינטראקטיבי</div>
                <div className="text-lg font-bold">רעיון → PRD → כלים → עבודה אמיתית</div>
              </div>
              <button
                onClick={() => setEditMode((v) => !v)}
                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                {editMode ? 'סיום עריכה' : 'עריכת טקסט'}
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>התקדמות</span>
                <span>
                  {safeCurrent + 1} / {slides.length}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-slate-900" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-xs text-slate-500">{progress}%</div>
            </div>

            {validationErrors.length > 0 && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="text-sm font-semibold text-amber-900">בעיות תקינות בתוכן</div>
                <ul className="mt-2 list-disc space-y-1 pr-5 text-xs leading-5 text-amber-800">
                  {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {chapterList.map((item) => (
                <button
                  key={item.chapter}
                  onClick={() => setCurrent(item.index)}
                  className={`w-full rounded-2xl px-3 py-3 text-right text-sm transition ${safeCurrent >= item.index ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  {item.chapter}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 p-4">
              <div className="text-sm font-semibold">קישורים רלוונטיים</div>
              <div className="mt-3 space-y-3">
                {resources.slice(0, 5).map((resource) => (
                  <a
                    key={resource.label}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl bg-slate-50 p-3 hover:bg-slate-100"
                  >
                    <div className="text-sm font-medium">{resource.label}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">מתי לפתוח: {resource.when}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 p-4">
              <div className="text-sm font-semibold">נקודות ערך מיוטיוב</div>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
                {youtubeIdeas.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-50 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs text-slate-500">מסך {safeCurrent + 1}</div>
                  <div className="text-lg font-semibold">דפדוף קצר. פחות עומס. יותר התקדמות.</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    disabled={safeCurrent === 0}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 disabled:opacity-40 hover:bg-slate-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                    אחורה
                  </button>
                  <button
                    onClick={goNext}
                    disabled={safeCurrent === slides.length - 1}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-white disabled:opacity-40 hover:bg-slate-800"
                  >
                    הבא
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <SlideCard slide={slide} editMode={editMode} onUpdate={updateSlide} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">מה חשוב לזכור כאן</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  בכל מסך אמורה להיות לך אחת משתיים: או בהירות חדשה, או משימה קטנה. בלי זה, זה סתם עוד תוכן.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">איך לערוך</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  לחצי על "עריכת טקסט" בצד, עדכני כותרת, גוף והערה לכל מסך, והמשיכי לדפדף. כל הטקסטים יושבים ישירות בקובץ וניתנים לשינוי.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold">בדיקות תקינות מובנות</div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {slideValidationTestCases.map((test) => (
                  <div
                    key={test.name}
                    className={`rounded-2xl border p-3 text-sm ${test.passed ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}
                  >
                    <div className="font-medium">{test.name}</div>
                    <div className="mt-1 text-xs">{test.passed ? 'Passed' : 'Failed'}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
