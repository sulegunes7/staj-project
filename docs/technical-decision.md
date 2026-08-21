# Technical Decision Note

## 1. Amaç

Bu doküman, projenin Full Stack geliştirme sürecinde kullanılacak temel teknolojilerin, frontend yaklaşımının, API entegrasyon biçiminin ve repository yapısının belirlenmesi amacıyla hazırlanmıştır.

Teknik seçimler yapılırken projenin gereksinimleri, geliştirme süresi, öğrenilebilirlik, sürdürülebilirlik ve ekip tarafından kullanılabilirlik dikkate alınmıştır.

---

## 2. Geliştirme Yönü

Proje için **Full Stack Web Application** geliştirme yönü seçilmiştir.

Sistem iki ana uygulama katmanından oluşacaktır:

- Frontend: React
- Backend: Java / Spring Boot

Frontend ve backend arasındaki iletişim REST API üzerinden gerçekleştirilecektir.

---

## 3. Frontend Teknoloji Kararı

### 3.1 React

Frontend geliştirme için **React** kullanılmasına karar verilmiştir.

React seçilme nedenleri:

- Modern web uygulamalarında yaygın olarak kullanılması
- Component tabanlı geliştirme yapısına sahip olması
- REST API'lerle kolay şekilde entegre edilebilmesi
- Projenin farklı ekranlarının yeniden kullanılabilir component'lerle oluşturulabilmesi
- Frontend geliştirme konusunda öğrenme hedefiyle uyumlu olması

React konusunda mevcut deneyim sınırlı olduğu için geliştirme sürecinin başlangıcında temel React konularına yönelik bir öğrenme planı uygulanacaktır.

---
## 4. Routing Kararı

Frontend routing işlemleri için **React Router** kullanılması planlanmaktadır.

Routing ile kullanıcıların rollerine ve erişim durumlarına göre farklı sayfalara yönlendirilmesi sağlanacaktır.

Örnek route yapısı:

```text
/login
/dashboard
/projects
/projects/:id
/reports
/reports/:id
/work-items
/risks
/admin/users
/admin/projects
```

## 5. State Management Kararı


İlk geliştirme aşamasında mümkün olduğunca basit bir state yönetimi yaklaşımı kullanılacaktır.

Yerel component durumları için React'in:

useState
useEffect

hook'ları kullanılacaktır.

Birden fazla component tarafından paylaşılması gereken temel kullanıcı/session bilgileri için gerektiğinde React Context kullanılacaktır.

İlk aşamada Redux gibi daha kapsamlı bir state management kütüphanesinin kullanılmasına gerek olmadığı değerlendirilmiştir.

Projenin ilerleyen aşamalarında state yönetimi karmaşık hale gelirse alternatif çözümler tekrar değerlendirilecektir.

6. UI Yaklaşımı

Frontend arayüzü component tabanlı olarak geliştirilecektir.

Temel yaklaşım:

Yeniden kullanılabilir componentler
Ortak layout yapısı
Form componentleri
Tablo/list componentleri
Dashboard componentleri
Loading durumları
Empty state'ler
Error state'ler
Form validation mesajları

Arayüzün öncelikli amacı sade, anlaşılır ve kullanıcı rollerine göre farklılaşan bir kullanım deneyimi sağlamaktır.

İlk aşamada gereksiz görsel karmaşıklıktan kaçınılacaktır.

7. API Entegrasyon Kararı

Frontend ile backend arasındaki iletişim REST API üzerinden gerçekleştirilecektir.

Frontend tarafından backend'e HTTP istekleri gönderilecektir.

Örnek:

React
   |
   | HTTP Request
   v
Spring Boot REST API
   |
   v
Database

API istekleri için başlangıçta tarayıcının native fetch API'sinin kullanılması değerlendirilmektedir.

API yapısı büyüdüğünde Axios gibi bir HTTP client kullanılması tekrar değerlendirilebilir.

8. Backend Teknoloji Kararı

Backend geliştirme için Java + Spring Boot kullanılacaktır.

Java tercih edilmesinin temel nedeni mevcut Java bilgisi ve backend geliştirme sürecine hızlı şekilde başlanabilmesidir.

Spring Boot ile:

REST API
Authentication
Authorization
Validation
Business logic
Database access

### 8.1 Katman Yaklaşımı

Backend tarafında katmanlı mimari yaklaşımının kullanılması planlanmaktadır.

Temel katmanlar:

- Controller: HTTP isteklerini karşılar ve API endpointlerini yönetir.
- Service: İş kurallarını ve uygulama mantığını yönetir.
- Repository: Veritabanı erişimini yönetir.
- Entity / Model: Sistemdeki temel veri yapılarını temsil eder.

Bu yapı, sorumlulukların birbirinden ayrılmasını ve backend kodunun daha düzenli ve sürdürülebilir olmasını amaçlamaktadır.

gibi backend ihtiyaçlarının yönetilmesi planlanmaktadır.

9. Veritabanı Kararı

İlişkisel verilerin yönetilmesi gerektiği için ilişkisel bir veritabanı kullanılacaktır.

İlk tercih olarak PostgreSQL değerlendirilmektedir.

Temel veri yapıları:

User
Role
Project
ProjectAssignment
WeeklyReport
WorkItem
RiskIssue

olarak planlanmıştır.

Veritabanı yapısı geliştirme aşamasında kesinleştirilecektir.

