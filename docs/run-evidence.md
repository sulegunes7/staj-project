# Run & Deployment Evidence

## 1. Amaç

Bu doküman, Staj Takip Sistemi projesinin geliştirme ortamında başarılı şekilde çalıştırıldığını ve frontend, backend ve veritabanı bileşenlerinin birlikte çalıştığını belgelemek amacıyla hazırlanmıştır.

---

## 2. Backend'in Çalıştırılması

Backend uygulaması Spring Boot ve Maven Wrapper kullanılarak çalıştırılmıştır.

Backend klasöründe kullanılan komut:

```powershell
.\mvnw.cmd spring-boot:run
```
```
Backend uygulaması aşağıdaki adres üzerinden çalışmaktadır:
http://localhost:8080
Spring Boot uygulamasının başarıyla başladığı ve Tomcat sunucusunun 8080 portunda çalıştığı doğrulanmıştır.
```
3. Backend Health Check
Backend uygulamasının çalıştığını doğrulamak için aşağıdaki endpoint kullanılmıştır:
GET http://localhost:8080/api/health

Response:
Backend is running

Bu sonuç backend uygulamasının başarılı şekilde çalıştığını göstermektedir.
```
```
4. Veritabanı
Backend uygulaması PostgreSQL veritabanına bağlanmaktadır.
Database bilgileri:
Bilgi	Değer
Host	localhost
Port	5432
Database	staj_db
Schema	public


PostgreSQL bağlantısının başarılı olduğu ve uygulamanın veritabanındaki veriler üzerinde CRUD işlemleri gerçekleştirebildiği doğrulanmıştır.

```
```
5. Frontend'in Çalıştırılması
Frontend uygulaması React ve Vite kullanılarak geliştirilmiştir.
Frontend klasöründe kullanılan komut:
npm run dev

Frontend uygulaması aşağıdaki adres üzerinden çalışmaktadır:
http://localhost:5175/
Frontend uygulamasının başarılı şekilde açıldığı ve uygulama ekranlarının görüntülenebildiği doğrulanmıştır.
Not: 5173 ve 5174 portlarının kullanımda olması nedeniyle Vite geliştirme sunucusu 5175 portunu kullanmaktadır.
```
```
6. Frontend - Backend Bağlantısı
Frontend ve backend arasındaki iletişim REST API üzerinden gerçekleştirilmektedir.
React + Vite
     |
     | HTTP Request
     v
Spring Boot REST API
     |
     v
PostgreSQL

Frontend tarafından backend API'lerine yapılan isteklerin başarılı şekilde çalıştığı doğrulanmıştır.
CORS yapılandırması ile localhost üzerindeki frontend uygulamasının backend API'lerine erişimi sağlanmıştır.
```
```
7. API Dokümantasyonu
Backend API endpoint'leri Swagger/OpenAPI arayüzü üzerinden görüntülenebilir ve test edilebilir durumdadır.
Kontrol edilen API grupları:
- Projects
- Weekly Reports
- Work Items
- Risks
Swagger arayüzünün backend API'lerini başarılı şekilde gösterdiği doğrulanmıştır.
```
```
8. Backend Test
Backend projesi Maven Wrapper kullanılarak test edilmiştir.
Kullanılan komut:
.\mvnw.cmd test

Test sonucu:
Tests run: 1
Failures: 0
Errors: 0
Skipped: 0
BUILD SUCCESS

Backend projesinin mevcut otomatik testlerden başarıyla geçtiği doğrulanmıştır.
```
```
9. Frontend Production Build
Frontend projesinin production build işlemi gerçekleştirilmiştir.
Kullanılan komut:
npm run build

Build işlemi başarıyla tamamlanmıştır.
Vite production build çıktısı başarıyla oluşturulmuştur.
✓ built successfully

Bu sonuç frontend projesinin production build aşamasından başarıyla geçtiğini göstermektedir.
```
```
10. Authentication ve Authorization Evidence
Day 24–28 kapsamında authentication ve role-based authorization kontrolleri gerçekleştirilmiştir.
10.1 Kimlik Doğrulama
Kimlik bilgisi olmadan Work Items API'sine yapılan istek:
GET /api/work-items
→ 401 Unauthorized

Kimlik doğrulaması yapılmış USER kullanıcısı:
GET /api/work-items
→ 200 OK

10.2 USER Yetki Kontrolü
USER rolü ile Work Item oluşturma isteği:
POST /api/work-items
→ 403 Forbidden

USER rolünün yalnızca görüntüleme yetkisine sahip olduğu doğrulanmıştır.
10.3 ADMIN Yetki Kontrolü
ADMIN rolü ile Work Items API'sine erişim:
GET /api/work-items
→ 200 OK

ADMIN rolü ile Work Item oluşturma:
POST /api/work-items
→ 200 OK

