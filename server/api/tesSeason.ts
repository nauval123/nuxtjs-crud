// server/api/lihat-sesi.get.ts
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  // Ambil sesi dari request yang masuk
  const session = await getServerSession(event);

  // Cetak seluruh isi sesi ke konsol terminal Anda
  console.log("--- SESI DARI BACKEND ---");
  console.log(session);
  console.log("-------------------------");

  // Cek jika pengguna tidak login
  if (!session) {
    return { error: "Anda tidak login." };
  }

  // Kembalikan sesi sebagai respons JSON
  return {
    pesan: "Ini adalah data sesi yang dilihat dari backend:",
    dataSesi: session,
  };
});
