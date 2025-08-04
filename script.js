const form = document.getElementById("laporanForm");
const list = document.getElementById("laporanList");
const downloadBtn = document.getElementById("downloadExcel");

function simpanLaporan(laporan) {
  const laporanSebelumnya = JSON.parse(localStorage.getItem("laporan")) || [];
  laporanSebelumnya.push(laporan);
  localStorage.setItem("laporan", JSON.stringify(laporanSebelumnya));
}

function hapusLaporan(index) {
  const semua = JSON.parse(localStorage.getItem("laporan")) || [];
  semua.splice(index, 1);
  localStorage.setItem("laporan", JSON.stringify(semua));
  tampilkanLaporan();
}

function tampilkanLaporan() {
  const semua = JSON.parse(localStorage.getItem("laporan")) || [];
  list.innerHTML = "";
  semua.forEach((lap, index) => {
    const el = document.createElement("div");
    el.classList.add("laporan-item");
    el.innerHTML = `
      <strong>${lap.judul}</strong><br/>
      <small>${lap.tanggal} - ${lap.nama}</small><br/>
      <p>${lap.isi}</p>
      <button class="hapus-btn" onclick="hapusLaporan(${index})">🗑️ Hapus</button>
    `;
    list.appendChild(el);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const laporan = {
    judul: document.getElementById("judul").value,
    isi: document.getElementById("isi").value,
    nama: document.getElementById("nama").value,
    tanggal: document.getElementById("tanggal").value
  };
  simpanLaporan(laporan);
  form.reset();
  tampilkanLaporan();
});

// 📥 Ekspor ke Excel
downloadBtn.addEventListener("click", () => {
  const semua = JSON.parse(localStorage.getItem("laporan")) || [];
  if (semua.length === 0) {
    alert("Belum ada laporan untuk didownload.");
    return;
  }

  const dataExcel = semua.map(l => ({
    "Judul": l.judul,
    "Isi Laporan": l.isi,
    "Nama Pelapor": l.nama,
    "Tanggal": l.tanggal
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataExcel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

  XLSX.writeFile(workbook, "laporan.xlsx");
});

// Load saat halaman pertama kali dibuka
tampilkanLaporan();
