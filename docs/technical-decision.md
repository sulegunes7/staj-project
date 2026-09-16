# Technical Decision Note

## 1. Amaç

Bu doküman, Staj Takip Sistemi projesinin Full Stack geliştirme sürecinde kullanılan temel teknolojileri, frontend yaklaşımını, API entegrasyon biçimini, backend mimarisini, veritabanı yapısını ve repository organizasyonunu açıklamak amacıyla hazırlanmıştır.

Teknik seçimlerde projenin gereksinimleri, mevcut Java bilgisi, React öğrenme süreci, geliştirme süresi, sürdürülebilirlik ve projenin çalıştırılabilir olması dikkate alınmıştır.

---

## 2. Geliştirme Yönü

Proje **Full Stack Web Application** olarak geliştirilmiştir.

Sistem iki ana uygulama katmanından oluşmaktadır:

- Frontend: React + Vite
- Backend: Java 17 + Spring Boot
- Database: PostgreSQL

Frontend ve backend arasındaki iletişim REST API üzerinden gerçekleştirilmektedir.

Genel mimari:

```text
React Frontend
      |
      | HTTP Request / Response
      v
Spring Boot REST API
      |
      v
Spring Data JPA / Hibernate
      |
      v
PostgreSQL Database
3. Frontend Teknoloji Kararı
3.1 React

Frontend geliştirme için React kullanılmıştır.

React tercih edilmesinin nedenleri:

Component tabanlı geliştirme yapısına sahip olması
Modern web uygulamalarında yaygın olarak kullanılması
REST API'lerle kolay şekilde entegre edilebilmesi
Ekranların yeniden kullanılabilir componentler ile oluşturulabilmesi
Projenin React öğrenme hedefiyle uyumlu olması

React konusunda başlangıçta sınırlı deneyim bulunduğundan geliştirme sürecinde component, state, form yönetimi, API entegrasyonu ve kullanıcı arayüzü konuları doğrudan proje üzerinde uygulanmıştır.

3.2 Vite

React frontend projesinin geliştirme ve build işlemleri için Vite kullanılmıştır.

Vite ile:

Development server çalıştırılmıştır.
Frontend production build işlemi gerçekleştirilmiştir.
npm run dev ile geliştirme ortamı başlatılmıştır.
npm run build ile production çıktısı oluşturulmuştur.
4. Routing Kararı

Frontend içerisinde farklı işlevler için ayrı ekranlar oluşturulmuştur.

Mevcut temel ekranlar:

Dashboard
Projects
Weekly Reports
Work Items
Risks

Projenin mevcut sürümünde authentication ve role-based protected route sistemi bulunmamaktadır.

Bu nedenle /login, /admin/users veya protected route gibi yapılar mevcut uygulamanın aktif özellikleri olarak değerlendirilmemektedir.

5. State Management Kararı

İlk geliştirme aşamasında ayrı bir global state management kütüphanesi kullanılmamıştır.

Component seviyesindeki durumların yönetimi için React'in:

useState
useEffect

hook'larından yararlanılmıştır.

API'den alınan proje, haftalık rapor, iş ve risk verileri ilgili componentlerin state'lerinde tutulmaktadır.

Projenin mevcut kapsamı için Redux gibi daha kapsamlı bir state management çözümüne ihtiyaç duyulmamıştır.

6. UI Yaklaşımı

Frontend arayüzü component tabanlı olarak geliştirilmiştir.

Temel UI yaklaşımı:

Yeniden kullanılabilir componentler
Form yapıları
Listeleme ve tablo yapıları
Dashboard kartları
Loading durumları
Empty state'ler
Error durumları
Form validation mesajları

Arayüzün temel amacı sade, anlaşılır ve staj takip işlemlerinin kolay şekilde gerçekleştirilebilmesini sağlamaktır.

Dashboard ekranında proje, haftalık rapor, work item ve risk bilgileri özetlenerek kullanıcıya genel durum görüntüsü sunulmaktadır.

7. API Entegrasyon Kararı

Frontend ile backend arasındaki iletişim REST API üzerinden gerçekleştirilmektedir.

Frontend tarafından backend'e HTTP istekleri gönderilmekte ve dönen JSON response verileri React componentlerinde gösterilmektedir.

Örnek akış:

React Component
      |
      | HTTP GET / POST / PUT / DELETE
      v
Spring Boot REST Controller
      |
      v
Service
      |
      v
Repository
      |
      v
PostgreSQL

API iletişiminde frontend tarafında tarayıcının native fetch API'si kullanılmıştır.

Mevcut sistemde kullanılan temel HTTP işlemleri:

GET
POST
PUT
DELETE
8. Backend Teknoloji Kararı

Backend geliştirme için Java 17 + Spring Boot kullanılmıştır.

Java tercih edilmesinin temel nedeni mevcut Java bilgisi ve backend geliştirme sürecine hızlı şekilde başlanabilmesidir.

Spring Boot ile aşağıdaki backend ihtiyaçları gerçekleştirilmiştir:

REST API
Validation
Business logic
Database access
CRUD işlemleri
API documentation
8.1 Katmanlı Mimari

Backend tarafında katmanlı mimari yaklaşımı kullanılmıştır.

Temel katmanlar:

Controller: HTTP isteklerini karşılar ve API endpointlerini yönetir.
Service: Uygulama mantığını ve iş kurallarını yönetir.
Repository: Veritabanı erişimini yönetir.
Entity / Model: Sistemdeki veri yapılarını temsil eder.

Bu yapı sorumlulukların birbirinden ayrılmasını ve backend kodunun daha düzenli olmasını sağlamaktadır.

9. Veritabanı Kararı

İlişkisel verilerin yönetilmesi gerektiği için PostgreSQL kullanılmıştır.

Geliştirme ortamındaki veritabanı:

Database: staj_db
Schema: public
Host: localhost
Port: 5432

Projede temel olarak aşağıdaki veri yapıları kullanılmaktadır:

Project
WeeklyReport
WorkItem
Risk

Projenin mevcut sürümünde kullanıcı ve rol tabanlı authentication sistemi bulunmamaktadır.

9.1 JPA / Hibernate

Backend tarafında veritabanı işlemleri için Spring Data JPA / Hibernate kullanılmıştır.

Entity sınıfları ile PostgreSQL tabloları arasında ORM yaklaşımı kullanılarak veri erişimi sağlanmıştır.

10. Backend - Frontend Entegrasyon Sözleşmesi

Frontend ve backend arasında REST API tabanlı bir entegrasyon yapısı oluşturulmuştur.

API endpointlerinde aşağıdaki bilgiler dikkate alınmıştır:

HTTP method
Endpoint
Request body
Path parameter
Response body
HTTP status code
Validation

Örnek proje endpointleri:

GET    /api/projects
POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}

Benzer CRUD yapıları haftalık rapor, work item ve risk kaynakları için de uygulanmıştır.

Validation kontrollerinde geçersiz veya eksik veriler için HTTP 400 Bad Request response'u kullanılmaktadır.

Örneğin boş proje adı ile gönderilen bir POST isteği başarılı şekilde oluşturulmak yerine 400 Bad Request döndürmektedir.

11. API Documentation

Backend API'lerinin incelenebilmesi ve test edilebilmesi için Swagger / OpenAPI kullanılmıştır.

Swagger arayüzü:

http://localhost:8080/swagger-ui/index.html

Swagger üzerinden mevcut API endpointleri incelenebilmekte ve uygun endpointler için istekler gönderilebilmektedir.

12. CORS Kararı

Frontend ve backend farklı development server portlarında çalışabildiği için backend tarafında CORS yapılandırması kullanılmıştır.

Bu yapı frontend tarafından gönderilen HTTP isteklerinin backend API'lerine ulaşabilmesini sağlamaktadır.

Development ortamında frontend ve backend localhost üzerinde çalıştırılmaktadır.

13. Repository Yapısı

Proje tek bir Git repository içerisinde yönetilmektedir.

Mevcut yapı:

staj-projem/
│
├── backend/
│   └── Spring Boot application
│
├── frontend/
│   └── React + Vite application
│
├── docs/
│   ├── analysis-v1.md
│   ├── README.md
│   ├── run-evidence.md
│   ├── technical-decision.md
│   └── test-report.md
│
├── README.md
└── .gitignore

Backend ve frontend ayrı klasörlerde tutulmakta ancak aynı Git repository üzerinden yönetilmektedir.

Bu yapı Full Stack geliştirme sürecinde iki uygulama katmanının birlikte takip edilmesini kolaylaştırmaktadır.

14. Git Kullanım Yaklaşımı

Git, geliştirme sürecindeki değişiklikleri takip etmek ve proje geçmişini korumak amacıyla kullanılmıştır.

Commit mesajlarında yapılan değişikliğin açıkça ifade edilmesine dikkat edilmiştir.

Örnek commitler:

docs: add initial project analysis
docs: add technical decisions
feat: create project entity
feat: add weekly report API
feat: create project dashboard
fix: validate weekly report fields

Proje GitHub üzerinde main branch üzerinden takip edilmektedir.

15. Ortam Değişkenleri

Backend veritabanı bağlantısında veritabanı şifresi environment variable üzerinden alınmaktadır.

Kullanılan değişken:

DB_PASSWORD

PowerShell örneği:

$env:DB_PASSWORD="your_password"

Bu yaklaşım ile veritabanı şifresinin kaynak kod içerisinde doğrudan tutulmasının önüne geçilmiştir.

Frontend tarafında API bağlantısı development ortamında localhost backend adresi üzerinden gerçekleştirilmektedir.

16. Veritabanı Migration ve Seed Yaklaşımı

Projenin mevcut sürümünde Flyway veya Liquibase gibi ayrı bir migration aracı kullanılmamaktadır.

Hibernate yapılandırmasında:

spring.jpa.hibernate.ddl-auto=update

kullanılmıştır.

Bu nedenle development ortamında entity yapısındaki değişikliklerin veritabanına yansıtılması Hibernate tarafından yönetilmektedir.

Ayrıca projede otomatik çalışan ayrı bir seed mekanizması bulunmamaktadır.

Test ve demo verileri development veritabanında oluşturulmuş ve API/frontend testlerinde kullanılmıştır.

17. Örnek Veri

Development ve test sürecinde aşağıdaki örnek veriler kullanılmıştır.

Örnek proje:

Name:
Staj Projesi Guncel 2

Description:
Full Stack proje gelistiriliyor

Örnek haftalık raporlar:

Week 1
Week 2
Week 3

Örnek work item:

Title:
Frontend geliştirmeleri

Responsible:
Berrin

Status:
IN_PROGRESS

Örnek risk:

Title:
API bağlantısında gecikme

Status:
Açık

Responsible:
Berrin
18. Test Yaklaşımı

Backend tarafında Maven testleri ve manuel API testleri gerçekleştirilmiştir.

Backend build/test komutu:

.\mvnw.cmd clean install

Frontend production build komutu:

npm run build

Ayrıca Swagger ve REST API endpointleri üzerinden manuel testler gerçekleştirilmiştir.

Frontend tarafında kritik CRUD senaryoları ve Dashboard ekranı tekrar test edilmiştir.

Day 16 kapsamında validation ve hata düzeltme testleri gerçekleştirilmiş, Day 17 kapsamında regression testleri uygulanmıştır.

Test sonuçları:

docs/test-report.md
docs/run-evidence.md

dosyalarında belgelenmiştir.

19. Öğrenme ve Geliştirme Stratejisi

Projenin başlangıcında Java bilgisi backend geliştirme için kullanılmış, React konusunda ise proje geliştirme süreciyle birlikte öğrenme gerçekleştirilmiştir.

Öğrenilen konular doğrudan proje üzerinde uygulanmıştır.

Örneğin:

React Component öğren
        ↓
Sayfa/component oluştur
        ↓
useState / useEffect öğren
        ↓
API çağrısını frontend'e bağla
        ↓
API verisini ekranda göster
        ↓
CRUD işlemlerini uygula

Bu yöntem ile teorik öğrenmenin gerçek bir proje üzerinde uygulanması hedeflenmiştir.

20. Mevcut Teknik Kapsam ve Eksikler

Projenin mevcut sürümünde aşağıdaki özellikler bulunmaktadır:

React frontend
Vite development/build ortamı
Java 17
Spring Boot
Spring Data JPA / Hibernate
PostgreSQL
REST API
Swagger / OpenAPI
CRUD işlemleri
Validation
Dashboard
Projects ekranı
Weekly Reports ekranı
Work Items ekranı
Risks ekranı
Git / GitHub
Test ve regression dokümantasyonu

Mevcut sürümde bulunmayan veya geliştirme kapsamına alınmayan konular:

Authentication
Authorization / role-based access control
Production deployment
Otomatik database migration sistemi
Otomatik seed sistemi
Gelişmiş kullanıcı yönetimi

Bu konular projenin mevcut staj kapsamının dışında bırakılmış veya sonraki geliştirme aşamalarına bırakılmıştır.

21. Teknik Kararların Özeti
Alan	Karar
Geliştirme yönü	Full Stack Web
Frontend	React + Vite
State Management	React Hooks
API iletişimi	REST API
HTTP client	Native fetch
Backend	Java 17 + Spring Boot
ORM	Spring Data JPA / Hibernate
Veritabanı	PostgreSQL
API Documentation	Swagger / OpenAPI
Repository	Tek Git repository
Frontend / Backend yapısı	Ayrı klasörler
UI yaklaşımı	Component tabanlı
Validation	Backend + Frontend
Authentication	Mevcut sürümde yok
Authorization	Mevcut sürümde yok
Database migration	Ayrı migration aracı yok
Seed	Otomatik seed mekanizması yok
22. Sonuç

Proje için başlangıçta belirlenen Full Stack geliştirme yaklaşımı uygulanmış ve frontend, backend ve veritabanı katmanları birlikte çalışır hale getirilmiştir.

React + Vite frontend, Java 17 + Spring Boot backend ve PostgreSQL veritabanı kullanılarak temel staj takip işlemleri gerçekleştirilmiştir.

REST API entegrasyonu, CRUD işlemleri, validation, Swagger/OpenAPI, test ve regression süreçleri uygulanmış ve ilgili dokümanlarda kayıt altına alınmıştır.

Teknik kararlar geliştirme sürecinde projenin gerçek ihtiyaçlarına göre uygulanmış ve mevcut sürümün kapsamı doğrultusunda dokümante edilmiştir.


