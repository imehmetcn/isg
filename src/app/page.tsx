import { ArrowRight, BarChart2, FileText, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">İSG Yönetim</div>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">Hakkında</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">İletişim</Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Ücretsiz Dene
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              İş Güvenliği Yönetimini Kolaylaştırın
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tüm İSG süreçlerinizi tek bir platformda yönetin. Risk değerlendirmeden eğitim takibine, 
              denetimlerden raporlamalara kadar her şey kontrolünüz altında.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/demo" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Demo İncele
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Neler Sunuyoruz?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Yönetimi</h3>
              <p className="text-gray-600">
                Kapsamlı risk değerlendirme araçları ile tehlikeleri önceden tespit edin ve önlem alın.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eğitim Takibi</h3>
              <p className="text-gray-600">
                Çalışan eğitimlerini planlayin, takip edin ve sertifikalarını yönetin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Doküman Yönetimi</h3>
              <p className="text-gray-600">
                Tüm İSG dokümanlarınızı düzenli ve kolay erişilebilir şekilde saklayın.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Raporlama</h3>
              <p className="text-gray-600">
                Detaylı analizler ve özelleştirilebilir raporlarla verilerinizi değerlendirin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Tamamlanan Risk Değerlendirmesi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">İSG Yönetim</div>
              <p className="text-sm">
                İş güvenliği süreçlerinizi dijitalleştirin, 
                verimliliğinizi artırın.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Ürün</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Özellikler</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Fiyatlandırma</Link></li>
                <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Şirket</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">Hakkımızda</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">İletişim</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Yasal</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Kullanım Koşulları</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition">KVKK</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
} 