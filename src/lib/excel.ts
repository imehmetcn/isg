import * as XLSX from "xlsx";

interface User {
  name: string;
  email: string;
  role: string;
  company?: string;
}

export function exportUsersToExcel(users: User[]): Blob {
  // Kullanıcı verilerini Excel formatına dönüştür
  const worksheet = XLSX.utils.json_to_sheet(
    users.map((user) => ({
      "Ad Soyad": user.name,
      Email: user.email,
      Rol: user.role,
      Şirket: user.company || "",
    }))
  );

  // Sütun genişliklerini ayarla
  const columnWidths = [
    { wch: 30 }, // Ad Soyad
    { wch: 30 }, // Email
    { wch: 15 }, // Rol
    { wch: 30 }, // Şirket
  ];
  worksheet["!cols"] = columnWidths;

  // Çalışma kitabı oluştur
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kullanıcılar");

  // Excel dosyasını oluştur
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  return new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function parseExcelFile(file: File): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // İlk sayfayı al
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Verileri JSON'a dönüştür
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Verileri doğrula ve dönüştür
        const users: User[] = jsonData.map((row: any) => {
          const user: User = {
            name: row["Ad Soyad"] || row.name,
            email: row.Email || row.email,
            role: row.Rol || row.role || "USER",
            company: row.Şirket || row.company,
          };

          // Zorunlu alanları kontrol et
          if (!user.name || !user.email) {
            throw new Error("Ad Soyad ve Email alanları zorunludur");
          }

          // Email formatını kontrol et
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(user.email)) {
            throw new Error(`Geçersiz email formatı: ${user.email}`);
          }

          // Rol değerini kontrol et
          if (user.role !== "USER" && user.role !== "ADMIN") {
            user.role = "USER";
          }

          return user;
        });

        resolve(users);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Dosya okunamadı"));
    };

    reader.readAsArrayBuffer(file);
  });
} 