10. Backend - Frontend Entegrasyon Sözleşmesi

Frontend ve backend arasında REST API tabanlı bir entegrasyon sözleşmesi oluşturulacaktır.

Her API için aşağıdaki bilgiler tanımlanacaktır:

HTTP method
Endpoint
Request body
Query parameters
Response body
HTTP status code
Hata response yapısı
Authentication gereksinimi
Authorization gereksinimi

Örnek:

POST /api/reports


Request:
{
  "projectId": 1,
  "week": "2026-08-24",
  "progress": 75,
  "status": "ON_TRACK"
}


Response:
201 Created
{
  "id": 15,
  "projectId": 1,
  "progress": 75,
  "status": "ON_TRACK"
}

Bu yapı frontend geliştirmeye başlamadan önce API sözleşmesinin anlaşılır olmasını sağlayacaktır.

11. Repository Yapısı

Proje tek bir Git repository içerisinde yönetilecektir.

Önerilen yapı:

project-root/
│
├── backend/
│   └── Spring Boot application
│
├── frontend/
│   └── React application
│
├── docs/
│   ├── analysis-v1.md
│   └── technical-decision.md
│
├── README.md
└── .gitignore

Backend ve frontend birbirinden ayrılmış olmakla birlikte aynı repository içerisinde tutulacaktır.

Bu yapı Full Stack geliştirme sürecinde frontend ve backend çalışmalarının birlikte takip edilmesini kolaylaştıracaktır.

12. Git Kullanım Yaklaşımı

Git, geliştirme sürecindeki kod değişikliklerini takip etmek ve proje geçmişini korumak amacıyla kullanılacaktır.

Commit mesajlarının yapılan değişikliği açıkça ifade etmesi hedeflenmektedir.

Örnek commitler:

docs: add initial project analysis
docs: add technical decisions
feat: create project entity
feat: add weekly report API
feat: create project dashboard
fix: validate weekly report fields
13. Öğrenme Planı

Mevcut Java bilgisi backend geliştirmeye başlangıç için avantaj sağlamaktadır.

Frontend tarafında React konusunda deneyim bulunmadığından aşağıdaki öğrenme sırası izlenecektir.

Aşama 1 — React Temelleri
React projesinin oluşturulması
Component yapısı
JSX
Props
State
useState
useEffect
Event handling
Form yönetimi
Aşama 2 — React Uygulama Yapısı
Componentlerin organize edilmesi
Layout yapısı
React Router
Sayfalar arası navigation
Route parameters
Protected routes
Aşama 3 — API Entegrasyonu
HTTP ve REST API mantığı
GET / POST / PUT / DELETE
fetch kullanımı
Request ve response yapısı
Loading state
Error handling
API'den gelen verilerin componentlerde gösterilmesi
Aşama 4 — Projeye Uygulama

Öğrenilen React konuları doğrudan proje üzerinde uygulanacaktır.

İlk hedefler:

Login ekranı
Dashboard
Proje listesi
Proje detay ekranı
Haftalık rapor formu
14. Teknik Öğrenme Stratejisi

React öğrenme sürecinin ayrı bir çalışma olarak yürütülmesi yerine doğrudan proje geliştirme sürecine dahil edilmesi planlanmaktadır.

Örneğin:

React Component öğren
        ↓
Login componentini oluştur
        ↓
React Router öğren
        ↓
Login → Dashboard navigation oluştur
        ↓
API çağrısı öğren
        ↓
Project API'yi frontend'e bağla

Bu yöntem ile öğrenilen teknolojinin doğrudan gerçek bir problem üzerinde uygulanması hedeflenmektedir.

15. Teknik Kararların Özeti
Alan	Karar
Geliştirme yönü	Full Stack Web
Frontend	React
Routing	React Router
State Management	React Hooks + gerektiğinde Context
API iletişimi	REST API
HTTP client	İlk aşamada fetch
Backend	Java + Spring Boot
Veritabanı	PostgreSQL
Repository	Tek Git repository
Frontend / Backend yapısı	Ayrı klasörler
API entegrasyonu	REST tabanlı
Authentication	Backend kontrollü
Authorization	Role-based
UI yaklaşımı	Component tabanlı
16. Açık Teknik Konular

Aşağıdaki teknik kararlar geliştirme başlamadan önce veya geliştirme sırasında kesinleştirilecektir:

Authentication için kullanılacak yöntem
JWT kullanımı ve token yönetimi
PostgreSQL bağlantı yapılandırması
ORM yaklaşımı ve JPA/Hibernate kullanımı
Frontend UI component library kullanılıp kullanılmayacağı
API error response standardı
API documentation için Swagger/OpenAPI kullanımı
Deployment ortamı
Environment variable yönetimi

Bu konular proje gereksinimleri ve mentor geri bildirimlerine göre netleştirilecektir.



> 4. Gün: Projenin Full Stack geliştirme yönü için teknik kararlar değerlendirildi. Frontend tarafında React, routing için React Router, backend tarafında Java/Spring Boot ve ilişkisel veritabanı olarak PostgreSQL tercih edildi. Frontend ile backend arasındaki iletişimin REST API üzerinden gerçekleştirilmesine karar verildi. Repository yapısı frontend, backend ve dokümantasyon klasörleri ayrılacak şekilde planlandı. React konusunda mevcut deneyim bulunmadığı için component, state management, routing ve API entegrasyonu konularını kapsayan bir öğrenme planı oluşturuldu.





