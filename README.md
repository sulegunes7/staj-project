# Staj Takip Sistemi

Staj sürecinde gerçekleştirilen projelerin, haftalık çalışmaların, işlerin ve risklerin takip edilmesini sağlayan full stack web uygulamasıdır.

## Proje Amacı

Bu proje, staj sürecindeki çalışmaların düzenli şekilde takip edilmesi amacıyla geliştirilmiştir.

Uygulama üzerinden:

- Projeler oluşturulabilir, görüntülenebilir, güncellenebilir ve silinebilir.
- Haftalık staj raporları oluşturulabilir ve güncellenebilir.
- Projelere bağlı işler takip edilebilir.
- İşlere bağlı riskler oluşturulabilir, güncellenebilir ve silinebilir.
- Dashboard üzerinden genel proje durumu görüntülenebilir.

## Kullanılan Teknolojiler

### Backend

- Java 17
- Spring Boot 4.0.8
- Spring Data JPA
- Hibernate
- Maven
- REST API

### Veritabanı

- PostgreSQL 17.11

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

## Gereksinimler

- Java 17
- PostgreSQL 17
- Node.js ve npm
- Maven Wrapper

## Proje Yapısı

```text
staj projem/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Backend'i Çalıştırma

Proje klasöründen backend klasörüne geçilir:

```powershell
cd backend
```

Spring Boot uygulaması Maven Wrapper kullanılarak çalıştırılır:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend varsayılan olarak aşağıdaki adreste çalışır:

```text
http://localhost:8080
```

Backend bağlantısını kontrol etmek için:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get
```

Beklenen sonuç:

```text
Backend is running
```

## Frontend'i Çalıştırma

Yeni bir terminal açılarak frontend klasörüne geçilir:

```powershell
cd frontend
```

Gerekli paketler yüklenir:

```powershell
npm install
```

Frontend başlatılır:

```powershell
npm run dev
```

Vite tarafından gösterilen localhost adresinden uygulamaya erişilebilir.

## Veritabanı

Uygulama PostgreSQL veritabanı kullanmaktadır.

Mevcut geliştirme ortamındaki bağlantı bilgileri:

```text
Host: localhost
Port: 5432
Database: staj_db
Schema: public
```

Spring Boot backend, PostgreSQL bağlantısını JDBC üzerinden gerçekleştirmektedir.

## API Endpointleri

### Health

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/health` | Backend bağlantısını kontrol eder |

### Projects

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/projects` | Tüm projeleri getirir |
| POST | `/api/projects` | Yeni proje oluşturur |
| PUT | `/api/projects/{id}` | Projeyi günceller |
| DELETE | `/api/projects/{id}` | Projeyi siler |

### Weekly Reports

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/weekly-reports` | Tüm haftalık raporları getirir |
| POST | `/api/weekly-reports` | Yeni haftalık rapor oluşturur |
| PUT | `/api/weekly-reports/{id}` | Haftalık raporu günceller |
| DELETE | `/api/weekly-reports/{id}` | Haftalık raporu siler |

### Work Items

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/work-items` | Tüm işleri getirir |
| POST | `/api/work-items` | Yeni iş oluşturur |
| PUT | `/api/work-items/{id}` | İşi günceller |
| DELETE | `/api/work-items/{id}` | İşi siler |

### Risks

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/risks` | Tüm riskleri getirir |
| POST | `/api/risks` | Yeni risk oluşturur |
| PUT | `/api/risks/{id}` | Riski günceller |
| DELETE | `/api/risks/{id}` | Riski siler |
| GET | `/api/risks/work-item/{workItemId}` | İşe bağlı riskleri getirir |
| GET | `/api/risks/project/{projectId}` | Projeye bağlı riskleri getirir |

## Uygulama Özellikleri

### Dashboard

Dashboard üzerinden projelerin genel durumu görüntülenebilir.

- Proje sayısı
- Haftalık rapor sayısı
- İş sayısı
- Risk sayısı

gibi temel bilgiler görüntülenir.

### Proje Yönetimi

Projeler için temel CRUD işlemleri uygulanmıştır.

- Proje oluşturma
- Proje listeleme
- Proje güncelleme
- Proje silme

### Haftalık Rapor Yönetimi

Staj sürecindeki haftalık çalışmalar sisteme kaydedilebilir.

- Haftalık rapor oluşturma
- Raporları listeleme
- Rapor güncelleme
- Rapor silme

### İş Takibi

Projeye bağlı işler oluşturulabilir ve takip edilebilir.

- İş oluşturma
- İş listeleme
- İş güncelleme
- İş silme

### Risk Yönetimi

İşlere ve projelere bağlı riskler oluşturulabilir ve yönetilebilir.

- Risk oluşturma
- Risk listeleme
- Risk güncelleme
- Risk silme

## Backend Mimarisi

Backend katmanlı mimari yaklaşımı kullanılarak geliştirilmiştir.

Temel yapı:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
PostgreSQL
```

Spring Data JPA ve Hibernate kullanılarak veritabanı işlemleri gerçekleştirilmiştir.

## Frontend - Backend İletişimi

React frontend uygulaması, backend tarafından sağlanan REST API endpointleri ile iletişim kurmaktadır.

Frontend tarafında API istekleri merkezi bir servis yapısı üzerinden yönetilmektedir.

Frontend ve backend farklı portlarda çalıştığı için gerekli CORS yapılandırması backend tarafında yapılmıştır.

## Test

Projenin geliştirme sürecinde aşağıdaki işlemler test edilmiştir:

- Backend health kontrolü
- PostgreSQL bağlantısı
- Proje listeleme
- Proje oluşturma
- Proje güncelleme
- Proje silme
- Haftalık rapor listeleme
- Haftalık rapor oluşturma
- Haftalık rapor güncelleme
- Haftalık rapor silme
- İş oluşturma
- İş silme
- Risk oluşturma
- Risk güncelleme
- Risk silme
- Frontend-backend API iletişimi
- Sayfa yenilendiğinde verilerin korunması
- Maven build ve test süreci

Backend build/test kontrolünde:

```text
Tests run: 1
Failures: 0
Errors: 0
BUILD SUCCESS
```

sonucu alınmıştır.

## Haftalık Geliştirme Süreci

### 1. Hafta

Backend altyapısı oluşturuldu. Spring Boot proje yapısı kuruldu, PostgreSQL veritabanı bağlantısı sağlandı ve JPA/Hibernate yapılandırıldı.

Projeler ve haftalık raporlar için model, repository, service ve controller katmanları geliştirildi. REST API endpointleri oluşturularak temel veri akışı test edildi.

### 2. Hafta

Frontend ve backend API entegrasyonu tamamlandı.

React ve Vite tabanlı frontend uygulaması backend API ile bağlandı. Proje listeleme, oluşturma, güncelleme ve silme işlemleri frontend üzerinden gerçekleştirildi.

Haftalık rapor işlemleri eklendi. İş ve risk yönetimi özellikleri geliştirildi.

Form doğrulamaları, hata mesajları ve CORS yapılandırması uygulandı.

Dashboard ve kullanıcı arayüzü düzenlemeleri tamamlandı.

Temel CRUD işlemleri frontend üzerinden test edildi.

## Projenin Güncel Durumu

Projenin temel full stack geliştirme süreci tamamlanmıştır.

Frontend, backend ve PostgreSQL veritabanı birlikte çalışmaktadır.

Temel CRUD işlemleri, proje takibi, haftalık rapor yönetimi, iş takibi, risk yönetimi ve dashboard özellikleri uygulanmış ve test edilmiştir.