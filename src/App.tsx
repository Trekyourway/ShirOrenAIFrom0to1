import React from 'react';
import InteractiveAIGuideStoryApp from './InteractiveAIGuideStoryApp';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="fixed top-3 left-3 z-[10000] rounded-full border border-amber-300 bg-amber-100/95 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-md sm:top-5 sm:left-5 sm:px-4 sm:py-2 sm:text-sm">
        <span className="sm:hidden">⚠️ בהמחשה</span>
        <span className="hidden sm:inline">⚠️ הקורס בתהליך כתיבה. לצפייה והמחשה בלבד.</span>
      </div>

      <a
        href="/"
        className="fixed bottom-4 right-4 z-[10000] flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-blue-800 text-2xl text-white shadow-lg sm:h-auto sm:w-auto sm:px-5 sm:py-3 sm:text-base sm:font-bold sm:no-underline"
        aria-label="חזרה לדף הראשי"
      >
        <span className="sm:hidden">🏠</span>
        <span className="hidden sm:inline">🏠 חזרה לדף הראשי</span>
      </a>

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