import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'kontrak'

// Ambil semua kontrak — tanpa orderBy agar tidak perlu index
export async function getAllKontrak() {
  const snapshot = await getDocs(collection(db, COLLECTION))
  const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  // Sort di sisi client berdasarkan createdAt
  data.sort((a, b) => {
    const tA = a.createdAt?.seconds ?? 0
    const tB = b.createdAt?.seconds ?? 0
    return tA - tB
  })
  return data
}

// Tambah kontrak baru
export async function addKontrak(data) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

// Update kontrak
export async function updateKontrak(id, data) {
  const { id: _id, createdAt, ...rest } = data
  await updateDoc(doc(db, COLLECTION, id), {
    ...rest,
    updatedAt: serverTimestamp(),
  })
}

// Hapus kontrak
export async function deleteKontrak(id) {
  await deleteDoc(doc(db, COLLECTION, id))
}
