# Ön Analiz — Full Stack Proje

## 1. Projenin Amacı

Projenin amacı, proje yöneticilerinin sorumlu oldukları projeler için haftalık durum bilgilerini standart bir yapı üzerinden girebilmesini ve CTO'nun projelerin güncel durumlarını merkezi bir yapı üzerinden takip edebilmesini sağlayan bir sistem geliştirmektir.

Sistem kapsamında proje durumu, ilerleme bilgileri, yapılan işler, gelecek hafta planı, riskler ve engeller gibi bilgilerin merkezi olarak yönetilmesi hedeflenmektedir.

---

## 2. Uçtan Uca Demo Senaryosu

Sistemin temel uçtan uca kullanım senaryosu aşağıdaki şekilde planlanmıştır:

1. Proje yöneticisi sisteme giriş yapar.
2. Sistem kullanıcının rolünü doğrular.
3. Proje yöneticisi kendisine atanmış projeleri görüntüler.
4. Proje yöneticisi ilgili projeyi seçer.
5. Haftalık rapor oluşturma ekranını açar.
6. Haftalık rapor bilgilerini girer.
7. Sistem girilen bilgileri doğrular.
8. Geçerli bilgiler veritabanına kaydedilir.
9. CTO sisteme giriş yapar.
10. CTO dashboard üzerinden projelerin güncel durumlarını görüntüler.
11. CTO gerekli filtreleri uygular.
12. CTO seçtiği projenin detayına ulaşır.
13. Projenin haftalık raporunu, ilerleme durumunu ve risk/engellerini görüntüler.

Bu senaryo, sistemin temel uçtan uca çalışma mantığını göstermek amacıyla oluşturulmuştur.

---

## 3. Sistem Bileşenleri

Sistemin temel olarak aşağıdaki bileşenlerden oluşması planlanmaktadır:

### 3.1 Web Arayüzü

Kullanıcıların sisteme giriş yapması, projeleri görüntülemesi, haftalık rapor oluşturması ve CTO dashboard'unu kullanması için web arayüzü.

### 3.2 Backend / API

Web arayüzünden gelen isteklerin işlenmesi, iş kurallarının uygulanması, validasyon ve yetkilendirme kontrollerinin gerçekleştirilmesi ve veritabanı işlemlerinin yönetilmesi.

### 3.3 Veritabanı

Kullanıcı, rol, proje, haftalık rapor, iş kalemi ve risk/engel gibi verilerin saklanması.

### 3.4 Authentication / Authorization

Kullanıcıların sisteme giriş yapması ve sahip oldukları role göre yetkili oldukları kaynaklara erişebilmesi.

### 3.5 CTO Dashboard

CTO'nun proje portföyünün güncel durumunu merkezi olarak görüntüleyebilmesini ve projeleri filtreleyebilmesini sağlayan arayüz.

---

## 4. Kullanıcı Rolleri

Ön analiz kapsamında aşağıdaki kullanıcı rolleri belirlenmiştir:

- Proje Yöneticisi
- CTO
- Admin
- Ekip Lideri
- Rapor Görüntüleyen Yönetici

### 4.1 Proje Yöneticisi

- Kendisine atanmış projeleri görüntüler.
- Haftalık proje durum raporu oluşturur.
- Haftalık rapor bilgilerini günceller.
- Yapılan işleri ve gelecek hafta planını girer.
- Risk ve engelleri kaydeder.

### 4.2 CTO

- Projelerin güncel durumlarını görüntüler.
- Projeleri filtreler.
- Proje detayına ulaşır.
- Haftalık raporları ve risk/engelleri inceler.

### 4.3 Admin

- Kullanıcıları yönetir.
- Kullanıcı rollerini yönetir.
- Projeleri yönetir.
- Proje ve kullanıcı ilişkilerini yönetir.

### 4.4 Ekip Lideri

- Yetkili olduğu iş kalemlerini görüntüler.
- Yetkisi kapsamında iş kalemleri üzerinde işlem yapabilir.

### 4.5 Rapor Görüntüleyen Yönetici

- Yetkisi dahilindeki proje ve raporları görüntüler.

---

## 5. Temel Veri Varlıkları

Ön analiz kapsamında aşağıdaki temel veri varlıkları belirlenmiştir:

- User
- Role
- Project
- ProjectAssignment
- WeeklyReport
- WorkItem
- RiskIssue

### Temel ilişkiler

