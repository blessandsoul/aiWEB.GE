# aiweb.ge, text review

**For the translator.** Edit the **KA** and **RU** columns only. Leave the KEY column alone.

Rules that will break the site if you ignore them:

- **No long dash and no middle dash.** Not one, anywhere. Use a comma, a period, a colon,
  parentheses, or a plain hyphen. A validator blocks the file otherwise.
- **Keep every placeholder exactly as it is.** `{year}` stays `{year}`. `<brand></brand>` stays
  `<brand></brand>` (it renders the product logo inline, so do not translate it and do not
  delete it).
- **Georgian is Mkhedruli**, never Mtavruli and never uppercase.
- **Never put a Cyrillic letter inside a Georgian word.** They look alike and it corrupts search.
- `typewriterWords` is a comma-separated list with **no space after the comma**, and
  `typewriterPrefill` must be **the first word of that list**.
- Keep the length roughly in the same range as the English. These are laid out in fixed boxes,
  and a heading that doubles in length will wrap into three lines.

Where this text lives, if you would rather edit the source directly:
`aiweb.ge_project/src/messages/{ka,en,ru}.json`

---


| KEY | EN | KA | RU |
| --- | --- | --- | --- |
| `seo.contact.title` | Contact aiWEB | კონტაქტი, aiWEB | Контакты, aiWEB |
| `seo.contact.description` | Talk to us about a website with nothing to pay upfront, billed monthly, kept fast and kept current. | დაგვიკავშირდით: საიტი წინასწარი გადახდის გარეშე, ყოველთვიური საფასურით, სწრაფი და მუდამ განახლებული. | Напишите нам: сайт без предоплаты, с ежемесячной оплатой, который держат быстрым и актуальным. |
| `seo.notFound.title` | 404, page not found | 404, გვერდი ვერ მოიძებნა | 404, страница не найдена |
| `seo.notFound.description` | This page does not exist. Go back to the homepage. | ეს გვერდი არ არსებობს. დაბრუნდით მთავარ გვერდზე. | Эта страница не существует. Вернитесь на главную. |
| `seo.notFound.heading` | Page not found | გვერდი ვერ მოიძებნა | Страница не найдена |
| `seo.notFound.body` | This page does not exist, or it has moved. | ეს გვერდი არ არსებობს ან გადატანილია. | Эта страница не существует или была перемещена. |
| `seo.notFound.backHome` | Back to the homepage | მთავარ გვერდზე | На главную |
| `contact.title` | Contact us | დაგვიკავშირდით | Свяжитесь с нами |
| `contact.subtitle` | Leave your number and we will call you back. | დატოვეთ ნომერი და ჩვენ დაგირეკავთ. | Оставьте номер, и мы вам перезвоним. |
| `contact.phone` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `contact.phonePlaceholder` | +995 5XX XXX XXX | +995 5XX XXX XXX | +995 5XX XXX XXX |
| `contact.submit` | Send | გაგზავნა | Отправить |
| `contact.submitting` | Sending... | იგზავნება... | Отправка... |
| `contact.successTitle` | Received | მიღებულია | Принято |
| `contact.successMessage` | We will call you back shortly. | მალე დაგირეკავთ. | Мы скоро перезвоним вам. |
| `contact.errorMessage` | Something went wrong. Please try again. | დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან. | Что-то пошло не так. Пожалуйста, попробуйте ещё раз. |
| `contact.contactInfo` | Contact information | საკონტაქტო ინფორმაცია | Контактная информация |
| `contact.phoneLabel` | Phone | ტელეფონი | Телефон |
| `contact.emailLabel` | Email | ელფოსტა | Почта |
| `contact.officeLabel` | Office | ოფისი | Офис |
| `contact.office` | Tbilisi, Tornike Eristavi St. 3 | თბილისი, თორნიკე ერისთავის ქ. 3 | Тбилиси, ул. Торнике Эриставе 3 |
| `contact.legalLabel` | Registered address | იურიდიული მისამართი | Юридический адрес |
| `contact.legal` | Zemo Plato, III Array, N14, Apt. 87, Tbilisi 0163 | ზემო პლატო, III მასივი, N14, ბინა 87, თბილისი 0163 | Земо Плато, III массив, N14, кв. 87, Тбилиси 0163 |
| `landingNav.showcase` | See the build | ნახეთ აწყობა | Смотреть сборку |
| `landingNav.process` | How it works | როგორ მუშაობს | Как работает |
| `landingNav.faq` | Questions | კითხვები | Вопросы |
| `landingNav.cta` | Start a site | დაიწყეთ საიტი | Создать сайт |
| `landingFooter.company` | AI NOW LLC, Tbilisi, Georgia | შპს AI NOW, თბილისი, საქართველო | ООО AI NOW, Тбилиси, Грузия |
| `landingFooter.familyHeading` | aiNOW family | aiNOW-ის პროდუქტები | Семейство aiNOW |
| `landingFooter.companyHeading` | aiWEB | aiWEB | aiWEB |
| `landingFooter.socialHeading` | Social | სოციალური ქსელები | Соцсети |
| `landingFooter.languageHeading` | Language | ენა | Язык |
| `landingFooter.contact` | Contact | კონტაქტი | Контакты |
| `landingFooter.sectionShowcase` | See the build | ნახეთ აწყობა | Смотреть сборку |
| `landingFooter.sectionWork` | How it works | როგორ მუშაობს | Как работает |
| `landingFooter.sectionFaq` | Questions | კითხვები | Вопросы |
| `landingFooter.ctaHuge` | Find the right website plan | გაიგეთ, რა საიტი სჭირდება ბიზნესს | Узнать, какой сайт нужен бизнесу |
| `landingFooter.copyright` | © {year} aiWEB, an aiNOW product. All rights reserved. | © {year} aiWEB, aiNOW-ის პროდუქტი. ყველა უფლება დაცულია. | © {year} aiWEB, продукт aiNOW. Все права защищены. |
| `product.seo.title` | aiWEB: a fast business website kept current by aiNOW | aiWEB: სწრაფი საიტი, რომელსაც aiNOW მუდმივად აახლებს | aiWEB: быстрый сайт для бизнеса, который обновляет aiNOW |
| `product.seo.description` | aiNOW builds your business website, prepares the copy, and handles future updates. There is no upfront payment, and the terms are clear before work starts. | aiNOW თქვენი ბიზნესისთვის ქმნის საიტს, ამზადებს ტექსტს და შემდგომ განახლებებზეც ზრუნავს. წინასწარი გადახდა არ არის; პირობებს დაწყებამდე გაიგებთ. | aiNOW создаёт сайт для бизнеса, готовит тексты и занимается дальнейшими обновлениями. Предоплаты нет, а условия понятны до начала работ. |
| `product.hero.lead` | Your customers always see the right | თქვენს საიტზე კლიენტი ყოველთვის ხედავს სწორ | Клиент всегда видит на вашем сайте актуальные |
| `product.hero.taglinePrefix` | A business website | ბიზნესის საიტი, რომელსაც | Сайт для бизнеса. |
| `product.hero.taglineWorks` | aiNOW keeps current | aiNOW უვლის | aiNOW следит за актуальностью |
| `product.hero.typewriterWords` | prices,services,photos,contact details,offers | ფასებს,სერვისებს,ფოტოებს,კონტაქტებს,შეთავაზებებს | цены,услуги,фотографии,контакты,предложения |
| `product.hero.typewriterPrefill` | prices | ფასებს | цены |
| `product.hero.ctaResults` | Get a website plan | მიიღეთ საიტის გეგმა | Получить план сайта |
| `product.hero.ctaCall` | Contact aiNOW | დაუკავშირდით aiNOW-ს | Связаться с aiNOW |
| `product.hero.commitment` | aiNOW starts work without an upfront payment. The schedule and monthly care terms are clear before you agree. | aiNOW მუშაობას წინასწარი გადახდის გარეშე იწყებს. ვადა და ყოველთვიური მოვლის პირობები შეთანხმებამდე გეცოდინებათ. | aiNOW начинает работу без предоплаты. Срок и условия ежемесячного сопровождения известны до согласования. |
| `product.hero.audience` | For local businesses: clinics, restaurants, garages, and salons | ადგილობრივი ბიზნესებისთვის: კლინიკები, რესტორნები, ავტოსერვისები და სალონები | Для местного бизнеса: клиник, ресторанов, автосервисов и салонов |
| `product.hero.sub` | aiNOW prepares the copy, builds the website, and handles future changes. You approve the content and the final version. | aiNOW ამზადებს ტექსტს, აწყობს საიტს და შემდგომ ცვლილებებსაც აკეთებს. თქვენ ამოწმებთ შინაარსსა და საბოლოო ვერსიას. | aiNOW готовит тексты, создаёт сайт и вносит дальнейшие изменения. Вы утверждаете содержание и итоговую версию. |
| `product.hero.signedBy` | aiNOW checks the copy, website, and launch readiness with you. | aiNOW თქვენთან ერთად ამოწმებს ტექსტს, საიტს და გაშვების მზადყოფნას. | aiNOW проверяет вместе с вами тексты, сайт и готовность к запуску. |
| `product.work.eyebrow` | How it works | როგორ მუშაობს | Как это работает |
| `product.work.headingPre` | Six clear steps. | ექვსი გასაგები ნაბიჯი. | Шесть понятных шагов. |
| `product.work.headingAccent` | From the first conversation to launch and ongoing care. | საუბარიდან საიტის გაშვებამდე და შემდგომ მოვლამდე. | От первого разговора до запуска и дальнейшего сопровождения. |
| `product.work.s1Title` | A short conversation | მოკლე საუბარი | Короткий разговор |
| `product.work.s1Tag` | to understand the business | ბიზნესის გასაგებად | чтобы понять бизнес |
| `product.work.s1Desc` | Tell aiNOW what you sell, who your customers are, and what visitors should do on the website. | ეუბნებით aiNOW-ს, რას ყიდით, ვინ არის თქვენი კლიენტი და რა უნდა გააკეთოს მან საიტზე. | Расскажите aiNOW, что продаёт бизнес, кто его клиенты и какое действие должен приносить сайт. |
| `product.work.s2Title` | A clear website plan | საიტის მკაფიო გეგმა | Понятный план сайта |
| `product.work.s2Tag` | pages, copy, and actions | გვერდები, ტექსტი და მოქმედებები | страницы, тексты и действия |
| `product.work.s2Desc` | aiNOW plans the page structure, writes the first copy, and decides where calls, forms, or bookings belong. | aiNOW ადგენს გვერდების სტრუქტურას, წერს პირველ ტექსტს და ირჩევს, სად უნდა იყოს ზარი, ფორმა ან ჯავშანი. | aiNOW планирует структуру страниц, готовит первый текст и определяет, где нужны звонок, форма или запись. |
| `product.work.s3Title` | A working first version | პირველი ვერსია | Рабочая первая версия |
| `product.work.s3Tag` | a link that opens on your phone | ბმული, რომელსაც ტელეფონშიც გახსნით | ссылка, которая открывается на телефоне |
| `product.work.s3Desc` | Open a working link and review the copy, photos, and offer on a real page. | იღებთ სამუშაო ბმულს და ამოწმებთ ტექსტს, ფოტოებსა და შეთავაზებას რეალურ გვერდზე. | Откройте рабочую ссылку и проверьте текст, фотографии и предложение на настоящей странице. |
| `product.work.s4Title` | Your corrections | თქვენი შესწორებები | Ваши правки |
| `product.work.s4Tag` | everything in one list | ყველაფერი ერთ სიაში | всё одним списком |
| `product.work.s4Desc` | Mark what needs to change. aiNOW updates the copy, visuals, prices, and section order. | ნიშნავთ, რა უნდა შეიცვალოს. aiNOW ასწორებს ტექსტს, ვიზუალს, ფასებსა და ბლოკების თანმიმდევრობას. | Отметьте, что нужно изменить. aiNOW исправит текст, визуальные элементы, цены и порядок блоков. |
| `product.work.s5Title` | Launch checks | გაშვების შემოწმება | Проверка перед запуском |
| `product.work.s5Tag` | mobile, forms, and speed | ტელეფონი, ფორმები და სიჩქარე | телефон, формы и скорость |
| `product.work.s5Desc` | aiNOW checks the website on different screens, tests the forms, and launches only after your approval. | aiNOW ამოწმებს საიტს სხვადასხვა ეკრანზე, ამოწმებს ფორმების მუშაობას და მხოლოდ თქვენი თანხმობის შემდეგ უშვებს. | aiNOW проверяет сайт на разных экранах, тестирует формы и запускает его только после вашего согласия. |
| `product.work.s6Title` | Ongoing care | შემდგომი მოვლა | Дальнейшее сопровождение |
| `product.work.s6Tag` | changes covered by the agreed service | ცვლილებები შეთანხმებულ მომსახურებაში | изменения по согласованному плану |
| `product.work.s6Desc` | When a price, service, or photo changes, aiNOW receives the request and updates the website. | როცა იცვლება ფასი, სერვისი ან ფოტო, aiNOW მოთხოვნას იღებს და საიტს აახლებს. | Когда меняется цена, услуга или фотография, aiNOW получает запрос и обновляет сайт. |
| `product.faq.headingPre` | Important questions. | მთავარი კითხვები. | Главные вопросы. |
| `product.faq.headingAccent` | Short answers. | მოკლე პასუხები. | Короткие ответы. |
| `product.faq.subtitle` | Understand the price, timing, ownership, and care terms before work starts. | გაიგეთ ფასი, ვადა, საკუთრება და მოვლის პირობები დაწყებამდე. | Узнайте цену, срок, правила владения и сопровождения до начала работ. |
| `product.faq.q1` | Why is <brand></brand> a monthly service? | რატომ არის <brand></brand> ყოველთვიური მომსახურება? | Почему <brand></brand> работает как ежемесячная услуга? |
| `product.faq.a1` | After launch, a website still needs updates to prices, copy, forms, and technical settings. The monthly fee covers the care and support agreed with you in advance. | საიტს გაშვების შემდეგაც სჭირდება ფასების, ტექსტის, ფორმებისა და ტექნიკური ნაწილის განახლება. ყოველთვიური საფასური მოიცავს წინასწარ შეთანხმებულ მოვლასა და მხარდაჭერას. | После запуска сайту нужны обновления цен, текстов, форм и технической части. Ежемесячная оплата покрывает заранее согласованные сопровождение и поддержку. |
| `product.faq.q2` | What does it cost? | მაშ, რა ღირს? | Сколько это стоит? |
| `product.faq.a2` | The price depends on the number of pages, required features, and update frequency. aiNOW sends the exact amount with a list of work before the project starts. | ფასი დამოკიდებულია გვერდების რაოდენობაზე, ფუნქციებსა და განახლებების სიხშირეზე. aiNOW ზუსტ თანხას სამუშაოს ჩამონათვალთან ერთად გიგზავნით დაწყებამდე. | Цена зависит от количества страниц, нужных функций и частоты обновлений. aiNOW сообщает точную сумму вместе со списком работ до начала проекта. |
| `product.faq.q3` | What happens when the service is cancelled? | რა ხდება მომსახურების შეწყვეტისას? | Что произойдёт при прекращении оплаты? |
| `product.faq.a3` | The domain and your content stay with you. Hosting, code handover, and service cancellation terms are written into the agreement in advance. | დომენი და თქვენი მასალა თქვენთან რჩება. ჰოსტინგის, კოდის გადაცემისა და მომსახურების შეწყვეტის პირობები წინასწარ იწერება შეთანხმებაში. | Домен и ваши материалы остаются у вас. Условия хостинга, передачи кода и прекращения обслуживания заранее прописываются в соглашении. |
| `product.faq.q4` | Whose name is the domain registered under? | ვის სახელზეა დომენი? | На кого регистрируется домен? |
| `product.faq.a4` | The domain is registered to your business or another person you specify. You also receive administrator access. | დომენი რეგისტრირდება თქვენი ბიზნესის ან თქვენ მიერ მითითებული პირის სახელზე. ადმინისტრატორის წვდომაც გადმოგეცემათ. | Домен регистрируется на ваш бизнес или другого указанного вами владельца. Доступ администратора также передаётся вам. |
| `product.faq.q5` | Can the website be built with a site builder? | შეიძლება საიტის დამოუკიდებლად შექმნა კონსტრუქტორით? | Можно создать сайт самостоятельно в конструкторе? |
| `product.faq.a5` | Yes. aiWEB is useful when you want aiNOW to manage the copy, design, mobile version, technical setup, and future changes. | დიახ. aiWEB გამოგადგებათ, თუ გსურთ, რომ ტექსტი, დიზაინი, მობილური ვერსია, ტექნიკური გამართვა და შემდგომი ცვლილებები aiNOW-მ მართოს. | Да. aiWEB подходит, если нужно поручить aiNOW тексты, дизайн, мобильную версию, техническую настройку и дальнейшие изменения. |
| `product.faq.q6` | How long does a website take? | რამდენი ხანი სჭირდება საიტის შექმნას? | Сколько времени занимает создание сайта? |
| `product.faq.a6` | Timing depends on the number of pages, available material, and required features. aiNOW shows you the project calendar before work starts. | ვადა დამოკიდებულია გვერდების რაოდენობაზე, მასალასა და საჭირო ფუნქციებზე. aiNOW ზუსტ კალენდარს სამუშაოს დაწყებამდე გაჩვენებთ. | Срок зависит от количества страниц, готовности материалов и нужных функций. aiNOW показывает календарный план до начала работ. |
| `product.faq.q7` | If customers already use Facebook and Viber, why is a website useful? | თუ კლიენტები Facebook-სა და Viber-ში წერენ, საიტი რისთვის არის საჭირო? | Клиенты пишут только в Facebook и Viber. Зачем нужен сайт? |
| `product.faq.a7` | Social channels are good for conversation. A website puts your services, prices, work, address, and contact options in one reliable place. | სოციალური ქსელი საუბრისთვის კარგია. საიტი კი ერთ ადგილას აჩვენებს თქვენს სერვისებს, ფასებს, ნამუშევრებს, მისამართსა და საკონტაქტო გზას. | Социальные сети удобны для общения. Сайт показывает в одном месте ваши услуги, цены, работы, адрес и способы связи. |
| `product.faq.q8` | Will the website appear in Google and ChatGPT? | გამოჩნდება საიტი Google-ში ან ChatGPT-ში? | Появится ли сайт в Google и ChatGPT? |
| `product.faq.a8` | aiNOW structures the website so search systems can understand it, but does not promise a specific ranking or mention. Results depend on the market, content, and other factors. | aiNOW საიტს საძიებო სისტემებისთვის გასაგებად აწყობს, მაგრამ კონკრეტულ პოზიციას ან პასუხში მოხვედრას არ გპირდებათ. შედეგი დამოკიდებულია ბაზარზე, შინაარსსა და სხვა ფაქტორებზე. | aiNOW делает структуру сайта понятной для поисковых систем, но не обещает конкретную позицию или упоминание. Результат зависит от рынка, содержания и других факторов. |
| `product.faq.q9` | Who changes the prices? Is every update charged separately? | ვინ ცვლის ფასებს? ყოველი ცვლილება ცალკე ფასდება? | Кто меняет цены? Нужно платить за каждую правку? |
| `product.faq.a9` | Routine changes are included in the agreed care plan. If a request needs substantial extra work, aiNOW confirms the price and timing before doing it. | შეთანხმებულ მოვლის პაკეტში ჩვეულებრივი ცვლილებები შედის. თუ მოთხოვნა დამატებით დიდ სამუშაოს მოითხოვს, aiNOW ფასსა და ვადას შესრულებამდე გაცნობებთ. | Обычные изменения входят в согласованный план сопровождения. Если запрос требует большой дополнительной работы, aiNOW сообщает цену и срок до выполнения. |
| `product.faq.q10` | Can the website sell online? How do BOG and TBC payments work? | შესაძლებელია ონლაინ გაყიდვა? როგორ მუშაობს გადახდები BOG-სა და TBC-სთან? | Можно продавать онлайн? Как работают платежи с BOG и TBC? |
| `product.faq.a10` | Yes, when your bank or payment provider supports the required connection. aiNOW checks the requirements and quotes that work separately before the project starts. | შესაძლებელია, თუ თქვენი ბანკი ან საგადახდო პარტნიორი ონლაინ გადახდას მხარს უჭერს. aiNOW მოთხოვნებსა და ღირებულებას ცალკე ამოწმებს დაწყებამდე. | Да, если банк или платёжный сервис поддерживает нужное подключение. aiNOW отдельно проверяет требования и сообщает стоимость до начала работ. |
| `product.faq.q11` | Will it work properly on a phone? | ტელეფონზე ნორმალურად იმუშავებს? | На телефоне будет нормально работать? |
| `product.faq.a11` | Yes. aiNOW designs for mobile screens and checks forms, buttons, and text readability before launch. | დიახ. aiNOW საიტს მობილური ეკრანისთვის აწყობს და გამოქვეყნებამდე ფორმებს, ღილაკებსა და ტექსტის წაკითხვადობას ამოწმებს. | Да. aiNOW проектирует сайт для мобильных экранов и проверяет формы, кнопки и читаемость текста до запуска. |
| `product.faq.q12` | Can aiNOW prepare the Georgian copy? | ქართულ ტექსტს aiNOW მოამზადებს? | Подготовит ли aiNOW грузинский текст? |
| `product.faq.a12` | Yes. aiNOW prepares the first Georgian draft, and you confirm the facts, prices, and tone. | დიახ. aiNOW ამზადებს პირველ ქართულ ტექსტს, თქვენ კი ამოწმებთ ფაქტებს, ფასებსა და ტონს. | Да. aiNOW готовит первый вариант на грузинском, а вы проверяете факты, цены и тон. |
| `product.faq.q13` | What happens if the site goes down or gets hacked? | რა მოხდება, თუ საიტი ჩავარდება ან გატეხავენ? | Что будет, если сайт упадёт или его взломают? |
| `product.faq.a13` | aiNOW sets up backups, monitoring, and a recovery process. Exact response terms are written into the service agreement. | aiNOW ამზადებს სარეზერვო ასლებს და ადგენს მონიტორინგისა და აღდგენის პროცესს. რეაგირების ზუსტი პირობები მომსახურების შეთანხმებაში იწერება. | aiNOW настраивает резервные копии, мониторинг и процесс восстановления. Сроки и порядок действий прописываются в соглашении об обслуживании. |
| `product.faq.q14` | aiWEB, aiSTAFF, aiCALL. Which one does the business need? | aiWEB, aiSTAFF, aiCALL. რომელი სჭირდება ბიზნესს? | aiWEB, aiSTAFF, aiCALL. Что выбрать бизнесу? |
| `product.faq.a14` | aiWEB builds and maintains the website. aiSTAFF handles written customer messages. aiCALL manages the phone-call process. aiNOW recommends starting where customer requests are most often lost. | aiWEB ქმნის და უვლის საიტს. aiSTAFF პასუხობს წერილობით შეტყობინებებს. aiCALL მართავს სატელეფონო ზარების პროცესს. aiNOW გირჩევთ, დაიწყოთ იქიდან, სადაც კლიენტის მოთხოვნა ყველაზე ხშირად იკარგება. | aiWEB создаёт и обслуживает сайт. aiSTAFF отвечает на письменные сообщения клиентов. aiCALL управляет процессом телефонных звонков. aiNOW советует начать там, где чаще всего теряются обращения. |
| `product.cta.heading` | Find out what website your business needs. | გაიგეთ, რა საიტი სჭირდება თქვენს ბიზნესს. | Узнайте, какой сайт нужен вашему бизнесу. |
| `product.cta.subtitle` | Leave your number. aiNOW will contact you, understand the task, and explain the price, timing, and next step. | დატოვეთ ნომერი. aiNOW დაგიკავშირდებათ, მოისმენს ამოცანას და აგიხსნით ფასს, ვადასა და შემდეგ ნაბიჯს. | Оставьте номер. aiNOW свяжется с вами, уточнит задачу и объяснит цену, срок и следующий шаг. |
| `product.cta.phoneLabel` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `product.cta.phoneSubmit` | Request a call | ზარის მოთხოვნა | Заказать звонок |
| `product.cta.phoneNote` | aiNOW will contact you to agree on the details | aiNOW დაგიკავშირდებათ დეტალების შესათანხმებლად | aiNOW свяжется с вами для согласования деталей |
| `product.cta.orWrite` | Or message aiNOW: | ან მისწერეთ aiNOW-ს: | Или напишите aiNOW: |
| `product.wordmark.line` | aiNOW builds the website and handles future updates. | aiNOW ქმნის საიტს და განახლებებზეც ზრუნავს. | aiNOW создаёт сайт и занимается дальнейшими обновлениями. |
| `product.build.eyebrow` | A live website example | საიტის ცოცხალი მაგალითი | Живой пример сайта |
| `product.build.heading` | Enter a business name and see a website example. | ჩაწერეთ ბიზნესის სახელი და ნახეთ საიტის მაგალითი. | Введите название бизнеса и посмотрите пример сайта. |
| `product.build.subtitle` | Choose an industry. aiWEB builds a fictional preview so you can see the direction before making a decision. | აირჩიეთ სფერო. aiWEB აწყობს გამოგონილ წინასწარ ვერსიას, რათა შედეგი გადაწყვეტილებამდე ნახოთ. | Выберите сферу. aiWEB создаст вымышленный предварительный вариант, чтобы направление было видно до принятия решения. |
| `product.build.namePlaceholder` | Your business name | თქვენი ბიზნესის სახელი | Название вашего бизнеса |
| `product.build.industryLabel` | What do you do? | რას საქმიანობთ? | Чем вы занимаетесь? |
| `product.build.buildBtn` | Create a website example | საიტის მაგალითის შექმნა | Создать пример сайта |
| `product.build.rebuild` | Create another example | სხვა მაგალითის შექმნა | Создать другой пример |
| `product.build.building` | Creating the website example... | საიტის მაგალითი მზადდება... | Создаётся пример сайта... |
| `product.build.speedLabel` | Build result | აწყობის შედეგი | Результат сборки |
| `product.build.done` | The website example is ready. Change the industry or business name to compare the result. | საიტის მაგალითი მზადაა. ახლა შეცვალეთ სფერო ან ბიზნესის სახელი და შეადარეთ შედეგი. | Пример сайта готов. Измените сферу или название бизнеса, чтобы сравнить результат. |
| `product.build.sampleName` | Sample Studio | სატესტო სტუდია | Тестовая студия |
| `product.build.sampleBadge` | Fictional example | გამოგონილი მაგალითი | Вымышленный пример |
| `product.build.previewLabel` | Website preview | საიტის წინასწარი ნახვა | Предварительный просмотр сайта |
| `product.build.servicesLabel` | Services | მომსახურება | Услуги |
| `product.build.contactLabel` | Contact | კონტაქტი | Контакты |
| `product.build.progressLabel` | Build progress | აწყობის პროგრესი | Ход сборки |
| `product.build.ready` | Example ready | მაგალითი მზადაა | Пример готов |
| `product.build.replay` | Show again | თავიდან ჩვენება | Показать заново |
| `product.build.i1` | Dental clinic | სტომატოლოგია | Стоматология |
| `product.build.i2` | Restaurant | რესტორანი | Ресторан |
| `product.build.i3` | Construction | მშენებლობა | Строительство |
| `product.build.i4` | Auto service | ავტოსერვისი | Автосервис |
| `product.build.i5` | Beauty salon | სილამაზის სალონი | Салон красоты |
| `product.build.i6` | Tour operator | ტურ-ოპერატორი | Туроператор |
| `product.build.nav1` | Services | სერვისები | Услуги |
| `product.build.nav2` | Prices | ფასები | Цены |
| `product.build.nav3` | Contact | კონტაქტი | Контакты |
| `product.build.cta` | Book now | ჩაწერა | Записаться |
| `product.build.h1_i1` | A clinic where planning a visit is simple | კლინიკა, სადაც ვიზიტის დაგეგმვა მარტივია | Клиника, где легко запланировать визит |
| `product.build.sub_i1` | Services, prices, location, and booking on one clear page. | სერვისები, ფასები, მისამართი და ჩაწერა ერთ გასაგებ გვერდზე. | Услуги, цены, адрес и запись на одной понятной странице. |
| `product.build.s1_i1` | Preventive cleaning | პროფილაქტიკური წმენდა | Профилактическая чистка |
| `product.build.s2_i1` | Consultation | კონსულტაცია | Консультация |
| `product.build.s3_i1` | Dental restoration | კბილის აღდგენა | Восстановление зуба |
| `product.build.proof_i1` | Clear information | გასაგები ინფორმაცია | Понятная информация |
| `product.build.proofValue_i1` | Prices and terms are visible before the visit | ფასი და პირობები ვიზიტამდე ჩანს | Цены и условия видны до визита |
| `product.build.address_i1` | Vake, Tbilisi | თბილისი, ვაკე | Тбилиси, Ваке |
| `product.build.cta_i1` | Book a visit | ვიზიტის დაჯავშნა | Записаться на приём |
| `product.build.h1_i2` | Georgian flavour in the heart of the city | ქართული გემო ქალაქის შუაგულში | Грузинский вкус в центре города |
| `product.build.sub_i2` | See the menu, opening hours, and table booking on one page. | ნახეთ მენიუ, სამუშაო საათები და მაგიდის დაჯავშნის გზა ერთ გვერდზე. | Меню, часы работы и бронирование стола на одной странице. |
| `product.build.s1_i2` | Menu | მენიუ | Меню |
| `product.build.s2_i2` | Today's offer | დღის შეთავაზება | Предложение дня |
| `product.build.s3_i2` | Book a table | მაგიდის დაჯავშნა | Бронирование стола |
| `product.build.proof_i2` | Everything needed to choose | არჩევანი ერთ გვერდზე | Всё для выбора |
| `product.build.proofValue_i2` | The menu and opening hours are easy to find | მენიუ და სამუშაო საათები მარტივად იძებნება | Меню и часы работы легко найти |
| `product.build.address_i2` | Sololaki, Tbilisi | თბილისი, სოლოლაკი | Тбилиси, Сололаки |
| `product.build.cta_i2` | Book a table | მაგიდის დაჯავშნა | Забронировать стол |
| `product.build.h1_i3` | Renovation with a clear plan | რემონტი მკაფიო გეგმით | Ремонт по понятному плану |
| `product.build.sub_i3` | See the services, completed work, and how to request an estimate. | ნახეთ მომსახურება, ნამუშევრები და ხარჯთაღრიცხვის მოთხოვნის გზა. | Услуги, готовые работы и заявка на расчёт в одном месте. |
| `product.build.s1_i3` | Interior renovation | შიდა რემონტი | Внутренний ремонт |
| `product.build.s2_i3` | Estimate | ხარჯთაღრიცხვა | Смета |
| `product.build.s3_i3` | Completed projects | შესრულებული პროექტები | Готовые проекты |
| `product.build.proof_i3` | A clear work process | მუშაობის პროცესი | Понятный процесс работы |
| `product.build.proofValue_i3` | Stages and terms are explained in advance | ეტაპები და პირობები წინასწარ არის აღწერილი | Этапы и условия описаны заранее |
| `product.build.address_i3` | Tbilisi and nearby areas | თბილისი და შემოგარენი | Тбилиси и ближайшие районы |
| `product.build.cta_i3` | Request an estimate | ხარჯთაღრიცხვის მოთხოვნა | Запросить смету |
| `product.build.h1_i4` | A garage that keeps you informed | ავტოსერვისი, სადაც იცით, რა ხდება | Автосервис, который держит клиента в курсе |
| `product.build.sub_i4` | Diagnostics, repairs, and booking on one simple page. | დიაგნოსტიკა, შეკეთება და დროის დაჯავშნა ერთ მარტივ გვერდზე. | Диагностика, ремонт и запись на одной простой странице. |
| `product.build.s1_i4` | Diagnostics | დიაგნოსტიკა | Диагностика |
| `product.build.s2_i4` | Repair | შეკეთება | Ремонт |
| `product.build.s3_i4` | Tyres | საბურავები | Шины |
| `product.build.proof_i4` | Approved work | შეთანხმებული სამუშაო | Согласованный список работ |
| `product.build.proofValue_i4` | The customer sees the work list before repairs begin | კლიენტი შეკეთებამდე ხედავს სამუშაოს ჩამონათვალს | Клиент видит список работ до начала ремонта |
| `product.build.address_i4` | Dighomi, Tbilisi | თბილისი, დიღომი | Тбилиси, Дигоми |
| `product.build.cta_i4` | Book a time | დროის დაჯავშნა | Записаться на сервис |
| `product.build.h1_i5` | Beauty care that fits your schedule | სილამაზე თქვენს დროს ერგება | Красота по удобному расписанию |
| `product.build.sub_i5` | Choose a service, specialist, and time in one form. | აირჩიეთ მომსახურება, ოსტატი და სასურველი დრო ერთ ფორმაში. | Выберите услугу, специалиста и время в одной форме. |
| `product.build.s1_i5` | Hair care | თმის მოვლა | Уход за волосами |
| `product.build.s2_i5` | Nail care | ფრჩხილის მოვლა | Уход за ногтями |
| `product.build.s3_i5` | Brow care | წარბის მოვლა | Уход за бровями |
| `product.build.proof_i5` | Simple booking | მარტივი ჩაწერა | Простая запись |
| `product.build.proofValue_i5` | Service, specialist, and time are in one form | მომსახურება, ოსტატი და დრო ერთ ფორმაშია | Услуга, специалист и время собраны в одной форме |
| `product.build.address_i5` | Saburtalo, Tbilisi | თბილისი, საბურთალო | Тбилиси, Сабуртало |
| `product.build.cta_i5` | Book a visit | ვიზიტის დაჯავშნა | Записаться на визит |
| `product.build.h1_i6` | Your next journey is Georgia | თქვენი შემდეგი მოგზაურობა საქართველოა | Следующее путешествие начинается в Грузии |
| `product.build.sub_i6` | Compare destinations, itineraries, and tour terms on one page. | შეადარეთ მიმართულებები, პროგრამა და ტურის პირობები ერთ გვერდზე. | Сравните направления, программу и условия тура на одной странице. |
| `product.build.s1_i6` | Kazbegi | ყაზბეგი | Казбеги |
| `product.build.s2_i6` | Kakheti | კახეთი | Кахетия |
| `product.build.s3_i6` | Svaneti | სვანეთი | Сванетия |
| `product.build.proof_i6` | A clear itinerary | გასაგები პროგრამა | Понятная программа |
| `product.build.proofValue_i6` | The route and terms are visible before booking | მარშრუტი და პირობები დაჯავშნამდე ჩანს | Маршрут и условия видны до бронирования |
| `product.build.address_i6` | Tours from Tbilisi | ტურები თბილისიდან | Туры из Тбилиси |
| `product.build.cta_i6` | Request a tour | ტურის მოთხოვნა | Запросить тур |
| `product.liveUpdate.eyebrow` | Website updates | საიტის განახლება | Обновление сайта |
| `product.liveUpdate.heading` | Send a change. aiNOW publishes the correct version. | აგზავნით ცვლილებას. aiNOW აქვეყნებს სწორ ვერსიას. | Отправьте изменение. aiNOW опубликует правильную версию. |
| `product.liveUpdate.subtitle` | aiNOW checks the request, updates the page, and shows you the result before publishing. | aiNOW ამოწმებს მოთხოვნას, ცვლის გვერდს და გამოქვეყნებამდე გაჩვენებთ შედეგს. | aiNOW проверяет запрос, меняет страницу и показывает результат до публикации. |
| `product.liveUpdate.request` | Change the cleaning price from 55 to 65 GEL. | წმენდის ფასი 55-დან 65 ლარამდე შეცვალეთ. | Измените цену чистки с 55 до 65 лари. |
| `product.liveUpdate.oldValue` | 55 GEL | 55 ლარი | 55 лари |
| `product.liveUpdate.newValue` | 65 GEL | 65 ლარი | 65 лари |
| `product.liveUpdate.editing` | aiNOW updates the price | aiNOW ცვლის ფასს | aiNOW меняет цену |
| `product.liveUpdate.refreshing` | Checking the page | მიმდინარეობს შემოწმება | Страница проверяется |
| `product.liveUpdate.published` | Change published | ცვლილება გამოქვეყნდა | Изменение опубликовано |
| `product.liveUpdate.outcome` | Customers now see the correct price. | საიტზე უკვე სწორი ფასი ჩანს. | Клиенты уже видят правильную цену. |
| `product.liveUpdate.replay` | Replay | თავიდან ნახვა | Посмотреть ещё раз |
| `product.speed.eyebrow` | Website speed check | საიტის სიჩქარის შემოწმება | Проверка скорости сайта |
| `product.speed.heading` | A slow page can stop a customer before they act. | ნელი გვერდი კლიენტს მოქმედებამდე აჩერებს. | Медленная страница мешает клиенту перейти к действию. |
| `product.speed.subtitle` | Choose how your website feels on mobile. aiNOW shows what should be checked first. | აირჩიეთ, როგორ იტვირთება თქვენი საიტი. aiNOW გაჩვენებთ, რა უნდა შემოწმდეს პირველ რიგში. | Выберите, как сайт загружается на телефоне. aiNOW покажет, что проверить в первую очередь. |
| `product.speed.quote` | Customers should see the service, price, and contact option without unnecessary waiting. | კლიენტმა სერვისი, ფასი და საკონტაქტო გზა ზედმეტი ლოდინის გარეშე უნდა ნახოს. | Клиент должен увидеть услугу, цену и способ связи без лишнего ожидания. |
| `product.speed.source` | This is an example of website performance, not a revenue forecast. | ეს არის საიტის მდგომარეობის მაგალითი და არა შემოსავლის პროგნოზი. | Это пример состояния сайта, а не прогноз дохода. |
| `product.speed.yours` | How does your website load on mobile? | როგორ იტვირთება თქვენი საიტი მობილურზე? | Как сайт загружается на телефоне? |
| `product.speed.slow` | Painful | მტკივნეული | Медленно |
| `product.speed.ok` | Fine | ნორმალური | Приемлемо |
| `product.speed.fast` | Instant | მყისიერი | Быстро |
| `product.speed.note` | This result is not promised revenue. aiNOW measures the real website before recommending priorities. | ეს შედეგი არ არის დაპირებული შემოსავალი. aiNOW რეალურ საიტს ჯერ ზომავს და მხოლოდ შემდეგ გთავაზობთ პრიორიტეტებს. | Этот результат не обещает доход. aiNOW сначала измеряет реальный сайт и только потом предлагает приоритеты. |
| `product.speed.siteName` | Sample Studio | სატესტო სტუდია | Тестовая студия |
| `product.speed.currentLabel` | Website now | საიტი ახლა | Сайт сейчас |
| `product.speed.improvedLabel` | After speed improvements | სიჩქარის გამართვის შემდეგ | После ускорения |
| `product.speed.replay` | Replay | თავიდან ნახვა | Повторить |
| `product.speed.result_slow` | Measure loading first and simplify the heaviest page. | ჯერ გაზომეთ ჩატვირთვა და გაამარტივეთ ყველაზე მძიმე გვერდი. | Сначала измерьте загрузку и упростите самую тяжёлую страницу. |
| `product.speed.result_ok` | The website is usable. aiNOW will check what still slows the first view. | საიტი გამოსაყენებელია. aiNOW შეამოწმებს, რა ანელებს გვერდის პირველ ნაწილს. | Сайтом можно пользоваться. aiNOW проверит, что ещё замедляет первый экран. |
| `product.speed.result_fast` | Speed looks good. Check it again after every important content change. | სიჩქარე კარგია. შეამოწმეთ ისევ ყოველი მნიშვნელოვანი ცვლილების შემდეგ. | Скорость выглядит хорошо. Проверяйте её после каждого важного изменения. |
| `product.speed.check1` | Main content appears quickly | მთავარი შინაარსი სწრაფად ჩნდება | Основное содержание появляется быстро |
| `product.speed.check2` | Buttons respond without delay | ღილაკები დაყოვნების გარეშე რეაგირებს | Кнопки реагируют без задержки |
| `product.speed.check3` | The page stays stable while loading | გვერდი ჩატვირთვისას არ ირხევა | Страница не скачет при загрузке |
| `product.flip.eyebrow` | Two ways to maintain a website | მოვლის ორი გზა | Два способа сопровождать сайт |
| `product.flip.heading` | Launch is the start. Decide who will update the website next. | საიტის გაშვება დასაწყისია. აირჩიეთ, ვინ განაახლებს მას შემდეგ. | После запуска сайт нужно обновлять. Решите, кто будет этим заниматься. |
| `product.flip.subtitle` | Compare two models: build only, or build with ongoing care. | შეადარეთ ორი მოდელი: მხოლოდ შექმნა, ან შექმნა და შემდგომი მოვლა. | Сравните два варианта: только создание или создание с дальнейшим сопровождением. |
| `product.flip.once` | Pay once | ერთხელ | Один раз |
| `product.flip.monthly` | Pay monthly | ყოველთვიურად | Помесячно |
| `product.flip.onceLabel` | Website build only | მხოლოდ საიტის შექმნა | Только создание сайта |
| `product.flip.monthlyLabel` | Website with agreed care | საიტი და შეთანხმებული მოვლა | Сайт с согласованным сопровождением |
| `product.flip.launch` | Launch | გაშვება | Запуск |
| `product.flip.month` | Month | თვე | Месяц |
| `product.flip.onceEnd` | Future changes need a separate plan, schedule, and price. | შემდეგ ცვლილებებს ცალკე დაგეგმვა, ვადა და ფასი დასჭირდება. | Для следующих изменений понадобятся отдельные план, срок и цена. |
| `product.flip.monthlyEnd` | Agreed updates are included in the care service. | შეთანხმებული განახლებები მოვლის მომსახურებაში შედის. | Согласованные обновления входят в услугу сопровождения. |
| `product.flip.w1` | New page | ახალი გვერდი | Новая страница |
| `product.flip.w2` | Prices updated | ფასები განახლდა | Цены обновлены |
| `product.flip.w3` | Photos changed | ფოტოები შეიცვალა | Фотографии заменены |
| `product.flip.w4` | Form fixed | ფორმა გასწორდა | Форма починена |
| `product.flip.w5` | Speed tuned | სიჩქარე შემოწმდა | Скорость подтянута |
| `product.flip.w6` | Security certificate renewed | უსაფრთხოების სერტიფიკატი განახლდა | Сертификат безопасности продлён |
| `product.flip.w7` | Backup restored | სარეზერვო ასლი აღდგა | Резервная копия восстановлена |
| `product.flip.w8` | New service added | ახალი სერვისი დაემატა | Добавлена услуга |
| `product.flip.note` | Pricing depends on the scope. aiNOW explains both options before work starts. | ფასი დამოკიდებულია სამუშაოს მოცულობაზე. aiNOW ორივე ვარიანტის პირობებს დაწყებამდე გაჩვენებთ. | Цена зависит от объёма работ. aiNOW объясняет условия обоих вариантов до начала проекта. |
| `product.flip.replay` | Replay | თავიდან ნახვა | Повторить |
| `product.mobileLead.eyebrow` | The customer-request journey | კლიენტის მოთხოვნის გზა | Путь обращения клиента |
| `product.mobileLead.heading` | A customer sends a request. The business receives it in one list. | კლიენტი აგზავნის მოთხოვნას. ბიზნესი მას ერთიან სიაში იღებს. | Клиент отправляет обращение. Бизнес получает его в общем списке. |
| `product.mobileLead.subtitle` | This example shows the path from choosing a service to sending the form and creating a request for the responsible person. | მაგალითი აჩვენებს გზას: სერვისის არჩევა, ფორმის გაგზავნა და ახალი მოთხოვნა პასუხისმგებელი ადამიანისთვის. | Пример показывает путь от выбора услуги до отправки формы и создания обращения для ответственного сотрудника. |
| `product.mobileLead.visitor` | Mobile visitor | მობილური ვიზიტორი | Посетитель с телефона |
| `product.mobileLead.service` | Dental cleaning | კბილების პროფესიული წმენდა | Профессиональная чистка зубов |
| `product.mobileLead.selected` | Service selected | სერვისი არჩეულია | Услуга выбрана |
| `product.mobileLead.formSent` | Booking form sent | ჩაწერის ფორმა გაიგზავნა | Форма записи отправлена |
| `product.mobileLead.ownerInbox` | Business requests | ბიზნესის მოთხოვნები | Обращения бизнеса |
| `product.mobileLead.leadCreated` | New request | ახალი მოთხოვნა | Новое обращение |
| `product.mobileLead.outcome` | The request is ready to handle. | მოთხოვნა მზადაა დასამუშავებლად. | Обращение готово к обработке. |
| `product.mobileLead.replay` | Replay | თავიდან ნახვა | Посмотреть ещё раз |
| `product.mobileLead.fictional` | Fictional example · number redacted | გამოგონილი მაგალითი · ნომერი დაფარულია | Вымышленный пример · номер скрыт |
| `product.proof.url` | demo-clinic.ge | demo-clinic.ge | demo-clinic.ge |
| `product.proof.brand` | Demo clinic | სადემონსტრაციო კლინიკა | Тестовая клиника |
| `product.proof.nav1` | Services | სერვისები | Услуги |
| `product.proof.nav2` | Prices | ფასები | Цены |
| `product.proof.h1` | Better care starts with a calm visit | ჯანმრთელობაზე ზრუნვა მშვიდი ვიზიტით იწყება | Забота о здоровье начинается со спокойного визита |
| `product.proof.sub` | See the services, prices, and booking option on one clear page. | ნახეთ სერვისები, ფასები და ვიზიტის დაჯავშნის გზა ერთ გვერდზე. | Услуги, цены и запись на одной понятной странице. |
| `product.proof.s1` | Preventive cleaning | პროფილაქტიკური წმენდა | Профилактическая чистка |
| `product.proof.s2` | Consultation | კონსულტაცია | Консультация |
| `product.proof.cta` | Book a visit | ვიზიტის დაჯავშნა | Записаться на приём |
| `product.proof.speed` | Website readiness | საიტის მზადყოფნა | Готовность сайта |
| `product.proof.replay` | Replay | თავიდან ნახვა | Повторить |
