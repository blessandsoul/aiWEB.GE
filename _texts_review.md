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
| `landingNav.showcase` | Watch one get built | ნახეთ, როგორ შენდება | Посмотрите, как собирается |
| `landingNav.process` | How it works | როგორ მუშაობს | Как работает |
| `landingNav.faq` | Questions | კითხვები | Вопросы |
| `landingNav.cta` | Get in touch | დაგვიკავშირდით | Связаться |
| `landingFooter.company` | AI NOW LLC, Tbilisi, Georgia | შპს AI NOW, თბილისი, საქართველო | ООО AI NOW, Тбилиси, Грузия |
| `landingFooter.familyHeading` | aiNOW family | aiNOW-ის პროდუქტები | Семейство aiNOW |
| `landingFooter.companyHeading` | aiWEB | aiWEB | aiWEB |
| `landingFooter.socialHeading` | Social | სოციალური ქსელები | Соцсети |
| `landingFooter.languageHeading` | Language | ენა | Язык |
| `landingFooter.contact` | Contact | კონტაქტი | Контакты |
| `landingFooter.sectionShowcase` | Watch one get built | ნახეთ, როგორ შენდება | Посмотрите, как собирается |
| `landingFooter.sectionWork` | How it works | როგორ მუშაობს | Как работает |
| `landingFooter.sectionFaq` | Questions | კითხვები | Вопросы |
| `landingFooter.ctaHuge` | Nothing upfront. Tell us what you sell. | წინასწარი გადახდის გარეშე. გვითხარით, რას ყიდით. | Без предоплаты. Расскажите, что вы продаёте. |
| `landingFooter.copyright` | © {year} aiWEB, an aiNOW product. All rights reserved. | © {year} aiWEB, aiNOW-ის პროდუქტი. ყველა უფლება დაცულია. | © {year} aiWEB, продукт aiNOW. Все права защищены. |
| `product.seo.title` | aiWEB, a website with nothing to pay upfront, kept fast and kept current | aiWEB, საიტი წინასწარი გადახდის გარეშე, სწრაფი და მუდამ განახლებული | aiWEB, сайт без предоплаты, который держат быстрым и актуальным |
| `product.seo.description` | We build your site in days and keep it alive for a monthly fee. No lump sum, no lock-in. Live in 10 working days or the first month is free. | საიტს რამდენიმე დღეში ვაშენებთ და ყოველთვიური საფასურით ვინახავთ ცოცხლად. არავითარი ერთჯერადი თანხა, არავითარი ჯაჭვი. ვუშვებთ 10 სამუშაო დღეში, ან პირველი თვე უფასოა. | Собираем сайт за несколько дней и держим его живым за ежемесячную плату. Никакой единовременной суммы, никакой привязки. Запуск за 10 рабочих дней, иначе первый месяц бесплатно. |
| `product.hero.lead` | Nobody is looking after your | ვერავინ უვლის თქვენს | За вашим сайтом никто не следит. И за |
| `product.hero.taglinePrefix` | AI that | AI, რომელიც | AI, который |
| `product.hero.taglineWorks` | builds | აშენებს | строит |
| `product.hero.typewriterWords` | website,prices,photos,forms,speed | საიტს,ფასებს,ფოტოებს,ფორმებს,სიჩქარეს | сайтом,ценами,фото,формами,скоростью |
| `product.hero.typewriterPrefill` | website | საიტს | сайтом |
| `product.hero.sloganCreates` | creates | ქმნის | создаёт |
| `product.hero.sloganAds` | advertises | არეკლამებს | рекламирует |
| `product.hero.sloganSells` | sells | ყიდის | продаёт |
| `product.hero.sloganManages` | manages | მართავს | управляет |
| `product.hero.sloganTogether` | together | ერთად | вместе |
| `product.hero.ctaResults` | Watch one get built | ნახეთ, როგორ შენდება | Посмотреть, как собирается |
| `product.hero.ctaCall` | Book a call | დაგვიკავშირდით | Связаться |
| `product.hero.commitment` | Live in 10 working days, or the first month is free. Nothing to pay upfront, and you can leave with 30 days notice. | ვუშვებთ 10 სამუშაო დღეში, ან პირველი თვე უფასოა. წინასწარ არაფერს იხდით და 30 დღით ადრე გაფრთხილებით ნებისმიერ დროს მიდიხართ. | Запуск за 10 рабочих дней, иначе первый месяц бесплатно. Ничего не платите вперёд и уходите в любой момент, предупредив за 30 дней. |
| `product.hero.audience` | For clinics, restaurants, builders, auto services and salons in Georgia | კლინიკებს, რესტორნებს, მშენებლებს, ავტოსერვისებსა და სალონებს საქართველოში | Для клиник, ресторанов, строителей, автосервисов и салонов в Грузии |
| `product.hero.sub` | We build it in ten working days, we keep it fast, and when your prices change we change them. Nothing to pay upfront. | ვაშენებთ ათ სამუშაო დღეში, ვინახავთ სწრაფად, ხოლო როცა ფასები გეცვლებათ, ჩვენ ვცვლით. წინასწარ არაფერს იხდით. | Собираем за десять рабочих дней, держим быстрым, а когда меняются ваши цены, меняем их мы. Ничего не платите вперёд. |
| `product.hero.signedBy` | Andrew Altair. I am the one who calls you back. | ენდრიუ ალტაირი. უკან მე დაგირეკავთ. | Эндрю Алтаир. Перезванивать вам буду я. |
| `product.work.eyebrow` | How it works | როგორ მუშაობს | Как это работает |
| `product.work.headingPre` | Six steps. | ექვსი ნაბიჯი. | Шесть шагов. |
| `product.work.headingAccent` | From a phone call to a site that is still being looked after in a year. | სატელეფონო ზარიდან საიტამდე, რომელსაც წლის შემდეგაც უვლიან. | От телефонного звонка до сайта, за которым и через год кто-то следит. |
| `product.work.s1Title` | A twenty minute call | ოცწუთიანი ზარი | Двадцатиминутный звонок |
| `product.work.s1Tag` | no brief to write | ბრიფის წერა არ გჭირდებათ | бриф писать не нужно |
| `product.work.s1Desc` | What you sell, who buys it, and what you want them to do when they land on the page. That is the whole discovery. You do not have to prepare anything. | რას ყიდით, ვინ ყიდულობს და რა გინდათ, რომ გააკეთოს ადამიანმა გვერდზე მოხვედრისას. ეს არის მთელი აღმოჩენის ეტაპი. წინასწარ არაფრის მომზადება არ გჭირდებათ. | Что вы продаёте, кто это покупает и что человек должен сделать, попав на страницу. Это весь этап погружения. Готовить заранее ничего не надо. |
| `product.work.s2Title` | We write the Georgian copy | ქართულ ტექსტს ჩვენ ვწერთ | Грузинский текст пишем мы |
| `product.work.s2Tag` | you write nothing | თქვენ არაფერს წერთ | вы не пишете ничего |
| `product.work.s2Desc` | Most owners never launch because they cannot face writing the text. So we write it, you correct it, and that removes the thing that actually kills these projects. | მფლობელების უმეტესობა სწორედ იმიტომ არ უშვებს საიტს, რომ ტექსტის წერას ვერ უმკლავდება. ამიტომ ვწერთ ჩვენ, თქვენ კი ასწორებთ. სწორედ ეს კლავს ხოლმე ასეთ პროექტებს. | Большинство владельцев так и не запускают сайт, потому что не могут заставить себя написать текст. Поэтому пишем мы, а вы правите. Именно это обычно и убивает такие проекты. |
| `product.work.s3Title` | You see it on a real URL | ხედავთ რეალურ მისამართზე | Видите его на настоящем адресе |
| `product.work.s3Tag` | within days | რამდენიმე დღეში | за несколько дней |
| `product.work.s3Desc` | Not a screenshot and not a Figma link. A live address you can open on your own phone and send to your wife before you decide anything. | არა სქრინშოთი და არა Figma-ს ბმული. ცოცხალი მისამართი, რომელსაც საკუთარ ტელეფონში გახსნით და მეუღლეს გაუგზავნით, სანამ რამეს გადაწყვეტთ. | Не скриншот и не ссылка на Figma. Живой адрес, который откроете на своём телефоне и отправите жене, прежде чем что-то решать. |
| `product.work.s4Title` | You tell us what to change | გვეუბნებით, რა შევცვალოთ | Говорите, что поменять |
| `product.work.s4Tag` | as many rounds as it takes | იმდენჯერ, რამდენჯერაც საჭიროა | столько раз, сколько нужно |
| `product.work.s4Desc` | Photos, prices, the order of things, the words. We change them. Nobody signs off on a website they have only seen once. | ფოტოები, ფასები, თანმიმდევრობა, სიტყვები. ჩვენ ვცვლით. საიტს, რომელიც ერთხელ ნახა, არავინ ამტკიცებს. | Фотографии, цены, порядок блоков, слова. Мы меняем. Сайт, который увидели один раз, никто не принимает. |
| `product.work.s5Title` | It goes live | ეშვება | Запуск |
| `product.work.s5Tag` | 10 working days | 10 სამუშაო დღე | 10 рабочих дней |
| `product.work.s5Desc` | Fast on a phone, on Georgian mobile internet, in the places people actually look. If it is not live in 10 working days, the first month is free. | სწრაფი ტელეფონზე, ქართულ მობილურ ინტერნეტზე, იქ, სადაც ხალხი მართლა ეძებს. თუ 10 სამუშაო დღეში არ გაუშვით, პირველი თვე უფასოა. | Быстро на телефоне, на грузинском мобильном интернете, там, где люди действительно ищут. Если не запустили за 10 рабочих дней, первый месяц бесплатно. |
| `product.work.s6Title` | It stays alive | რჩება ცოცხალი | Остаётся живым |
| `product.work.s6Tag` | included, every month | ყოველთვიურ საფასურში | входит в ежемесячную плату |
| `product.work.s6Desc` | The price changed. A new service. A photo. A broken form. You message us, we fix it. That is what the monthly fee is for, and it is the part nobody sells you. | ფასი შეიცვალა. ახალი სერვისი. ფოტო. გაფუჭებული ფორმა. გვწერთ, ჩვენ ვასწორებთ. სწორედ ამისთვისაა ყოველთვიური საფასური და სწორედ ამას არავინ გყიდით. | Цена изменилась. Новая услуга. Фотография. Сломанная форма. Вы пишете, мы правим. Именно за это и берётся ежемесячная плата, и именно это вам никто не продаёт. |
| `product.faq.headingPre` | Questions, | კითხვები, | Вопросы, |
| `product.faq.headingAccent` | answered straight. | პირდაპირი პასუხებით. | прямые ответы. |
| `product.faq.subtitle` | Starting with the one you are actually thinking. | დავიწყოთ იმით, რასაც სინამდვილეში ფიქრობთ. | Начнём с того, о чём вы на самом деле думаете. |
| `product.faq.q1` | Why would I pay <brand></brand> monthly instead of paying once? | რატომ უნდა გადავუხადო <brand></brand>-ს ყოველთვიურად და არა ერთხელ? | Зачем платить <brand></brand> ежемесячно, а не один раз? |
| `product.faq.a1` | Because the build is now the cheap part and the upkeep is not. AI collapsed the cost of producing a website, which is uncomfortable for us to say and true anyway. What did not get cheaper is the person who changes your prices when your prices change, keeps the thing loading fast, and answers when the form stops sending. A one-off site is a site that is out of date in four months and abandoned in a year. You have probably already bought one of those. | იმიტომ, რომ აშენება უკვე იაფი ნაწილია, მოვლა კი არა. AI-მ საიტის დამზადების ღირებულება ჩამოშალა. ჩვენთვის ამის თქმა უსიამოვნოა და მაინც სიმართლეა. რაც არ გაიაფდა, ის ადამიანია, რომელიც ფასს გიცვლით, როცა ფასი გეცვლებათ, რომელიც საიტს სწრაფად ამუშავებს და რომელიც პასუხობს, როცა ფორმა აღარ იგზავნება. ერთჯერადი საიტი ოთხ თვეში მოძველებულია და წელიწადში მიტოვებული. ალბათ ერთი ასეთი უკვე გიყიდიათ. | Потому что сборка теперь дешёвая часть, а уход за сайтом нет. AI обрушил стоимость производства сайта. Нам неприятно это говорить, и это всё равно правда. Не подешевел человек, который меняет ваши цены, когда цены меняются, держит страницу быстрой и отвечает, когда форма перестала отправляться. Разовый сайт устаревает за четыре месяца и заброшен через год. Один такой вы, скорее всего, уже покупали. |
| `product.faq.q2` | So what does it actually cost? | მაშ, რა ღირს? | Так сколько это стоит? |
| `product.faq.a2` | Nothing upfront and a monthly fee that depends on how many pages you need and how much changes. We do not put a price table on this page because a one-page site for a dentist and a ten-page catalogue for a distributor are not the same product. Tell us what you sell and you get a number the same day. | წინასწარ არაფერს იხდით, შემდეგ კი ყოველთვიური საფასური, რომელიც დამოკიდებულია იმაზე, რამდენი გვერდი გჭირდებათ და რამდენად ხშირად იცვლება. ამ გვერდზე ფასების ცხრილი განზრახ არ არის: ერთგვერდიანი საიტი სტომატოლოგისთვის და ათგვერდიანი კატალოგი დისტრიბუტორისთვის ერთი და იგივე პროდუქტი არაა. გვითხარით, რას ყიდით, და ციფრს იმავე დღეს მიიღებთ. | Ничего вперёд и ежемесячная плата, которая зависит от количества страниц и от того, как часто всё меняется. Прайса на этой странице нет намеренно: одностраничник для стоматолога и десятистраничный каталог для дистрибьютора, это не один продукт. Расскажите, что продаёте, и получите цифру в тот же день. |
| `product.faq.q3` | If I stop paying, do I lose the site? | თუ გადახდას შევწყვეტ, საიტს დავკარგავ? | Если я перестану платить, я потеряю сайт? |
| `product.faq.a3` | You keep the domain and you keep the content, always. The hosting and the upkeep stop, because that is the thing you were paying for. We will hand you an export and we will not hold your business hostage. Leave with 30 days notice. | დომენი და შიგთავსი ყოველთვის თქვენი რჩება. ჩერდება ჰოსტინგი და მოვლა, რადგან სწორედ ამაში იხდიდით. ექსპორტს გადმოგცემთ და თქვენს ბიზნესს მძევლად არ ვიგდებთ. მიდიხართ 30 დღით ადრე გაფრთხილებით. | Домен и контент остаются вашими всегда. Останавливаются хостинг и обслуживание, потому что именно за них вы и платили. Мы отдадим выгрузку и не станем держать ваш бизнес в заложниках. Уходите, предупредив за 30 дней. |
| `product.faq.q4` | Do I own the site and the domain? | საიტი და დომენი ჩემია? | Сайт и домен мои? |
| `product.faq.a4` | The domain is registered in your name from day one, not ours. That is not a favour, it is the only honest way to do it, and an agency that registers your domain to itself is telling you something about how the relationship ends. | დომენი პირველივე დღიდან თქვენს სახელზეა რეგისტრირებული, არა ჩვენზე. ეს წყალობა კი არა, ერთადერთი პატიოსანი გზაა. სააგენტო, რომელიც თქვენს დომენს საკუთარ თავზე იწერს, გარკვეულ რამეს გეუბნებათ იმაზე, როგორ დამთავრდება ეს ურთიერთობა. | Домен регистрируется на вас с первого дня, а не на нас. Это не одолжение, это единственный честный способ. Агентство, которое записывает ваш домен на себя, кое-что сообщает вам о том, чем закончатся эти отношения. |
| `product.faq.q5` | Why pay you at all when Wix or ChatGPT will make me a site for free? | რატომ უნდა გადაგიხადოთ, როცა Wix-ი ან ChatGPT უფასოდ გამიკეთებს საიტს? | Зачем платить вам, если Wix или ChatGPT сделают сайт бесплатно? |
| `product.faq.a5` | The builder is free. Your forty hours are not. And a page that exists is not the same thing as a page that loads fast, gets found, and gets someone to actually book. You will spend three weekends on it, you will end up with something that takes four seconds to load on a phone, and in six months when your prices change you will not touch it. If you enjoy that work, genuinely, do it yourself and we will say so. | კონსტრუქტორი უფასოა. თქვენი ორმოცი საათი კი არა. და გვერდი, რომელიც არსებობს, სულაც არ ნიშნავს გვერდს, რომელიც სწრაფად იტვირთება, იძებნება და ჩაწერას იღებს. სამ შაბათ-კვირას დახარჯავთ, მიიღებთ რაღაცას, რაც ტელეფონზე ოთხ წამში იტვირთება, და ექვს თვეში, როცა ფასები შეგეცვლებათ, ხელს აღარ ახლებთ. თუ ეს საქმე მართლა გსიამოვნებთ, თავად გააკეთეთ და ჩვენც ასე გეტყვით. | Конструктор бесплатный. Ваши сорок часов нет. И страница, которая существует, это не то же самое, что страница, которая быстро грузится, находится и приводит к записи. Вы потратите три выходных, получите нечто, что открывается на телефоне четыре секунды, а через полгода, когда цены поменяются, вы к нему не притронетесь. Если эта работа вам искренне нравится, сделайте сами, и мы так и скажем. |
| `product.faq.q6` | How long does it take, really? | რამდენი ხანი სჭირდება სინამდვილეში? | Сколько это займёт на самом деле? |
| `product.faq.a6` | Ten working days from the call, and if we miss that the first month is free. We can go faster than that and we do not promise it, because a five day claim we hit half the time is worth less than a ten day claim we always hit. | ზარიდან 10 სამუშაო დღე, და თუ ვერ მოვასწარით, პირველი თვე უფასოა. უფრო სწრაფადაც შეგვიძლია, მაგრამ არ გპირდებით: ხუთდღიანი დაპირება, რომელსაც ნახევარ შემთხვევაში ვასრულებთ, ნაკლებად ღირს, ვიდრე ათდღიანი, რომელსაც ყოველთვის ვასრულებთ. | 10 рабочих дней от звонка, и если не успели, первый месяц бесплатно. Мы можем и быстрее, но не обещаем: обещание в пять дней, которое выполняется через раз, стоит меньше, чем обещание в десять, которое выполняется всегда. |
| `product.faq.q7` | My customers only write to me on Facebook and Viber. Why do I even need a site? | ჩემი კლიენტები მხოლოდ Facebook-ზე და Viber-ზე მწერენ. საიტი საერთოდ რისთვის მჭირდება? | Мои клиенты пишут только в Facebook и Viber. Зачем мне вообще сайт? |
| `product.faq.a7` | Because the ones who already know you write to you on Facebook. The ones who do not, search. A site is where a stranger checks whether you are real: your prices, your address, your work, your face. And when someone asks an assistant like ChatGPT to recommend a dentist in Vake, it reads pages. It cannot read your Facebook posts. | იმიტომ, რომ Facebook-ზე გწერენ ისინი, ვინც უკვე გიცნობთ. ვინც არ გიცნობთ, ეძებს. საიტი ის ადგილია, სადაც უცნობი ამოწმებს, ნამდვილი ხართ თუ არა: ფასები, მისამართი, ნამუშევარი, სახე. და როცა ვინმე ChatGPT-ს სთხოვს, ურჩიოს სტომატოლოგი ვაკეში, ის გვერდებს კითხულობს. თქვენს Facebook-პოსტებს ვერ წაიკითხავს. | Затем, что в Facebook вам пишут те, кто уже вас знает. Те, кто не знает, ищут. Сайт, это место, где незнакомый человек проверяет, настоящие ли вы: цены, адрес, работы, лицо. А когда кто-то просит ChatGPT посоветовать стоматолога в Ваке, он читает страницы. Ваши посты в Facebook он прочитать не может. |
| `product.faq.q8` | Will I show up on Google? And in ChatGPT? | გამოვჩნდები Google-ში? ChatGPT-ში? | Я появлюсь в Google? А в ChatGPT? |
| `product.faq.a8` | We will not promise you a Google ranking, and neither should anyone else. What we do is make the page technically readable: fast, structured, with the right markup, so a search engine and an assistant can both understand what you sell and who you are. Being citable is in our control. Being cited is not, and we are not going to pretend otherwise. | Google-ში პოზიციას არ გპირდებით და არც არავინ უნდა გპირდებოდეთ. ჩვენ იმას ვაკეთებთ, რომ გვერდი ტექნიკურად წასაკითხი იყოს: სწრაფი, სტრუქტურირებული, სწორი მონიშვნებით, რომ საძიებო სისტემამაც და ასისტენტმაც გაიგოს, რას ყიდით და ვინ ხართ. ციტირებადობა ჩვენს ხელშია. ციტირება არა, და ამის მოჩვენებას არ ვაპირებთ. | Позицию в Google мы не обещаем, и никто не должен. Мы делаем страницу технически читаемой: быстрой, структурированной, с правильной разметкой, чтобы и поисковик, и ассистент понимали, что вы продаёте и кто вы. Цитируемость в нашей власти. Цитирование нет, и притворяться мы не станем. |
| `product.faq.q9` | Who changes my prices? Do I pay each time? | ვინ მიცვლის ფასებს? ყოველ ჯერზე ვიხდი? | Кто меняет мои цены? Я плачу каждый раз? |
| `product.faq.a9` | We do, and no. You send a message, we change it. That is the monthly fee working. If you find yourself being invoiced for a price change, you are with the wrong agency. | ჩვენ ვცვლით და არა, არ იხდით. წერთ, ჩვენ ვცვლით. სწორედ ეს არის ყოველთვიური საფასურის მუშაობა. თუ ფასის შეცვლისთვის ცალკე ინვოისს გიგზავნიან, არასწორ სააგენტოსთან ხართ. | Меняем мы, и нет. Вы пишете, мы правим. Это и есть работа ежемесячной платы. Если вам выставляют счёт за смену цены, вы не в том агентстве. |
| `product.faq.q10` | Can I sell online? How do payments work with BOG and TBC? | შემიძლია ონლაინ გაყიდვა? როგორ მუშაობს გადახდები BOG-სა და TBC-სთან? | Можно продавать онлайн? Как работают платежи с BOG и TBC? |
| `product.faq.a10` | Yes, and we wire the payment provider you already bank with. It is more work than a brochure site, so it is priced differently, and we will tell you honestly whether your volume justifies a shop at all or whether an order form and a phone call will make you more money this year. | დიახ, და ვაერთებთ იმ საგადახდო სისტემას, რომელშიც უკვე გაქვთ ანგარიში. ეს უფრო მეტი სამუშაოა, ვიდრე უბრალო საიტი, ამიტომ სხვაგვარად ფასდება. და პატიოსნად გეტყვით, გამართლებს თუ არა თქვენი ბრუნვა მაღაზიას, თუ შეკვეთის ფორმა და ერთი ზარი წელს მეტ ფულს მოგიტანთ. | Да, и мы подключим ту платёжную систему, в которой у вас уже есть счёт. Это больше работы, чем обычный сайт, поэтому и стоит иначе. И мы честно скажем, оправдывает ли ваш оборот магазин, или форма заказа и один звонок принесут вам в этом году больше. |
| `product.faq.q11` | Will it work properly on a phone? | ტელეფონზე ნორმალურად იმუშავებს? | На телефоне будет нормально работать? |
| `product.faq.a11` | Most of your customers will never see the desktop version. So we build the phone view first and the desktop after, which is the reverse of how most Georgian sites are made and the reason so many of them feel broken in your hand. | თქვენი კლიენტების უმეტესობა დესკტოპ ვერსიას ვერასდროს ნახავს. ამიტომ ჯერ ტელეფონის ვერსიას ვაშენებთ და მერე დესკტოპს. ეს პირიქითაა იმისა, როგორც ქართული საიტების უმეტესობა კეთდება, და სწორედ ამიტომ იშლება ხოლმე ხელში. | Большинство ваших клиентов десктопную версию вообще не увидят. Поэтому мы сначала строим телефонную версию, а потом десктопную. Это обратный порядок по сравнению с тем, как делается большинство грузинских сайтов, и именно поэтому они так часто разваливаются в руке. |
| `product.faq.q12` | Can you write the Georgian text for me? I do not have time. | ქართულ ტექსტს თქვენ დამიწერთ? დრო არ მაქვს. | Вы напишете грузинский текст за меня? У меня нет времени. |
| `product.faq.a12` | Yes, that is step two and it is included. You will get a draft that sounds like a person, you will change the parts that are wrong about your business, and it will take you twenty minutes instead of three evenings. | დიახ, ეს მეორე ნაბიჯია და შედის ფასში. მიიღებთ დრაფტს, რომელიც ადამიანივით ჟღერს, შეასწორებთ იმას, რაც თქვენს ბიზნესზე არასწორია, და ეს ოცი წუთი დაგჭირდებათ და არა სამი საღამო. | Да, это второй шаг и он включён. Вы получите черновик, который звучит как человек, поправите то, что неверно про ваш бизнес, и это займёт двадцать минут, а не три вечера. |
| `product.faq.q13` | What happens if the site goes down or gets hacked? | რა მოხდება, თუ საიტი ჩავარდება ან გატეხავენ? | Что будет, если сайт упадёт или его взломают? |
| `product.faq.a13` | Backups run automatically and we are the ones who get woken up, not you. If it breaks, restoring it is our job and it is inside the fee. That is a boring answer, and boring is the whole product. | სარეზერვო ასლები ავტომატურად კეთდება და ღამით ჩვენ გვაღვიძებენ და არა თქვენ. თუ გაფუჭდა, აღდგენა ჩვენი საქმეა და საფასურში შედის. მოსაწყენი პასუხია და მოსაწყენობა სწორედ ის პროდუქტია, რასაც ყიდით. | Резервные копии делаются автоматически, и будят ночью нас, а не вас. Если сломалось, восстановить, это наша работа, и она входит в плату. Скучный ответ, и скучность здесь и есть продукт. |
| `product.faq.q14` | aiWEB, aiSTAFF, aiCALL. Which one do I need? | aiWEB, aiSTAFF, aiCALL. რომელი მჭირდება? | aiWEB, aiSTAFF, aiCALL. Что мне нужно? |
| `product.faq.a14` | aiWEB is the site: the build, the speed, being found, someone keeping it alive. The AI agent that chats to your customers on the site and on Messenger, Instagram and Viber is aiSTAFF.ge. The agent that phones them is aiCALL.ge. A site with nobody answering it is a leaflet, so most owners end up with two of the three, but start with what is bleeding. | aiWEB საიტია: აშენება, სიჩქარე, ხილვადობა და ის, ვინც მას ცოცხლად ინახავს. AI აგენტი, რომელიც კლიენტებს საიტზე, Messenger-ზე, Instagram-სა და Viber-ზე ესაუბრება, aiSTAFF.ge-ა. აგენტი, რომელიც მათ ურეკავს, aiCALL.ge-ა. საიტი, რომელსაც არავინ პასუხობს, ბუკლეტია, ამიტომ მფლობელები საბოლოოდ სამიდან ორს იღებენ. დაიწყეთ იქიდან, სადაც ყველაზე მეტად გტკივათ. | aiWEB, это сам сайт: сборка, скорость, находимость и тот, кто держит его живым. AI-агент, который общается с клиентами на сайте, в Messenger, Instagram и Viber, это aiSTAFF.ge. Агент, который им звонит, это aiCALL.ge. Сайт, на котором никто не отвечает, это листовка, поэтому владельцы обычно берут два из трёх. Начните с того, что кровоточит. |
| `product.cta.heading` | Nothing upfront. Tell us what you sell. | წინასწარი გადახდის გარეშე. გვითხარით, რას ყიდით. | Без предоплаты. Расскажите, что вы продаёте. |
| `product.cta.subtitle` | Leave your number. Twenty minutes on the phone and you will know what your site would cost, what it would say, and when it would be live. | დატოვეთ ნომერი. ოცი წუთი ტელეფონზე და გეცოდინებათ, რა დაგიჯდებათ საიტი, რას იტყვის და როდის გაეშვება. | Оставьте номер. Двадцать минут по телефону, и вы будете знать, сколько стоит ваш сайт, что на нём будет написано и когда он запустится. |
| `product.cta.phoneLabel` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `product.cta.phoneSubmit` | Call me | დამირეკეთ | Позвоните мне |
| `product.cta.phoneNote` | We call back within 24 hours | დაგირეკავთ 24 საათში | Перезвоним в течение 24 часов |
| `product.cta.orWrite` | Or write to us: | ან მოგვწერეთ: | Или напишите: |
| `product.wordmark.line` | The build is the cheap part. | აშენება იაფი ნაწილია. | Сборка, это дешёвая часть. |
| `product.build.eyebrow` | Watch one get built | ნახეთ, როგორ შენდება | Посмотрите, как собирается |
| `product.build.heading` | Type your business. Watch the site appear. | აკრიფეთ თქვენი ბიზნესი. უყურეთ, როგორ ჩნდება საიტი. | Наберите название бизнеса. Смотрите, как появляется сайт. |
| `product.build.subtitle` | This is not a video. It assembles in your browser, in about the time it takes to read this sentence. | ეს ვიდეო არაა. ის თქვენსავე ბრაუზერში იკრიბება, დაახლოებით იმ დროში, რაც ამ წინადადების წაკითხვას სჭირდება. | Это не видео. Он собирается в вашем же браузере, примерно за то время, что вы читаете эту фразу. |
| `product.build.namePlaceholder` | Your business name | თქვენი ბიზნესის სახელი | Название вашего бизнеса |
| `product.build.industryLabel` | What do you do? | რას საქმიანობთ? | Чем вы занимаетесь? |
| `product.build.buildBtn` | Build it | ააშენე | Собрать |
| `product.build.rebuild` | Build another | ააშენე სხვა | Собрать другой |
| `product.build.building` | Building... | შენდება... | Собираем... |
| `product.build.speedLabel` | Speed score | სიჩქარე | Скорость |
| `product.build.done` | Live. Now imagine this one is yours, and the price list is right, because someone changed it this morning. | გაშვებულია. ახლა წარმოიდგინეთ, რომ ეს თქვენია და ფასების სია სწორია, რადგან დღეს დილით ვიღაცამ შეცვალა. | Запущен. Теперь представьте, что он ваш и прайс на нём верный, потому что кто-то поправил его сегодня утром. |
| `product.build.i1` | Dental clinic | სტომატოლოგია | Стоматология |
| `product.build.i2` | Restaurant | რესტორანი | Ресторан |
| `product.build.i3` | Construction | მშენებლობა | Строительство |
| `product.build.i4` | Auto service | ავტოსერვისი | Автосервис |
| `product.build.i5` | Beauty salon | სილამაზის სალონი | Салон красоты |
| `product.build.i6` | Tour operator | ტურ-ოპერატორი | Турoператор |
| `product.build.nav1` | Services | სერვისები | Услуги |
| `product.build.nav2` | Prices | ფასები | Цены |
| `product.build.nav3` | Contact | კონტაქტი | Контакты |
| `product.build.cta` | Book now | ჩაწერა | Записаться |
| `product.build.h1_i1` | A dentist you will not dread | სტომატოლოგი, რომლისაც არ შეგეშინდებათ | Стоматолог, которого не страшно |
| `product.build.sub_i1` | Same-day appointments in Vake. Prices on the page, not after the chair. | ჩაწერა იმავე დღეს, ვაკეში. ფასები გვერდზეა და არა სავარძლის შემდეგ. | Запись в день обращения, Ваке. Цены на странице, а не после кресла. |
| `product.build.s1_i1` | Cleaning | წმენდა | Чистка |
| `product.build.s2_i1` | Implants | იმპლანტი | Импланты |
| `product.build.s3_i1` | Whitening | გათეთრება | Отбеливание |
| `product.build.h1_i2` | Dinner worth leaving the house for | ვახშამი, რომლისთვისაც ღირს სახლიდან გასვლა | Ужин, ради которого стоит выйти из дома |
| `product.build.sub_i2` | Georgian kitchen, open until midnight, and yes, we deliver. | ქართული სამზარეულო, ღიაა შუაღამემდე, და კი, მიგვაქვს. | Грузинская кухня, открыто до полуночи, и да, мы доставляем. |
| `product.build.s1_i2` | Menu | მენიუ | Меню |
| `product.build.s2_i2` | Delivery | მიწოდება | Доставка |
| `product.build.s3_i2` | Book a table | მაგიდის დაჯავშნა | Забронировать стол |
| `product.build.h1_i3` | Built to still be standing | აშენებული ისე, რომ იდგეს | Построено, чтобы стоять |
| `product.build.sub_i3` | Renovation and construction in Tbilisi. Fixed estimate before we start. | რემონტი და მშენებლობა თბილისში. ფიქსირებული ხარჯთაღრიცხვა დაწყებამდე. | Ремонт и строительство в Тбилиси. Фиксированная смета до начала работ. |
| `product.build.s1_i3` | Renovation | რემონტი | Ремонт |
| `product.build.s2_i3` | Estimate | ხარჯთაღრიცხვა | Смета |
| `product.build.s3_i3` | Our work | ჩვენი ნამუშევარი | Наши работы |
| `product.build.h1_i4` | Your car back the same day | მანქანა უკან, იმავე დღეს | Машина обратно в тот же день |
| `product.build.sub_i4` | Diagnostics, repair, tyres. We call before we spend your money. | დიაგნოსტიკა, შეკეთება, საბურავები. ვრეკავთ, სანამ თქვენს ფულს დავხარჯავთ. | Диагностика, ремонт, шины. Звоним, прежде чем тратить ваши деньги. |
| `product.build.s1_i4` | Diagnostics | დიაგნოსტიკა | Диагностика |
| `product.build.s2_i4` | Repair | შეკეთება | Ремонт |
| `product.build.s3_i4` | Tyres | საბურავები | Шины |
| `product.build.h1_i5` | Booked in thirty seconds | ჩაწერა ოცდაათ წამში | Запись за тридцать секунд |
| `product.build.sub_i5` | Hair, nails, brows. Pick your master, pick your hour. | თმა, ფრჩხილები, წარბები. აირჩიეთ ოსტატი, აირჩიეთ საათი. | Волосы, ногти, брови. Выберите мастера, выберите час. |
| `product.build.s1_i5` | Hair | თმა | Волосы |
| `product.build.s2_i5` | Nails | ფრჩხილები | Ногти |
| `product.build.s3_i5` | Brows | წარბები | Брови |
| `product.build.h1_i6` | See Georgia properly | ნახეთ საქართველო ისე, როგორც ღირს | Увидеть Грузию по-настоящему |
| `product.build.sub_i6` | Small groups, real guides, no bus of forty people. | მცირე ჯგუფები, ნამდვილი გიდები, არავითარი ორმოციანი ავტობუსი. | Малые группы, настоящие гиды, никакого автобуса на сорок человек. |
| `product.build.s1_i6` | Kazbegi | ყაზბეგი | Казбеги |
| `product.build.s2_i6` | Kakheti | კახეთი | Кахетия |
| `product.build.s3_i6` | Svaneti | სვანეთი | Сванетия |
| `product.speed.eyebrow` | Why speed is the whole argument | რატომ არის სიჩქარე მთელი არგუმენტი | Почему скорость, это весь аргумент |
| `product.speed.heading` | A tenth of a second is worth money. | წამის მეათედი ფულს ნიშნავს. | Одна десятая секунды стоит денег. |
| `product.speed.subtitle` | Not our number. Deloitte measured it with Google across 30 million sessions and 37 brands, and it is the only genuinely independent figure in this entire category. | ეს ჩვენი ციფრი არაა. Deloitte-მა ის Google-თან ერთად გაზომა 30 მილიონ სესიაზე და 37 ბრენდზე, და ეს ერთადერთი მართლაც დამოუკიდებელი ციფრია მთელ ამ სფეროში. | Это не наша цифра. Deloitte измерил её вместе с Google на 30 миллионах сессий и 37 брендах, и это единственная по-настоящему независимая цифра во всей этой отрасли. |
| `product.speed.quote` | A 0.1 second improvement in mobile site speed lifted retail conversions by 8.4% and average order value by 9.2%. | მობილურზე საიტის სიჩქარის 0,1 წამით გაუმჯობესებამ საცალო კონვერსია 8,4%-ით და საშუალო ჩეკი 9,2%-ით გაზარდა. | Улучшение скорости мобильного сайта на 0,1 секунды подняло конверсию в рознице на 8,4%, а средний чек на 9,2%. |
| `product.speed.source` | Deloitte with Google, Milliseconds Make Millions. Travel rose 10.1%, luxury 20.6%. | Deloitte Google-თან ერთად, Milliseconds Make Millions. ტურიზმში 10,1%, ლუქსში 20,6%. | Deloitte совместно с Google, Milliseconds Make Millions. В туризме 10,1%, в люксе 20,6%. |
| `product.speed.yours` | How slow does your site feel today? | რამდენად ნელი გეჩვენებათ თქვენი საიტი დღეს? | Насколько медленным кажется ваш сайт сегодня? |
| `product.speed.slow` | Painful | მტკივნეული | Мучительно |
| `product.speed.ok` | Fine | ნორმალური | Нормально |
| `product.speed.fast` | Instant | მყისიერი | Мгновенно |
| `product.speed.visitors` | Visitors a month | ვიზიტორი თვეში | Посетителей в месяц |
| `product.speed.ticket` | Average sale, GEL | საშუალო გაყიდვა, ლარი | Средняя продажа, лари |
| `product.speed.result` | At your numbers, the gap between a slow page and a fast one is worth about | თქვენს ციფრებზე, სხვაობა ნელ და სწრაფ გვერდს შორის დაახლოებით ღირს | На ваших цифрах разница между медленной и быстрой страницей стоит примерно |
| `product.speed.perMonth` | GEL a month | ლარი თვეში | лари в месяц |
| `product.speed.note` | Your traffic and your average sale, multiplied by the published Deloitte figure. We did not invent any part of this, and if your traffic is small the number will be small, which is also worth knowing before you spend anything. | თქვენი ტრაფიკი და თქვენი საშუალო გაყიდვა, გამრავლებული Deloitte-ის გამოქვეყნებულ ციფრზე. აქ არაფერი გამოგვიგონია. თუ ტრაფიკი მცირეა, ციფრიც მცირე გამოვა, და ესეც ღირს გაგება, სანამ რამეს დახარჯავთ. | Ваш трафик и ваша средняя продажа, умноженные на опубликованную цифру Deloitte. Мы здесь ничего не выдумали. Если трафик маленький, то и цифра выйдет маленькой, и это тоже стоит узнать до того, как что-то тратить. |
| `product.flip.eyebrow` | The arithmetic nobody shows you | არითმეტიკა, რომელსაც არავინ გიჩვენებთ | Арифметика, которую вам не показывают |
| `product.flip.heading` | Pay once, or pay monthly. Watch what happens next. | ერთხელ გადაიხადეთ, თუ ყოველთვიურად. ნახეთ, რა ხდება მერე. | Заплатить один раз или платить помесячно. Посмотрите, что будет дальше. |
| `product.flip.subtitle` | Two years, side by side. The bars are the work that gets done on your site after launch. | ორი წელი, გვერდიგვერდ. სვეტები ის სამუშაოა, რომელიც გაშვების შემდეგ კეთდება. | Два года, рядом. Столбики, это работа, которая делается уже после запуска. |
| `product.flip.once` | Pay once | ერთხელ | Один раз |
| `product.flip.monthly` | Pay monthly | ყოველთვიურად | Помесячно |
| `product.flip.onceLabel` | One payment, then silence | ერთი გადახდა, მერე სიჩუმე | Один платёж, потом тишина |
| `product.flip.monthlyLabel` | Nothing upfront, then someone who answers | წინასწარ არაფერი, მერე ადამიანი, რომელიც პასუხობს | Ничего вперёд, потом человек, который отвечает |
| `product.flip.launch` | Launch | გაშვება | Запуск |
| `product.flip.month` | Month | თვე | Месяц |
| `product.flip.onceEnd` | Everything stops here. The next change costs you a new invoice, or more likely it never happens. | აქ ყველაფერი ჩერდება. შემდეგი ცვლილება ახალი ინვოისი დაგიჯდებათ, ან, უფრო სავარაუდოდ, საერთოდ არ მოხდება. | Здесь всё останавливается. Следующее изменение обойдётся в новый счёт, а вероятнее, просто не произойдёт. |
| `product.flip.monthlyEnd` | Still current. Still fast. Still yours. | ისევ განახლებული. ისევ სწრაფი. ისევ თქვენი. | По-прежнему актуален. По-прежнему быстрый. По-прежнему ваш. |
| `product.flip.w1` | New page | ახალი გვერდი | Новая страница |
| `product.flip.w2` | Prices updated | ფასები განახლდა | Цены обновлены |
| `product.flip.w3` | Photos changed | ფოტოები შეიცვალა | Фотографии заменены |
| `product.flip.w4` | Form fixed | ფორმა გასწორდა | Форма починена |
| `product.flip.w5` | Speed tuned | სიჩქარე აეწყო | Скорость подтянута |
| `product.flip.w6` | SSL renewed | SSL განახლდა | SSL продлён |
| `product.flip.w7` | Backup restored | ბექაპი აღდგა | Бэкап восстановлен |
| `product.flip.w8` | New service added | ახალი სერვისი დაემატა | Добавлена услуга |
| `product.flip.note` | There is no price on this page. This is about the shape of the deal, not the size of it. | ამ გვერდზე ფასი არ არის. საუბარია გარიგების ფორმაზე და არა მის ზომაზე. | На этой странице нет цены. Речь о форме сделки, а не о её размере. |
| `product.proof.url` | yourclinic.ge | yourclinic.ge | yourclinic.ge |
| `product.proof.brand` | Your clinic | თქვენი კლინიკა | Ваша клиника |
| `product.proof.nav1` | Services | სერვისები | Услуги |
| `product.proof.nav2` | Prices | ფასები | Цены |
| `product.proof.h1` | A dentist you will not dread | სტომატოლოგი, რომლისაც არ შეგეშინდებათ | Стоматолог, которого не страшно |
| `product.proof.sub` | Same-day appointments. Prices on the page, not after the chair. | ჩაწერა იმავე დღეს. ფასები გვერდზეა და არა სავარძლის შემდეგ. | Запись в день обращения. Цены на странице, а не после кресла. |
| `product.proof.s1` | Cleaning | წმენდა | Чистка |
| `product.proof.s2` | Implants | იმპლანტი | Импланты |
| `product.proof.cta` | Book now | ჩაწერა | Записаться |
| `product.proof.speed` | Speed | სიჩქარე | Скорость |