- Bir User bir Role sahip olabilir.
- Bir Project bir veya daha fazla kullanıcı ile ilişkilendirilebilir.
- ProjectAssignment, kullanıcı ile proje arasındaki ilişkiyi temsil eder.
- Bir Project birden fazla WeeklyReport içerebilir.
- Bir WeeklyReport ilgili Project ile ilişkilidir.
- Bir Project içerisinde birden fazla WorkItem bulunabilir.
- RiskIssue ilgili proje ve/veya haftalık rapor ile ilişkilendirilebilir.

> Not: Veri modeli ve ilişkiler bu aşamada ön analiz seviyesindedir ve sonraki aşamalarda detaylandırılacaktır.

---

## 6. Haftalık Rapor Alanları

Haftalık rapor için ön analiz kapsamında aşağıdaki alanlar değerlendirilmiştir:

- Rapor haftası / tarihi
- Hedeflenen ilerleme
- Gerçekleşen ilerleme
- Genel proje durumu
- Takvim durumu
- Risk seviyesi
- Yapılan işler
- Gelecek hafta yapılacak işler
- Riskler / engeller
- Genel not

Bu alanların kesin zorunluluk durumları açık sorular kapsamında doğrulanacaktır.

---

## 7. Veri → API → Arayüz Akışı

Sistemin temel veri akışı aşağıdaki şekilde planlanmaktadır:

