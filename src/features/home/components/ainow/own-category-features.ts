type Locale = "ka" | "en" | "ru";
type Feature = { name: string; description: string };

const copy: Record<Locale, Record<string, Feature>> = {
  ka: {
    aichats: { name: "მოკლე ბრიფი", description: "განსაზღვრეთ საიტის მიზანი და მომხმარებლის პირველი მოქმედება." },
    aicall: { name: "მთავარი მოქმედება", description: "მთავარი CTA და მომხმარებლის გზა წინასწარ იწერება." },
    aicontent: { name: "გვერდები", description: "საჭირო გვერდები და მათი როლი შეთანხმებულ სტრუქტურად ლაგდება." },
    aiads: { name: "კონტენტი", description: "ტექსტი და ვიზუალი საიტის ამოცანას უნდა ემსახურებოდეს." },
    aimusic: { name: "ვიზუალი", description: "ვიზუალური მიმართულება ბრენდისა და გვერდის მიზანს ერგება." },
    aistaff: { name: "შემოწმება", description: "გვერდი ადამიანური შემოწმებით მზადდება გასაშვებად." },
    aibrain: { name: "მობილური შემოწმება", description: "მობილურზე განლაგება და ძირითადი გზა ცალკე მოწმდება." },
    aioffice: { name: "ფორმები", description: "ფორმის ველები და შემდგომი ნაბიჯი პროცესს ეთანხმება." },
    aidocs: { name: "გაშვების შემოწმება", description: "მეტამონაცემები, ბმულები და ტექსტი გაშვებამდე მოწმდება." },
    aiweb: { name: "მხარდაჭერა", description: "შემდგომი ცვლილებებისა და მოვლის ფარგლები წინასწარ იწერება." },
    aiapp: { name: "სარეზერვო გზა", description: "სარეზერვო და აღდგენის მოლოდინი ცალკე თანხმდება." },
    vibecoding: { name: "მცირე ცვლილებები", description: "შემდეგი ცვლილება შეთანხმებული პროექტის ფარგლებში კეთდება." },
  },
  en: {
    aichats: { name: "Brief", description: "Define the site goal and first user action." },
    aicall: { name: "Primary action", description: "Write the main CTA and user path first." },
    aicontent: { name: "Pages", description: "Arrange required pages around their agreed role." },
    aiads: { name: "Content", description: "Keep text and visual content tied to the site goal." },
    aimusic: { name: "Visuals", description: "Fit the visual direction to brand and page purpose." },
    aistaff: { name: "Review", description: "Keep human review in the release path." },
    aibrain: { name: "Mobile check", description: "Check mobile layout and the primary path separately." },
    aioffice: { name: "Forms", description: "Align form fields with the next agreed step." },
    aidocs: { name: "Launch checks", description: "Check metadata, links and copy before release." },
    aiweb: { name: "Care", description: "Define the scope for later changes and maintenance." },
    aiapp: { name: "Backups", description: "Agree backup and recovery expectations separately." },
    vibecoding: { name: "Small changes", description: "Keep the next change inside the agreed project scope." },
  },
  ru: {
    aichats: { name: "Бриф", description: "Определите цель сайта и первое действие пользователя." },
    aicall: { name: "Главное действие", description: "Сначала опишите основной CTA и путь пользователя." },
    aicontent: { name: "Страницы", description: "Разложите нужные страницы по согласованным ролям." },
    aiads: { name: "Контент", description: "Свяжите текст и визуал с целью сайта." },
    aimusic: { name: "Визуал", description: "Визуальное направление следует бренду и цели страницы." },
    aistaff: { name: "Проверка", description: "Человеческая проверка остаётся частью пути к запуску." },
    aibrain: { name: "Мобильная проверка", description: "Отдельно проверьте мобильную версию и основной путь." },
    aioffice: { name: "Формы", description: "Поля формы связываются со следующим согласованным шагом." },
    aidocs: { name: "Проверка запуска", description: "До запуска проверьте метаданные, ссылки и текст." },
    aiweb: { name: "Поддержка", description: "Заранее определите объём дальнейших изменений и поддержки." },
    aiapp: { name: "Резервные копии", description: "Отдельно согласуйте ожидания по резервированию и восстановлению." },
    vibecoding: { name: "Небольшие изменения", description: "Следующее изменение остаётся в рамках согласованного проекта." },
  },
};

export function getOwnCategoryFeatures(locale: string): Record<string, Feature> {
  return copy[locale === "ka" || locale === "ru" ? locale : "en"];
}
