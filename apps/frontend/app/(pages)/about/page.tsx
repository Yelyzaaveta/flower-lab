export default function AboutPage() {
  return (
    <section className="bg-gradient-to-b from-pink-50 via-rose-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-700">
              About Florist Studio
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Даруємо емоції через квіти
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              <span className="font-semibold text-pink-600">
                Florist Studio
              </span>{" "}
              — онлайн-магазин букетів, який допомагає тобі дарувати тепло,
              красу та щирі емоції. Ми створюємо сучасні авторські букети для
              будь-яких подій: від днів народження до весіль, побачень чи просто
              приємних сюрпризів без приводу.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Наш сервіс підходить для тих, хто хоче швидко, красиво та без
              зайвого стресу обрати ідеальний букет з доставкою.
            </p>
          </div>

          <div className="rounded-3xl border border-pink-100 bg-white/80 p-8 shadow-xl shadow-pink-100/50 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Наша місія
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Робити людей щасливішими через квіти. Ми віримо, що навіть
              маленький букет може змінити день, настрій і залишити приємні
              спогади.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-pink-50 p-5">
                <p className="text-sm font-medium text-pink-700">Засновано</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  2022
                </p>
              </div>

              <div className="rounded-2xl bg-rose-50 p-5">
                <p className="text-sm font-medium text-rose-700">Підхід</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Handmade & Fresh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Наші принципи</h2>
            <p className="mt-4 text-base text-slate-600">
              Ми дбаємо не лише про красу букетів, а й про якість сервісу на
              кожному етапі.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-xl">
                🌸
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Тільки свіжі квіти
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Використовуємо лише свіжі квіти від перевірених постачальників.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-xl">
                💐
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Ручна робота
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Кожен букет збирається вручну професійним флористом.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-xl">
                📷
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Чесні фото
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Фото на сайті відповідають реальному вигляду букетів.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-xl">
                🤍
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Гарантія якості
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Якщо букет не відповідає якості — ми його замінимо.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-50 p-8 shadow-lg">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Контакти</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Маєш запитання або хочеш уточнити деталі замовлення? Ми завжди
                на зв’язку.
              </p>

              <div className="mt-6 space-y-4 text-slate-700">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:support@floriststudio.com"
                    className="text-pink-600 transition hover:text-pink-700"
                  >
                    support@floriststudio.com
                  </a>
                </p>

                <p>
                  <span className="font-semibold">Телефон:</span>{" "}
                  <a
                    href="tel:+380991234567"
                    className="text-pink-600 transition hover:text-pink-700"
                  >
                    +380 99 123 45 67
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">Соцмережі</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Слідкуй за нами, щоб бачити нові колекції букетів, сезонні
                композиції та натхнення для подарунків.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://instagram.com/floriststudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-pink-600"
                >
                  Instagram
                </a>

                <a
                  href="https://facebook.com/floriststudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-pink-600"
                >
                  Facebook
                </a>

                <a
                  href="https://t.me/floriststudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-pink-600"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