```text
Web Arayüzü
     |
     | HTTP / REST API
     v
Backend
     |
     | İş kuralları
     | Validasyon
     | Yetkilendirme
     v
Veritabanı

7.1 Haftalık Rapor Oluşturma Akışı
Project Manager
      |
      v
Weekly Report Form
      |
      v
POST /api/reports
      |
      v
Backend
      |
      ├── Authentication
      ├── Authorization
      ├── Validation
      └── Business Rules
      |
      v
Database

7.2 CTO Dashboard Akışı
CTO Dashboard
      |
      v
GET /api/dashboard/summary
      |
      v
Backend
      |
      v
Database
      |
      v
Project + WeeklyReport + RiskIssue
      |
      v
Dashboard

8. Ön API İhtiyaçları

Authentication
POST /api/auth/login

Project
GET  /api/projects
GET  /api/projects/{id}

8. Ön API İhtiyaçları

Bu aşamada API'ler taslak seviyesinde belirlenmiştir.

Authentication
POST /api/auth/login
Project
GET  /api/projects
GET  /api/projects/{id}
Weekly Report
GET  /api/reports
GET  /api/reports/{id}
POST /api/reports
PUT  /api/reports/{id}
Work Item
GET  /api/work-items
POST /api/work-items
PUT  /api/work-items/{id}
Risk / Issue
GET  /api/risks
POST /api/risks
PUT  /api/risks/{id}
Dashboard
GET /api/dashboard/summary
GET /api/dashboard/projects

Not: API endpointleri ön analiz kapsamında taslak olarak oluşturulmuştur. Backend geliştirme aşamasında kesinleştirilecektir.

9. Ön Arayüz İhtiyaçları
Ortak
Login
Yetkisiz erişim / hata ekranı
Proje Yöneticisi
Dashboard
Projelerim
Proje Detayı
Haftalık Rapor
Haftalık Rapor Detayı / Düzenle
İş Kalemleri
Risk ve Engeller
CTO
CTO Dashboard
Proje Listesi
Proje Detayı
Haftalık Rapor Geçmişi
Admin
Kullanıcı Yönetimi
Proje Yönetimi
Proje Atama
10. Ön Kapsam Sınırları

İlk analiz kapsamında sistemin temel amacı; kullanıcıların rollerine göre yetkilendirilmesi, projelerin takip edilmesi, haftalık proje durum bilgilerinin sisteme girilmesi ve CTO'nun bu bilgileri merkezi bir arayüz üzerinden görüntüleyebilmesidir.

Öncelikli olarak aşağıdaki temel işlevlerin ele alınması planlanmaktadır:

Kullanıcı girişi ve rol bazlı yetkilendirme
Proje görüntüleme ve yönetimi
Haftalık proje raporlarının oluşturulması ve görüntülenmesi
İş kalemlerinin takibi
Risk ve engellerin takibi
CTO dashboard'u
Temel proje filtreleme

Jira, Azure DevOps, bildirimler, gelişmiş raporlama, AI gibi ek özelliklerin gerekliliği ve kapsamı henüz kesinleştirilmemiştir. Bu özellikler, alınacak geri bildirimler ve projenin ilerleyen aşamalarındaki ihtiyaçlara göre değerlendirilecektir.

11. Açık Sorular

Aşağıdaki konuların sonraki aşamada stajyer grubu ve ilgili proje sorumlusu ile doğrulanması gerekmektedir:

Bir proje için aynı hafta birden fazla haftalık rapor oluşturulabilir mi?
Haftalık rapor oluşturulduktan sonra hangi zamana kadar düzenlenebilir?
CTO'nun haftalık raporlar üzerindeki yetkisi yalnızca görüntüleme midir?
Proje yöneticisi yalnızca kendisine atanmış projeleri mi görüntüleyebilir?
Ekip liderinin iş kalemleri üzerindeki kesin yetkileri nelerdir?
Rapor görüntüleyen yönetici rolünün kesin yetkileri nelerdir?
Kullanılacak proje durumları nelerdir?
Kullanılacak risk seviyeleri nelerdir?
Haftalık rapor alanlarından hangileri zorunludur?
İlerleme yüzdesi için özel bir validasyon kuralı var mıdır?
Admin'in kullanıcı ve proje yönetimindeki kesin yetkileri nelerdir?
Haftalık raporlama sürecinde ön analizde belirtilmeyen başka zorunlu bir bilgi veya adım var mıdır?
12. Kullanıcı Hikâyeleri
US-01 — Kullanıcı Girişi

Rol: Tüm kullanıcılar

Bir kullanıcı olarak sisteme güvenli bir şekilde giriş yapmak istiyorum, böylece sahip olduğum role uygun özelliklere erişebileyim.

Kabul Kriterleri
Geçerli kullanıcı bilgileri ile giriş yapılabilmelidir.
Hatalı kullanıcı bilgileri ile giriş yapılamamalıdır.
Başarılı giriş sonrasında kullanıcı rolüne uygun sayfaya yönlendirilmelidir.
Yetkisiz kullanıcıların korumalı sayfalara erişimi engellenmelidir.
US-02 — Projelerimi Görüntüleme

Rol: Proje Yöneticisi

Bir proje yöneticisi olarak sorumlu olduğum projeleri görüntülemek istiyorum, böylece ilgili projelerin haftalık durumlarını yönetebileyim.

Kabul Kriterleri
Proje yöneticisi kendisine atanmış projeleri görüntüleyebilmelidir.
Her proje için temel proje bilgileri görüntülenebilmelidir.
Proje yöneticisi bir projenin detayına ulaşabilmelidir.
Proje yöneticisi yetkisi olmayan projelere erişememelidir.
US-03 — Haftalık Rapor Oluşturma

Rol: Proje Yöneticisi

Bir proje yöneticisi olarak sorumlu olduğum proje için haftalık durum raporu oluşturmak istiyorum, böylece projenin güncel durumunu standart bir formatta raporlayabileyim.

Kabul Kriterleri
Proje yöneticisi rapor haftasını/tarihini belirleyebilmelidir.
Hedeflenen ilerleme yüzdesini girebilmelidir.
Gerçekleşen ilerleme yüzdesini girebilmelidir.
Projenin genel durumunu belirleyebilmelidir.
Takvim durumunu belirleyebilmelidir.
Risk seviyesini belirleyebilmelidir.
Yapılan işleri girebilmelidir.
Gelecek hafta yapılacak işleri girebilmelidir.
Risk ve engelleri girebilmelidir.
Genel not ekleyebilmelidir.
Zorunlu alanlar boş bırakıldığında sistem hata mesajı göstermelidir.
Başarılı kayıt sonrasında rapor görüntülenebilmelidir.
US-04 — Haftalık Rapor Düzenleme

Rol: Proje Yöneticisi

Bir proje yöneticisi olarak oluşturduğum haftalık raporu güncellemek istiyorum, böylece rapordaki değişiklikleri güncel tutabileyim.

Kabul Kriterleri
Proje yöneticisi yetkili olduğu raporu açabilmelidir.
Rapor alanları düzenlenebilmelidir.
Güncellenen bilgiler kaydedilebilmelidir.
Yetkisiz kullanıcıların raporu değiştirmesi engellenmelidir.
Geçersiz değerler kaydedilmemelidir.
US-05 — İş Kalemi Yönetimi

Rol: Yetkili Kullanıcı

Bir yetkili kullanıcı olarak proje içerisindeki iş kalemlerini oluşturmak ve durumlarını takip etmek istiyorum, böylece proje çalışmalarının ilerlemesini izleyebileyim.

Kabul Kriterleri
Yeni iş kalemi oluşturulabilmelidir.
İş kalemine başlık ve açıklama girilebilmelidir.
İş kalemi bir ekip veya kişiye atanabilmelidir.
İş kaleminin durumu belirlenebilmelidir.
Planlanan ve tamamlanan tarihler tutulabilmelidir.
İş kalemine not eklenebilmelidir.
Yetkisiz kullanıcıların iş kalemlerini değiştirmesi engellenmelidir.
US-06 — Risk ve Engel Takibi

Rol: Proje Yöneticisi

Bir proje yöneticisi olarak projemdeki risk ve engelleri kaydetmek istiyorum, böylece projenin durumunu doğru şekilde takip edebileyim.

Kabul Kriterleri
Yeni bir risk veya engel kaydı oluşturulabilmelidir.
Risk seviyesi belirtilebilmelidir.
Risk veya engelin açıklaması girilebilmelidir.
Risk bilgisi ilgili proje ve/veya haftalık rapor ile ilişkilendirilebilmelidir.
Yetkili kullanıcılar risk ve engelleri görüntüleyebilmelidir.
US-07 — CTO Dashboard

Rol: CTO

Bir CTO olarak tüm projelerin güncel durumunu tek bir dashboard üzerinden görmek istiyorum, böylece proje portföyünün genel durumunu hızlıca değerlendirebileyim.

Kabul Kriterleri
CTO yetkili projeleri görüntüleyebilmelidir.
Projelerin ilerleme bilgileri görüntülenebilmelidir.
Proje durumları görüntülenebilmelidir.
Risk seviyeleri görüntülenebilmelidir.
CTO proje detayına geçebilmelidir.
Riskli veya geciken projeler ayırt edilebilir şekilde gösterilebilmelidir.
US-08 — Dashboard Filtreleme

Rol: CTO

Bir CTO olarak projeleri belirli kriterlere göre filtrelemek istiyorum, böylece incelemek istediğim projelere hızlıca ulaşabileyim.

Kabul Kriterleri
Projeler proje bilgisine göre filtrelenebilmelidir.
Projeler hafta/tarih bilgisine göre filtrelenebilmelidir.
Projeler durum bilgisine göre filtrelenebilmelidir.
Projeler risk seviyesine göre filtrelenebilmelidir.
Filtre uygulandığında yalnızca uygun sonuçlar gösterilmelidir.
US-09 — Proje Detayını Görüntüleme

Rol: CTO

Bir CTO olarak seçtiğim projenin detaylarını görüntülemek istiyorum, böylece projenin ilerlemesini, yapılan işleri, gelecek planını ve risklerini inceleyebileyim.

Kabul Kriterleri
Projenin temel bilgileri görüntülenebilmelidir.
Güncel haftalık rapor görüntülenebilmelidir.
Hedeflenen ve gerçekleşen ilerleme görülebilmelidir.
Yapılan işler görülebilmelidir.
Gelecek hafta planı görülebilmelidir.
Risk ve engeller görülebilmelidir.
Geçmiş haftalara ait raporlara ulaşılabilmelidir.
US-10 — Kullanıcı ve Proje Yönetimi

Rol: Admin

Bir admin olarak kullanıcıları, rolleri ve projeleri yönetmek istiyorum, böylece sistemdeki temel yapılandırmayı kontrol edebileyim.

Kabul Kriterleri
Admin kullanıcıları görüntüleyebilmelidir.
Kullanıcıların rolleri yönetilebilmelidir.
Projeler oluşturulabilmelidir.
Proje bilgileri düzenlenebilmelidir.
Proje yöneticisi proje ile ilişkilendirilebilmelidir.
Yetkisiz kullanıcıların yönetim ekranlarına erişimi engellenmelidir.
13. Ana İş Akışları
13.1 Haftalık Proje Raporu Oluşturma

Aktör: Proje Yöneticisi

Proje yöneticisi sisteme giriş yapar.
Sistem kullanıcının rolünü doğrular.
Proje yöneticisi kendisine atanmış projeleri görüntüler.
İlgili projeyi seçer.
Haftalık rapor oluşturma ekranını açar.
Rapor haftasını ve gerekli bilgileri girer.
Sistem form alanlarını ve iş kurallarını doğrular.
Geçerli bilgiler veritabanına kaydedilir.
Kullanıcı kayıt sonucunu görüntüler.
13.2 CTO Dashboard ve Proje İnceleme

Aktör: CTO

CTO sisteme giriş yapar.
Sistem CTO yetkisini doğrular.
CTO dashboard ekranını görüntüler.
Sistem proje durumlarını getirir.
CTO filtreleme kriterlerini seçebilir.
Sistem filtre kriterlerine uygun projeleri gösterir.
CTO bir proje seçer.
Sistem proje detayını ve güncel haftalık raporu gösterir.
CTO yapılan işleri, gelecek planını ve risk/engelleri inceler.
CTO geçmiş haftalara ait raporları görüntüleyebilir.
13.3 Kullanıcı ve Proje Yönetimi

Aktör: Admin

Admin sisteme giriş yapar.
Sistem admin yetkisini doğrular.
Admin kullanıcı yönetimine erişir.
Kullanıcıları görüntüler ve rollerini yönetir.
Admin proje yönetimine erişir.
Yeni proje oluşturur veya mevcut projeyi düzenler.
Proje yöneticisini proje ile ilişkilendirir.
Sistem değişiklikleri doğrular ve kaydeder.
14. Ekran Haritası
Ortak
Login
Yetkisiz erişim / hata ekranı
Proje Yöneticisi
Dashboard
Projelerim
Proje Detayı
Haftalık Rapor
Haftalık Rapor Detayı / Düzenle
İş Kalemleri
Risk ve Engeller
CTO
CTO Dashboard
Proje Listesi
Proje Detayı
Haftalık Rapor Geçmişi
Admin
Kullanıcı Yönetimi
Proje Yönetimi
Proje Atama
15. Veri, API ve Arayüz Eşleştirmesi
Özellik	Veri	API	Arayüz
Login	User, Role	POST /api/auth/login	Login
Projelerim	Project, ProjectAssignment	GET /api/projects	Projelerim
Proje Detayı	Project	GET /api/projects/{id}	Proje Detayı
Haftalık Rapor	WeeklyReport	POST /api/reports	Rapor Formu
Rapor Güncelleme	WeeklyReport	PUT /api/reports/{id}	Rapor Düzenleme
İş Kalemi	WorkItem	POST /api/work-items	İş Kalemleri
Risk / Engel	RiskIssue	POST /api/risks	Risk Formu
CTO Dashboard	Project, WeeklyReport, RiskIssue	GET /api/dashboard/summary	CTO Dashboard
Filtreleme	Project, WeeklyReport	GET /api/dashboard/projects	Dashboard Filtreleri
Kullanıcı Yönetimi	User, Role	GET /api/users	Kullanıcı Yönetimi
Proje Yönetimi	Project, ProjectAssignment	GET /api/projects	Proje Yönetimi
16. Temel İş Kuralları
Kullanıcı yalnızca yetkili olduğu ekranlara ve kaynaklara erişebilmelidir.
Proje yöneticisi yalnızca yetkili olduğu projeler için haftalık rapor oluşturabilmelidir.
Haftalık rapor ilgili proje ve haftayla ilişkilendirilmelidir.
İlerleme değerleri geçerli bir yüzde aralığında olmalıdır.
Zorunlu rapor alanları boş bırakılamamalıdır.
Yetkisiz kullanıcıların proje, rapor veya iş kalemi üzerinde değişiklik yapması engellenmelidir.
CTO yetkili projelerin durumunu görüntüleyebilmelidir.
Dashboard filtreleri seçilen kriterlere göre sonuçları güncellemelidir.
Hatalı veya geçersiz veri kullanıcıya anlaşılır bir mesajla bildirilmelidir.
17. Hata ve Negatif Durumlar
Login
Hatalı kullanıcı adı veya şifre
Eksik kullanıcı bilgisi
Yetkisiz kullanıcı
Haftalık Rapor
Zorunlu alanların boş bırakılması
Geçersiz ilerleme yüzdesi
Yetkisiz projeye rapor ekleme
Aynı hafta için mükerrer rapor oluşturma ihtimali
İş Kalemi
Eksik başlık
Geçersiz tarih
Yetkisiz kullanıcı tarafından düzenleme
Dashboard
Filtre sonucunun boş olması
Proje bulunamaması
Yetkisiz proje detayına erişim
Sistem
API bağlantı hatası
Veritabanı hatası
Beklenmeyen sunucu hatası

18. Durum
Bu doküman, Full Stack geliştirme yönü için ilk üç gün kapsamında hazırlanan ön analiz çalışmasıdır.

1. Gün Çıktıları
Uçtan uca demo senaryosu
Sistem bileşenleri
2. Gün Çıktıları
Veri ihtiyaçları
API ihtiyaçları
Arayüz ihtiyaçları
Ön kapsam sınırları
Açık soru listesi
3. Gün Çıktıları
Kullanıcı hikâyeleri
Kabul kriterleri
Ana iş akışları
Ekran haritası
Veri/API/arayüz eşleştirmesi
Temel iş kuralları
Hata ve negatif durumlar
