const form = document.getElementById("laporanForm");
const list = document.getElementById("laporanList");

function simpanLaporan(laporan) {
  const laporanSebelumnya = JSON.parse(localStorage.getItem("laporan")) || [];
  laporanSebelumnya.push(laporan);
  localStorage.setItem("laporan", JSON.stringify(laporanSebelumnya));
}

function tampilkanLaporan() {
  const semua = JSON.parse(localStorage.getItem("laporan")) || [];
  list.innerHTML = "";
  semua.reverse().forEach((lap) => {
    const el = document.createElement("div");
    el.classList.add("laporan-item");
    el.innerHTML = `
      <strong>${lap.judul}</strong><br/>
      <small>${lap.tanggal} - ${lap.nama}</small><br/>
      <p>${lap.isi}</p>
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

tampilkanLaporan();