ADMIN rolü ile test kaydının silinmesi:
DELETE /api/work-items/{id}
→ 200 OK

Test amacıyla oluşturulan geçici kayıt daha sonra silinmiştir.
```
```
11. Frontend Role-Based UI Evidence
Frontend üzerinde role-based görünürlük kontrolleri gerçekleştirilmiştir.
USER
USER hesabı ile:
- Work Items listesi görüntülenebilmektedir.
- Filtreler görüntülenebilmektedir.
- Yeni Work Item oluşturma alanı görüntülenmemektedir.
- Edit butonu görüntülenmemektedir.
- Delete butonu görüntülenmemektedir.
ADMIN
ADMIN hesabı ile:
- Work Items listesi görüntülenebilmektedir.
- Filtreler görüntülenebilmektedir.
- Yeni Work Item oluşturma alanı görüntülenmektedir.
- Edit butonu görüntülenmektedir.
- Delete butonu görüntülenmektedir.
Frontend görünürlüğü ile backend authorization kurallarının birlikte çalıştığı doğrulanmıştır.
```
```
12. Session Guard Evidence
Frontend session kontrolü de test edilmiştir.
Authentication bilgileri sessionStorage üzerinden kaldırıldıktan sonra sayfa yenilenmiştir.
Sonuç:
Login ekranı görüntülendi.

Bu sonuç, authentication bilgisi bulunmadığında uygulamanın korumalı ana ekranlara erişimi engellediğini göstermektedir.
```
```
13. API ve Regression Evidence
Aşağıdaki temel API endpointleri tekrar kontrol edilmiştir:
GET /api/health
GET /api/projects
GET /api/weekly-reports
GET /api/work-items
GET /api/risks

Temel endpointlerin çalışmaya devam ettiği doğrulanmıştır.
Frontend üzerinde aşağıdaki ekranlar kontrol edilmiştir:
- Dashboard
- Projects
- Weekly Reports
- Work Items
- Risks
Frontend-backend iletişiminin çalışmaya devam ettiği ve mevcut verilerin ilgili ekranlarda görüntülenebildiği doğrulanmıştır.
```
```
14. Genel Çalışma Durumu
Bileşen	Durum
PostgreSQL	Çalışıyor
Spring Boot Backend	Çalışıyor
REST API	Çalışıyor
React Frontend	Çalışıyor
Frontend - Backend Bağlantısı	Çalışıyor
Swagger/OpenAPI	Kullanılabilir
Maven Test	PASS
Frontend Production Build	PASS
Authentication	PASS
Role-Based Authorization	PASS
Frontend Role-Based UI	PASS
Session Guard	PASS
```
```
15. Day 29 – Interim Delivery Validation
Day 29 kapsamında ara teslim öncesi backend, frontend, veritabanı ve build süreçleri tekrar kontrol edilmiştir.
Backend
Backend testleri başarıyla tamamlanmıştır:
.\mvnw.cmd test

Sonuç:
Tests run: 1
Failures: 0
Errors: 0
Skipped: 0
BUILD SUCCESS

Backend'in PostgreSQL veritabanına başarıyla bağlandığı doğrulanmıştır.
API
Kimlik doğrulaması yapılmış USER hesabı ile:
GET /api/work-items
→ 200 OK

sonucu alınmıştır.
Frontend
Frontend production build işlemi başarıyla tamamlanmıştır:
npm run build

Build işlemi başarıyla tamamlanmıştır.
Demo Ortamı
Frontend:
http://localhost:5175/

Backend:
http://localhost:8080

PostgreSQL:
localhost:5432/staj_db

üzerinde çalışmaktadır.
16. Genel Sonuç
Staj Takip Sistemi'nin frontend, backend ve database bileşenleri geliştirme ortamında birlikte çalışır durumdadır.
Backend Spring Boot üzerinde 8080 portunda, frontend React/Vite üzerinde 5175 portunda ve veritabanı PostgreSQL üzerinde çalışmaktadır.
Frontend ile backend arasındaki REST API iletişimi başarılı şekilde kurulmuş ve temel uygulama fonksiyonlarının çalıştığı doğrulanmıştır.
Authentication ve role-based authorization kontrolleri gerçekleştirilmiş; USER ve ADMIN rollerinin farklı yetki seviyelerinde çalıştığı doğrulanmıştır.
Frontend üzerinde role-based ekran ve aksiyon görünürlüğü test edilmiş, backend tarafındaki 401/403 yetki kontrolleri doğrulanmıştır.
Backend Maven testleri başarıyla tamamlanmış ve frontend production build işlemi başarıyla gerçekleştirilmiştir.
Projenin mevcut MVP kapsamı çalışır durumdadır.
Not: Production ortamına gerçek bir deployment yapılmamıştır. Bu dokümandaki doğrulamalar lokal geliştirme ve demo ortamında gerçekleştirilmiştir.


