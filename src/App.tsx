import InteractiveAIGuideStoryApp from './InteractiveAIGuideStoryApp';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header dir="rtl" className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="text-sm font-semibold text-slate-900">הבהרה חשובה</div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              המדריך מוגש לציבור לצורכי למידה, עזרה ותיאום ציפיות, כחלק מהשירותים של שיר אורן בתחומים בהם היא פעילה. למרות שנעשה מאמץ לדיוק,
              ייתכנו טעויות, חוסרים או אי־התאמות. האחריות על אופן השימוש במידע, על קבלת החלטות, ועל כל יישום בפועל היא של המשתמשים בלבד.
            </p>
            <div className="mt-3 text-xs text-slate-500">© כל הזכויות שמורות לשיר אורן</div>
          </div>
        </div>
      </header>

      <main>
        <InteractiveAIGuideStoryApp />
      </main>
    </div>
  );
}
