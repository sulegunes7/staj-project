# 20 Günlük Staj Retrospektifi

## 1. Genel Değerlendirme

Staj süreci boyunca Staj Takip Sistemi geliştirilerek analiz aşamasından çalışan MVP aşamasına kadar ilerlenmiştir. Projede frontend, backend ve veritabanı bileşenleri birlikte ele alınmış ve uygulamanın temel kullanıcı akışları çalışır hale getirilmiştir.

Geliştirme sürecinde görevler günlük olarak ele alınmış, yapılan çalışmalar Git üzerinden takip edilmiş ve proje dokümantasyonu geliştirme süreciyle birlikte güncellenmiştir.

## 2. Geliştirilenler

Staj süreci sonunda aşağıdaki temel bileşenler geliştirilmiştir:

- React ve Vite tabanlı web arayüzü
- Spring Boot tabanlı backend
- PostgreSQL veritabanı entegrasyonu
- REST API yapısı
- Projects yönetimi
- Weekly Reports yönetimi
- Work Items yönetimi
- Risks yönetimi
- Dashboard ekranı
- Form validation kontrolleri
- CRUD işlemleri
- Swagger/OpenAPI API dokümantasyonu
- Frontend-backend iletişimi
- CORS yapılandırması
- Git/GitHub tabanlı versiyon kontrolü
- README ve teknik dokümantasyon

## 3. Öğrenilenler

Staj sürecinde frontend ve backend teknolojilerinin birlikte kullanıldığı full stack bir uygulamanın geliştirme süreci hakkında deneyim kazanılmıştır.

Özellikle aşağıdaki konularda pratik deneyim elde edilmiştir:

- Spring Boot ile REST API geliştirme
- JPA/Hibernate ile veritabanı işlemleri
- PostgreSQL bağlantısı ve veri yönetimi
- React ile component ve sayfa yapısı oluşturma
- Vite ile frontend geliştirme ve build işlemleri
- Frontend üzerinden REST API tüketimi
- HTTP durum kodları ve API validation
- Swagger/OpenAPI ile API test ve dokümantasyonu
- CORS yapılandırması
- Maven ile Java projesi build ve test işlemleri
- Git ve GitHub ile versiyon kontrolü
- Teknik dokümantasyon hazırlama
- Regression ve smoke test süreçleri

## 4. Karşılaşılan Teknik Problemler ve Çözümleri

Geliştirme sürecinde çeşitli teknik problemlerle karşılaşılmış ve bu problemlerin çözümü uygulanarak proje ilerletilmiştir.

### Validation Problemleri

Bazı API isteklerinde zorunlu alanların eksik gönderilmesi durumunda uygun hata davranışının sağlanması üzerine çalışmalar yapılmıştır.

Backend controller'larında validation kontrolleri geliştirilerek geçersiz POST ve PUT isteklerinin `400 Bad Request` ile sonuçlanması sağlanmıştır.

### Frontend-Backend İletişimi

Frontend ile Spring Boot backend arasındaki iletişim sırasında localhost ortamında CORS yapılandırmasının doğru şekilde çalışması sağlanmıştır.

API istekleri frontend üzerinden tekrar test edilerek veri alışverişinin başarılı olduğu doğrulanmıştır.

### Port Kullanımı

Lokal geliştirme sırasında backend veya frontend portlarının kullanımda olması durumuyla karşılaşılmıştır. Bu durumda mevcut çalışan servis kontrol edilmiş ve frontend için Vite tarafından kullanılabilir farklı bir lokal port üzerinden uygulama çalıştırılmıştır.

### Build ve Test Kontrolleri

Backend tarafında Maven build ve test süreçleri çalıştırılmış, frontend tarafında ise production build işlemi gerçekleştirilmiştir. Bu kontroller sonucunda projenin build süreçlerinin başarılı olduğu doğrulanmıştır.

## 5. Test ve Doğrulama

Proje geliştirme sürecinde backend API'leri ve frontend ekranları farklı aşamalarda tekrar test edilmiştir.

Backend tarafında aşağıdaki endpointler kontrol edilmiştir:

- `GET /api/health`
- `GET /api/projects`
- `GET /api/weekly-reports`
- `GET /api/work-items`
- `GET /api/risks`

Frontend tarafında aşağıdaki ekranlar kontrol edilmiştir:

- Dashboard
- Projects
- Weekly Reports
- Work Items
- Risks

Ayrıca CRUD işlemleri, form validation, sayfa yenileme ve frontend-backend iletişimi kontrol edilmiştir.

Backend Maven testleri başarılı şekilde tamamlanmış ve frontend production build işlemi başarıyla gerçekleştirilmiştir.

## 6. Teknik ve Süreç Açısından Kazanımlar

Staj sürecinin önemli kazanımlarından biri, yalnızca kod yazmanın ötesinde bir yazılım projesinin analiz, geliştirme, test, dokümantasyon ve teslim aşamalarının birlikte ele alınması olmuştur.

Git commit geçmişinin düzenli tutulması, teknik kararların dokümante edilmesi ve test sonuçlarının kayıt altına alınması sayesinde geliştirilen uygulamanın takip edilebilirliği artırılmıştır.

Ayrıca frontend ve backend'in ayrı servisler olarak geliştirilmesi ve REST API üzerinden iletişim kurması full stack uygulama mimarisinin daha iyi anlaşılmasını sağlamıştır.

## 7. Gelecekte Yapılabilecek Geliştirmeler

Mevcut MVP'nin geliştirilmesi için ilerleyen aşamalarda aşağıdaki özellikler eklenebilir:

- Kullanıcı authentication ve authorization sistemi
- Rol bazlı kullanıcı yetkilendirme
- Daha gelişmiş Dashboard ve istatistikler
- Daha kapsamlı filtreleme ve arama
- Dosya ve belge yönetimi
- Bildirim sistemi
- Daha kapsamlı otomatik testler
- Merkezi hata yönetimi
- Database migration sistemi
- Production deployment
- Containerization ve Docker desteği
- CI/CD pipeline
- Production ortamına uygun environment yönetimi

Bu özellikler mevcut MVP kapsamının dışında tutulmuş olup gelecekteki geliştirme aşamalarında değerlendirilebilir.

## 8. Sonuç

20 günlük staj süreci sonunda Staj Takip Sistemi'nin temel fonksiyonlarını içeren çalışan bir MVP ortaya çıkarılmıştır.

Frontend, backend ve PostgreSQL bileşenleri birlikte çalışır hale getirilmiş; REST API iletişimi, CRUD işlemleri, validation, test ve dokümantasyon süreçleri tamamlanmıştır.

Proje aynı zamanda Git/GitHub üzerinden versiyon kontrolü altında tutulmuş ve README, test sonuçları, çalıştırma kanıtları ve teknik karar dokümanları hazırlanmıştır.

Staj süreci sonucunda full stack web uygulaması geliştirme, API tasarımı, veritabanı entegrasyonu, frontend-backend iletişimi, test ve teknik dokümantasyon konularında uygulamalı deneyim kazanılmıştır.