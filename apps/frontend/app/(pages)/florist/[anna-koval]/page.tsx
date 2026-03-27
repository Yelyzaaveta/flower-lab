export default function FloristPage() {
  return (
    <section className="bg-gradient-to-b from-pink-50 via-rose-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-xl shadow-pink-100/40">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            <div className="bg-gradient-to-b from-pink-100 via-rose-50 to-pink-50 p-8 sm:p-10">
              <div className="mx-auto max-w-[220px]">
                <div className="overflow-hidden rounded-3xl border-4 border-white shadow-lg">
                  <img
                    src="/anna-koval.jpg"
                    alt="Анна Коваль"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm font-medium text-pink-700">
                    Флорист Florist Studio
                  </p>
                  <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Анна Коваль
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Професійна флористка з 6-річним досвідом.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-700">
                Florist Profile
              </span>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Професійна флористка з{" "}
                <span className="font-semibold text-pink-600">
                  6-річним досвідом
                </span>
                . Спеціалізується на весільних букетах та ніжних композиціях у
                пастельних тонах.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                <div className="rounded-3xl bg-pink-50 p-6">
                  <p className="text-sm font-medium text-pink-700">
                    🌸 Спеціалізація
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    Весільна флористика
                  </p>
                </div>

                <div className="rounded-3xl bg-rose-50 p-6">
                  <p className="text-sm font-medium text-rose-700">📊 Досвід</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    6 років
                  </p>
                </div>

                <div className="rounded-3xl bg-pink-50 p-6">
                  <p className="text-sm font-medium text-pink-700">
                    📚 Кількість робіт
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    48
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Про флориста
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Анна створює витончені композиції, у яких поєднуються
                  романтика, легкість і сучасний стиль. Найбільше любить
                  працювати з весільною флористикою, де кожен букет має особливе
                  значення та емоцію.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900">
                  🔗 Соцмережі
                </h2>

                <div className="mt-5 flex flex-wrap gap-4">
                  <a
                    href="https://instagram.com/anna.flowers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-pink-100 px-5 py-3 text-sm font-medium text-pink-700 transition hover:bg-pink-200"
                  >
                    Instagram
                  </a>

                  <a
                    href="https://linkedin.com/in/anna-koval"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-pink-600"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
