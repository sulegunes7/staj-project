# Run & Deployment Evidence

## 1. Amaç

Bu doküman, Staj Takip Sistemi projesinin geliştirme ortamında başarılı şekilde çalıştırıldığını ve frontend, backend ve veritabanı bileşenlerinin birlikte çalıştığını belgelemek amacıyla hazırlanmıştır.

---

## 2. Backend'in Çalıştırılması

Backend uygulaması Spring Boot ve Maven Wrapper kullanılarak çalıştırılmıştır.

Backend klasöründe kullanılan komut:

```powershell
.\mvnw.cmd spring-boot:run

Backend uygulaması aşağıdaki adres üzerinden çalışmaktadır:

http://localhost:8080

Spring Boot uygulamasının başarıyla başladığı ve Tomcat sunucusunun 8080 portunda çalıştığı doğrulanmıştır.

3. Backend Health Check

Backend uygulamasının çalıştığını doğrulamak için aşağıdaki endpoint kullanılmıştır:

GET http://localhost:8080/api/health

Response:

Backend is running

Bu sonuç backend uygulamasının başarılı şekilde çalıştığını göstermektedir.

4. Veritabanı

Backend uygulaması PostgreSQL veritabanına bağlanmaktadır.

Database bilgileri:

Bilgi	Değer
Host	localhost
Port	5432
Database	staj_db
Schema	public

PostgreSQL bağlantısının başarılı olduğu ve uygulamanın veritabanındaki veriler üzerinde CRUD işlemleri gerçekleştirebildiği doğrulanmıştır.

5. Frontend'in Çalıştırılması

Frontend uygulaması React ve Vite kullanılarak geliştirilmiştir.

Frontend klasöründe kullanılan komut:

npm run dev

Frontend uygulaması aşağıdaki adres üzerinden çalışmaktadır:

http://localhost:5173

Frontend uygulamasının başarılı şekilde açıldığı ve uygulama ekranlarının görüntülenebildiği doğrulanmıştır.

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

7. API Dokümantasyonu

Backend API endpoint'leri Swagger/OpenAPI arayüzü üzerinden görüntülenebilir ve test edilebilir durumdadır.

Kontrol edilen API grupları:

Projects
Weekly Reports
Work Items
Risks

Swagger arayüzünün backend API'lerini başarılı şekilde gösterdiği doğrulanmıştır.

8. Backend Build

Backend projesi Maven Wrapper kullanılarak build edilmiştir.

Kullanılan komut:

.\mvnw.cmd clean install

Build sonucu:

Tests run: 1
Failures: 0
Errors: 0
BUILD SUCCESS

Backend projesinin başarılı şekilde build edildiği ve mevcut otomatik testin başarılı olduğu doğrulanmıştır.

9. Genel Çalışma Durumu
Bileşen	Durum
PostgreSQL	Çalışıyor
Spring Boot Backend	Çalışıyor
REST API	Çalışıyor
React Frontend	Çalışıyor
Frontend - Backend Bağlantısı	Çalışıyor
Swagger/OpenAPI	Kullanılabilir
Maven Build	SUCCESS
Automated Test	PASS
10. Sonuç

Staj Takip Sistemi'nin frontend, backend ve database bileşenleri geliştirme ortamında birlikte çalışır durumdadır.

Backend Spring Boot üzerinde 8080 portunda, frontend React/Vite üzerinde 5173 portunda ve veritabanı PostgreSQL üzerinde çalışmaktadır.

Frontend ile backend arasındaki REST API iletişimi başarılı şekilde kurulmuş ve temel uygulama fonksiyonlarının çalıştığı doğrulanmıştır.

Backend projesinin Maven build sürecinden başarıyla geçtiği ve mevcut otomatik testlerin başarılı olduğu doğrulanmıştır.

Projenin mevcut MVP kapsamı çalışır durumdadır.
## 11. Day 16 Tekrar Çalıştırma ve Regression Evidence

Day 16 kapsamında backend ve frontend uygulamaları tekrar çalıştırılarak kritik fonksiyonların çalışırlığı kontrol edilmiştir.

### 11.1 Backend

Spring Boot backend uygulaması 8080 portunda başarılı şekilde çalıştırılmıştır.

Health endpoint kontrolü:

```text
GET /api/health

Response:
Backend is running
Temel API endpointleri tekrar kontrol edilmiştir:
GET /api/projects        → PASS
GET /api/weekly-reports  → PASS
GET /api/work-items      → PASS
GET /api/risks           → PASS
Validation kontrollerinde eksik zorunlu alanlarla gönderilen POST ve PUT isteklerinin 400 Bad Request döndürdüğü doğrulanmıştır.

11.2 Frontend

Frontend uygulaması tarayıcı üzerinden tekrar kontrol edilmiştir.

Kontrol edilen ekranlar:

Projects
Weekly Reports
Work Items
Risks
Dashboard

Form validation, listeleme, sayfa yenileme, filtreleme ve Dashboard veri gösterimi kontrol edilmiş ve kritik akışların çalıştığı doğrulanmıştır.

11.3 Genel Regression Sonucu

Day 16 tekrar çalıştırma ve regression kontrolleri sonucunda frontend, backend ve PostgreSQL arasındaki temel çalışma akışlarının devam ettiği doğrulanmıştır.

Durum: PASS

**Not:** Burada yeni bir `Maven Build` sonucu uydurmadık; zaten dosyada mevcut olan build kanıtını koruyoruz. Day 16'da gerçekten yaptığımız testleri ekliyoruz.

Bunu ekledikten sonra **“ekledim”** de. Sonra artık dokümantasyonun kod değişiklikleriyle birlikte Git'e kaydedilmesi kısmına geçeceğiz.