const petaku = L.map("map", {
  center: L.latLng(-8.3518, 113.389),
  zoom: 13,
});
petaku.locate({
  setView: true,
  maxZoom: 16,
});
const kunci = "XXXXXXXXXXXXXXXX";
const lapisan = L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${kunci}`,
  {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution:
      '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
    crossOrigin: true,
  },
).addTo(petaku);

function saatKlik(e) {
  let lintang = e.latlng.lat.toFixed(4);
  let bujur = e.latlng.lng.toFixed(4);
  let tanda_klik = L.popup();
  tanda_klik
    .setLatLng(e.latlng)
    .setContent("Titik pilihan Anda:<br>" + lintang + "," + bujur)
    .openOn(petaku);

  let ikon_klik = L.marker(e.latlng).addTo(petaku);
  ikon_klik
    .bindPopup("Titik pilihan Anda:<br>" + lintang + "," + bujur)
    .openPopup();
}

let klikSaatIni = null;
function klikTitik(e) {
  let lintang = e.latlng.lat.toFixed(4);
  let bujur = e.latlng.lng.toFixed(4);
  if (klikSaatIni) {
    petaku.removeLayer(klikSaatIni);
  }
  klikSaatIni = L.marker(e.latlng).addTo(petaku);
  klikSaatIni
    .bindPopup("Titik pilihan Anda:<br>" + lintang + "," + bujur)
    .openPopup();
  const titikPilihan = document.getElementById("koordinat");
  const tautanGmaps = document.getElementById("gmaps");
  titikPilihan.textContent =
    "Koordinat (lintang, bujur) titik pilihan Anda : " + lintang + ", " + bujur;
  tautanGmaps.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${lintang}, ${bujur}", target="_blank">Lokasi di Google Maps</a>`;
}
petaku.on("click", klikTitik);
